from datetime import timedelta

from celery.task import periodic_task
from django.conf import settings
from django.core.mail import send_mail


@periodic_task(run_every=timedelta(minutes=10))
def send_mail_task():
    send_mail(
        subject='subject',
        message='Hello from CELERY!!!',
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=['otus_test@test.ru'],
        fail_silently=False,
    )
