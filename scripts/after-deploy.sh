#!/bin/bash
verdantjuly=/home/ubuntu/verdantjuly

cd $verdantjuly

sudo /usr/bin/yarn
sudo /usr/bin/pm2 start "npm run start"
