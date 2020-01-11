from django.contrib import admin
from .models import Course
from .models import Lesson
from .models import Homework


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    pass


@admin.register(Lesson)
class LessonAdmin(admin.ModelAdmin):
    pass


@admin.register(Homework)
class HomeworkAdmin(admin.ModelAdmin):
    pass
