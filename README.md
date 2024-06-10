# PoomBit

## Description

PoomBit is a web application that represents an auction system, developed with a Java Spring backend and a React frontend.

## Table of Contents

- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Stopping the Application](#stopping-the-application)
- [Troubleshooting](#troubleshooting)
- [Usage](#usage)
- [License](#license)

## Project Structure

- `backend/`: Contains the Java Spring backend code.
- `frontend/`: Contains the React frontend code.
- `start.bat`: Batch script to start both the backend and frontend servers.

## Prerequisites

Ensure you have the following software installed:

- [Java JDK 8+](https://www.oracle.com/java/technologies/javase-downloads.html)
- [Apache Maven](https://maven.apache.org/install.html)
- [Node.js and npm](https://nodejs.org/)

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/poombit.git
    cd poombit
    ```

2. Install backend dependencies:
    ```bash
    cd backend
    mvn clean install
    ```

3. Install frontend dependencies:
    ```bash
    cd ../frontend
    npm install
    ```

## Running the Application

1. Run the `start.bat` script:
    ```bash
    start.bat
    ```

2. The backend server will be available at `http://localhost:8080`.
3. The frontend server will be available at `http://localhost:3000`.

## Stopping the Application

To stop the servers, go back to the command prompt window where you ran `start.bat` and press any key. This will terminate both the backend and frontend servers.

## Troubleshooting

### Common Issues

- **Port Conflicts**: Ensure that ports 8080 and 3000 are not in use by other applications.
- **Backend Server Not Starting**: Check the "Backend" command window for error messages. Ensure Maven is installed and configured correctly.
- **Frontend Server Not Starting**: Check the "Frontend" command window for error messages. Ensure Node.js and npm are installed and configured correctly.

### Verifying Installations

- Verify Java installation:
    ```bash
    java -version
    ```
- Verify Maven installation:
    ```bash
    mvn -version
    ```
- Verify Node.js and npm installation:
    ```bash
    node -v
    npm -v
    ```

## Usage

1. Open a web browser and navigate to `http://localhost:3000`.
2. Use the application to participate in auctions.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
