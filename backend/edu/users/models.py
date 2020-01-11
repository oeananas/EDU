from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()


class Teacher(models.Model):
    user = models.OneToOneField(User, related_name='teacher', on_delete=models.CASCADE)
    age = models.PositiveIntegerField()
    skill_info = models.TextField()

    objects = models.Manager()

    def __str__(self):
        return self.user.username


class Student(models.Model):
    user = models.OneToOneField(User, related_name='student', on_delete=models.CASCADE)
    age = models.PositiveIntegerField(blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    phone = models.CharField(max_length=100, blank=True, null=True)

    objects = models.Manager()

    def __str__(self):
        return self.user.username
