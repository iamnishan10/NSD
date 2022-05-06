from django.shortcuts import render
from rest_framework.decorators import api_view
from django.http import JsonResponse
from rest_framework import status
from recordings.models import Recording
from recordings.serializers import RecordingSerializer
from questions.models import Question
from questions.serializers import QuestionSerializer

@api_view(['GET', 'POST'])
def record(request):
    if request.method == 'GET':
        questions = Question.object.all()
        title = request.query.params.get('title', None)
        if title is not None:
            question = questions.filter(title, contains=title)

        questions_serializer = QuestionSerializer(questions, many=True)
        return JsonResponse(questions_serializer.data, safe=False)

    else:
        return JsonResponse('', safe=False)
        #tutorials = Recording.objects.all()
        
        #title = request.query_params.get('title', None)
        #if title is not None:
            #users = users.filter(title__icontains=title)
        
        #users_serializer = UserSerializer(users, many=True)
        #return JsonResponse(users_serializer.data, safe=False)
        #return JsonResponse('')