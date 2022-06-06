# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Capital(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=50)
    country = models.ForeignKey("country", models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = "capital"


class Capitalalias(models.Model):
    id = models.IntegerField(primary_key=True)
    alias = models.CharField(max_length=50)
    capital = models.ForeignKey(Capital, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = "capitalalias"


class Continent(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=50)

    class Meta:
        managed = False
        db_table = "continent"


class Country(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=50)
    population_size = models.IntegerField()
    area = models.IntegerField()
    country_code = models.CharField(max_length=2)

    class Meta:
        managed = False
        db_table = "country"


class Countryalias(models.Model):
    id = models.IntegerField(primary_key=True)
    alias = models.CharField(max_length=50)
    country = models.ForeignKey(Country, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = "countryalias"


class Countrycontinent(models.Model):
    id = models.IntegerField(primary_key=True)
    country_id = models.IntegerField()
    continent_id = models.IntegerField()

    class Meta:
        managed = False
        db_table = "countrycontinent"


class GameType(models.Model):
    id = models.IntegerField(primary_key=True)
    game_type = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = "gametype"


class Game(models.Model):
    id = models.IntegerField(primary_key=True)
    title = models.CharField(max_length=100)
    subtitle = models.CharField(max_length=1000)
    image_source = models.CharField(max_length=100)
    url_to = models.CharField(max_length=100)
    gametype = models.ForeignKey(GameType, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = "game"


class GameInformation(models.Model):
    id = models.IntegerField(primary_key=True)
    select_country = models.IntegerField()
    select_country_aliases = models.IntegerField()
    select_capitals = models.IntegerField()
    select_capitals_aliases = models.IntegerField()
    select_population = models.IntegerField()
    select_area = models.IntegerField()
    select_flag = models.IntegerField()
    label = models.CharField(max_length=100)
    stat_extra = models.CharField(max_length=100)
    game = models.ForeignKey(Game, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = "gameinformation"
