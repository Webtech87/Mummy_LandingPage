from django import forms
from django.db import models
from django.utils.translation import gettext_lazy as _

class Objects(models.TextChoices):
    select= "Select", _("Select")
    amount_payment = 'Amount/Payments', _('Amount/Payments')
    procedures = 'Procedures', _('Procedures')
    questions = 'Questions', _('Questions')




class InformatioinForm(forms.Form):

    full_name = forms.CharField(
        label=_("Nome completo"),
        max_length=100
    )

    email = forms.EmailField(max_length=100)

    phone = forms.CharField(
        label=_("Telefone"),
        max_length=100
    )

    objective = forms.ChoiceField(
        label=("Assunto"),
        choices=Objects.choices,
        initial=Objects.select,
    )

    question_text = forms.CharField(
    label="Mensagem",
    widget=forms.Textarea(attrs={
        'rows': 10,
        'placeholder': _("Digite sua mensagem aqui")
    })
)


    accept=forms.BooleanField(
        initial=False, required=True
    )

