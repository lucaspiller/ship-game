import Emulator from './dcpu/emulator'
import Debugger from './dcpu/debugger'
import Thrusters from './dcpu/thrusters'
import Monitor from './dcpu/lem1802'
import Keyboard from './dcpu/keyboard'
import InertialNavigation from './dcpu/inertial_navigation'
import BytecodeLoader from './dcpu/bytecode_loader'
import Modem from './dcpu/modem'

import Client from './client'

export default class Main {
  run() {
    this.emulator = false

    Gt.onStart = (function(ship) {
      this.emulator = new Emulator()
      this.emulator.devices = []

      let thrusters = new Thrusters(this.emulator, ship)
      this.emulator.devices.push(thrusters)

      let monitor = new Monitor(this.emulator, this.buildMonitorCanvas())
      this.emulator.devices.push(monitor)

      let keyboard = new Keyboard(this.emulator)
      this.emulator.devices.push(keyboard)

      let nav = new InertialNavigation(this.emulator, ship)
      this.emulator.devices.push(nav)

      let modem = new Modem(this.emulator, this.client)
      this.emulator.devices.push(modem)

      this.client.connect()

      if (window.location.hash == "#debugger") {
        this.setupDebugger();
      }

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

    this.client = new Client()

    Gt.c = new Gt.Controller(this.buildEtagCanvas())
  }

  buildLoader() {
    let div = document.createElement('div')
    div.className = 'box uploader'

    let input = document.createElement('input')
    input.type = 'file'

    div.appendChild(input)

    let column = document.getElementById('left-column')
    column.insertBefore(div, column.firstChild)

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

  buildMonitorCanvas() {
    let canvas = document.createElement('canvas')
    canvas.className = 'monitor'

    let column = document.getElementById('left-column')
    column.appendChild(canvas)
    return canvas
  }

  setupDebugger() {
    console.log('Running debugger');

    let _debugger = new Debugger(this.emulator)
    _debugger.onStep = (location) => {
      let table = {
        val: {},
        mem: {}
      }

      for(let reg in this.emulator.Registers) {
        let val = this.emulator.Registers[reg].get();
        let memoryVal = this.emulator.RAM[val] || 0;

        table.val[reg] = val.toString(16);
        table.mem[reg] = memoryVal.toString(16);
      }

      console.table(table);
    }
    _debugger.onPaused = _debugger.onStep;
    _debugger.toggleBreakpoint("0", "0");

    window.n = function() {
      _debugger.step();
    }
  }
}
