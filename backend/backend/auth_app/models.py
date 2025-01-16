from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _


class User(AbstractUser):
    """Custom User model for authentication."""
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    email = models.EmailField(unique=True)
    profile_picture = models.URLField(blank=True, null=True)

    def __str__(self):
        return f"{self.username} ({self.role or 'No role'})"
