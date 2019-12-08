from django.urls import reverse
from rest_framework import status
from rest_framework.test import (
    APIClient,
    APITestCase
)
from rest_framework.authtoken.models import Token
import json
from django.contrib.auth.models import User
from .models import (
    Course,
    Teacher
)


class TestTraining(APITestCase):

    def setUp(self):
        # create API client and set "Authorization" header with token
        self.client = APIClient()
        data = {
            'username': 'admin',
            'password1': 'admin_pass',
            'password2': 'admin_pass'
        }
        self.register_res = self.client.post(reverse('rest_register'), data=data)
        self.user_data = self.register_res.data['user']
        self.user = User.objects.get(**self.user_data)
        self.token = self.register_res.data['token']
        self.client.credentials(HTTP_AUTHORIZATION=f'JWT {self.token}')

        self.course = Course.objects.create(
            title='title',
            description='description',
            price=1000
        )

        self.teacher = Teacher.objects.create(
            name='name',
            age=30,
            skill_info='skill_info'
        )

    def tearDown(self):
        self.user.delete()
        self.course.delete()
        self.teacher.delete()

    def test_get_courses(self):
        res = self.client.get(reverse('courses'))
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_get_my_courses(self):
        res = self.client.get(reverse('my_courses'))
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_get_lessons(self):
        res = self.client.get(reverse('course_lessons', kwargs={'pk': self.course.pk}))
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_get_course_teachers(self):
        res = self.client.get(reverse('course_teachers', kwargs={'pk': self.course.pk}))
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_get_teachers(self):
        res = self.client.get(reverse('teacher', kwargs={'pk': self.teacher.pk}))
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_get_homework(self):
        res = self.client.get(reverse('my_homework', kwargs={'pk': self.course.pk}))
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_add_remove_course_to_user_courses(self):
        res = self.client.patch(reverse('add_course_user', kwargs={'pk': self.course.pk}))
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertTrue(self.user.courses.filter(pk=self.course.pk).exists())

        res = self.client.patch(reverse('remove_course_user', kwargs={'pk': self.course.pk}))
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertFalse(self.user.courses.filter(pk=self.course.pk).exists())
