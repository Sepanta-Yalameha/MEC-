# Disaster Tracker

A single-page web application for coordinating disaster recovery efforts in Jasper, Alberta. Built with React, Tailwind CSS, and Mapbox GL JS.

## Overview

Disaster Tracker helps volunteers and professionals coordinate recovery efforts after natural disasters by displaying drone surveillance data as interactive map events. The application features role-based access control, real-time event tracking, and intelligent routing.

## Features

### Core Functionality

- **Interactive Map**: Mapbox-powered map centered on Jasper, Alberta
- **Event Tracking**: View and manage disaster-related events with real-time distance calculations
- **Role-Based Access**: Two user roles (Firefighter and Volunteer) with different permission levels
- **Risk Management**: Events categorized as high-risk (professionals only) or low-risk (volunteers allowed)
- **Intelligent Routing**:
  - Direct route to events
  - Detour route that avoids obstacles (other hazard locations)
- **Hazard Reporting**: Submit new hazards with location, description, risk level, and photo upload

### User Roles

**Firefighter (Professional)**

- Full access to all events (high-risk and low-risk)
- Can report any type of hazard
- Represented by red status indicator

**Volunteer**

- Access to low-risk events only
- Can report hazards
- Represented by blue status indicator

### Safety Features

- Terms & Conditions acknowledgment required before access
- Clear visual distinction between high-risk and low-risk events
- Distance calculations from user location to each event
- Risk-appropriate event filtering based on user role

## Technology Stack

- **Frontend Framework**: React 19
- **Styling**: Tailwind CSS
- **Mapping**: Mapbox GL JS
- **Build Tool**: Vite
- **Language**: JavaScript (ES6+)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Mapbox account and access token

### Installation

1. Install dependencies:

```bash
npm install
```

2. Configure environment variables:
   The `.env` file should contain your Mapbox token:

```
VITE_MAPBOX_TOKEN=your_mapbox_token_here
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` directory.

## Usage Guide

### First-Time Setup

1. Accept the Terms & Conditions when prompted
2. Sign in as either Firefighter or Volunteer using the navbar dropdown

### Viewing Events

- Events are listed in the left sidebar, sorted by distance from your location
- Click any event to view details and see it highlighted on the map
- Red badges indicate HIGH RISK events (professionals only)
- Yellow badges indicate LOW RISK events (suitable for volunteers)

### Getting Routes

1. Click on an event (either from the list or map pin)
2. Click the "Get Route" button in the popup
3. View two route options:
   - **Blue solid line**: Direct route
   - **Green dashed line**: Detour route avoiding other hazards

### Reporting Hazards

1. Click the "Report Hazard" button at the bottom of the sidebar
2. Fill in the required information:
   - Title and description
   - Risk level (high or low)
   - Location (latitude and longitude)
   - Optional: Upload a photo
3. Submit to add the event to the map

### Switching Roles

- Use the dropdown in the navbar to switch between Firefighter and Volunteer
- The map and event list will update automatically based on your role
- High-risk events are hidden when signed in as Volunteer

## Architecture Decisions

### State Management

- React hooks (`useState`) for local component state
- Props drilling for sharing state between components
- Simple and maintainable for a prototype application

### Styling Approach

- Tailwind CSS utility classes for rapid development
- Responsive design with mobile-first approach
- Custom color scheme for risk levels (red = high, yellow/orange = low)

### Map Implementation

- Mapbox GL JS for high-performance vector maps
- Custom marker elements with risk-based styling
- Real-time route calculation using coordinate geometry
- Obstacle avoidance algorithm for detour routes

### Routing Logic

- **Direct Route**: Straight line from user to event
- **Detour Route**: Calculates waypoints around nearby obstacles
- All other event pins treated as obstacles
- Uses Haversine formula for accurate distance calculations

## Mock Data

The application includes 7 pre-configured events around Jasper, Alberta:

- 3 high-risk events (power lines, gas leak, structural damage)
- 4 low-risk events (fallen trees, road debris, trail blockage, road washout)

User location is hard-coded at: `52.8750°N, 118.0750°W`

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx              # Navigation bar with role switching
│   ├── EventList.jsx           # Sidebar list of current events
│   ├── MapView.jsx             # Mapbox map with pins and routing
│   └── ReportHazardModal.jsx   # Modal form for reporting hazards
├── data/
│   └── mockEvents.js           # Mock disaster event data
├── utils/
│   └── helpers.js              # Utility functions (distance calc, routing)
├── App.jsx                     # Main application component
├── App.css                     # App-specific styles
├── index.css                   # Global styles with Tailwind
└── main.jsx                    # Application entry point
```

## License

This is a prototype application for demonstration purposes.
