export default class IntertialNavigation {
  constructor(emulator, ship) {
    this.emulator = emulator
    this.ship     = ship

    this.id           = 0xe9c81842
    this.manufacturer = 0x6db11857
    this.version      = 0x020f
  }

  init() {
    this.referenceX = Math.floor(Math.random() * 65536)
    this.referenceY = Math.floor(Math.random() * 65536)
  }

  interrupt() {
    let code = this.emulator.Registers.A.get()
    switch (code) {
      case 0:
        this.emulator.Registers.X.set(this.getXPosition())
        this.emulator.Registers.Y.set(this.getYPosition())
        break
      case 1:
        this.emulator.Registers.X.set(this.getXVelocity())
        this.emulator.Registers.Y.set(this.getYVelocity())
        break
      case 2:
        this.setReferenceFrame(
          this.emulator.Registers.X.get(),
          this.emulator.Registers.Y.get()
        )
    }
  }

  setReferenceFrame(x, y) {
    this.referenceX = this.referenceX - x
    this.referenceY = this.referenceY - y
  }

  getXPosition() {
    return Math.abs(this.referenceX + this.ship.position.x) & 0xffff
  }

  getYPosition() {
    return Math.abs(this.referenceY + this.ship.position.y) & 0xffff
  }

  getXVelocity() {
    return Math.abs(this.ship.velocity.x * 1000) & 0xffff
  }

  getYVelocity() {
    return Math.abs(this.ship.velocity.y * 1000) & 0xffff
  }
}
