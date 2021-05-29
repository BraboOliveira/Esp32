#include <WiFi.h>
#include <FirebaseESP32.h>
#include "DHT.h"
#define DHTPIN 32
#define DHTTYPE DHT11
#define MQ137PIN 33
#include <HTTPClient.h>

#define FIREBASE_HOST "https://auth-555.firebaseio.com/"
#define FIREBASE_AUTH "7hJztojiEL2Xszpk3CDGWtXT6kemmhsjVS98QhMB"
#define WIFI_SSID "Rafael"
#define WIFI_PASSWORD "ufpa20142848"

//Define FirebaseESP32 data object
FirebaseData firebaseData;
FirebaseJson json;
const char* serverName = "http://vendebelem.com/api/post-esp-data.php";
String apiKeyValue = "0574A9je4X54";
int pin_ldr = 35; 
float umi = 0;
float temp = 0;
int lumi = 0;
int nh3 = 0;

DHT dht(DHTPIN, DHTTYPE);

FirebaseJson json1;
String path = "/config";
int freq = 5000;

void setup()
{
  Serial.begin(115200);
  pinMode(MQ137PIN, INPUT);
  dht.begin();
  pinMode(pin_ldr, INPUT); 
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi");

  while (WiFi.status() != WL_CONNECTED)
    {
      Serial.print(".");
      delay(500);
    }
  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();
 
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  Firebase.reconnectWiFi(true);

    Firebase.setReadTimeout(firebaseData, 1000 * 60);
  //tiny, small, medium, large and unlimited.
  //Size and its write timeout e.g. tiny (1s), small (10s), medium (30s) and large (60s).
  Firebase.setwriteSizeLimit(firebaseData, "tiny");

  //optional, set the decimal places for float and double data to be stored in database
  Firebase.setFloatDigits(2);
  
  Serial.println("------------------------------------");
  Serial.println("Connected...");      

  Firebase.getInt(firebaseData, path + "/frequencia");
  freq = firebaseData.intData();
  Serial.println(freq);
}

char sensor(){
  umi = dht.readHumidity();
  temp = dht.readTemperature();
  lumi = map(analogRead(pin_ldr),0,4095,0,1000);
  return(umi, temp, lumi);
  }

void loop(){
  umi = dht.readHumidity();
  temp = dht.readTemperature();
  lumi = map(analogRead(pin_ldr),0,4095,1000,0);
  nh3 = analogRead(MQ137PIN);
//  u, t, l = sensor();
  Serial.print("Luz: " +  String(lumi));
  Serial.print(" - ");
  Serial.print("Temp: " + String(temp));
  Serial.print(" - ");
  Serial.print("Hum: " + String(umi));
  Serial.print(" - ");
  Serial.println("NH3: " + String(nh3));

  Firebase.getInt(firebaseData, path + "/iniciar");
  int iniciar = firebaseData.intData();
  Serial.print("iniciar: ");
  Serial.println(iniciar);

  if(iniciar){
  if (WiFi.status()== WL_CONNECTED)
    {
      HTTPClient http;
      http.begin(serverName);
      http.addHeader("Content-Type", "application/x-www-form-urlencoded");
      String httpRequestData = "api_key=" + apiKeyValue + "&umi=" + String(umi) +
      "&temp=" + String(temp) + "&lumi=" + String(lumi) + "&nh3=" + String(nh3) + "";
      int httpResponseCode = http.POST(httpRequestData);
      Serial.print("HTTP Response code: ");
      Serial.println(httpResponseCode);
      http.end();
    }
    else
    {
        Serial.println(WiFi.status());
    }
  }
  else {
    Serial.println("Dados não enviados para o Realtime Database");
    }
delay(freq);
  }
