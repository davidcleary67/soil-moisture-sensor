//  Soil Moisture Level Sensor
//  Once every hour, read soil moisture level sensor and
//  send level to thingspeak.com on the Internet
//  Startup code
//  Connect to WLAN
basic.showIcon(IconNames.Sad)
ESP8266_IoT.initWIFI(SerialPin.P8, SerialPin.P12, BaudRate.BaudRate115200)
ESP8266_IoT.connectWifi("your_ssid", "your_pwd")
basic.showIcon(IconNames.Sad)
let timeout = 60000
//  Set timeout to one hour
let timer = 0
//  Set timer to 0
let soilMoisture = 0
//  Set soil moisture level to 0
//  Once every hour, read soil moisture level and send it to
//  thingspeak.com on the Internet via the WLAN
//  Start main loop
basic.forever(function on_forever() {
    
    //  One hour has elapsed since soil moisture level was processed
    if (timer > timeout) {
        //  Read soil moisture level from sensor
        soilMoisture = pins.analogReadPin(AnalogPin.P0)
        //  Display soil moisture level on screen as a bar chart
        led.plotBarGraph(soilMoisture, 1023)
        //  Send soil moisture level to thingspeak.com
        ESP8266_IoT.connectThingSpeak()
        ESP8266_IoT.setData("your_write_api_key", soilMoisture)
        ESP8266_IoT.uploadData()
        //  Reset timer
        timer = 0
    }
    
    //  Wait one second and increment timer
    basic.pause(1000)
    timer += 1
})
