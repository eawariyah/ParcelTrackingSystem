//SDA --> 21
//SCL --> 22
//

#include <Wire.h>
#include <SPI.h>
#include <FirebaseESP32.h>

#define WIFI_SSID "eawariyah"
#define WIFI_PASSWORD "qwertyuiop"
#define API_KEY "AIzaSyBy9PfTUKSklxPDo4Sm8Cr7Q4yQvpDoz-A"
#define DATABASE_URL "bustrackingsystem-7f036-default-rtdb.firebaseio.com"
#define USER_EMAIL "eawariyah.ea@gmail.com"
#define USER_PASSWORD "qwertyuiop"

FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

int numericalValue = 30;
String letterValue = "Edwin";
char characterValue = 'A';
bool booleanValue = false;

#include <Wire.h>
#include <Adafruit_SSD1306.h>
#include <TinyGPS++.h>


#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64 

#define OLED_RESET -1 
#define SCREEN_ADDRESS 0x3C 
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);

#define RXD2 16
#define TXD2 17
HardwareSerial neogps(1);

TinyGPSPlus gps;

void setup() {
  Serial.begin(115200);

    // Firebase setup
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
  }

  config.api_key = API_KEY;
  auth.user.email = USER_EMAIL;
  auth.user.password = USER_PASSWORD;
  config.database_url = DATABASE_URL;
  Firebase.reconnectWiFi(true);
  Firebase.begin(&config, &auth);

  neogps.begin(9600, SERIAL_8N1, RXD2, TXD2);
  
  if(!display.begin(SSD1306_SWITCHCAPVCC, SCREEN_ADDRESS)) {
    Serial.println(F("SSD1306 allocation failed"));
    for(;;);
  }

  display.clearDisplay();
  display.display();
  delay(2000);

}

void loop() {
    
  boolean newData = false;
  for (unsigned long start = millis(); millis() - start < 1000;)
  {
    while (neogps.available())
    {
      if (gps.encode(neogps.read()))
      {
        newData = true;
      }
    }
  }

  if(newData == true)
  {
    newData = false;
    Serial.println(gps.satellites.value());
    print_speed();
  }
  else
  {
    display.clearDisplay();
    display.setTextColor(SSD1306_WHITE);
    display.setCursor(0, 0);
    display.setTextSize(3);
    display.print("No Data");
    display.display();
  }  
  
}

void print_speed()
{
  display.clearDisplay();
  display.setTextColor(SSD1306_WHITE);
       
  if (gps.location.isValid() == 1)
  {
    display.setTextSize(1);
    
    display.setCursor(25, 5);
    display.print("Lat: ");
    display.setCursor(50, 5);
    float latitudeValue = gps.location.lat();
    Firebase.setFloat(fbdo, "/gpsCoordinates/latitudeValue", latitudeValue);
    
    display.print(gps.location.lat(),6);

    Serial.print("Lat: ");
    Serial.print(gps.location.lat(),6);

    display.setCursor(25, 20);
    display.print("Lng: ");
    display.setCursor(50, 20);
    float longitudeValue = gps.location.lng();
    Firebase.setFloat(fbdo, "/gpsCoordinates/longitudeValue", longitudeValue);
    display.print(gps.location.lng(),6);

    Serial.print(" Lng: ");
    Serial.print(gps.location.lng(),6);

    display.setCursor(25, 35);
    display.print("Speed: ");
    display.setCursor(65, 35);
    float speedValue = gps.speed.kmph();
    Firebase.setFloat(fbdo, "/gpsCoordinates/speedValue", speedValue);

    display.print(gps.speed.kmph());

    Serial.print(" Speed: ");
    Serial.print(gps.speed.kmph());
    
    display.setTextSize(1);
    display.setCursor(0, 50);
    display.print("SAT:");
    display.setCursor(25, 50);
    display.print(gps.satellites.value());

    Serial.print(" SAT:");
    int satelliteValue = gps.satellites.value();
    Firebase.setInt(fbdo, "/gpsCoordinates/satelliteValue", satelliteValue);
    Serial.print(gps.satellites.value());

    display.setTextSize(1);
    display.setCursor(70, 50);
    display.print("ALT:");
    display.setCursor(95, 50);
    float altitudeValue = gps.altitude.meters();
    Firebase.setFloat(fbdo, "/gpsCoordinates/altitudeValue", altitudeValue);

    display.print(gps.altitude.meters(), 0);


    Serial.print(" ALT:");
    Serial.print(gps.altitude.meters(), 0);

    display.display();
    
  }
  else
  {
    display.clearDisplay();
    display.setTextColor(SSD1306_WHITE);
    display.setCursor(0, 0);
    display.setTextSize(3);
    display.print("No Data");
    display.display();
  }  
  delay(1000);

}
