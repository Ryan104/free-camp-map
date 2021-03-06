# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2017-12-02 18:00
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Campsite',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('lat', models.FloatField()),
                ('lng', models.FloatField()),
                ('description', models.TextField(help_text='Enter a description of the site', max_length=2000)),
                ('directions', models.TextField(help_text='Give detailed directions to the site', max_length=2000)),
                ('created_at', models.DateField(auto_now_add=True)),
                ('updated_at', models.DateField(blank=True, null=True)),
                ('pos_verify', models.IntegerField(default=0, verbose_name='Positive Verifications')),
                ('neg_verify', models.IntegerField(default=0, verbose_name='Negative Verifications')),
                ('creator', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='user_creator', to=settings.AUTH_USER_MODEL)),
                ('edited_by', models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='user_editor', to=settings.AUTH_USER_MODEL)),
                ('favorited_by', models.ManyToManyField(related_name='users_favorited', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
