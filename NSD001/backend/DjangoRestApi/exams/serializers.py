from rest_framework import serializers 
from exams.models import Exam
 
 
class ExamSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = Exam
        fields = ('id',
                'exam_name',
                'status',
                'creator_user_id',
                'created_at',
                'last_modified_at')
