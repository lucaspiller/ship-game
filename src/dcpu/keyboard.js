let keyMapping = {}
keyMapping[9]  = 0x09 // tab
keyMapping[8]  = 0x10 // backspace
keyMapping[13] = 0x11 // return / enter
keyMapping[45] = 0x12 // insert
keyMapping[46] = 0x13 // delete
keyMapping[38] = 0x80 // up arrow
keyMapping[40] = 0x81 // down arrow
keyMapping[37] = 0x82 // left arrow
keyMapping[39] = 0x83 // right arrow
keyMapping[16] = 0x90 // shift
keyMapping[17] = 0x91 // control

// Non spec keys:
keyMapping[36] = 0x14 // home
keyMapping[35] = 0x15 // end
keyMapping[33] = 0x84 // page up
keyMapping[34] = 0x85 // page down

let mapKey = function(ev) {
  if (ev.charCode == 0) {
    // user pressed a non-printable key, this is the JS key code
    return keyMapping[ev.keyCode]
  } else {
    // user pressed a printable key, this is the Unicode character code
    if (ev.charCode >= 0x20 && ev.charCode <= 0x7f) {
      return ev.charCode
    }
  }

  // if we are still here, the key isn't supported by the DCPU :(
  return undefined
}

export default class Keyboard {
  constructor(emulator) {
    this.emulator = emulator

    this.id           = 0x30cf7406
    this.manufacturer = 0x41acf57b
    this.version      = 1
  }

  init() {
    this.interruptValue = 0
    this.keyBuffer = []
    document.body.onkeydown  = this.keyEvent.bind(this)
    document.body.onkeypress = this.keyEvent.bind(this)
  }

  interrupt() {
    let code = this.emulator.Registers.A.get()
    switch (code) {
      case 0:
        // clear buffer
        this.clearBuffer()
        break
      case 1:
        // read last character into C
        let char = this.readBuffer();
        this.emulator.Registers.C.set(char)
        break
      case 2:
        // TODO check if key down
        this.emulator.Registers.C.set(0)
        break
      case 3:
        // set interrupt value
        let value = this.emulator.Registers.B.get()
        this.setInterruptValue(value)
        break
    }
  }

  clearBuffer() {
    this.keyBuffer = []
  }

  readBuffer() {
    let code = this.keyBuffer.shift()
    if (code !== undefined)
    {
      return code
    } else {
      return 0
    }
  }

  setInterruptValue(value) {
    this.interruptValue = value
  }

  keyEvent(ev) {
    let code = mapKey(ev)
    console.log(ev.keyCode, ev.charCode, code);
    if (code === undefined) {
      return
    }

    this.keyBuffer.push(code)

    if (this.interruptValue > 0) {
      this.emulator.interrupt(this.interruptValue)
    }

    // capture the key press
    ev.preventDefault()
    return false
  }
}
