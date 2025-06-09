
# Radiant Shield: Dose Rate Calculator

## Description

Radiant Shield is an interactive web application designed to calculate gamma dose rates from various radionuclides commonly used in nuclear medicine. It allows users to input source activity, distance from the source, and details about shielding materials to estimate the resulting dose rate. This tool is intended for educational and illustrative purposes.

## Features

- **Dose Rate Calculation**: Calculates gamma dose rate based on activity, distance, and shielding.
- **Radionuclide Selection**: Includes a list of common diagnostic and therapeutic radionuclides used in nuclear medicine (e.g., Tc-99m, I-131, F-18, Lu-177, Ga-68).
- **Flexible Units**: Supports various units for:
    - Activity (Bq, kBq, MBq, GBq, µCi, mCi, Ci)
    - Distance (cm, m)
    - Shielding Thickness (mm, cm, m)
    - Output Dose Rate (µSv/hr, mSv/hr, mR/hr)
- **Shielding Options**: Allows selection of common shielding materials (Lead, Steel, Concrete, Water) and input of shielding thickness.
- **Dynamic Updates**: Calculations update automatically as input parameters are changed.
- **Responsive Design**: User interface is designed to work on various screen sizes.
- **Radionuclide Data**: Pre-configured with specific gamma constants and Half-Value Layers (HVLs) for each radionuclide and material.

## Tech Stack

- **Frontend**: React (with Hooks)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Module System**: ES Modules (via import maps in `index.html`)

## Prerequisites

- A modern web browser that supports ES Modules and import maps (e.g., Chrome, Firefox, Edge, Safari).
- For local development or to avoid CORS issues if loading local files, a simple HTTP server is recommended.

## Getting Started

1.  **Clone the repository (if applicable) or download the files.**
    ```bash
    # If it's a git repository
    git clone <repository-url>
    cd <project-directory>
    ```

2.  **Ensure all project files are in the same directory structure:**
    ```
    .
    ├── components/
    │   ├── DoseRateCalculator.tsx
    │   ├── InputWithUnit.tsx
    │   └── SelectInput.tsx
    ├── constants.ts
    ├── types.ts
    ├── App.tsx
    ├── index.html
    ├── index.tsx
    ├── metadata.json
    └── README.md
    ```

## Running the Application

There is no complex build step required for this application.

1.  **Option 1: Directly open `index.html`**
    - Navigate to the project directory in your file explorer.
    - Double-click on `index.html` to open it in your default web browser.
    - *Note: Some browsers might have security restrictions (CORS) when loading modules directly from the file system. If you encounter issues, use Option 2.*

2.  **Option 2: Using a simple HTTP server (Recommended)**
    - If you have Node.js installed, you can use a simple server like `http-server`:
      ```bash
      # Install http-server globally (if you haven't already)
      npm install -g http-server

      # Navigate to the project's root directory
      cd path/to/your/project

      # Start the server
      http-server .
      ```
      Then open your browser and go to `http://localhost:8080` (or the port indicated by `http-server`).
    - Alternatively, if you have Python installed:
      ```bash
      # Python 3.x
      python -m http.server
      ```
      Then open `http://localhost:8000`.
    - Many code editors (like VS Code with the "Live Server" extension) also provide a simple way to serve HTML files.

## Project Structure

-   `index.html`: The main HTML file, sets up the page and loads the React application. Includes an import map for ES module resolution.
-   `index.tsx`: The entry point for the React application, renders the `App` component.
-   `App.tsx`: The root React component, sets up the main layout and structure.
-   `metadata.json`: Contains metadata about the application.
-   `components/`: Contains reusable React UI components.
    -   `DoseRateCalculator.tsx`: The core component for all inputs, calculations, and display logic.
    -   `InputWithUnit.tsx`: A component for numerical input fields that have an associated unit selection.
    -   `SelectInput.tsx`: A generic dropdown select component.
-   `constants.ts`: Defines constant values used throughout the application, such as radionuclide data, unit options, and conversion factors.
-   `types.ts`: Contains TypeScript type definitions and interfaces for data structures.

## Disclaimer

This calculator is for educational and illustrative purposes only. The calculations are based on standard formulas and data but may not reflect all real-world complexities. Do not use for actual radiation protection planning without consulting a qualified radiation safety professional or physicist.

@2025 Maziar Khateri