@echo off

type "%~dp0src\engine.js" > "%~dp0conductorr.user.js"
type "%~dp0src\providers\supported\*.js" >> "%~dp0conductorr.user.js"
type "%~dp0src\providers\community\*.js" >> "%~dp0conductorr.user.js"
type "%~dp0src\render.js" >> "%~dp0conductorr.user.js"
