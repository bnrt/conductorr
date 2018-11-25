@echo off

copy "%~dp0src\engine.js" + "%~dp0src\providers\supported\*.js" + "%~dp0src\providers\community\*.js" + "%~dp0src\render.js" "%~dp0conductorr.user.js"
