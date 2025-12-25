# Weather & Irrigation Recommendation API

Simple Express server with weather data and AI-powered irrigation recommendations.

## Installation

```bash
npm install
```

## Environment Variables

Create `.env` file:
```
AI_API_KEY=your_gemini_api_key_here
```

Get your Gemini API key from: https://makersuite.google.com/app/apikey

## Run

```bash
npm start
```

Server runs on `http://localhost:5000`

## API Endpoints

### GET /api/weather?lat={latitude}&lon={longitude}

Returns current weather data.

**Example:**
```bash
GET http://localhost:5000/api/weather?lat=40.3964&lon=49.8467
```

**Response:**
```json
{
  "temperature": 15,
  "humidity": 65,
  "description": "clear sky"
}
```

### POST /api/recommendation

Returns AI-powered irrigation recommendation.

**Request Body:**
```json
{
  "plot": "Plot A",
  "crop": "tomatoes",
  "last_irrigation_liters": 50,
  "last_irrigation_date": "2024-12-20",
  "soil_type": "loamy",
  "humidity": 65,
  "temperature": 22,
  "forecast_rain_mm": 5
}
```

**Response:**
```json
{
  "recommendation": "Given the moderate humidity (65%) and forecasted rain (5mm), you can reduce irrigation. Wait 1-2 days before next watering to avoid overwatering.",
  "risk": "low"
}
```

## Example Request

```bash
curl -X POST http://localhost:5000/api/recommendation \
  -H "Content-Type: application/json" \
  -d '{
    "plot": "Plot A",
    "crop": "tomatoes",
    "last_irrigation_liters": 50,
    "last_irrigation_date": "2024-12-20",
    "soil_type": "loamy",
    "humidity": 65,
    "temperature": 22,
    "forecast_rain_mm": 5
  }'
```
