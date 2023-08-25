# For server updates
git pull origin master
pip3 install -r requirements.txt
sudo systemctl restart producers
sudo systemctl status producers
sudo nginx -t
sudo systemctl restart nginx
