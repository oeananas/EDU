from django.db.models import F
from rest_framework import viewsets

from users.models import Student
from .models import (
    Course,
    Lesson,
    Homework
)
from .serializers import (
    CourseSerializer,
    LessonSerializer,
    HomeworkSerializer
)
from utils.view_set_utils import (
    get_custom_list,
    patch_data
)


class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

    def user_add(self, request, *args, **kwargs):
        student = Student.objects.get(user=request.user.id)
        data = {
            'students': [student.id]
        }
        return patch_data(self, request, data, *args, **kwargs)

    def user_remove(self, request, *args, **kwargs):
        data = {
            'students': [student for student in self.get_object().students.exclude(user=request.user.pk)]
        }
        return patch_data(self, request, data, *args, **kwargs)

    def student_list(self, request, *args, **kwargs):
        queryset = Course.objects.filter(students__user=request.user.id)
        return get_custom_list(self, queryset)


class LessonViewSet(viewsets.ModelViewSet):
    queryset = Lesson.objects.all()
    serializer_class = LessonSerializer

    def course_list(self, request, *args, **kwargs):
        queryset = Lesson.objects \
            .select_related('teacher')\
            .filter(course_id=kwargs['pk']) \
            .annotate(
                teacher_first_name=F('teacher__user__first_name'),
                teacher_last_name=F('teacher__user__last_name'),
                teacher_username=F('teacher__user__username')
            )
        return get_custom_list(self, queryset)


class HomeworkViewSet(viewsets.ModelViewSet):
    queryset = Homework.objects.all()
    serializer_class = HomeworkSerializer

    def course_homework_list(self, request, *args, **kwargs):
        queryset = Homework.objects\
            .select_related('lesson')\
            .filter(student__user=request.user.pk, lesson__course_id=kwargs['pk'])\
            .annotate(lesson_name=F('lesson__title'))
        return get_custom_list(self, queryset)

    def student_homework_list(self, request, *args, **kwargs):
        queryset = Homework.objects\
            .select_related('lesson')\
            .filter(lesson__teacher__user=request.user.pk, student=kwargs['pk'])\
            .annotate(lesson_name=F('lesson__title'))
        return get_custom_list(self, queryset)

    def set_done_homework(self, request, *args, **kwargs):
        data = {
            'is_done': True
        }
        return patch_data(self, request, data, *args, **kwargs)
