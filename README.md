# Stock Screener

A comprehensive full-stack application for scanning the Indian stock market (NIFTY 500) for common candlestick patterns and delivery percentage anomalies.

![App Screenshot](./Frontend/Candlestick%20Scanner/public/screen1.png)

![App Screenshot](./Frontend/Candlestick%20Scanner/public/screen2.png)

## Features

*   **Candlestick Pattern Recognition:** Automatically scans the NIFTY 500 stocks to identify 9 key candlestick patterns on the daily timeframe:
    *   **Bullish Patterns:** Hammer, Bullish Engulfing, Bullish Kicker, Pro Gap Positive
    *   **Bearish Patterns:** Inverted Hammer, Bearish Engulfing, Bearish Kicker, Pro Gap Negative
    *   **Neutral Patterns:** Doji
*   **Delivery Data Analysis:** Compares the latest daily delivery percentage of stocks against their 30-day average, highlighting stocks with abnormally high delivery (strong holding intent).
*   **Index Filtering:** Filter scan results dynamically by Nifty sub-indices (Nifty 50, Nifty Next 50, Nifty 100, Nifty 200, Nifty 500).
*   **Real-time Refresh:** Pulls the latest end-of-day data straight from the backend with a single click.

## Tech Stack

### Frontend
*   **Framework:** React 19 + Vite
*   **Routing:** React Router DOM v7
*   **Styling:** Tailwind CSS + PostCSS
*   **Icons:** Lucide React & React Icons
*   **HTTP Client:** Axios
*   **Notifications:** React Hot Toast

### Backend
*   **Framework:** Django + Django REST Framework (DRF)
*   **Database:** Structured via Django ORM (PostgreSQL/SQLite depending on environment)
*   **Patterns Logic:** Custom Python analysis scripts that process historical OHLCV data.

---

## Project Structure

The repository is split into two main directories:

1.  `/Backend/StockScreener_Backend/` - The Django API server.
2.  `/Frontend/Candlestick Scanner/` - The React frontend application.

---

## Getting Started

### 1. Backend Setup

1.  Navigate to the backend directory:
    ```bash
    cd "Backend/StockScreener_Backend"
    ```
2.  Create and activate a virtual environment:
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```
3.  Install the dependencies:
    ```bash
    pip install -r requirements.txt
    ```
4.  Run database migrations:
    ```bash
    python manage.py migrate
    ```
5.  Start the Django development server:
    ```bash
    python manage.py runserver 8000
    ```
    *The API will be available at `http://localhost:8000/api/`*

### 2. Frontend Setup

1.  Open a new terminal and navigate to the frontend directory:
    ```bash
    cd "Frontend/Candlestick Scanner"
    ```
2.  Install NPM dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```
3.  Set up your environment variables. Ensure the `axios` client points to your local Django server (default is usually `http://localhost:8000/api`).
4.  Start the Vite development server:
    ```bash
    npm run dev
    ```
    *The app will be available at `http://localhost:5173`*

---

## API Endpoints Overview

The frontend communicates with several key endpoints provided by the Django backend:

*   `POST /create-stock-prices/` - Triggers a sync workflow that fetches new NSE daily data and runs the pattern detection logic.
*   `GET /patterns/<pattern-name>/` - Retrieves stocks matching a specific pattern (e.g., `hammer`, `doji`, `bullish-kicker`).
*   `GET /delivery-data/` - Returns the latest delivery percentage and the 30-day average. Accepts query parameters such as `?only_greater=true`.

## Customization

*   **Themes:** The app features a dark-mode first design natively built with Tailwind CSS. Colors correspond to trading sentiment (Emerald for bullish, Red for bearish, Blue for neutral).
*   **Patterns:** More patterns can be added by implementing the logic in the backend `utils.py` and creating corresponding views/models. 
