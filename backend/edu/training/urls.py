from django.urls import path

from . import views

urlpatterns = [
    path('courses/', views.CourseViewSet.as_view({'get': 'list'}), name='courses'),
    path('my-courses/', views.CourseViewSet.as_view({'get': 'student_list'}), name='my_courses'),
    path('add-course-user/<int:pk>/', views.CourseViewSet.as_view({'patch': 'user_add'}), name='add_course_user'),
    path('remove-course-user/<int:pk>/', views.CourseViewSet.as_view({'patch': 'user_remove'}),
         name='remove_course_user'),
    path('lessons/course/<int:pk>/', views.LessonViewSet.as_view({'get': 'course_list'}), name='course_lessons'),
    path('my-homework/course/<int:pk>/', views.HomeworkViewSet.as_view({'get': 'homework_list'}), name='my_homeworks'),
    path('my-homework/<int:pk>/', views.HomeworkViewSet.as_view({'get': 'retrieve',
                                                                 'patch': 'partial_update'}), name='my_homework')
]
