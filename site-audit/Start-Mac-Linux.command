#!/bin/bash
cd "$(dirname "$0")"
echo "Installing requirements (first time only)..."
python3 -m pip install -q requests beautifulsoup4
echo "Starting Site Audit - your browser will open and start analysing automatically."
python3 site_audit.py
