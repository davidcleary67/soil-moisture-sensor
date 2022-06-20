let soilMoisture = 0
basic.showIcon(IconNames.Happy)
let timer = 0
basic.forever(function () {
    if (timer > 5) {
        soilMoisture = pins.analogReadPin(AnalogPin.P0)
        led.plotBarGraph(
        soilMoisture,
        1023
        )
        timer = 0
    }
    basic.pause(1000)
    timer += 1
})
