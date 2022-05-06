from django.db import migrations, models
import django.db.models.deletion


class Question(models.Model):
    TTL_STATUS = (
        (0, 'Inactive'),
        (1, 'Active'),
    )
    id = models.AutoField(primary_key=True, auto_created=True)
    exam_id = models.ForeignKey(
        on_delete=django.db.models.deletion.CASCADE, related_name='questions_1', to='exams.Exam')
    creator_user_id = models.ForeignKey(
        on_delete=django.db.models.deletion.CASCADE, related_name='questions_2', to='users.User')
    question_text = models.CharField(max_length=200, blank=False, default='')
    question_type = models.CharField(max_length=100, blank=False, default='')
    question_level = models.CharField(max_length=100, blank=False, default='')
    question_category = models.CharField(
        max_length=100, blank=False, default='')
    status = models.SmallIntegerField(choices=TTL_STATUS, default=0)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    last_modified_at = models.DateTimeField(auto_now=True, editable=False)
