## Overview

**Accountabuddy** is a collaborative productivity mobile app designed to help users stay on track with their tasks through **social accountability**.

The app combines task management with peer driven motivation to promote healthier productivity habits and reduce procrastination among students.

## Key Features

- Create, edit, and delete tasks
- View tasks in a weekly calendar
- Add friends and share task activity
- Add comments for friend tasks
- Promote accountability

## Tech Stack

- Frontend: React Native, Expo Go
- Languages: Javascript, TypeScript, JSON
- Backend: Firebase
- Development Tools: Visual Studio Code

## Getting Started

1. Clone the repository: `git clone git@github.com:jguan79/accountabuddy.git `
2. Move into the project directory: `cd accountabuddy `
3. Install dependencies.
    - Under mobile folder, do `npm install`
    - Under functions folder, do `npm install`
4. Initialize firebase. Under root (main project folder), run:
    - `npm install -g firebase-tools`
    - `firebase login`

## Running the Project

1. To start the frontend:
    - `cd mobile`
    - `npx expo start`
2. To start the backend:
    - `cd project root`
    - `firebase deploy --only functions`

3. Scan the QR code in the terminal with your phone camera using the [Expo Go app](https://apps.apple.com/us/app/expo-go/id982107779) and you are good to go!
