import Emulator from './dcpu/emulator'
import Thrusters from './dcpu/thrusters'

export default class Main {
  run() {
    this.emulator = false
    this.bytecode = [7680,35043,7712,31762,34455,31794,35324,8129,61,34035,32641,1,34817,31777,61440,31296,61,33985,34017,33889,33921,35010,44258,32978,31776,32,31986,65530,31776,47,32641,21,34914,31786,255,35954,31787,61440,36978,31787,3840,36978,33889,31296,61,33985,25473,34946,31786,65280,35986,31787,240,37010,49195,37010,33921,31296,61,34017,25473,0]

    Gt.onStart = (function(ship) {
      this.emulator = new Emulator()
      this.emulator.devices = []

      let thrusters = new Thrusters(this.emulator, ship)
      this.emulator.devices.push(thrusters)

      this.emulator.run(this.bytecode)
      this.emulator.runAsync()
    }).bind(this)

    Gt.onStop = (function() {
      this.emulator.paused = true
    }).bind(this)

    Gt.onStep = (function() {
      if (!this.emulator.paused) {
        for(let device of this.emulator.devices) {
          if (device.step) {
            device.step()
          }
        }
      }
    }).bind(this)

    Gt.c = new Gt.Controller(this.buildEtagCanvas())
  }

  buildEtagCanvas() {
    let canvas = document.createElement('canvas')
    canvas.className = 'etag'
    canvas.height = window.innerHeight
    canvas.width  = window.innerWidth - 700

    window.onresize = function() {
      canvas.height = window.innerHeight
      canvas.width  = window.innerWidth - 700
    }

    document.body.appendChild(canvas)
    return canvas
  }
}
