/*
 This example connects to a WPA encrypted WiFi network,
 using the WiFi Shield 101.

 Then connects to the Arduino Cloud MQTT broker using 
 SSL, and sends updates on the status of an LED which
 is controlled by a button.

 Circuit:
 * WiFi shield attached
 * LED
 * button

 */

#include <SPI.h>
#include <WiFi101.h>
#include <WiFiSSLClient.h>

// include PubSubClient library
// https://github.com/knolleary/pubsubclient
#include <PubSubClient.h>

// WiFi settings
char ssid[]           = "yourNetwork";     //  your network SSID (name)
char password[]       = "secretPassword";  // your network password

// MQTT settings
char mqttServer[]     = "mqtt.arduino.cc";
int  mqttPort         = 8883;
char mqttClientName[] = "arduinoWiFiSSLClient";
char mqttUsername[]   = "username";       // your MQTT username
char mqttPassword[]   = "password";       // your MQTT password
char mqttTopic[]      = "/username/001";  // your MQTT topic /<username>/topic

// constants won't change. They're used here to
// set pin numbers:
const int buttonPin   = 2;     // the number of the pushbutton pin
const int ledPin      = 13;    // the number of the LED pin

// variables will change:
int wifiStatus        = WL_IDLE_STATUS;  // the Wifi radio's status
int buttonState       = 0;               // variable for reading the pushbutton status
int oldButtonState    = -1;              // variable for storing the old pushbutton status


// Initialize the WiFi SSL client library
WiFiSSLClient wifiSSLClient;

// Initialize the PubSubClient
PubSubClient mqttClient(mqttServer, mqttPort, wifiSSLClient);

void setup() {
  // Initialize serial and wait for port to open:
  Serial.begin(9600);
  while (!Serial) {
    ; // wait for serial port to connect. Needed for Leonardo only
  }

  setupWiFi();

  Serial.println(F("Connecting to MQTT broker ..."));
  if (mqttClient.connect(mqttClientName, mqttUsername, mqttPassword)) {
    Serial.println(F("Connected :D"));
  } else {
    Serial.println(F("Connection failed :("));
    // don't continue:
    while (true);
  }

  // initialize the LED pin as an output:
  pinMode(ledPin, OUTPUT);
  // initialize the pushbutton pin as an input:
  pinMode(buttonPin, INPUT);
}

void setupWiFi() {
  // check for the presence of the shield:
  if (WiFi.status() == WL_NO_SHIELD) {
    Serial.println(F("WiFi shield not present"));
    // don't continue:
    while (true);
  }

  Serial.print("Firmware version is ");
  Serial.println(WiFi.firmwareVersion());

  // attempt to connect to Wifi network:
  while (wifiStatus != WL_CONNECTED) {
    Serial.print(F("Attempting to connect to WPA SSID: "));
    Serial.println(ssid);
    // Connect to WPA/WPA2 network:
    wifiStatus = WiFi.begin(ssid, password);

    if (wifiStatus != WL_CONNECTED) {
      // wait 10 seconds for next connection attempt
      delay(10000);
    }
  }

  Serial.println(F("Connected to wifi"));

  Serial.print(F("SSID: "));
  Serial.println(WiFi.SSID());

  // print your WiFi shield's IP address:
  IPAddress ip = WiFi.localIP();
  Serial.print(F("IP Address: "));
  Serial.println(ip);

  Serial.print(F("signal strength (RSSI):"));
  Serial.print(WiFi.RSSI());
  Serial.println(F(" dBm"));
}

void loop() {
  // read the state of the pushbutton value:
  buttonState = digitalRead(buttonPin);

  // compare button state to old, to see 
  // if it has changed
  if (oldButtonState != buttonState) {
    // it has changed store the new value:
    oldButtonState = buttonState;

    // check if the pushbutton is pressed.
    // if it is, the buttonState is HIGH:
    if (buttonState == HIGH) {
      Serial.println(F("Button pressed"));
      
      // turn LED on:
      digitalWrite(ledPin, HIGH);

      // publish new value for topic to MQTT broker
      mqttClient.publish(mqttTopic, "255");
    } else {
      Serial.println(F("Button released"));
      
      // turn LED off:
      digitalWrite(ledPin, LOW);

      // publish new value for topic to MQTT broker
      mqttClient.publish(mqttTopic, "0");
    }
  }
}
