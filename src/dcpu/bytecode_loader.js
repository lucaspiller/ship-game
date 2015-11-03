// compiled version of programs/thruster_demo.dasm
const DEMO_BYTECODE = [0x1a00,0x84e1,0x1e20,0x7c12,0x8697,0x7f81,0x000d,0x88e2,0x18f2,0x7f81,0x0053,0x7f81,0x0002,0x1fc1,0x0011,0x7f81,0x0007,0xffff,0x8401,0x7a40,0x0011,0x7c2a,0x00ff,0x7c01,0xf000,0x002b,0x8801,0x7a40,0x0011,0x6381,0x8401,0x7a40,0x0011,0x7c2a,0x00ff,0x7c01,0x0f00,0x002b,0x8801,0x7a40,0x0011,0x6381,0x8401,0x7a40,0x0011,0x7c2a,0x00ff,0x8801,0x7a40,0x0011,0x6381,0x8401,0x7a40,0x0011,0x7c2a,0xff00,0x7c01,0x00f0,0x002b,0x8801,0x7a40,0x0011,0x6381,0x8401,0x7a40,0x0011,0x7c2a,0xff00,0xc001,0x002b,0x8801,0x7a40,0x0011,0x6381,0x8401,0x7a40,0x0011,0x7c2a,0xff00,0x8801,0x7a40,0x0011,0x6381,0x7cc1,0x8000,0x8461,0x8481,0x80d2,0x7c20,0x0065,0x7cf4,0xfff0,0x7c20,0x0075,0x7cf4,0xfff0,0x84e1,0x88c2,0xace2,0x7f81,0x0057,0x8472,0x7c20,0x0012,0x8872,0x7c20,0x002a,0x8c72,0x7c20,0x001e,0x9072,0x7c20,0x002a,0x8862,0x9472,0x8461,0x6381,0x8492,0x7c20,0x0033,0x8892,0x7c20,0x004a,0x9092,0x7c20,0x003f,0x9492,0x7c20,0x004a,0x8882,0x9c92,0x8481,0x6381]

export default class BytecodeLoader {

  constructor(element, callback) {
    this.element = element
    this.callback = callback

    this.element.addEventListener('change', this.loadFromFile.bind(this))
    this.loadFromStorage()
  }

  loadFromStorage() {
    try {
      let bytecode = JSON.parse(localStorage.getItem("bytecode"))
      if (bytecode) {
        this.callback(bytecode)
      } else {
        this.loadDemo()
      }
    } catch (err) {
      console.log("Caught error:", err)
      this.loadDemo()
    }
  }

  loadDemo() {
    console.log("Loading demo bytecode")
    this.callback(DEMO_BYTECODE)
  }

  loadFromFile() {
    if (!window.FileReader) {
      alert("Sorry, your browser isn't supported :(")
      return
    }

    let callback = this.callback
    let reader = new FileReader()
    reader.onload = function() {
      let bytecode = new Array(Math.ceil(reader.result.length / 2))

      let i = 0
      let j = 0
      while(i < reader.result.length) {
        let low  = reader.result.charCodeAt(i++) || 0
        let high = reader.result.charCodeAt(i++) || 0

        bytecode[j++] = (low << 8) + high
      }

      localStorage.setItem("bytecode", JSON.stringify(bytecode))
      callback(bytecode)
    }
    reader.readAsBinaryString(this.element.files[0])
  }
}