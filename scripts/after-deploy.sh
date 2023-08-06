#!bin/bash

cd /home/ubuntu/build

sudo /usr/bin/yarn
sudo /usr/bin/pm2 start "npm run start"
