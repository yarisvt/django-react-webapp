from rest_framework import serializers
from .models import Gameinformation


class AliasesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gameinformation
        fields = (
            "alias",
            "country_id",
        )


class CapitalsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gameinformation
        fields = (
            "name",
            "country_id",
        )


class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Gameinformation
        fields = (
            "name",
            "population_size",
            "area",
            "country_code",
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
            "select_country",
            "select_capitals",
            "select_population",
            "select_area",
            "select_flag",
            "game_id",
        )
