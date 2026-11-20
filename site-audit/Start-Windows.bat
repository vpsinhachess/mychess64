@echo off
cd /d "%~dp0"
echo Installing requirements (first time only)...
python -m pip install -q requests beautifulsoup4
echo Starting Site Audit - your browser will open and start analysing automatically.
python site_audit.py
pause
