from django.contrib import auth
from django.db import models



class SavedSpaceDevLaunch(models.Model):
    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['user', 'launch'], name='unique_user_spaceDevLaunch')
        ]

    user = models.ForeignKey('auth.User', on_delete=models.CASCADE, related_name='saved_spaceDev_launches')
    launch = models.ForeignKey('SpaceDevData.Launch', on_delete=models.CASCADE, related_name='saved_SpaceDev_by_users')
    saved_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.launch.name}"
