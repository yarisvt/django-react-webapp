from typing import Any
from django.http import JsonResponse
from rest_framework import status
from django.core import serializers
from .models import Country, Game, Gameinformation
from .serializers import GameInfoSerializer, GameSerializer
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.


class AllGamesView(APIView):
    serializer_class = GameSerializer

    def get(self, request):
        games = Game.objects.all()

        data_to_return = []
        for game in games:
            data_to_return.append(
                {
                    "title": game.title,
                    "subtitle": game.subtitle,
                    "imageSource": game.image_source,
                    "urlTo": game.url_to,
                    "id": game.id,
                }
            )
        return Response(data_to_return, status=status.HTTP_200_OK)


class GameInfoView(APIView):
    serializer_class = GameInfoSerializer
    lookup_url_kwarg = "game-id"

    def get(self, request):
        game_id = request.GET.get(self.lookup_url_kwarg)
        if game_id is None:
            return Response(
                {"Bad Request": "'game-id' not found in URL parameters"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        game_information = Gameinformation.objects.filter(id=game_id)
        if len(game_information) < 1:
            return Response(
                {"Game not found": "Invalid game id code"},
                status=status.HTTP_404_NOT_FOUND,
            )

        game_info_data = GameInfoSerializer(game_information[0]).data

        data_to_return: dict[str, Any] = {"data": []}

        if game_info_data["select_area"] == 1:
            data_to_return["gameType"] = "area"
        elif game_info_data["select_population"] == 1:
            data_to_return["gameType"] = "population"

        for country in Country.objects.all():
            country_data = {"country": country.name}
            # country_aliases = list(country.aliases.values_list("alias", flat=True))
            # country_data["aliases"] = country_aliases
            if game_info_data["select_capitals"] == 1:
                capital_names = list(country.capitals.values_list("name", flat=True))
                country_data["capitals"] = capital_names
            if game_info_data["select_population"] == 1:
                country_data["stat"] = country.population_size
            elif game_info_data["select_area"] == 1:
                country_data["stat"] = country.area
            if game_info_data["select_flag"] == 1:
                country_data["countryCode"] = country.country_code
            data_to_return["data"].append(country_data)

        return Response(data_to_return, status=status.HTTP_200_OK)
