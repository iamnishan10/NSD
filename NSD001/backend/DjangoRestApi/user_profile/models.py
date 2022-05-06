from django.db import models
import django.db.models.deletion

class UserProfile(models.Model):
    TTL_GENDER = (
        (0, 'Not Chosen'),
        (1, 'Male'),
        (2, 'Female'),
        (3, 'Others')
    )
    id = models.AutoField(primary_key=True, auto_created=True)
    user_id = models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_profile', to='users.User')
    full_name = models.CharField(max_length=100,blank=False, default='')
    d_o_b = models.DateField(default='')
    nationality = models.CharField(max_length=100,blank=False, default='')
    native_language = models.CharField(max_length=100,blank=False, default='')
    country = models.CharField(max_length=100,blank=False, default='')
    gender = models.SmallIntegerField(choices=TTL_GENDER, default=0)
    kor_lang_proficiency = models.CharField(max_length=100,blank=False, default='')
    study_period = models.IntegerField(blank=False, default='')
    stay_period_kor = models.IntegerField(blank=False, default='')
    study_purpose = models.CharField(max_length=100,blank=False, default='')
    study_method = models.CharField(max_length=100,blank=False, default='')
    self_assessment_level = models.CharField(max_length=100,blank=False, default='')
    topik_level = models.CharField(max_length=100,blank=False, default='')
    score = models.IntegerField(blank=False, default='')
    organization = models.CharField(max_length=100,blank=False, default='')
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    last_modified_at = models.DateTimeField(auto_now=True, editable=False)