from rest_framework import serializers
from .models import Gameinformation


class CapitalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gameinformation
        fields = (
            "id",
            "name",
            "country_id",
        )


class CapitalAliasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gameinformation
        fields = (
            "id",
            "alias",
            "capital_id",
        )


class ContinentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gameinformation
        fields = (
            "id",
            "name",
        )


class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Gameinformation
        fields = (
            "id",
            "name",
            "population_size",
            "area",
            "country_code",
        )


class CountryAliasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gameinformation
        fields = (
            "id",
            "alias",
            "country_id",
        )


class CountryContinentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gameinformation
        fields = (
            "id",
            "country_id",
            "continent_id",
        )


class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gameinformation
        fields = (
            "id",
            "title",
            "subtitle",
            "image_source",
            "url_to",
        )


class GameInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gameinformation
        fields = (
            "id",
            "select_country",
            "select_country_aliases",
            "select_capitals",
            "select_capitals_aliases",
            "select_population",
            "select_area",
            "select_flag",
            "more_or_less",
            "name_it",
            "game_id",
        )
