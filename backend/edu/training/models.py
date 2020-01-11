from django.contrib.auth.models import User
from users.models import (
    Teacher,
    Student
)
from django.db import models


class Course(models.Model):
    is_active = models.BooleanField(default=True)
    title = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    teachers = models.ManyToManyField(Teacher, related_name='courses', default=[])
    students = models.ManyToManyField(Student, related_name='courses', blank=True, default=[])

    objects = models.Manager()

    def __str__(self):
        return self.title


class Lesson(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    teacher = models.ForeignKey(Teacher, related_name='lessons', on_delete=models.CASCADE)
    course = models.ForeignKey(Course, related_name='lessons', on_delete=models.CASCADE)
    start_dt = models.DateTimeField(blank=True)

    objects = models.Manager()

    def __str__(self):
        return self.title

    class Meta:
        ordering = ('start_dt',)


class Homework(models.Model):
    student = models.ForeignKey(Student, related_name='home_works', on_delete=models.CASCADE)
    description = models.TextField(blank=True, null=True)
    solution = models.TextField(blank=True, null=True)
    lesson = models.ForeignKey(Lesson, related_name='home_works', on_delete=models.CASCADE)
    is_done = models.BooleanField(default=False)
    is_ready = models.BooleanField(default=False)

    objects = models.Manager()

    def __str__(self):
        return f'Homework {self.lesson} ({self.student})'

    def save(self, *args, **kwargs):
        if self.solution:
            self.is_ready = True
        else:
            self.is_ready = False
        super().save(*args, **kwargs)
