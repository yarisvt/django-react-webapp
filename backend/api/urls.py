from django.urls import path
from .views import AllGamesView, GameInfoView

urlpatterns = [
    path("game-info", GameInfoView.as_view()),
    path("all-games", AllGamesView.as_view()),
]
