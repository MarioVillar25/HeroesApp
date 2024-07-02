# Marvel Heroes App

This project is an application developed in Angular 17 that provides a list of Marvel heroes. The application displays 50 hero cards on the main page. Each card allows access to detailed information about the hero, including the comics in which they have appeared.

## Features

- **Landing Page**: Displays 50 hero cards with basic information.
- **Detailed Information**: Clicking on a card provides detailed information about the hero and related comics.
- **Likes and Favorites**: Users can "like" heroes and access a list of favorite heroes.
- **Modular Structure**: The application is organized into folders to facilitate maintenance and scalability.

## Folder Structure

The project folder structure is as follows:

- `src/app`
  - `pages/` : Contains the main pages of the application.
  - `components/` : Contains reusable components.
  - `layout/` : Contains components related to the application's layout (e.g., header, footer).
  - `guards/` : Contains Angular guards for navigation.
  - `services/` : Contains the application's services to handle business logic and API calls.
  - `utils/` : Contains utilities and helper functions.
  - `environments/` : Contains configuration files for different environments (e.g., development, production).

## Installation

To clone and run this application, follow these steps:

1. Clone this repository into a folder where you want to save the project:
    ```bash
    git clone https://github.com/MarioVillar25/HeroesApp.git
    ```

2. Navigate to the project directory:
    ```bash
    cd projectFolderName
    ```

3. Install the project dependencies:
    ```bash
    npm install
    ```

## Usage

To run the application in a development environment, use the following command:
```bash
ng serve

