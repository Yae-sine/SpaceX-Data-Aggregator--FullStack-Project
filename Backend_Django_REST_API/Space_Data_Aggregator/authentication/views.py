from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from django.contrib.auth.models import User
from .serializer import UserSerializer

@api_view(["POST"])
def login(request):
    try:
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(username=username, password=password)
        if user is not None:
            token, _ = Token.objects.get_or_create(user=user)
            return Response({"message": "Login Success", "token": token.key}, status=status.HTTP_200_OK)
        return Response({"message": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
    except Exception as e:
        return Response({"message": "An error occurred", "error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["POST"])
def register(request):
    user_serializer = UserSerializer(data=request.data)
    if user_serializer.is_valid():
        user = User(
            username=user_serializer.validated_data["username"],
            email=user_serializer.validated_data.get("email", "")
        )
        user.set_password(user_serializer.validated_data["password"])
        user.save()
        return Response(user_serializer.data, status=status.HTTP_201_CREATED)
    return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def logout(request):
    try:
        token = request.data.get("token")
        Token.objects.get(key=token).delete()
        return Response({"message": "Logout Successful"}, status=status.HTTP_200_OK)
    except Token.DoesNotExist:
        return Response({"message": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST)