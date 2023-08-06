cd /home/ubuntu/kiosk

sudo yarn run build
sudo pm2 start "npm run start"
