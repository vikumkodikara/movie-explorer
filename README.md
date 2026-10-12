# Movie Explorer Application

A web application designed for discovering, searching, and managing movies in real time using The Movie Database (TMDb) API. Built with React, Material-UI, and Axios.

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Project Architecture](#project-architecture)
- [Environment Configuration](#environment-configuration)
- [Installation and Setup](#installation-and-setup)
- [Available Scripts](#available-scripts)
- [API Integration Details](#api-integration-details)
- [Deployment](#deployment)
- [Author and Acknowledgements](#author-and-acknowledgements)

---

## Overview

The Movie Explorer application provides an interface for exploring trending and popular cinema, performing real-time searches, viewing movie metadata and cast credits, playing video trailers, and saving personal favorites. The project utilizes modern component architecture, centralized state management with the React Context API, and theme customization using Material-UI.

---

## Key Features

### 1. User Interface and Navigation
- **Responsive Layout**: Designed with a mobile-first approach, adapting fluidly across mobile, tablet, and widescreen viewports using Material-UI grid and flexbox containers.
- **Light and Dark Theme**: Built-in theme switcher integrated via Material-UI `ThemeProvider` and `CssBaseline`, allowing users to toggle between dark and light modes.
- **Client-Side Routing**: Configured with `react-router-dom` for navigation across Home, Search, Movie Details, Favorites, and Login pages.
- **User Authentication Interface**: Dedicated Login view providing credential input forms with input validation and navigation handling.

### 2. Search and Discovery
- **Live Search Bar**: Accessible across all pages via the top navigation bar, routing search queries directly to dedicated search results.
- **Pagination with "Load More"**: Search results support incremental page loading through a controlled "Load More" button to optimize performance and data transfer.
- **Search History Persistence**: The user's most recent search query is stored in browser `localStorage` and displayed via interactive chips for quick access.
- **Genre-Based Filtering**: Interactive category chips on the Home view enable instant filtering across popular film categories (Action, Comedy, Drama, Horror, Sci-Fi, etc.).

### 3. Movie Details and Media
- **Detailed Metadata**: Displays movie release year, runtime, star ratings, genres, and narrative overviews.
- **Top Cast Credits**: Presents cast members with profile imagery, actor names, and character roles fetched through TMDb credit endpoints.
- **Trailer Integration**: Automatically queries TMDb video feeds for official YouTube trailers and presents direct launch buttons.

### 4. State Management and Persistence
- **Favorites Management**: Users can toggle favorite status directly from movie cards or detailed views.
- **LocalStorage Integration**: Favorite selections and search histories persist across browser refreshes using React Context API providers.
- **Defensive Error Handling**: API requests include fallback mechanisms and error state presentations to avoid application crashes.

---

## Technology Stack

| Category | Technology |
| :--- | :--- |
| **Framework** | React 19 |
| **Build Tool** | Vite |
| **UI Component Library** | Material-UI (MUI v6) |
| **Icon Set** | Material-UI Icons |
| **HTTP Client** | Axios |
| **Routing** | React Router DOM v7 |
| **State Management** | React Context API & Browser LocalStorage |
| **Data Provider** | The Movie Database (TMDb) v3 REST API |

---

## Project Architecture

```text
movie-explorer/
├── public/                 # Static assets
├── src/
│   ├── assets/             # Brand logos and images
│   ├── components/         # Reusable UI components
│   │   ├── MovieCard.jsx   # Movie card component with poster, rating, and actions
│   │   └── Navibar.jsx     # Navigation bar with search input and theme toggle
│   ├── context/            # Centralized state management
│   │   ├── MovieContext.jsx# Favorites and search history context
│   │   └── ThemeContext.jsx# Material-UI light/dark mode theme context
│   ├── pages/              # Application views
│   │   ├── Favorites.jsx   # Saved movies view
│   │   ├── Home.jsx        # Trending films and genre filtering
│   │   ├── Login.jsx       # User login interface
│   │   ├── MovieDetails.jsx# Detailed movie information, cast, and trailers
│   │   └── Search.jsx      # Search result listings with pagination
│   ├── App.css             # Component-level styling rules
│   ├── App.jsx             # Root application component and route definitions
│   ├── index.css           # Global typography and base CSS variables
│   └── main.jsx            # Application entry point
├── .env                    # Environment variables (TMDb API key)
├── package.json            # Dependencies and npm script definitions
├── vite.config.js          # Vite configuration
└── README.md               # Project documentation
```

---

## Environment Configuration

To run this application locally, you require an API key from [The Movie Database (TMDb)](https://www.themoviedb.org/).

1. Create a `.env` file in the root directory:
   ```env
   VITE_TMDB_API_KEY=your_tmdb_api_key_here
   VITE_TMDB_ACCESS_TOKEN=your_tmdb_read_access_token_here
   ```

2. Ensure the `.env` file is excluded from public source control commits.

---

## Installation and Setup

### Prerequisites
- Node.js version 18.x or higher
- npm version 9.x or higher

### Steps

1. **Clone the repository:**
   ```bash
   git clone https://gitlab.com/vikumkodikara/movie-explorer-app.git
   cd movie-explorer-app
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create the `.env` file as specified in the [Environment Configuration](#environment-configuration) section.

4. **Launch the development server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173` (or the port displayed in your terminal).

---

## Available Scripts

In the project directory, you can run:

- `npm run dev`: Starts the local development server with Hot Module Replacement (HMR).
- `npm run build`: Compiles the application for production to the `dist` folder.
- `npm run preview`: Locally previews the production build output.
- `npm run lint`: Runs ESLint to check for code quality and style issues.

---

## API Integration Details

The application consumes endpoints provided by TMDb v3 API via Axios:

| Purpose | HTTP Method | Endpoint |
| :--- | :---: | :--- |
| **Trending Movies** | GET | `/trending/movie/day` |
| **Popular Movies (Fallback)** | GET | `/movie/popular` |
| **Search Movies** | GET | `/search/movie?query={query}&page={page}` |
| **Movie Details & Cast/Media** | GET | `/movie/{id}?append_to_response=videos,credits` |

All requests include query parameters with the `api_key` defined in environment variables.

---

## Deployment

The application is structured for deployment on modern static hosting platforms such as Vercel or Netlify.

### Deploying to Vercel
1. Link your GitLab repository on [Vercel](https://vercel.com).
2. Configure build settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. Add environment variables under project settings:
   - `VITE_TMDB_API_KEY`
   - `VITE_TMDB_ACCESS_TOKEN`
4. Deploy the project and capture the production domain.

---

## Author

Developed by **Vikum Kodikara** as part of the software engineering internship assignment.
