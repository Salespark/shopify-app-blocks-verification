#!/bin/bash
# Present predefined options to the user
echo "Removed existing container"
echo "1. Yes"
echo "2. No"

# Read the user's choice
read containerChoice

if [ "$containerChoice" -eq 1 ]; then
  echo "Enter the name of the Docker container:"
  read containerInput
  docker rm -f "appBlockVerification-$containerInput"
fi

echo "Removed existing image"
echo "1. Yes"
echo "2. No"

# Read the user's choice
read imageChoice

if [ "$imageChoice" -eq 1 ]; then
  echo "Enter the name of the Docker image:"
  read imageInput
  docker rmi -f "appBlockVerification:$imageInput"
fi

echo "Enter the tag name:"
read APP_TAG

export APP_TAG

docker compose -f ../docker-compose.yml up -d
