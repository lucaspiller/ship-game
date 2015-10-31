export default class Thrusters {
  constructor(emulator, ship) {
    this.emulator = emulator
    this.ship     = ship

    this.id           = 0x89fc8697
    this.manufacturer = 0x41acf57b
    this.version      = 1
  }

  init() {
    this.state = 0x0000
  }

  interrupt() {
    let code = this.emulator.Registers.A.get()
    switch (code) {
      case 0:
        this.emulator.Registers.B.set(this.state)
      case 1:
        this.state = this.emulator.Registers.B.get()
    }
  }

  step() {
    switch (this.state >>> 8) {
      case 0x0f:
        this.ship.backward()
        break
      case 0xf0:
        this.ship.forward()
        break
    }

    switch (this.state & 0xff) {
      case 0xf0:
        this.ship.rotate(-1)
        break
      case 0x0f:
        this.ship.rotate(1)
        break
      default:
        this.ship.rotate(0)
        break
    }
  }
}
