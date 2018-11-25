@echo off

copy "%~dp0src\engine.js" + "%~dp0src\providers\*.js" + "%~dp0src\render.js" "%~dp0conductorr.user.js"
