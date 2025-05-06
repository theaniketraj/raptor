# RAPTOR 🚨🏍️

**Accident-Detecting Smart Helmet**

RAPTOR is an embedded IoT solution built into motorcycle helmets that **detects accidents** in real time and automatically **sends emergency alerts** (SMS & IoT dashboard) with location data to designated contacts and responders.

## 🚀 Features

- **Impact Detection:** Accelerometer + gyroscope fusion to identify crashes  
- **Emergency Alert:** GSM module sends SMS + webhook to your incident dashboard  
- **Auto-Fall Notification:** Detects falls at low speeds (e.g., slips)  
- **Configurable Contacts:** Choose who receives alerts via a simple config file  
- **Low-Power Mode:** Optimized for hours of continuous monitoring  

## 🛠️ Tech Stack

- Embedded C/C++ on ARM Cortex-M (Helmet MCU)  
- MPU6050 (IMU) + SIM800L (GSM) modules  
- FreeRTOS for real-time task scheduling  
- Node.js + Express backend for alert dashboard  
- Google Maps API for live location tracking  

## 📦 Setup & Usage

1. **Flash Firmware**  

   ```bash
   ./flash.sh --port /dev/ttyUSB0 --baud 115200
   ```

2. **Configure Contacts**
Edit config/contacts.json with phone numbers and webhook URL.

3. **Power On & Test**
Power helmet MCU; test impact detection in development mode. Alerts appear in your SMS inbox and on the web dashboard.

---

### Build safer rides with RAPTOR! 🦾👷‍♂️
