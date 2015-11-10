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
    this.txStartIndex = 0
    this.txEndIndex   = 0
    this.txDelay      = 0

    this.rxBuffer     = []
    this.rxStartIndex = 0
    this.rxEndIndex   = 0

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
    for(let i = memoryOffset; i < memoryOffset + length; i++) {
      this.txBuffer[this.txEndIndex++] = this.emulator.RAM[i]
    }
    console.log('wrote', length, 'words to tx buffer', this.txStartIndex, this.txEndIndex)
  }

  receiveData(memoryOffset) {
    let i = memoryOffset
    while(this.rxStartIndex < this.rxEndIndex) {
      this.emulator.RAM[i++] = this.rxBuffer[this.rxStartIndex++]
    }
    let length = memoryOffset - i
    console.log('read', length, 'words from rx buffer', this.rxStartIndex, this.rxEndIndex)
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
      if (this.txStartIndex < this.txEndIndex) {
        var txData = []

        while (this.txStartIndex < this.txEndIndex) {
          txData.push(this.txBuffer[this.txStartIndex++]);
          this.txDelay++
        }

        this.client.transmit(this.txChannel, txData);
        console.log("read", txData.length, "words from tx buffer", this.txStartIndex, this.txEndIndex);
      }
    }
  }

  receive(channel, data) {
    if (this.rxChannel == channel) {
      for (var i = 0; i < data.length; i++) {
        this.rxBuffer[this.rxEndIndex++] = data[i];
      }
      console.log('wrote', data.length, 'words to rx buffer', this.rxStartIndex, this.rxEndIndex)

      if (this.rxInterruptMessage) {
        this.emulator.interrupt(this.rxInterruptMessage);
      }
    }
  }
}
