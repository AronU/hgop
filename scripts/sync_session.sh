#!/bin/bash
# JENKINS URL
JENKINS_URL=ec2-54-152-217-158.compute-1.amazonaws.com
# credentials
scp -o StrictHostKeyChecking=no -i "~/Documents/Jenkin.pem" ~/.aws/credentials ubuntu@${JENKINS_URL}:~/credentials
ssh -o StrictHostKeyChecking=no -i "~/Documents/Jenkin.pem" ubuntu@${JENKINS_URL} "sudo mv ~/credentials /var/lib/jenkins/.aws"
ssh -o StrictHostKeyChecking=no -i "~/Documents/Jenkin.pem" ubuntu@${JENKINS_URL} "sudo chmod a+r /var/lib/jenkins/.aws/credentials"
# GameKeyPair.pem
scp -o StrictHostKeyChecking=no -i "~/Documents/Jenkin.pem" ~/.aws/GameKeyPair.pem ubuntu@${JENKINS_URL}:~
ssh -o StrictHostKeyChecking=no -i "~/Documents/Jenkin.pem" ubuntu@${JENKINS_URL} "sudo mv ~/GameKeyPair.pem /var/lib/jenkins/.aws"
ssh -o StrictHostKeyChecking=no -i "~/Documents/Jenkin.pem" ubuntu@${JENKINS_URL} "sudo chmod a+r /var/lib/jenkins/.aws/GameKeyPair.pem"