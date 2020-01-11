import graphene
from graphene import relay
from graphene_django.types import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField
from .models import Course
from .models import Lesson
from .models import Teacher


class CustomNode(relay.Node):
    """
    need to work with non-encoded IDs
    """

    class Meta:
        name = 'Node'

    @staticmethod
    def to_global_id(type, id):
        # returns a non-encoded ID
        return id

    @staticmethod
    def get_node_from_global_id(info, global_id, only_type=None, **kwargs):
        model = getattr(Query, info.field_name).field_type._meta.model
        return model.objects.get(id=global_id)


class CourseType(DjangoObjectType):
    class Meta:
        model = Course
        filter_fields = {
            'id': ['exact'],
            'title': ['exact', 'icontains', 'istartswith'],
            'description': ['exact', 'icontains', 'istartswith'],
        }
        interfaces = (CustomNode,)


class LessonType(DjangoObjectType):
    class Meta:
        model = Lesson
        filter_fields = {
            'id': ['exact'],
            'title': ['exact', 'icontains', 'istartswith'],
            'description': ['exact', 'icontains', 'istartswith'],
        }
        interfaces = (CustomNode,)


class TeacherType(DjangoObjectType):
    class Meta:
        model = Teacher
        filter_fields = {
            'id': ['exact'],
            'skill_info': ['exact', 'icontains', 'istartswith'],
        }
        interfaces = (CustomNode,)


class Query:
    all_courses = DjangoFilterConnectionField(CourseType)
    all_lessons = DjangoFilterConnectionField(LessonType)
    all_teachers = DjangoFilterConnectionField(TeacherType)

    course = graphene.Field(CourseType, id=graphene.Int(), title=graphene.String())
    lesson = graphene.Field(LessonType, id=graphene.Int(), title=graphene.String())
    teacher = graphene.Field(TeacherType, id=graphene.Int(), name=graphene.String())

    def resolve_course(self, info, **kwargs):
        if 'id' in kwargs:
            return Course.objects.get(id=kwargs['id'])
        if 'title' in kwargs:
            return Course.objects.get(title=kwargs['title'])

    def resolve_lesson(self, info, **kwargs):
        if 'id' in kwargs:
            return Lesson.objects.get(id=kwargs['id'])
        if 'title' in kwargs:
            return Lesson.objects.get(title=kwargs['title'])

    def resolve_teacher(self, info, **kwargs):
        if 'id' in kwargs:
            return Teacher.objects.get(id=kwargs['id'])
