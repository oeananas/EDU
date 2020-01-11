from rest_auth.serializers import UserDetailsSerializer
from .models import (
    Teacher,
    Student
)
from rest_framework import serializers


class UserSerializer(UserDetailsSerializer):

    class Meta(UserDetailsSerializer.Meta):
        fields = UserDetailsSerializer.Meta.fields


class TeacherSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(required=False)
    last_name = serializers.CharField(required=False)
    username = serializers.CharField(required=False)
    email = serializers.CharField(required=False)

    class Meta:
        model = Teacher
        fields = '__all__'


class StudentSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(required=False)
    last_name = serializers.CharField(required=False)
    username = serializers.CharField(required=False)
    email = serializers.CharField(required=False)
    all_homework = serializers.CharField(required=False)
    ready_homework = serializers.CharField(required=False)
    done_homework = serializers.CharField(required=False)

    class Meta:
        model = Student
        fields = '__all__'
