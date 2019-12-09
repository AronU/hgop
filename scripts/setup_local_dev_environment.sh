#!/bin/bash

echo "Welcome $USER."
echo "This script is going to setup your Linux development environment."
echo "You are running on $(lsb_release -a)"

function main {
    echo "Started on: $(date)"

    sudo apt-get update

    echo "Installing git"
    sudo apt install git

    echo "Installing NodeJS"
    curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
    sudo apt-get install nodejs

    echo "Installing Docker"
    sudo apt-get install \
        apt-transport-https \
        ca-certificates \
        curl \
        gnupg-agent \
        software-properties-common
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
    sudo add-apt-repository \
        "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
        $(lsb_release -cs) \
        stable"
    sudo apt-get update
    sudo apt-get install docker-ce docker-ce-cli containerd.io
    sudo usermod -aG docker $USER

    echo "Installing Docker Compose"
    sudo curl -L "https://github.com/docker/compose/releases/download/1.24.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose

    echo "Installing Python3"
    sudo apt-get install python3
    sudo apt install python3-pip

    echo "Installing AWS CLI"
    pip3 install --upgrade --user awscli
    export PATH=/home/$USER/.local/bin:$PATH

    echo "Installing Terraform"
    wget https://releases.hashicorp.com/terraform/0.12.16/terraform_0.12.16_linux_amd64.zip -O terraform.zip
    sudo unzip terraform.zip -d /usr/local/bin

    echo "Versions:"
    git --version
    echo "npm version $(npm --version)"
    echo "NodeJS version $(node --version)"
    docker --version
    docker-compose --version
    aws --version
    terraform --version

    echo "Ended on: $(date)"
}

(main || echo "script failed") | tee log.txt