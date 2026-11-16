@echo off
rem dream <all|mayak|veter|forge|iskra|check> [dir] — Dream Team Squad v TUI herdr.
rem Polozhi dream.js i dream.cmd v bin; poprawi ROOT v dream.js (ili env DREAM_ROOT).
node "%~dp0dream.js" %1 %2
exit /b %errorlevel%
