from django.contrib.auth.models import User
from django.db import models


class Teacher(models.Model):
    name = models.CharField(max_length=100)
    age = models.PositiveIntegerField()
    skill_info = models.TextField()

    objects = models.Manager()

    def __str__(self):
        return self.name


class Course(models.Model):
    is_active = models.BooleanField(default=True)
    title = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    teachers = models.ManyToManyField(Teacher, related_name='courses', default=[])
    students = models.ManyToManyField(User, related_name='courses', blank=True, default=[])

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
    student = models.ForeignKey(User, related_name='home_works', on_delete=models.CASCADE)
    lesson = models.ForeignKey(Lesson, related_name='home_works', on_delete=models.CASCADE)
    is_done = models.BooleanField(default=False)

    objects = models.Manager()

    def __str__(self):
        return f'Homework {self.lesson} ({self.student})'
