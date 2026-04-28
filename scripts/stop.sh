#!/bin/bash

echo "Stopping existing Spring Boot application..."

pkill -f buildright-app.jar || true