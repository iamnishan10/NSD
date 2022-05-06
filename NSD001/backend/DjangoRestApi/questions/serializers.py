from rest_framework import serializers 
from questions.models import Question
 
 
class QuestionSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = Question
        fields = ('id',
                'exam_id',
                'creator_user_id',
                'question_text',
                'question_type',
                'question_level',
                'question_category',
                'status',
                'created_at',
                'last_modified_at')
