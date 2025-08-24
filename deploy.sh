#!/bin/bash

# This script automates the deployment of the full-stack Blockex application using pm2.
# It handles both the backend Node.js server and the frontend React application.

# Exit immediately if a command exits with a non-zero status.
set -e

# --- Prerequisites ---
# Make sure you have Node.js, npm, and pm2 installed globally.
# To install pm2, run: npm install pm2 -g

echo "Starting deployment process for Blockex..."

# --- Backend Deployment ---
echo " "
echo "--- Deploying Backend ---"

# Navigate to the backend directory
cd Backend

# Install dependencies
echo "Installing backend dependencies..."
npm install

# Build the TypeScript application
echo "Building backend..."
npm run build

# Start or restart the backend application with pm2
# This command will restart the app if it's already running,
# or start it if it's not.
echo "Starting backend with pm2..."
pm2 restart blockex-backend || pm2 start dist/app.js --name "blockex-backend"

echo "Backend deployed successfully."
echo "--------------------------"


# --- Frontend Deployment ---
echo " "
echo "--- Deploying Frontend ---"

# Navigate to the frontend directory
cd ../blockenthu

# Install dependencies
echo "Installing frontend dependencies..."
npm install

# Build the React application
echo "Building frontend..."
npm run build

# Serve the static files with pm2
# The --spa flag is important for single-page applications like React
# to ensure client-side routing works correctly.
echo "Serving frontend with pm2 on port 5173..."
pm2 restart blockex-frontend || pm2 serve dist --name "blockex-frontend" --port 5173 --spa

echo "Frontend deployed successfully."
echo "---------------------------"


# --- Display pm2 status ---
echo " "
echo "--- Deployment Finished ---"
echo "Current pm2 status:"
pm2 list
echo "---------------------------"