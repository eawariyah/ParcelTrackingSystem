# ESP32 Parcel Tracker With Haversine

This repository contains code for a Parcel Tracker system implemented in both HTML and Arduino. The system utilizes Firebase for real-time data storage and retrieval, and a GPS module to track the location and distance traveled by a parcel.

## HTML Code
The HTML code is responsible for displaying the parcel tracking information on a web page. The page includes the current distance, a progress bar, and a table to display GPS coordinates. Firebase is used to fetch real-time GPS coordinates and update the displayed information dynamically.

### Dependencies
- [Firebase JavaScript SDK](https://firebase.google.com/docs/web/setup)
  - Version: 8.3.2

### Usage
1. Open the HTML file in a web browser.
2. The page will automatically fetch and display real-time GPS coordinates, calculate the distance between the current location and the goal, and update the progress bar accordingly.

## Arduino Code
The Arduino code is designed for an ESP32 microcontroller with a GPS module (TinyGPS++) and an OLED display (Adafruit SSD1306). The code reads GPS data, extracts relevant information, and sends it to a Firebase Realtime Database for remote tracking.

### Dependencies
- [Firebase ESP32 library](https://github.com/mobizt/Firebase-ESP32)
  - Version: Latest
- [Adafruit SSD1306 library](https://github.com/adafruit/Adafruit_SSD1306)
  - Version: Latest
- [TinyGPS++ library](https://github.com/mikalhart/TinyGPSPlus)
  - Version: Latest

### Configuration
1. Set up the ESP32 with the required pin connections for the GPS module and OLED display.
2. Update the Wi-Fi credentials, Firebase API key, database URL, and user credentials in the Arduino code.
3. Upload the code to the ESP32.

### Usage
1. The ESP32 continuously reads GPS data and sends relevant information to the Firebase Realtime Database.
2. The OLED display shows real-time information, including latitude, longitude, speed, satellites, and altitude.
3. The Firebase Realtime Database is updated with the latest GPS coordinates for remote monitoring.

Note: Ensure that the required libraries are installed in the Arduino IDE before uploading the code to the ESP32.

## Additional Information
- The HTML code uses Firebase to fetch and display real-time data dynamically.
- The Arduino code integrates GPS data with Firebase for real-time tracking.
- Adjustments to the HTML and Arduino code may be necessary based on specific hardware configurations and project requirements.