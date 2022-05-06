from django.db import models
import django.db.models.deletion


class Exam(models.Model):
    TTL_STATUS = (
        (0, 'Inactive'),
        (1, 'Active'),
    )
    id = models.AutoField(primary_key=True, auto_created=True)
    exam_name = models.CharField(max_length=100)
    status = models.SmallIntegerField(choices=TTL_STATUS, default=0)
    creator_user_id = models.ForeignKey(
        on_delete=django.db.models.deletion.CASCADE, related_name='exams', to='users.User'),
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    last_modified_at = models.DateTimeField(auto_now=True, editable=False)
