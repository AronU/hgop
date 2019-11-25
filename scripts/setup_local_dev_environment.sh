log=log_file.txt
echo "Welcome $USER. Operating system: $OSTYPE. Time of start: $(date +"%A, %d-%m-%y")" >>$log
echo "This script installs and prints the versions for the following tools:" >>$log
echo "" >>$log

if [ $OSTYPE == "Darwin" ];
then
echo "*brew" >>$log
echo "*git" >>$log
echo "*NodeJS" >>$log
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)" | tee -a "$log";
brew install git | tee -a "$log"
brew install nodejs | tee -a "$log"

git --version | tee -a "$log"
nodejs -v | tee -a "$log"
node -v | tee -a "$log"

else 

echo "*git" >>$log
echo "*NodeJS" >>$log
sudo apt update | tee -a "$log"
sudo apt-get install git -y | tee -a "$log"
sudo apt-get install nodejs -y | tee -a "$log"

git --version | tee -a "$log"
nodejs -v | tee -a "$log"
node -v | tee -a "$log"
fi
echo "" >>$log
echo "Time of end: $(date +"%A, %d-%m-%y")" >>$log