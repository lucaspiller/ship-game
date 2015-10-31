// compiled version of programs/demo.dasm
const DEMO_BYTECODE = [7680,35043,7712,31762,34455,31794,35324,8129,61,34035,32641,1,34817,31777,61440,31296,61,33985,34017,33889,33921,35010,44258,32978,31776,32,31986,65530,31776,47,32641,21,34914,31786,255,35954,31787,61440,36978,31787,3840,36978,33889,31296,61,33985,25473,34946,31786,65280,35986,31787,240,37010,49195,37010,33921,31296,61,34017,25473,0]

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
        console.log(bytecode)
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
