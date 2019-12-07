import graphene
from training.schema import Query as CoursesQuery


class Query(CoursesQuery, graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query)
