# Top of file
variable "environment" {
  type = string
}

# Usages
name   = "GameSecurityGroup_${var.environment}"

Name = "GameServer_${var.environment}"


# Retrieves the credentials from specified location. Our provdier is AWS. 
provider "aws" {
  shared_credentials_file = "~/.aws/credentials"
  region                  = "us-east-1"
}

# Sets up ports. Sets up security groups and protocols. 
resource "aws_security_group" "game_security_group" {
  name = "GameSecurityGroup"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# instance_type is what kind of instance we use at AWS. t2.micro is the free version. Security
# key is "GameKeyPair".
resource "aws_instance" "game_server" {
  ami                    = "ami-0ac019f4fcb7cb7e6"
  instance_type          = "t2.micro"
  key_name               = "GameKeyPair"
  vpc_security_group_ids = [aws_security_group.game_security_group.id]
  tags = {
    Name = "GameServer"
  }

  # initialize_game_api_instance.sh script installs everything required, like Docker and Docker-
  # Compose. It sends it to the new AWS instance.
  provisioner "file" {
    source      = "scripts/initialize_game_api_instance.sh"
    destination = "/home/ubuntu/initialize_game_api_instance.sh"

    connection {
      host        = coalesce(self.public_ip, self.private_ip)
      type        = "ssh"
      user        = "ubuntu"
      private_key = file("~/.aws/GameKeyPair.pem")
    }
  }
  # docker_compose_up.sh script installs everything required, like Docker and Docker-
  # Compose. It sends it to the new AWS instance.
  provisioner "file" {
    source      = "scripts/docker_compose_up.sh"
    destination = "/home/ubuntu/docker_compose_up.sh"

    connection {
      host        = coalesce(self.public_ip, self.private_ip)
      type        = "ssh"
      user        = "ubuntu"
      private_key = file("~/.aws/GameKeyPair.pem")
    }
  }
  # Sends the Docker-compose.yml file to the new AWS instance so it can be accessed later.
  provisioner "file" {
    source      = "docker-compose.yml"
    destination = "/home/ubuntu/docker-compose.yml"

    connection {
      host        = coalesce(self.public_ip, self.private_ip)
      type        = "ssh"
      user        = "ubuntu"
      private_key = file("~/.aws/GameKeyPair.pem")
    }
  }

  # This is used to run commands on the instance we just created.
  # Terraform does this by SSHing into the instance and then executing the commands.
  # Since it can take time for the SSH agent on machine to start up we let Terraform
  # handle the retry logic, it will try to connect to the agent until it is available
  # that way we know the instance is available through SSH after Terraform finishes.

  # Changes privilege of initialize_game_api_instance.sh script. Makes it excecutable.
  provisioner "remote-exec" {
    inline = [
      "chmod +x /home/ubuntu/initialize_game_api_instance.sh"
    ]

    connection {
      host        = coalesce(self.public_ip, self.private_ip)
      type        = "ssh"
      user        = "ubuntu"
      private_key = file("~/.aws/GameKeyPair.pem")
    }
  }
  # docker_compose_up.sh script installs everything required, like Docker and Docker-
  # Compose. It sends it to the new AWS instance.

  # Changes privilege of docker_compose_up.sh script. Makes it excecutable.
  provisioner "remote-exec" {
    inline = [
      "chmod +x /home/ubuntu/docker_compose_up.sh"
    ]

    connection {
      host        = coalesce(self.public_ip, self.private_ip)
      type        = "ssh"
      user        = "ubuntu"
      private_key = file("~/.aws/GameKeyPair.pem")
    }
  }
}

# Gets the public IP and saves it as a new instance. Displays it in terminal as well.
output "public_ip" {
  value = aws_instance.game_server.public_ip
}