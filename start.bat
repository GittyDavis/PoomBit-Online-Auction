@echo off
setlocal

REM Start the backend server
echo Starting backend server...
cd backend
start "Backend" cmd /k "mvn spring-boot:run"
cd ..

REM Install frontend dependencies
echo Installing frontend dependencies...
cd frontend
start "InstallFrontend" cmd /c "npm install && if %ERRORLEVEL% NEQ 0 exit /b %ERRORLEVEL%"
timeout /t 15

REM Start the frontend server
echo Starting frontend server...
start "Frontend" cmd /k "npm start"
cd ..

echo Both servers are running.
echo Press any key to stop the servers...

pause

REM Stop the backend server
echo Stopping backend server...
for /f "tokens=2" %%i in ('tasklist ^| findstr java.exe') do taskkill /PID %%i /F

REM Stop the frontend server
echo Stopping frontend server...
for /f "tokens=2" %%i in ('tasklist ^| findstr node.exe') do taskkill /PID %%i /F

echo Servers stopped.
endlocal
