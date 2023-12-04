from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token

# import serializers
from Users.api.serializers import RegistrationSerializer


@api_view(["POST"])
def register_user(request):
    """
    POST request to handle user creation. Returns a authentication token

    Handles a POST request with 'username', 'email', 'password', and 'verify_password'. Serializer = RegistrationSerializer
    calls the registration serializer which is responsible for ensuring fields are correct. On successful verification, it returns the newly
    created authenticaation token and sends that in the response body along with a 200. Serializer.save() calls the overwritten serializer method.
    Refer to Users/serializer for more information

    The view expects an HTTP POST request containing:
        - username
        - email
        - password
        - verify_password

    Parameters: POST HTTP request

    Returns:
        - If successful, returns a HTTP response 200 and an authentication token
        - If unsuccessful, retuurns an HTTP response 400 along with the response generated by the serializer.
    """

    # deserialize incoming data
    serializer = RegistrationSerializer(data=request.data)
    # check
    if serializer.is_valid():
        # if the user is valid, invoke overriden save method to gain access to user object
        user = serializer.save()
        # retrieve user's newly created token
        try:
            token = Token.objects.get(user_id=user.id)
            return Response({"token": token.key}, status=status.HTTP_200_OK)

        except:
            # return a 500 if there is an error retrieving token
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    else:
        # if the user is not valid, place errors inside token placeholder
        error = serializer.errors
        return Response(error, status=status.HTTP_400_BAD_REQUEST)