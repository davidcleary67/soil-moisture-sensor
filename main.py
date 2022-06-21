# Soil Moisture Level Sensor
# Once every hour, read soil moisture level sensor and
# send level to thingspeak.com on the Internet

# Startup code

# Connect to WLAN
basic.show_icon(IconNames.SAD)
ESP8266_IoT.init_wifi(SerialPin.P8, SerialPin.P12, BaudRate.BAUD_RATE115200)
ESP8266_IoT.connect_wifi("your_ssid", "your_pwd")
basic.show_icon(IconNames.SAD)

timeout = 60000  # Set timeout to one hour
timer = 0        # Set timer to 0
soilMoisture = 0 # Set soil moisture level to 0

# Once every hour, read soil moisture level and send it to
# thingspeak.com on the Internet via the WLAN
def on_forever():
    global soilMoisture, timer

    # One hour has elapsed since soil moisture level was processed
    if timer > timeout:

        # Read soil moisture level from sensor
        soilMoisture = pins.analog_read_pin(AnalogPin.P0)

        # Display soil moisture level on screen as a bar chart
        led.plot_bar_graph(soilMoisture, 1023)

        # Send soil moisture level to thingspeak.com
        ESP8266_IoT.connect_thing_speak()
        ESP8266_IoT.set_data("your_write_api_key", soilMoisture)
        ESP8266_IoT.upload_data()

        # Reset timer
        timer = 0

    # Wait one second and increment timer
    basic.pause(1000)
    timer += 1

# Start main loop
basic.forever(on_forever)
