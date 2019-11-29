log=log_file.txt #File to log all output in.
echo "Welcome $USER. Operating system: $OSTYPE. Time of start: $(date +"%A, %d-%m-%y %H:%M:%S")" | tee -a "$log"
echo "This script installs and prints the versions for the following tools:" | tee -a "$log"
echo "" | tee -a "$log"

if [ $OSTYPE == "Darwin" ]; #We check if the Operating System is Mac.
then
#List of applications we need to install.
echo "*brew" | tee -a "$log"
echo "*git" | tee -a "$log"
echo "*NodeJS" | tee -a "$log"
echo "*AWS" | tee -a "$log"
# the following IF statmants check if the program is if it is not then it installs it
# Installations, brew first, then we use brew to install rest. 
if test ! $(which brew);
then
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)" | tee -a "$log"
fi
if test ! $(which git);
then
brew install git | tee -a "$log"
fi
if test ! $(which node);
then
brew install node | tee -a "$log"
fi
if test ! $(which aws);
then
brew install awscli -y | tee -a "$log"
fi
#Version checks.
git --version | tee -a "$log"
nodejs -v | tee -a "$log"
node -v | tee -a "$log"
aws --version | tee -a "$log"

else 
#For other OS like Linux for example. Similar process as above. 
echo "*git" | tee -a "$log"
echo "*NodeJS" | tee -a "$log"
echo "*AWS" | tee -a "$log"
#Installations
sudo apt update | tee -a "$log"
sudo apt-get install git -y | tee -a "$log"
sudo apt-get install nodejs -y | tee -a "$log"
sudo apt install awscli -y | tee -a "$log"
#Version checks.
git --version | tee -a "$log"
nodejs -v | tee -a "$log"
node -v | tee -a "$log"
aws --version | tee -a "$log"
fi
echo "" | tee -a "$log"
echo "Time of end: $(date +"%A, %d-%m-%y %H:%M:%S")" | tee -a "$log" #Print when script finishes