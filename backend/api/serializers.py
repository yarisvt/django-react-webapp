from rest_framework import serializers
from .models import (
    Capital,
    Capitalalias,
    Continent,
    Country,
    Countryalias,
    Countrycontinent,
    Game,
    GameInformation,
    GameType,
)


class CapitalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Capital
        fields = (
            "id",
            "name",
            "country_id",
        )


class CapitalAliasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Capitalalias
        fields = (
            "id",
            "alias",
            "capital_id",
        )


class ContinentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Continent
        fields = (
            "id",
            "name",
        )


class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = (
            "id",
            "name",
            "population_size",
            "area",
            "country_code",
        )


class CountryAliasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Countryalias
        fields = (
            "id",
            "alias",
            "country_id",
        )


class CountryContinentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Countrycontinent
        fields = (
            "id",
            "country_id",
            "continent_id",
        )


class GameTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = GameType
        fields = ("id", "game_type")


class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = ("id", "title", "subtitle", "image_source", "url_to", "gametype_id")


class GameInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = GameInformation
        fields = (
            "id",
            "select_country",
            "select_country_aliases",
            "select_capitals",
            "select_capitals_aliases",
            "select_population",
            "select_area",
            "select_flag",
            "label",
            "stat_extra",
            "game_id",
        )
