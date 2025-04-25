from datetime import datetime
import os
from django.conf import settings
from django.views import View
from django.shortcuts import render
from .forms import InformatioinForm
from django.http import JsonResponse
from django.core.mail import send_mail
import gspread
from google.oauth2.service_account import Credentials
import json
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

print("Verificando credenciais...")
try:
    with open(settings.CREDENTIALS_FILE) as f:
        creds_json = json.load(f)
        service_account_email = creds_json.get('client_email')
        print(f"Email da conta de serviço: {service_account_email}")
except Exception as e:
    print(f"Erro ao ler credenciais: {str(e)}")


def get_date_today():
    return datetime.today().date()


def get_pacage_price():
    """
    Returns the current package price based on the promotional schedule.
    Returns a list with [current_price_in_cents, regular_price_in_cents (optional), promo_type]
    """
    today = get_date_today()
    first_deadline = datetime(2025, 5, 5).date()  # May 5, 2025
    second_deadline = datetime(2025, 5, 12).date()  # May 12, 2025
    
    if today <= first_deadline:
        # First phase pricing (until May 5 inclusive)
        return [89900, 99900, "early_promo"]  # 899€ promo, 999€ next phase
    elif today <= second_deadline:
        # Second phase pricing (May 6 - May 12 inclusive)
        return [98900, 109900, "late_promo"]  # 989€ promo, 1099€ regular
    else:
        # Regular pricing (after May 12)
        return [109900, None, "regular"]  # 1099€ regular price


CREDENTIALS_FILE = settings.CREDENTIALS_FILE

SCOPES = [
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/drive',
]

SAMPLE_SPREADSHEET_ID = os.environ.get('GOOGLE_SHEET_ID')

# Make Google Sheets integration optional
sheet = None
try:
    if SAMPLE_SPREADSHEET_ID:
        credentials = Credentials.from_service_account_file(CREDENTIALS_FILE, scopes=SCOPES)
        client = gspread.authorize(credentials)
        google_sheet = client.open_by_key(SAMPLE_SPREADSHEET_ID)
        sheet = google_sheet.get_worksheet(0)
        print("Google Sheets integration initialized successfully!")
    else:
        print("No Google Sheet ID provided. Sheet functionality will be disabled.")
except Exception as e:
    print(f"Error initializing Google Sheets: {str(e)}. Sheet functionality will be disabled.")


@method_decorator(csrf_exempt, name='dispatch')
class IndexView(View):
    template_name = 'index.html'

    def get(self, request, *args, **kwargs):
        get_date_today()
        form = InformatioinForm()
        # Print valid choices for debugging
        print(f"Valid choices for objective field: {[choice[0] for choice in form.fields['objective'].choices]}")

        form_structure = {
            'fields': {
                'full_name': {
                    'type': 'text',
                    'label': str(form.fields['full_name'].label),
                    'max_length': form.fields['full_name'].max_length,
                    'required': True
                },
                'email': {
                    'type': 'email',
                    'label': 'Email',
                    'max_length': form.fields['email'].max_length,
                    'required': True
                },
                'phone': {
                    'type': 'text',
                    'label': str(form.fields['phone'].label),
                    'max_length': form.fields['phone'].max_length,
                    'required': True
                },
                'objective': {
                    'type': 'select',
                    'label': str(form.fields['objective'].label),
                    'choices': [
                        {'value': choice[0], 'label': choice[1]}
                        for choice in form.fields['objective'].choices
                    ],
                    'initial': form.fields['objective'].initial,
                    'required': True
                },
                'question_text': {
                    'type': 'textarea',
                    'label': str(form.fields['question_text'].label),
                    'placeholder': form.fields['question_text'].widget.attrs['placeholder'],
                    'rows': form.fields['question_text'].widget.attrs['rows'],
                    'required': True
                },
                'accept': {
                    'type': 'checkbox',
                    'label': 'Accept',
                    'initial': form.fields['accept'].initial,
                    'required': True
                }
            }
        }

        context = {
            "title": "Index Users",
            'price': get_pacage_price(),
            'form_structure': form_structure,
        }
        return JsonResponse(context)

    def post(self, request, *args, **kwargs):
        # Print valid choices for debugging
        temp_form = InformatioinForm()
        print(f"Valid choices for objective field: {[choice[0] for choice in temp_form.fields['objective'].choices]}")
        
        # Print request info for debugging
        print(f"Received form submission method: {request.method}")
        print(f"Content-Type: {request.content_type}")
        
        # Get JSON data if content-type is application/json
        if request.content_type == 'application/json':
            try:
                raw_data = request.body.decode('utf-8')
                print(f"Raw request body: {raw_data}")
                data = json.loads(raw_data)
                print(f"Parsed JSON data: {data}")
                
                # Convert JSON data to form data format
                form_data = {
                    'full_name': data.get('full_name', ''),
                    'email': data.get('email', ''),
                    'phone': data.get('phone', ''),
                    'objective': data.get('objective', ''),
                    'question_text': data.get('question_text', ''),
                    'accept': data.get('accept', False)
                }
                print(f"Form data prepared: {form_data}")
                form = InformatioinForm(form_data)
            except json.JSONDecodeError as e:
                print(f"JSON decode error: {str(e)}")
                return JsonResponse({
                    'status': 'error',
                    'message': 'Invalid JSON data'
                }, status=400)
        else:
            form = InformatioinForm(request.POST)
        
        if form.is_valid():
            response_data = {
                "price": get_pacage_price(),
                'status': 'success',
                'message': 'Formulário válido',
                'data': {
                    'nome_completo': form.cleaned_data['full_name'],
                    'email': form.cleaned_data['email'],
                    'telefone': form.cleaned_data['phone'],
                    'assunto': form.cleaned_data['objective'],
                    'mensagem': form.cleaned_data['question_text'],
                    'aceite': form.cleaned_data['accept']
                }
            }
            
            try:
                send_mail(
                    f"Dia da Mae. email de {form.cleaned_data['email']}",
                    f"""
                    De: {form.cleaned_data['email']}
                    Nome Completo: {form.cleaned_data['full_name']}
                    Telefone: {form.cleaned_data['phone']}
                    Object: {form.cleaned_data['objective']}
                    Mensagem: {form.cleaned_data['question_text']}
                    """,
                    settings.EMAIL_HOST_USER,
                    [settings.RECEPTION_EMAIL],
                    fail_silently=False,
                )
                print("Email sent successfully!")
            except Exception as e:
                print(f"Error sending email: {str(e)}")
                
            # Only try to append to the sheet if it's available
            if sheet is not None:
                try:
                    data = [
                        form.cleaned_data['full_name'],
                        form.cleaned_data['email'],
                        form.cleaned_data['phone'],
                        form.cleaned_data['objective'],
                        form.cleaned_data['question_text'],
                        form.cleaned_data['accept']
                    ]
                    print(f"Attempting to append row to Google Sheet: {data}")
                    sheet.append_row(data)
                    print("Successfully appended row to Google Sheet!")
                except Exception as e:
                    print(f"Error appending to Google Sheet: {str(e)}")
                    
            return JsonResponse(response_data)

        else:
            print(f"Form validation errors: {form.errors}")
            return JsonResponse({
                'status': 'error',
                'message': "Form does not validate.",
                'errors': form.errors.as_json()
            }, status=400)