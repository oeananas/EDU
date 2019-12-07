from django.db.models import F
from rest_framework import viewsets
from rest_framework.response import Response
from .models import Course
from .models import Lesson
from .models import Teacher
from .models import Homework
from .serializers import CourseSerializer
from .serializers import LessonSerializer
from .serializers import TeacherSerializer
from .serializers import HomeworkSerializer


def get_custom_list(self, queryset):
    page = self.paginate_queryset(queryset)
    if page is not None:
        serializer = self.get_serializer(page, many=True)
        return self.get_paginated_response(serializer.data)

    serializer = self.get_serializer(queryset, many=True)
    return Response(serializer.data)


class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

    def patch_data(self, request, data, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)

    def user_add(self, request, *args, **kwargs):
        data = {
            'students': [request.user.pk]
        }
        return self.patch_data(request, data, *args, **kwargs)

    def user_remove(self, request, *args, **kwargs):
        data = {
            'students': [user for user in self.get_object().students.exclude(pk=request.user.pk)]
        }
        return self.patch_data(request, data, *args, **kwargs)

    def student_list(self, request, *args, **kwargs):
        queryset = Course.objects.filter(students=request.user.pk)
        return get_custom_list(self, queryset)


class LessonViewSet(viewsets.ModelViewSet):
    queryset = Lesson.objects.all()
    serializer_class = LessonSerializer

    def course_list(self, request, *args, **kwargs):
        queryset = Lesson.objects \
            .select_related('teacher')\
            .filter(course_id=kwargs['pk']) \
            .annotate(teacher_name=F('teacher__name'))
        return get_custom_list(self, queryset)


class TeacherViewSet(viewsets.ModelViewSet):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer

    def course_list(self, request, *args, **kwargs):
        queryset = Teacher.objects.filter(courses=kwargs['pk'])
        return get_custom_list(self, queryset)


class HomeworkViewSet(viewsets.ModelViewSet):
    queryset = Homework.objects.all()
    serializer_class = HomeworkSerializer

    def homework_list(self, request, *args, **kwargs):
        queryset = Homework.objects\
            .select_related('lesson')\
            .filter(student=request.user, lesson__course_id=kwargs['pk'])\
            .annotate(lesson_name=F('lesson__title'))
        return get_custom_list(self, queryset)
