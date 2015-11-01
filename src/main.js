import Emulator from './dcpu/emulator'
import Thrusters from './dcpu/thrusters'
import BytecodeLoader from './dcpu/bytecode_loader'

export default class Main {
  run() {
    this.emulator = false

    Gt.onStart = (function(ship) {
      this.emulator = new Emulator()
      this.emulator.devices = []

      let thrusters = new Thrusters(this.emulator, ship)
      this.emulator.devices.push(thrusters)

      new BytecodeLoader(this.buildLoader(), bytecode => {
        this.emulator.reboot()
        this.emulator.run(bytecode)
        this.emulator.runAsync()
      })
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

  buildLoader() {
    let div = document.createElement('div')
    div.className = 'box uploader'

    let input = document.createElement('input')
    input.type = 'file'

    div.appendChild(input)

    let column = document.getElementById('left-column')
    column.appendChild(div)

    return input
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


    let column = document.getElementById('right-column')
    column.appendChild(canvas)
    return canvas
  }
}
