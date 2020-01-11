from django.urls import path
from django.views.decorators.csrf import csrf_exempt

from . import views

urlpatterns = [
    path('is-teacher/', csrf_exempt(views.is_teacher), name='is_teacher'),
    path('teachers/course/<int:pk>/', views.TeacherViewSet.as_view({'get': 'course_list'}), name='course_teachers'),
    path('teachers/<int:pk>/', views.TeacherViewSet.as_view({'get': 'retrieve'}), name='teacher'),
    path('progress/', views.StudentViewSet.as_view({'get': 'students_progress_list'}), name='progress'),
]
