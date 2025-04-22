from django.views import View
from django.shortcuts import render
from .forms import InformatioinForm
from django.http import JsonResponse


class IndexView(View):

    template_name = 'index.html'

    def get(self, request, *args, **kwargs):
        form = InformatioinForm()
        context = {
            "title": "Index Users",
            'form': form
        }
        return render(request, self.template_name,  context)

    def post(self, request, *args, **kwargs):
            form = InformatioinForm(request.POST)
            if form.is_valid():
                print("form is valid")
                data = {
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

