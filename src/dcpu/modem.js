const TRANSMIT_INTERVAL = 1000 / 10

export default class Modem {
  constructor(emulator, client) {
    this.emulator = emulator
    this.client = client

    this.id           = 0x43531910
    this.manufacturer = 0x41acf57b
    this.version      = 0x0003
  }

  init() {
    this.rxChannel = 0
    this.txChannel = 0

    this.txBuffer     = []
    this.rxBuffer     = []
    this.txDelay      = 0

    this.rxInterruptMessage = 0

    this.client.onReceive = this.receive.bind(this)
    this.timer = setInterval(this.transmit.bind(this), TRANSMIT_INTERVAL)
    this.running = true
  }

  interrupt() {
    let code = this.emulator.Registers.A.get()
    switch (code) {
      case 0:
        // TODO
        break
      case 1:
        // TODO
        break
      case 2:
        this.setTxChannel(
          this.emulator.Registers.B.get()
        )
        break
      case 3:
        this.setRxChannel(
          this.emulator.Registers.B.get()
        )
        break
      case 4:
        this.transmitData(
          this.emulator.Registers.B.get(),
          this.emulator.Registers.C.get()
        )
        break
      case 5:
        let size = this.receiveData(
          this.emulator.Registers.C.get()
        )
        this.emulator.Registers.B.set(size)
        break
      case 6:
        this.enableRxInterrupt(
          this.emulator.Registers.B.get()
        )
        break
    }
  }

  setTxChannel(channel) {
    if (channel < 0x00 || channel > 0xff)
    {
      this.txChannel = 0
    } else {
      this.txChannel = channel
    }
  }

  setRxChannel(channel) {
    if (channel < 0x00 || channel > 0xff)
    {
      this.rxChannel = 0
    } else {
      this.rxChannel = channel
    }
  }

  transmitData(length, memoryOffset) {
    let i = memoryOffset
    for(let i = memoryOffset; i < memoryOffset + length; i++) {
      this.txBuffer.push(this.emulator.RAM[i])
    }
  }

  receiveData(memoryOffset) {
    let i = memoryOffset
    let length = this.rxBuffer.length

    while (this.rxBuffer.length > 0) {
      this.emulator.RAM[i++] = this.rxBuffer.shift()
    }
    return length
  }

  enableRxInterrupt(interruptMessage) {
    this.rxInterruptMessage = interruptMessage
  }

  transmit() {
    if (this.txDelay > 0) {
      this.txDelay--
    }

    if (this.txDelay == 0) {
      if (this.txBuffer.length > 0) {
        this.txDelay += this.txBuffer.length
        this.client.transmit(this.txChannel, this.txBuffer);
        this.txBuffer = []
      }
    }
  }

  receive(channel, data) {
    if (this.rxChannel == channel) {
      for (var i = 0; i < data.length; i++) {
        this.rxBuffer.push(data[i]);
      }

      if (this.rxInterruptMessage) {
        this.emulator.interrupt(this.rxInterruptMessage);
      }
    }
  }
}
