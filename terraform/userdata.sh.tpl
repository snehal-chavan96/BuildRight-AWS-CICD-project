#!/bin/bash
set -e

# Update packages
yum update -y

# Install Java 17 (Amazon Corretto)
yum install -y java-17-amazon-corretto-headless

# Install CodeDeploy Agent
yum install -y ruby wget
cd /home/ec2-user
wget https://aws-codedeploy-${region}.s3.${region}.amazonaws.com/latest/install
chmod +x ./install
./install auto

# Install CloudWatch Agent (optional)
yum install -y amazon-cloudwatch-agent

# Create application directory
mkdir -p /app
chown -R ec2-user:ec2-user /app

# IMPORTANT FIX: To prevent the ALB from marking instances as unhealthy before 
# your Spring Boot app is deployed via CodeDeploy, we start a simple Python HTTP 
# server that responds to the health check path with HTTP 200 OK.
# 
# Once you deploy your Spring Boot app, it will take over port 8080 and handle
# the health checks natively via /actuator/health.
#
# NOTE: Make sure your CodeDeploy appspec.yml stops this dummy process if needed!

cat << 'EOF' > /app/dummy_health_check.py
from http.server import BaseHTTPRequestHandler, HTTPServer
import json

class HealthCheckHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/actuator/health':
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({"status": "UP"}).encode())
        else:
            self.send_response(404)
            self.end_headers()

server = HTTPServer(('0.0.0.0', 8080), HealthCheckHandler)
server.serve_forever()
EOF

# Run the dummy server in the background
nohup python3 /app/dummy_health_check.py > /app/dummy.log 2>&1 &
