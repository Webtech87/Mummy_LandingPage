from datetime import datetime
from django.views import View
from django.shortcuts import render
from .forms import InformatioinForm
from django.http import JsonResponse


def get_date_today():
    return datetime.today().date()

def get_pacage_price():
    if get_date_today() < datetime(2025, 5, 6).date():
        return [89900, 99900]
    elif ((get_date_today() > datetime(2025, 5, 5).date())
          and
          (get_date_today() < datetime(2025, 5, 12).date())) :
        return [99900, 109900]
    else:
        return 109900



class IndexView(View):



    template_name = 'index.html'

    def get(self, request, *args, **kwargs):
        get_date_today()
        form = InformatioinForm()
        context = {
            "title": "Index Users",
            'form': form,
            'price': get_pacage_price(),
        }
        return render(request, self.template_name,  context)

    def post(self, request, *args, **kwargs):
            form = InformatioinForm(request.POST)
            if form.is_valid():
                print("form is valid")
                data = {
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
                return JsonResponse(data)

            else:
                return JsonResponse({
                    'status': 'error',
                    'message': "Form does not valide.",
                    'errors': form.errors
                }, status=400)

