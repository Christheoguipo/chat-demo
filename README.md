# Chat Demo

## Project Description

The Chat Demo project is a simple Android application that demonstrates basic chat functionality. It allows users to send and receive messages in a chat interface. This project is a great starting point for building more advanced chat applications on the Android platform.

## Prerequisites

Before you begin, ensure that you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js and npm](https://nodejs.org/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Android Studio](https://developer.android.com/studio) (for creating a virtual device)

## Cloning the Repository

1. Open a terminal or command prompt.
2. Run the following command to clone the repository:

    ```bash
    git clone https://github.com/Christheoguipo/chat-demo.git
    ```

3. Change into the project directory:

    ```bash
    cd chat-demo
    ```

## Creating a Virtual Device

1. Open Android Studio.
2. Click on "Configure" in the bottom right corner.
3. Select "AVD Manager" (AVD stands for Android Virtual Device).
4. Click on "Create Virtual Device."
5. Choose a hardware profile and click "Next."
6. Select a system image for the virtual device (e.g., Pixel 3) and click "Next."
7. Configure the virtual device settings:
   - **Internal Storage:** Set the value to 6GB.
   - **SD Card:** Set the value to 6GB.
8. Click "Finish."

## Installing Dependencies

1. Once the virtual device is created, click on "Tools" in the top menu.
2. Choose "SDK Manager" to open the Android SDK Manager.
3. Ensure that the necessary SDK components are installed. Android Studio may prompt you to install missing components; follow the on-screen instructions.

## Running the App with Expo

1. Install Expo globally if you haven't already:

    ```bash
    npm install -g expo-cli
    ```

2. Install project dependencies using npm:

    ```bash
    npm install
    ```

3. Run the following command to start the Expo development server:

    ```bash
    expo start
    ```

4. Expo DevTools will open in your default web browser. You can scan the QR code with the [Expo Go](https://expo.dev/client) app on your Android device, or run it on an Android emulator.

## Testing the Chat App

1. Once the app is running on your Android device or emulator, you can interact with the chat interface to send and receive messages.

Congratulations! You have successfully set up the Chat Demo project, and tested it using Android Studio's Virtual Device Manager and Expo. Feel free to explore and modify the code as needed for your specific requirements.

**Note:** Ensure that your Android Studio, SDK, and Expo CLI installations are up to date to avoid any compatibility issues.
