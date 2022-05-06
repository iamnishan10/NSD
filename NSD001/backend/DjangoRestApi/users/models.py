from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    TTL_SUPERUSER = (
        (0, 'No'),
        (1, 'Yes'),
    )

    TTL_ACTIVE = (
        (0, 'Inactive'),
        (1, 'Active'),
    )

    TTL_SIGNED = (
        (0, 'No'),
        (1, 'Yes'),
    )
    id = models.AutoField(primary_key=True, auto_created=True)
    username = models.CharField(max_length=100,unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    email = models.EmailField(unique=True)
    contract_signed  = models.SmallIntegerField(choices=TTL_SIGNED, default=0)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    last_modified_at = models.DateTimeField(auto_now=True, editable=False)