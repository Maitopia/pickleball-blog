#!/bin/bash

# Pickleball Blog - Cron Job Setup Script
# This script sets up automated content updates

echo "🎾 Pickleball Blog - Cron Job Setup"
echo "===================================="
echo ""

# Get the absolute path to the project directory
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PYTHON_PATH=$(which python3)

echo "Project directory: $PROJECT_DIR"
echo "Python path: $PYTHON_PATH"
echo ""

# Check if Python is available
if [ ! -f "$PYTHON_PATH" ]; then
    echo "❌ Error: Python 3 not found"
    exit 1
fi

# Install Python dependencies
echo "📦 Installing Python dependencies..."
cd "$PROJECT_DIR/automation"
pip3 install -r requirements.txt --quiet
echo "✓ Dependencies installed"
echo ""

# Create cron job entries
echo "⏰ Setting up cron jobs..."
echo ""
echo "The following cron jobs will be added:"
echo ""
echo "1. Daily article update (8:00 AM)"
echo "   0 8 * * * cd $PROJECT_DIR && $PYTHON_PATH automation/update_content.py >> automation/logs/update.log 2>&1"
echo ""
echo "2. Weekly tournament update (Sunday 8:00 PM)"
echo "   0 20 * * 0 cd $PROJECT_DIR && $PYTHON_PATH automation/update_content.py >> automation/logs/update.log 2>&1"
echo ""
echo "3. Weekly rankings update (Monday 6:00 AM)"
echo "   0 6 * * 1 cd $PROJECT_DIR && $PYTHON_PATH automation/update_content.py >> automation/logs/update.log 2>&1"
echo ""

# Create logs directory
mkdir -p "$PROJECT_DIR/automation/logs"

# Ask for confirmation
read -p "Do you want to add these cron jobs? (y/n) " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    # Create temporary cron file
    TEMP_CRON=$(mktemp)
    
    # Get existing cron jobs
    crontab -l > "$TEMP_CRON" 2>/dev/null || true
    
    # Add new cron jobs (daily update)
    echo "# Pickleball Blog - Daily Content Update" >> "$TEMP_CRON"
    echo "0 8 * * * cd $PROJECT_DIR && $PYTHON_PATH automation/update_content.py >> automation/logs/update.log 2>&1" >> "$TEMP_CRON"
    
    # Install new crontab
    crontab "$TEMP_CRON"
    rm "$TEMP_CRON"
    
    echo "✅ Cron jobs installed successfully!"
    echo ""
    echo "To view your cron jobs, run: crontab -l"
    echo "To remove them, run: crontab -e"
else
    echo "❌ Cron job installation cancelled"
fi

echo ""
echo "📝 Manual Usage:"
echo "To run the update script manually:"
echo "  cd $PROJECT_DIR"
echo "  python3 automation/update_content.py"
echo ""
echo "✅ Setup complete!"
