from django.db import models
import django.db.models.deletion

class Recording(models.Model):
    TTL_SUBMISSION = (
        (0, 'No'),
        (1, 'Yes'),
    )
    id = models.AutoField(primary_key=True, auto_created=True)
    exam_id = models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='recordings_1', to='exams.Exam'),
    question_id = models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='recordings_2', to='questions.Question'),
    user_id = models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='recordings_3', to='users.User'),
    device = models.CharField(max_length=100,blank=False, default='')
    recording_start_time = models.TimeField(auto_now_add=True, editable=False)
    recording_end_time = models.TimeField(auto_now_add=True, editable=False)
    filename = models.CharField(max_length=200,blank=False, default='')
    final_submission = models.SmallIntegerField(choices=TTL_SUBMISSION, default=0)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    last_modified_at = models.DateTimeField(auto_now=True, editable=False)
