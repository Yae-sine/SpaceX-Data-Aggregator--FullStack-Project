# Generated by Django 5.1.3 on 2025-04-20 00:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('SpaceDevData', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='launch',
            name='video_url',
            field=models.URLField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='launch',
            name='wikipedia_url',
            field=models.URLField(blank=True, null=True),
        ),
    ]
