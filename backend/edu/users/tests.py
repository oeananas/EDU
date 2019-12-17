from django.urls import reverse
from rest_framework import status
from rest_framework.test import (
    APIClient,
    APITestCase
)
from django.contrib.auth.models import User
import factory


class TestUser(APITestCase):

    class UserFactory(factory.Factory):
        class Meta:
            model = User

        id = 1
        username = 'JohnDoe'
        first_name = 'John'
        last_name = 'Doe'
        email = 'test@test.com'
        password = 'AbcDe12345678'

    def setUp(self):
        self.client = APIClient()
        self.user = self.UserFactory.create()

        data = {
            'username': self.user.username,
            'password1': self.user.password,
            'password2': self.user.password,
        }
        res = self.client.post(reverse('rest_register'), data=data)
        self.token = res.get('token')

    def tearDown(self):
        self.user.delete()

    def test_create_user(self):
        self.assertEqual(self.user.username, 'JohnDoe')
        self.assertEqual(self.user.first_name, 'John')
        self.assertEqual(self.user.last_name, 'Doe')
        self.assertEqual(self.user.password, 'AbcDe12345678')

    def test_register_new_user(self):
        client = APIClient()
        data = {
            'username': f'{self.user.username}-username',
            'password1': f'{self.user.password}-password',
            'password2': f'{self.user.password}-password'
        }

        res = client.post(reverse('rest_register'), data=data)
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)

    def test_negative_register_already_exists_user(self):
        client = APIClient()
        data = {
            'username': self.user.username,
            'password1': self.user.password,
            'password2': self.user.password
        }

        res = client.post(reverse('rest_register'), data=data)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_negative_register_new_user_without_required_fields(self):
        client = APIClient()
        data = {
            'username': self.user.username,
            'password1': self.user.password,
        }

        res = client.post(reverse('rest_register'), data=data)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_negative_register_new_user_with_invalid_data(self):
        client = APIClient()
        data = {
            'username': self.user.username,
            'password1': self.user.password,
            'password2': 'another_user_pass'
        }

        res = client.post(reverse('rest_register'), data=data)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_negative_register_new_user_with_too_big_data_values(self):
        client = APIClient()
        data = {
            'username': 100 * self.user.username,
            'password1': self.user.password,
            'password2': self.user.password
        }

        res = client.post(reverse('rest_register'), data=data)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_negative_login_user_with_invalid_password(self):
        client = APIClient()
        data = {
            'username': self.user.username,
            'password': '1'
        }
        res = client.post(reverse('rest_login'), data=data)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_negative_login_user_with_invalid_username(self):
        client = APIClient()
        data = {
            'username': 'hello world',
            'password': 'admin_pass'
        }
        res = client.post(reverse('rest_login'), data=data)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
