from typing import Any
from rest_framework import status
from .models import (
    Capital,
    Capitalalias,
    Country,
    Countryalias,
    Game,
    GameInformation,
    GameType,
)
from .serializers import GameInfoSerializer, GameSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db import connection


# Create your views here.


class AllGamesView(APIView):
    serializer_class = GameSerializer

    def get(self, _):
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
                    "gameType": GameType.objects.get(id=game.gametype_id).game_type,
                }
            )
        return Response(data_to_return, status=status.HTTP_200_OK)


class GameInfoView(APIView):
    serializer_class = GameInfoSerializer
    lookup_url_kwarg = "game-id"
    print("=========================================QUERY", connection.queries)

    def get(self, request):
        game_id = request.GET.get(self.lookup_url_kwarg)
        if game_id is None:
            return Response(
                {"Bad Request": "'game-id' not found in URL parameters"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        game_information = GameInformation.objects.filter(id=game_id)
        if len(game_information) < 1:
            return Response(
                {"Game not found": "Invalid game id code"},
                status=status.HTTP_404_NOT_FOUND,
            )

        game_info_data = GameInfoSerializer(game_information[0]).data

        data_to_return: dict[str, Any] = {"data": []}

        game_type_id = Game.objects.get(id=game_id).gametype_id
        game_type_name = GameType.objects.get(id=game_type_id).game_type
        data_to_return["gameType"] = game_type_name

        data_to_return["label"] = game_info_data["label"]
        data_to_return["statExtra"] = game_info_data["stat_extra"]

        for country in Country.objects.all():
            data = {}

            if game_info_data["select_country"]:
                data["country"] = country.name
            if game_info_data["select_country_aliases"]:
                country_aliases = list(
                    Countryalias.objects.filter(country_id=country.id).values_list(
                        "alias", flat=True
                    )
                )
                data["countryAliases"] = country_aliases
            if game_info_data["select_capitals"] == 1:
                capital_objs = Capital.objects.filter(country_id=country.id)
                capital_names = list(capital_objs.values_list("name", flat=True))
                data["capitals"] = capital_names

                if game_info_data["select_capitals_aliases"]:
                    capital_ids = list(capital_objs.values_list("id", flat=True))
                    capital_aliases = list(
                        Capitalalias.objects.filter(
                            capital_id__in=capital_ids
                        ).values_list("alias", flat=True)
                    )
                    data["capitalAliases"] = capital_aliases
            if game_info_data["select_population"] == 1:
                data["stat"] = country.population_size
            if game_info_data["select_area"] == 1:
                data["stat"] = country.area
            if game_info_data["select_flag"] == 1:
                data["countryCode"] = country.country_code

            data_to_return["data"].append(data)
        return Response(data_to_return, status=status.HTTP_200_OK)
