from rest_framework import serializers

from .models import Course
from .models import Lesson
from .models import Homework


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'


class LessonSerializer(serializers.ModelSerializer):
    start_dt = serializers.DateTimeField(format="%d.%m.%Y %H:%M")
    teacher_first_name = serializers.CharField(required=False)
    teacher_last_name = serializers.CharField(required=False)
    teacher_username = serializers.CharField(required=False)

    class Meta:
        model = Lesson
        fields = '__all__'


class HomeworkSerializer(serializers.ModelSerializer):
    lesson_name = serializers.CharField(required=False)

    class Meta:
        model = Homework
        fields = '__all__'
