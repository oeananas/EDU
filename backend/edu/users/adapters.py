from django.contrib.sites.shortcuts import get_current_site
from allauth.account.adapter import DefaultAccountAdapter


class AccountAdapter(DefaultAccountAdapter):

    def get_email_confirmation_url(self, request, email_confirmation):
        current_site = get_current_site(request)
        return '{}/account/confirm-email/{}/'.format(current_site, email_confirmation.key)
