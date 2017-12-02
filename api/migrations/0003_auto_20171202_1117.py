# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2017-12-02 18:17
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_auto_20171202_1113'),
    ]

    operations = [
        migrations.AlterField(
            model_name='campsite',
            name='edited_by',
            field=models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='user_editor', to=settings.AUTH_USER_MODEL),
        ),
    ]
