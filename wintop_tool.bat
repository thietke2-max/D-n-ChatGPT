@echo off
chcp 65001 > nul
title Wintop AI Creative Suite - Master Automation Tool
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0wintop_tool.ps1"
pause
