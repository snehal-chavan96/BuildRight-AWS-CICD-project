#!/bin/bash

echo "Starting Spring Boot application..."

cd /home/ec2-user/app

if [ -f /home/ec2-user/app/runtime.env ]; then
  set -a
  source /home/ec2-user/app/runtime.env
  set +a
fi

nohup java -jar buildright-app.jar > app.log 2>&1 &
