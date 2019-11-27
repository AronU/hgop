#!/bin/bash
# destroy any AWS instans if any exist
terraform destroy -force
# Creates new AWS instans
terraform apply -auto-approve
# gives the GameKeyPair promison so anyone can read from it
chmod 400 /home/andri/.aws/GameKeyPair.pem
# runs the initialize_game_api_instance.sh on the new AWS instans
ssh -o StrictHostKeyChecking=no -i "~/.aws/GameKeyPair.pem" ubuntu@$(terraform output public_ip) "./initialize_game_api_instance.sh"
# Chacks if the API is runing
curl $(terraform output public_ip):3000/status