from datetime import datetime
import os
from django.conf import settings
from django.views import View
from django.shortcuts import render
from .forms import InformatioinForm
from django.http import JsonResponse
from django.core.mail import send_mail
import gspread
from oauth2client.service_account import ServiceAccountCredentials
import json

'''
print("Verificando credenciais...")
try:
    with open(settings.CREDENTIALS_FILE) as f:
        creds_json = json.load(f)
        service_account_email = creds_json.get('client_email')
        print(f"Email da conta de serviço: {service_account_email}")
except Exception as e:
    print(f"Erro ao ler credenciais: {str(e)}")

'''


def get_date_today():
    return datetime.today().date()


def get_pacage_price():
    if get_date_today() < datetime(2025, 5, 6).date():
        return [899, 999]
    elif ((get_date_today() > datetime(2025, 5, 5).date())
          and
          (get_date_today() < datetime(2025, 5, 12).date())):
        return [999, 1099]
    else:
        return [1099]


CREDENTIALS_FILE = settings.CREDENTIALS_FILE

SCOPES = [
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/drive',
]

SAMPLE_SPREADSHEET_ID = os.environ.get('GOOGLE_SHEET_ID')

credentials = ServiceAccountCredentials.from_json_keyfile_name(CREDENTIALS_FILE, SCOPES)

client = gspread.authorize(credentials)

google_sheet = client.open_by_key(SAMPLE_SPREADSHEET_ID)

sheet = google_sheet.get_worksheet(0)


class IndexView(View):
    template_name = 'index.html'

    def get(self, request, *args, **kwargs):
        get_date_today()
        form = InformatioinForm()

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
            data = [
                form.cleaned_data['full_name'],
                form.cleaned_data['email'],
                form.cleaned_data['phone'],
                form.cleaned_data['objective'],
                form.cleaned_data['question_text'],
                form.cleaned_data['accept']
            ]
            sheet.append_row(data)
            return JsonResponse(response_data)

        else:
            return JsonResponse({
                'status': 'error',
                'message': "Form does not valide.",
                'errors': form.errors
            }, status=400)
