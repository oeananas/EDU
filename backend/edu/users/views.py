import json
from django.contrib.auth import get_user_model
from django.db.models import (
    F,
    Count,
    Q
)
from django.http import HttpResponse

from .models import (
    Teacher,
    Student
)
from .serializers import (
    UserSerializer,
    TeacherSerializer,
    StudentSerializer
)
from rest_framework import viewsets
from utils.view_set_utils import get_custom_list

User = get_user_model()


def is_teacher(request):
    data = json.loads(request.body)
    username = data.get('username')
    flag = False
    if Teacher.objects.filter(user__username=username).exists():
        flag = True
    data = {
        'is_teacher': flag
    }
    return HttpResponse(json.dumps(data))


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """

    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer


class TeacherViewSet(viewsets.ModelViewSet):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer

    def course_list(self, request, *args, **kwargs):
        queryset = Teacher.objects\
            .filter(courses=kwargs['pk'])\
            .annotate(
                first_name=F('user__first_name'),
                last_name=F('user__last_name'),
                username=F('user__username'),
                email=F('user__email'),
            )
        return get_custom_list(self, queryset)


class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

    def students_progress_list(self, request, *args, **kwargs):
        queryset = Student.objects\
            .filter(courses__teachers__user=request.user.pk)\
            .annotate(
                first_name=F('user__first_name'),
                last_name=F('user__last_name'),
                username=F('user__username'),
                email=F('user__email'),
                all_homework=Count('home_works'),
                ready_homework=Count('home_works', filter=Q(home_works__is_ready=True)),
                done_homework=Count('home_works', filter=Q(home_works__is_done=True)),
            )
        return get_custom_list(self, queryset)
