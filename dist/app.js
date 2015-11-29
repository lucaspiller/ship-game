(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _interopRequire = function _interopRequire(obj) {
  return obj && obj.__esModule ? obj["default"] : obj;
};

var Main = _interopRequire(require("./main"));

// Create a new instance of the game and run it
document.addEventListener("DOMContentLoaded", function (evt) {
  var app = new Main();
  app.run();
});

},{"./main":11}],2:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Client = (function () {
  function Client() {
    _classCallCheck(this, Client);
  }

  _createClass(Client, {
    connect: {
      value: function connect() {
        this.connection = new WebSocket(this.uri);
        this.connection.onopen = this.onopen.bind(this);
        this.connection.onerror = this.onerror.bind(this);
        this.connection.onmessage = this.onmessage.bind(this);
      }
    },
    onopen: {
      value: function onopen() {
        console.log("[Client] Connected");
      }
    },
    onerror: {
      value: function onerror(err) {
        console.log("[Client] Error", err);
      }
    },
    onmessage: {
      value: function onmessage(e) {
        console.log("[Client] Data", e.data);
        var packet = JSON.parse(e.data);
        if (packet.type == "radio") {
          if (this.onReceive) {
            this.onReceive(packet.channel, packet.data);
          } else {
            console.warn("No onReceive set");
          }
        } else {
          console.warn("Unknown packet type", packet.type);
        }
      }
    },
    transmit: {
      value: function transmit(channel, data) {
        var packet = {
          type: "radio",
          channel: channel,
          data: data
        };
        this.connection.send(JSON.stringify(packet));
      }
    },
    uri: {
      get: function () {
        return "ws://localhost:8080/";
      }
    }
  });

  return Client;
})();

module.exports = Client;

},{}],3:[function(require,module,exports){
"use strict";

var _createClass = (function () {
  function defineProperties(target, props) {
    for (var key in props) {
      var prop = props[key];prop.configurable = true;if (prop.value) prop.writable = true;
    }Object.defineProperties(target, props);
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
})();

var _classCallCheck = function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

// compiled version of programs/control.dasm
var DEMO_BYTECODE = [32641, 110, 6656, 34017, 7712, 31762, 62997, 8129, 30, 31762, 29702, 8129, 31, 31762, 6416, 8129, 32, 31762, 6210, 8129, 33, 31762, 34455, 8129, 34, 35042, 6387, 32641, 4, 25473, 65535, 65535, 65535, 65535, 65535, 33793, 31777, 32768, 31296, 30, 25473, 1281, 2316, 25473, 769, 31745, 32, 4100, 3074, 31746, 32768, 31776, 41, 24577, 25473, 2817, 8257, 33874, 32641, 70, 31776, 44, 34914, 31858, 32, 31776, 72, 34818, 32641, 56, 24641, 25473, 33889, 34946, 45204, 33921, 25473, 3841, 2817, 33889, 31809, 32, 31776, 44, 31858, 31, 32641, 91, 34914, 32641, 82, 24641, 24673, 25473, 769, 2817, 1089, 31820, 32, 31745, 32768, 2305, 34818, 31766, 33152, 32641, 101, 24641, 24577, 25473, 31776, 2, 31776, 35, 36865, 31777, 18433, 31296, 31, 34817, 33825, 31296, 34, 32064, 207, 33825, 31776, 94, 33953, 34978, 31926, 767, 32641, 129, 33953, 31776, 143, 31776, 230, 31776, 293, 32641, 129, 35794, 390, 31776, 184, 35794, 389, 31776, 193, 35794, 391, 31776, 202, 31826, 144, 35777, 390, 31826, 145, 35777, 389, 50258, 35777, 391, 42945, 393, 35841, 31777, 130, 31296, 31, 34898, 34753, 393, 31777, 131, 31296, 31, 34898, 50113, 393, 25473, 30721, 392, 49174, 34818, 961, 392, 34753, 390, 25473, 30721, 392, 33812, 34819, 961, 392, 34753, 389, 25473, 42945, 392, 34753, 391, 25473, 31762, 18433, 31776, 213, 32096, 0, 2817, 34817, 31296, 31, 31826, 144, 35777, 390, 31826, 145, 35777, 389, 50258, 35777, 391, 24641, 25473, 2817, 33825, 30721, 392, 42004, 31776, 254, 42006, 31776, 276, 42031, 30721, 393, 42004, 49217, 42006, 31809, 240, 2092, 34817, 31296, 34, 24641, 25473, 43026, 31777, 32, 44050, 31777, 64, 45074, 31777, 96, 46098, 31777, 128, 47122, 31777, 160, 48146, 31777, 192, 49170, 31777, 240, 25473, 33810, 49185, 34834, 48161, 35858, 46113, 36882, 44065, 37906, 42017, 38930, 39969, 39954, 37921, 40978, 35873, 25473, 32128, 1, 31776, 302, 31776, 349, 32128, 0, 25473, 31777, 61440, 33985, 30945, 392, 30881, 392, 36071, 43137, 31809, 32, 39058, 31809, 61, 40082, 31809, 61, 42164, 41110, 7382, 31809, 43, 49330, 35986, 31809, 43, 42166, 38036, 7380, 31809, 45, 33970, 43154, 31809, 45, 49249, 31776, 44, 50273, 31776, 44, 34947, 35010, 34964, 32641, 311, 25473, 35969, 31777, 61440, 42966, 393, 31777, 3840, 31809, 76, 41057, 31776, 44, 31809, 32, 40033, 31776, 44, 42081, 31776, 44, 31777, 61440, 42964, 393, 31777, 3840, 31809, 82, 58465, 31776, 44, 31809, 32, 57441, 31776, 44, 59489, 31776, 44, 25473, 0, 0, 0, 8, 8];

var BytecodeLoader = (function () {
  function BytecodeLoader(element, callback) {
    _classCallCheck(this, BytecodeLoader);

    this.element = element;
    this.callback = callback;

    this.element.addEventListener("change", this.loadFromFile.bind(this));
    this.loadFromStorage();
  }

  _createClass(BytecodeLoader, {
    loadFromStorage: {
      value: function loadFromStorage() {
        try {
          var bytecode = JSON.parse(localStorage.getItem("bytecode"));
          if (bytecode) {
            this.callback(bytecode);
          } else {
            this.loadDemo();
          }
        } catch (err) {
          console.log("Caught error:", err);
          this.loadDemo();
        }
      }
    },
    loadDemo: {
      value: function loadDemo() {
        console.log("Loading demo bytecode");
        this.callback(DEMO_BYTECODE);
      }
    },
    loadFromFile: {
      value: function loadFromFile() {
        if (!window.FileReader) {
          alert("Sorry, your browser isn't supported :(");
          return;
        }

        var callback = this.callback;
        var reader = new FileReader();
        reader.onload = function () {
          if (reader.result.indexOf("SET ") > 0) {
            alert("It looks like you selected an Assembly source file. Only compiled bytecode (in little endian format) is supported.");
          }

          var bytecode = new Array(Math.ceil(reader.result.length / 2));

          var i = 0;
          var j = 0;
          while (i < reader.result.length) {
            var low = reader.result.charCodeAt(i++) || 0;
            var high = reader.result.charCodeAt(i++) || 0;

            bytecode[j++] = (low << 8) + high;
          }

          localStorage.setItem("bytecode", JSON.stringify(bytecode));
          callback(bytecode);
        };
        reader.readAsBinaryString(this.element.files[0]);
      }
    }
  });

  return BytecodeLoader;
})();

module.exports = BytecodeLoader;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
//
// DCPU-16 Debugger
//
// Based upon DCPU-16 IDE by John McCann
// https://github.com/dangermccann/dcpu16-ide
//
// Copyright (c) 2012 John McCann
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
//
//

function Debugger(_emulator) {
  if (!_emulator.async) throw "Emulator must be in asynchronous mode to use a debugger with it.";
  this.emulator = _emulator;
  this.breakpoints = {};

  this.emulator.attachDebugger(this);
}
Debugger.prototype.getBreakpoints = function () {
  return this.breakpoints;
};
Debugger.prototype.toggleBreakpoint = function (location, lineNumber) {
  location += ""; // convert to string
  if (this.breakpoints[location]) delete this.breakpoints[location];else this.breakpoints[location] = lineNumber;
};
Debugger.prototype.run = function () {
  if (this.emulator.paused) {
    this.emulator.paused = false;
    this.emulator.runAsync();
  }
};
Debugger.prototype.step = function () {
  if (this.emulator.paused) {
    if (!this.emulator.step()) this.emulator.exit();
  }
};
Debugger.prototype.pause = function () {
  this.emulator.paused = true;
};

// events
Debugger.prototype.onStep = function (location) {};
Debugger.prototype.onPaused = function (location) {};
Debugger.prototype.onInstruction = function (location) {};
Debugger.prototype.onExit = function () {};

exports["default"] = Debugger;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
//
// DCPU-16 Emulator
//
// Based upon DCPU-16 IDE by John McCann
// https://github.com/dangermccann/dcpu16-ide
//
// Copyright (c) 2012 John McCann
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
//

function Register(_name, _value, _emulator) {
  this.name = _name;
  this.value = _value;
  this.emulator = _emulator;
  this.contents = 0;
}
Register.prototype.getA = Register.prototype.getB = Register.prototype.get = function () {
  return this.contents;
};
Register.prototype.set = function (val) {
  this.contents = val;
};

function RegisterValue(_register) {
  this.register = _register;
  this.emulator = _register.emulator;
}
RegisterValue.prototype.getA = RegisterValue.prototype.getB = RegisterValue.prototype.get = function () {
  return this.emulator.RAM[this.register.get()] || 0;
};
RegisterValue.prototype.set = function (val) {
  this.emulator.RAM[this.register.get()] = val;
};

function RegisterPlusNextWord(_register) {
  this.register = _register;
  this.emulator = _register.emulator;
  this.cachedResult = null;
}
RegisterPlusNextWord.prototype.getB = RegisterPlusNextWord.prototype.getA = RegisterPlusNextWord.prototype.get = function () {
  var nw = this.emulator.nextWord();
  if (nw == 65535) nw = -1; // TODO: why is this like this???? (required for '99 bottles' to work...)
  this.cachedResult = this.register.get() + nw;
  return this.emulator.RAM[this.cachedResult] || 0;
};
RegisterPlusNextWord.prototype.set = function (val) {
  this.emulator.RAM[this.cachedResult] = val;
};

function StackPointerValue(_emulator) {
  this.emulator = _emulator;
}
StackPointerValue.prototype.get = StackPointerValue.prototype.getB = function () {
  return this.emulator.Registers.SP.get();
};

StackPointerValue.prototype.getA = function () {
  return this.emulator.Registers.SP.pop();
};
StackPointerValue.prototype.set = function (val) {
  this.emulator.Registers.SP.push(val);
};

function Literal(_value) {
  this.value = _value;
}
Literal.prototype.getA = Literal.prototype.getB = Literal.prototype.get = function () {
  return this.value;
};
Literal.prototype.set = function (val) {};
var Literals = {};

function Op(_emulator, _name, _value, _cycles, __exec, _set) {
  this.emulator = _emulator;
  this.name = _name;
  this.value = _value;
  this.cycles = _cycles;
  this._exec = __exec;
  _set = _set || this.emulator.OpSet;
  _set[this.value] = this;
}
Op.prototype.exec = function (a, b) {
  var valA = this.emulator.getParamValue(a);
  var valB = this.emulator.getParamValue(b);

  if (!valA) throw new Error("Invalid 'a' value " + a);
  if (!valB) throw new Error("Invalid 'b' value " + b);

  this._exec(valA, valB);
  this.emulator.CPU_CYCLE += this.cycles;
};

// literals
for (var i = 32, literalVal = -1; i < 64; i++, literalVal++) {
  Literals["L_" + literalVal] = i;
}

// convenience constants
var Values = {};
Values.REGISTER_VALUE_OFFSET = 8;
Values.REGISTER_NEXT_WORD_OFFSET = 16;
Values.SP_OFFSET = 24;
Values.NEXT_WORD_VALUE = 30;
Values.NEXT_WORD_LITERAL = 31;
Values.SP = 27;
Values.PC = 28;
Values.EX = 29;

var REGISTER_A = 0;
var REGISTER_B = 1;
var REGISTER_C = 2;
var REGISTER_X = 3;
var REGISTER_Y = 4;
var REGISTER_Z = 5;
var REGISTER_I = 6;
var REGISTER_J = 7;
var REGISTER_SP = 27;
var REGISTER_PC = 28;
var REGISTER_EX = 29;

var OPERATION_SET = 1;
var OPERATION_ADD = 2;
var OPERATION_SUB = 3;
var OPERATION_MUL = 4;
var OPERATION_MLI = 5;
var OPERATION_DIV = 6;
var OPERATION_DVI = 7;
var OPERATION_MOD = 8;
var OPERATION_MDI = 9;
var OPERATION_AND = 10;
var OPERATION_BOR = 11;
var OPERATION_XOR = 12;
var OPERATION_SHR = 13;
var OPERATION_ASR = 14;
var OPERATION_SHL = 15;

var OPERATION_IFB = 16;
var OPERATION_IFC = 17;
var OPERATION_IFE = 18;
var OPERATION_IFN = 19;
var OPERATION_IFG = 20;
var OPERATION_IFA = 21;
var OPERATION_IFL = 22;
var OPERATION_IFU = 23;

var OPERATION_ADX = 26;
var OPERATION_SBX = 27;

var OPERATION_STI = 30;
var OPERATION_STD = 31;

var OPERATION_JSR = 1;
var OPERATION_INT = 8;
var OPERATION_IAG = 9;
var OPERATION_IAS = 10;
var OPERATION_RFI = 11;
var OPERATION_IAQ = 12;

var OPERATION_HWN = 16;
var OPERATION_HWQ = 17;
var OPERATION_HWI = 18;

var Utils = {
  to32BitSigned: function to32BitSigned(val) {
    if ((val & 32768) > 0) {
      return (~val + 1 & 65535) * -1; // two's complement
    }
    return val;
  },

  to16BitSigned: function to16BitSigned(val) {
    if (val < 0) {
      //return ((~val) + 1) & 0xffff;  // two's complement
      return val & 32767 | 32768;
    }
    return val & 65535;
  },

  byteTo32BitSigned: function byteTo32BitSigned(val) {
    if ((val & 128) > 0) {
      return (~val + 1 & 255) * -1; // two's complement
    }
    return val;
  },

  roundTowardsZero: function roundTowardsZero(val) {
    if (val < 0) val = Math.ceil(val);else val = Math.floor(val);
    return val;
  },

  makeInstruction: function makeInstruction(opcode, a, b) {
    var instruction = opcode;
    instruction |= b << 5;
    instruction |= a << 10;
    return instruction;
  },

  makeSpecialInstruction: function makeSpecialInstruction(opcode, a) {
    var instruction = 0;
    instruction |= a << 10;
    instruction |= opcode << 5;
    return instruction;
  },

  parseInstruction: function parseInstruction(instruction) {
    return {
      opcode: instruction & 31,
      b: (instruction & 992) >> 5,
      a: (instruction & 64512) >> 10
    };
  },

  parseSpecialInstruction: function parseSpecialInstruction(instruction) {
    return {
      a: (instruction & 64512) >> 10,
      opcode: (instruction & 992) >> 5,
      b: 0
    };
  },

  hex: function hex(num) {
    return "0x" + Utils.to16BitSigned(num).toString(16);
  },

  hex2: function hex2(num) {
    //var str = Utils.to16BitSigned(num).toString(16);
    var str = num.toString(16);
    return "0x" + "0000".substr(str.length) + str;
  },

  makeVideoCell: function makeVideoCell(glyph, blink, bg, fg) {
    var result = glyph & 127;
    result |= (blink & 1) << 7;
    result |= (bg & 15) << 8;
    result |= (fg & 15) << 12;
    return result;
  },

  color16To32: function color16To32(c) {
    var r = ((c & 3840) >> 8) * 16 << 16;
    var g = ((c & 240) >> 4) * 16 << 8;
    var b = (c & 15) * 16;
    return Utils.makeColor(r | g | b);
  },

  makeColor: function makeColor(d) {
    var hex = Number(d).toString(16);
    hex = "000000".substr(0, 6 - hex.length) + hex;
    return "#" + hex;
  },

  createImage: function createImage(src) {
    var img = new Image();
    img.src = src;
    return img;
  }

};

var Speeds = {
  "100 kHz": { delayFrequency: 1000, delayTime: 1 },
  "10 kHz": { delayFrequency: 50, delayTime: 1 },
  "1 kHz": { delayFrequency: 10, delayTime: 10 },
  "100 Hz": { delayFrequency: 10, delayTime: 100 },
  "10 Hz": { delayFrequency: 1, delayTime: 100 } };

/**
 * Emulator constructor.
 *
 * @constructor
 * @this {Emulator}
 */
function Emulator() {

  this.async = true;
  this.verbose = false;
  this.currentSpeed = Speeds["100 kHz"];

  this.CPU_CYCLE = 0;
  this.RAM = [];

  this.OpSet = {};
  this.SpecialOpSet = {};
  this.Registers = {
    A: new Register("A", REGISTER_A, this),
    B: new Register("B", REGISTER_B, this),
    C: new Register("C", REGISTER_C, this),
    X: new Register("X", REGISTER_X, this),
    Y: new Register("Y", REGISTER_Y, this),
    Z: new Register("Z", REGISTER_Z, this),
    I: new Register("I", REGISTER_I, this),
    J: new Register("J", REGISTER_J, this),
    SP: new Register("SP", REGISTER_SP, this),
    PC: new Register("PC", REGISTER_PC, this),
    EX: new Register("EX", REGISTER_EX, this),
    IA: new Register("IA", 65535, this) };

  this.Registers.PC.inc = function () {
    var v = this.get();
    this.set(v + 1);
    return v;
  };
  this.PC = this.Registers.PC;

  this.Registers.SP.push = function (val) {
    this.contents = Utils.to16BitSigned(this.contents - 1);
    this.emulator.RAM[this.contents] = val;
  };
  this.Registers.SP.pop = function () {
    if (this.contents == 0) console.log("Warning: stack underflow");

    var val = this.emulator.RAM[this.contents] || 0;
    this.emulator.RAM[this.contents] = 0; // TODO: should the emualtor alter the memory location when it is POPed?
    this.contents = this.contents + 1 & 65535;
    return val;
  };

  this.Values = {};
  this.Values[0] = this.Registers.A;
  this.Values[1] = this.Registers.B;
  this.Values[2] = this.Registers.C;
  this.Values[3] = this.Registers.X;
  this.Values[4] = this.Registers.Y;
  this.Values[5] = this.Registers.Z;
  this.Values[6] = this.Registers.I;
  this.Values[7] = this.Registers.J;
  this.Values[8] = new RegisterValue(this.Registers.A);
  this.Values[9] = new RegisterValue(this.Registers.B);
  this.Values[10] = new RegisterValue(this.Registers.C);
  this.Values[11] = new RegisterValue(this.Registers.X);
  this.Values[12] = new RegisterValue(this.Registers.Y);
  this.Values[13] = new RegisterValue(this.Registers.Z);
  this.Values[14] = new RegisterValue(this.Registers.I);
  this.Values[15] = new RegisterValue(this.Registers.J);
  this.Values[16] = new RegisterPlusNextWord(this.Registers.A);
  this.Values[17] = new RegisterPlusNextWord(this.Registers.B);
  this.Values[18] = new RegisterPlusNextWord(this.Registers.C);
  this.Values[19] = new RegisterPlusNextWord(this.Registers.X);
  this.Values[20] = new RegisterPlusNextWord(this.Registers.Y);
  this.Values[21] = new RegisterPlusNextWord(this.Registers.Z);
  this.Values[22] = new RegisterPlusNextWord(this.Registers.I);
  this.Values[23] = new RegisterPlusNextWord(this.Registers.J);
  this.Values[24] = new StackPointerValue(this);
  this.Values[25] = new RegisterValue(this.Registers.SP);
  this.Values[26] = new RegisterPlusNextWord(this.Registers.SP);
  this.Values[27] = this.Registers.SP;
  this.Values[28] = this.Registers.PC;
  this.Values[29] = this.Registers.EX;
  this.Values[30] = { // next word value
    emulator: this,
    getA: function getA() {
      return this.get();
    },
    getB: function getB() {
      return this.get();
    },
    get: function get() {
      this.cachedResult = this.emulator.nextWord();
      return this.emulator.RAM[this.cachedResult] || 0;
    },
    set: function set(val) {
      this.emulator.RAM[this.cachedResult] = val;
    }
  };
  this.Values[31] = { // next word literal
    emulator: this,
    getA: function getA() {
      return this.get();
    },
    getB: function getB() {
      return this.get();
    },
    get: function get() {
      return this.emulator.nextWord();
    },
    set: function set(val) {}
  };

  this.Values[32] = new Literal(65535); // -1
  for (var i = 33, literalVal = 0; i < 64; i++, literalVal++) {
    this.Values[i] = new Literal(literalVal);
  }

  this.BasicOperations = {
    SET: new Op(this, "SET", OPERATION_SET, 1, function (a, b) {
      var aVal = a.getA(),
          bVal = b.getB();
      b.set(aVal);

      // TODO: some applications assume that setting PC to itself should terminate the application
      //if(a == this.emulator.Registers.PC && b == this.emulator.Registers.PC) {
      //  this.emulator.Registers.PC.contents = Number.MAX_VALUE;
      //}
    }),

    ADD: new Op(this, "ADD", OPERATION_ADD, 2, function (a, b) {
      var res = a.getA() + b.getB();
      if ((res & 4294901760) > 0) this.emulator.Registers.EX.set(1);else this.emulator.Registers.EX.set(0);
      b.set(res & 65535);
    }),

    SUB: new Op(this, "SUB", OPERATION_SUB, 2, function (a, b) {
      var aVal = a.getA();
      var res = b.getB() - aVal;
      if (res < 0) this.emulator.Registers.EX.set(65535);else this.emulator.Registers.EX.set(0);
      b.set(res & 65535);
    }),

    MUL: new Op(this, "MUL", OPERATION_MUL, 2, function (a, b) {
      var res = a.getA() * b.getB();
      this.emulator.Registers.EX.set(res >> 16 & 65535);
      b.set(res & 65535);
    }),

    MLI: new Op(this, "MLI", OPERATION_MLI, 2, function (a, b) {
      var aVal = Utils.to32BitSigned(a.getA()),
          bVal = Utils.to32BitSigned(b.getB());
      var res = bVal * aVal;
      this.emulator.Registers.EX.set(res >> 16 & 65535);
      b.set(Utils.to16BitSigned(res));
    }),

    DIV: new Op(this, "DIV", OPERATION_DIV, 3, function (a, b) {
      var aVal = a.getA(),
          bVal = b.getB();
      if (aVal === 0) {
        this.emulator.Registers.EX.set(0);
        b.set(0);
      } else {
        var res = Math.floor(bVal / aVal);
        this.emulator.Registers.EX.set(Math.floor((bVal << 16) / aVal) & 65535);
        b.set(res & 65535);
      }
    }),

    DVI: new Op(this, "DVI", OPERATION_DVI, 3, function (a, b) {
      var aVal = Utils.to32BitSigned(a.getA()),
          bVal = Utils.to32BitSigned(b.getB());
      if (aVal === 0) {
        this.emulator.Registers.EX.set(0);
        b.set(0);
      } else {
        var res = Utils.roundTowardsZero(bVal / aVal);
        this.emulator.Registers.EX.set(Utils.roundTowardsZero((bVal << 16) / aVal) & 65535);
        b.set(Utils.to16BitSigned(res));
      }
    }),

    MOD: new Op(this, "MOD", OPERATION_MOD, 3, function (a, b) {
      var aVal = a.getA(),
          bVal = b.getB();
      if (aVal === 0) b.set(0);else b.set(bVal % aVal);
    }),

    MDI: new Op(this, "MDI", OPERATION_MDI, 3, function (a, b) {
      var aVal = Utils.to32BitSigned(a.getA()),
          bVal = Utils.to32BitSigned(b.getB());
      if (aVal === 0) b.set(0);else b.set(Utils.to16BitSigned(bVal % aVal));
    }),

    AND: new Op(this, "AND", OPERATION_AND, 1, function (a, b) {
      var aVal = a.getA(),
          bVal = b.getB();
      b.set(bVal & aVal);
    }),

    BOR: new Op(this, "BOR", OPERATION_BOR, 1, function (a, b) {
      var aVal = a.getA(),
          bVal = b.getB();
      b.set(bVal | aVal);
    }),

    XOR: new Op(this, "XOR", OPERATION_XOR, 1, function (a, b) {
      var aVal = a.getA(),
          bVal = b.getB();
      b.set(bVal ^ aVal);
    }),

    SHR: new Op(this, "SHR", OPERATION_SHR, 1, function (a, b) {
      var aVal = a.getA(),
          bVal = b.getB();
      this.emulator.Registers.EX.set(bVal << 16 >> aVal & 65535);
      b.set(bVal >>> aVal);
    }),

    ASR: new Op(this, "ASR", OPERATION_ASR, 1, function (a, b) {
      var aVal = a.getA(),
          bVal = Utils.to32BitSigned(b.getB());
      this.emulator.Registers.EX.set(bVal << 16 >>> aVal & 65535);
      b.set(bVal >> aVal & 65535);
    }),

    SHL: new Op(this, "SHL", OPERATION_SHL, 1, function (a, b) {
      var aVal = a.getA(),
          bVal = b.getB();
      this.emulator.Registers.EX.set(bVal << aVal >> 16 & 65535);
      b.set(bVal << aVal & 65535);
    }),

    IFB: new Op(this, "IFB", OPERATION_IFB, 2, function (a, b) {
      var aVal = a.getA(),
          bVal = b.getB();
      if ((bVal & aVal) != 0) {} else this.emulator.skipInstruction();
    }),

    IFC: new Op(this, "IFC", OPERATION_IFC, 2, function (a, b) {
      var aVal = a.getA(),
          bVal = b.getB();
      if ((bVal & aVal) === 0) {} else this.emulator.skipInstruction();
    }),

    IFE: new Op(this, "IFE", OPERATION_IFE, 2, function (a, b) {
      var aVal = a.getA(),
          bVal = b.getB();
      if (bVal === aVal) {} else this.emulator.skipInstruction();
    }),

    IFN: new Op(this, "IFN", OPERATION_IFN, 2, function (a, b) {
      var aVal = a.getA(),
          bVal = b.getB();
      if (bVal !== aVal) {} else this.emulator.skipInstruction();
    }),

    IFG: new Op(this, "IFG", OPERATION_IFG, 2, function (a, b) {
      var aVal = a.getA(),
          bVal = b.getB();
      if (bVal > aVal) {} else this.emulator.skipInstruction();
    }),

    IFA: new Op(this, "IFA", OPERATION_IFA, 2, function (a, b) {
      var aVal = Utils.to32BitSigned(a.getA()),
          bVal = Utils.to32BitSigned(b.getB());
      if (bVal > aVal) {} else this.emulator.skipInstruction();
    }),

    IFL: new Op(this, "IFL", OPERATION_IFL, 2, function (a, b) {
      var aVal = a.getA(),
          bVal = b.getB();
      if (bVal < aVal) {} else this.emulator.skipInstruction();
    }),

    IFU: new Op(this, "IFU", OPERATION_IFU, 2, function (a, b) {
      var aVal = Utils.to32BitSigned(a.getA()),
          bVal = Utils.to32BitSigned(b.getB());
      if (bVal < aVal) {} else this.emulator.skipInstruction();
    }),

    ADX: new Op(this, "ADX", OPERATION_ADX, 3, function (a, b) {
      var res = a.getA() + b.getB() + this.emulator.Registers.EX.get();
      this.emulator.Registers.EX.set(res > 65535 ? 1 : 0);
      b.set(res & 65535);
    }),

    SBX: new Op(this, "SBX", OPERATION_SBX, 3, function (a, b) {
      var aVal = a.getA(),
          bVal = b.getB();
      var res = bVal - aVal + this.emulator.Registers.EX.get();
      this.emulator.Registers.EX.set(res < 0 ? 65535 : 0);
      b.set(res & 65535);
    }),

    STI: new Op(this, "STI", OPERATION_STI, 2, function (a, b) {
      var aVal = a.getA(),
          bVal = b.getB();
      b.set(aVal);
      //a.set(bVal);
      this.emulator.Registers.I.set(this.emulator.Registers.I.get() + 1 & 65535);
      this.emulator.Registers.J.set(this.emulator.Registers.J.get() + 1 & 65535);
    }),

    STD: new Op(this, "STD", OPERATION_STD, 2, function (a, b) {
      var aVal = a.getA(),
          bVal = b.getB();
      b.set(aVal);
      //a.set(bVal);
      this.emulator.Registers.I.set(this.emulator.Registers.I.get() - 1 & 65535);
      this.emulator.Registers.J.set(this.emulator.Registers.J.get() - 1 & 65535);
    }),

    JSR: new Op(this, "JSR", OPERATION_JSR, 3, function (a) {
      var aVal = a.getA();
      this.emulator.Registers.SP.push(this.emulator.Registers.PC.get());
      this.emulator.Registers.PC.set(aVal);
    }, this.SpecialOpSet),

    INT: new Op(this, "INT", OPERATION_INT, 4, function (a) {
      var aVal = a.getA();
      this.emulator.interruptQueue.push(aVal);
    }, this.SpecialOpSet),

    IAG: new Op(this, "IAG", OPERATION_IAG, 1, function (a) {
      var aVal = a.getA();
      a.set(this.emulator.Registers.IA.get());
    }, this.SpecialOpSet),

    IAS: new Op(this, "IAS", OPERATION_IAS, 1, function (a) {
      this.emulator.Registers.IA.set(a.getA());
    }, this.SpecialOpSet),

    RFI: new Op(this, "RFI", OPERATION_RFI, 3, function (a) {
      var aVal = a.getA();
      this.emulator.interruptQueueingEnabled = false;
      this.emulator.Registers.A.set(this.emulator.Registers.SP.pop());
      this.emulator.Registers.PC.set(this.emulator.Registers.SP.pop());
    }, this.SpecialOpSet),

    IAQ: new Op(this, "IAQ", OPERATION_IAQ, 2, function (a) {
      var aVal = a.getA();
      if (aVal === 0) this.emulator.interruptQueueingEnabled = false;else this.emulator.interruptQueueingEnabled = true;
    }, this.SpecialOpSet),

    HWN: new Op(this, "HWN", OPERATION_HWN, 2, function (a) {
      var aVal = a.getA();
      a.set(this.emulator.devices.length);
    }, this.SpecialOpSet),

    HWQ: new Op(this, "HWQ", OPERATION_HWQ, 4, function (a) {
      var dev = this.emulator.devices[a.getA()];
      if (dev) {
        this.emulator.Registers.A.set(dev.id & 65535);
        this.emulator.Registers.B.set(dev.id >> 16 & 65535);
        this.emulator.Registers.C.set(dev.version & 65535);
        this.emulator.Registers.X.set(dev.manufacturer & 65535);
        this.emulator.Registers.Y.set(dev.manufacturer >> 16 & 65535);
      }
    }, this.SpecialOpSet),

    HWI: new Op(this, "HWI", OPERATION_HWI, 4, function (a) {
      var dev = this.emulator.devices[a.getA()];
      if (dev) dev.interrupt();
    }, this.SpecialOpSet) };

  this.boot = function () {
    console.log("--- DCPU-16 Emulator ---");

    this.program = null;
    this.PC.set(0);
    this.CPU_CYCLE = 0;
    this.RAM = new Array(65536);
    this.asyncSteps = 1;

    this.interruptQueueingEnabled = false;
    this.interruptQueue = [];

    for (var r in this.Registers) {
      this.Registers[r].set(0);
    }
    //this.Registers.SP.set(0xffff);

    for (var i = 0; i < this.devices.length; i++) {
      this.devices[i].init();
    }
  };

  this.reboot = function () {
    this.boot();
  };

  /**
   * Run the program specified.
   * @ _program the program you want to run, as an array of bytes.
   */
  this.run = function (_program) {
    this.program = _program;

    console.log("Running program (" + this.program.length + " words)");

    // load program into RAM
    for (var i = 0; i < this.program.length; i++) {
      if (this.program[i] != undefined) this.RAM[i] = this.program[i];
    }

    if (!this.async) {
      while (this.step()) {}
      this.exit();
    } else this.stepAsync();
  };

  this.step = function () {
    if (this.PC.get() < this.program.length) {
      this.nextInstruction();

      if (this.attachedDebugger && this.paused) this.attachedDebugger.onStep(this.PC.get());

      // process one interrupt if we have one
      if (this.interruptQueueingEnabled == false && this.interruptQueue.length > 0) {
        this.processInterrupt(this.interruptQueue.pop());
      }

      return true;
    } else return false;
  };

  var _this = this;
  this.paused = false;

  this.runAsync = function () {
    while (true) {
      if (Math.floor(_this.CPU_CYCLE / _this.currentSpeed.delayFrequency) > _this.asyncSteps) {
        _this.asyncSteps++;
        setTimeout(_this.runAsync, _this.currentSpeed.delayTime);
        break;
      } else {
        if (!_this.stepAsync()) break;
      }
    }
  };

  this.stepAsync = function () {
    if (this.program == null) // break if we have rebooted
      return false;

    if (this.paused) {
      if (this.attachedDebugger) {
        this.attachedDebugger.onPaused(this.PC.get());
        return false;
      }
    } else {
      if (this.attachedDebugger) {
        if (this.attachedDebugger.breakpoints["" + this.PC.get()]) {
          this.paused = true;
          this.attachedDebugger.onPaused(this.PC.get());
          return false;
        }
      }

      var res = this.step();
      if (!res) this.exit();
      return res;
    }
  };

  this.nextInstruction = function () {
    var data = this.RAM[this.PC.inc()];
    var instruction = Utils.parseInstruction(data);
    var op;
    if (instruction.opcode === 0) {
      instruction = Utils.parseSpecialInstruction(data);
      op = this.SpecialOpSet[instruction.opcode];
    } else op = this.OpSet[instruction.opcode];

    if (!op) {
      var err = "Invalid opcode " + instruction.opcode;
      console.warn(err);
      throw err;
    }

    if (this.verbose) {
      console.log(Utils.hex(this.Registers.PC.get()) + "\t" + op.name + "\t(" + Utils.hex(instruction.a) + ",\t" + Utils.hex(instruction.b) + ")");
    }
    op.exec(instruction.a, instruction.b);

    if (this.attachedDebugger) this.attachedDebugger.onInstruction(this.PC.get());
  };

  this.nextWord = function () {
    this.CPU_CYCLE++;
    return this.RAM[this.Registers.PC.inc()];
  };

  this.getParamValue = function (val) {
    return this.Values[new String(val)];
  };

  this.skipInstruction = function () {
    var instruction = Utils.parseInstruction(this.RAM[this.PC.inc()]);
    this.CPU_CYCLE++;

    // skip "next word" values by invoking get() on the params
    this.getParamValue(instruction.a).get();
    if (instruction.opcode != 0) this.getParamValue(instruction.b).get();

    if (instruction.opcode >= OPERATION_IFB && instruction.opcode <= OPERATION_IFU) {
      // if we have skipped a conditional instruction, skip additional instruction
      // at cost of an additional cycle.  continue until a non-conditional instruction
      // has been skipped
      this.skipInstruction();
    }
  };

  this.processInterrupt = function (message) {
    if (this.Registers.IA.get() != 0) {
      this.interruptQueueingEnabled = true;
      this.Registers.SP.push(this.Registers.PC.get()); // push PC onto the stack
      this.Registers.SP.push(this.Registers.A.get()); // followed by pusing A to the stack
      this.Registers.PC.set(this.Registers.IA.get()); // set PC to IA
      this.Registers.A.set(message); // set A to the interrupt message
    } else {}
  };

  this.interrupt = function (message) {
    this.interruptQueue.push(message);

    if (this.interruptQueue.length > 256) {
      // catch fire?
      console.warn("DCUP-16 is on fire");
      throw "Too many interrupts";
    }
  };

  this.exit = function () {
    console.log("Program completed in " + this.CPU_CYCLE + " cycles");

    if (this.attachedDebugger) this.attachedDebugger.onExit();
  };

  this.attachedDebugger = null;
  this.attachDebugger = function (_debugger) {
    this.attachedDebugger = _debugger;
  };

  this.setSpeed = function (newSpeed) {
    var speed = Speeds[newSpeed];
    if (!speed) {
      console.log("invalid speed " + newSpeed);
      return;
    }
    this.currentSpeed = speed;
    this.asyncSteps = this.CPU_CYCLE / this.currentSpeed.delayFrequency;
  };

  this.devices = [];

  this.boot();
};

// generic device used for unit tests
function Device(_id, _version, _manufacturer, _emulator) {
  this.id = _id;
  this.version = _version;
  this.manufacturer = _manufacturer;
  this.emulator = _emulator;
};
Device.prototype.interrupt = function () {};
Device.prototype.init = function () {};

function Debugger(_emulator) {
  if (!_emulator.async) throw "Emulator must be in asynchronous mode to use a debugger with it.";
  this.emulator = _emulator;
  this.breakpoints = {};

  this.emulator.attachDebugger(this);
}
Debugger.prototype.getBreakpoints = function () {
  return this.breakpoints;
};
Debugger.prototype.toggleBreakpoint = function (location, lineNumber) {
  location += ""; // convert to string
  if (this.breakpoints[location]) delete this.breakpoints[location];else this.breakpoints[location] = lineNumber;
};
Debugger.prototype.run = function () {
  if (this.emulator.paused) {
    this.emulator.paused = false;
    this.emulator.runAsync();
  }
};
Debugger.prototype.step = function () {
  if (this.emulator.paused) {
    if (!this.emulator.step()) this.emulator.exit();
  }
};
Debugger.prototype.pause = function () {
  this.emulator.paused = true;
};

// events
Debugger.prototype.onStep = function (location) {};
Debugger.prototype.onPaused = function (location) {};
Debugger.prototype.onInstruction = function (location) {};
Debugger.prototype.onExit = function () {};

exports["default"] = Emulator;

},{}],6:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var IntertialNavigation = (function () {
  function IntertialNavigation(emulator, ship) {
    _classCallCheck(this, IntertialNavigation);

    this.emulator = emulator;
    this.ship = ship;

    this.id = 3922204738;
    this.manufacturer = 1840322647;
    this.version = 527;
  }

  _createClass(IntertialNavigation, {
    init: {
      value: function init() {
        this.referenceX = Math.floor(Math.random() * 65536);
        this.referenceY = Math.floor(Math.random() * 65536);
      }
    },
    interrupt: {
      value: function interrupt() {
        var code = this.emulator.Registers.A.get();
        switch (code) {
          case 0:
            this.emulator.Registers.X.set(this.getXPosition());
            this.emulator.Registers.Y.set(this.getYPosition());
            break;
          case 1:
            this.emulator.Registers.X.set(this.getXVelocity());
            this.emulator.Registers.Y.set(this.getYVelocity());
            break;
          case 2:
            this.setReferenceFrame(this.emulator.Registers.X.get(), this.emulator.Registers.Y.get());
        }
      }
    },
    setReferenceFrame: {
      value: function setReferenceFrame(x, y) {
        this.referenceX = this.referenceX - x;
        this.referenceY = this.referenceY - y;
      }
    },
    getXPosition: {
      value: function getXPosition() {
        return Math.abs(this.referenceX + this.ship.position.x) & 65535;
      }
    },
    getYPosition: {
      value: function getYPosition() {
        return Math.abs(this.referenceY + this.ship.position.y) & 65535;
      }
    },
    getXVelocity: {
      value: function getXVelocity() {
        return Math.abs(this.ship.velocity.x * 120) & 65535;
      }
    },
    getYVelocity: {
      value: function getYVelocity() {
        return Math.abs(this.ship.velocity.y * 120) & 65535;
      }
    }
  });

  return IntertialNavigation;
})();

module.exports = IntertialNavigation;

},{}],7:[function(require,module,exports){
"use strict";

var _createClass = (function () {
  function defineProperties(target, props) {
    for (var key in props) {
      var prop = props[key];prop.configurable = true;if (prop.value) prop.writable = true;
    }Object.defineProperties(target, props);
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
})();

var _classCallCheck = function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var keyMapping = {};
keyMapping[9] = 9; // tab
keyMapping[8] = 16; // backspace
keyMapping[13] = 17; // return / enter
keyMapping[45] = 18; // insert
keyMapping[46] = 19; // delete
keyMapping[38] = 128; // up arrow
keyMapping[40] = 129; // down arrow
keyMapping[37] = 130; // left arrow
keyMapping[39] = 131; // right arrow
keyMapping[16] = 144; // shift
keyMapping[17] = 145; // control

// Non spec keys:
keyMapping[36] = 20; // home
keyMapping[35] = 21; // end
keyMapping[33] = 132; // page up
keyMapping[34] = 133; // page down

var mapKey = function mapKey(ev) {
  if (ev.charCode == 0) {
    // user pressed a non-printable key, this is the JS key code
    return keyMapping[ev.keyCode];
  } else {
    // user pressed a printable key, this is the Unicode character code
    if (ev.charCode >= 32 && ev.charCode <= 127) {
      return ev.charCode;
    }
  }

  // if we are still here, the key isn't supported by the DCPU :(
  return undefined;
};

var Keyboard = (function () {
  function Keyboard(emulator) {
    _classCallCheck(this, Keyboard);

    this.emulator = emulator;

    this.id = 818902022;
    this.manufacturer = 1101854075;
    this.version = 1;
  }

  _createClass(Keyboard, {
    init: {
      value: function init() {
        this.interruptValue = 0;
        this.keyBuffer = [];
        this.downKeys = [];
        document.body.onkeydown = this.keyPress.bind(this);
        document.body.onkeypress = this.keyPress.bind(this);
        document.body.onkeyup = this.keyRelease.bind(this);
      }
    },
    interrupt: {
      value: function interrupt() {
        var code = this.emulator.Registers.A.get();
        switch (code) {
          case 0:
            // clear buffer
            this.clearBuffer();
            break;
          case 1:
            // read last character into C
            var char = this.readBuffer();
            this.emulator.Registers.C.set(char);
            break;
          case 2:
            // check if key B is down, setting the result in C
            var key = this.emulator.Registers.B.get();
            var result = this.isKeyDown(key);
            this.emulator.Registers.C.set(result);
            break;
          case 3:
            // set interrupt value
            var value = this.emulator.Registers.B.get();
            this.setInterruptValue(value);
            break;
        }
      }
    },
    clearBuffer: {
      value: function clearBuffer() {
        this.keyBuffer = [];
      }
    },
    readBuffer: {
      value: function readBuffer() {
        var code = this.keyBuffer.shift();
        if (code !== undefined) {
          return code;
        } else {
          return 0;
        }
      }
    },
    isKeyDown: {
      value: function isKeyDown(code) {
        if (this.downKeys[code] == true) {
          return 1;
        } else {
          return 0;
        }
      }
    },
    setInterruptValue: {
      value: function setInterruptValue(value) {
        this.interruptValue = value;
      }
    },
    keyPress: {
      value: function keyPress(ev) {
        var code = mapKey(ev);
        if (code === undefined) {
          return;
        }

        this.keyBuffer.push(code);
        this.downKeys[code] = true;

        if (this.interruptValue > 0) {
          this.emulator.interrupt(this.interruptValue);
        }

        // capture the key press
        ev.preventDefault();
        return false;
      }
    },
    keyRelease: {
      value: function keyRelease(ev) {
        var code = mapKey(ev);
        if (code === undefined) {
          return;
        }

        this.downKeys[code] = false;

        if (this.interruptValue > 0) {
          this.emulator.interrupt(this.interruptValue);
        }

        // capture the key press
        ev.preventDefault();
        return false;
      }
    }
  });

  return Keyboard;
})();

module.exports = Keyboard;

},{}],8:[function(require,module,exports){
"use strict";

var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) { _arr.push(_step.value); if (i && _arr.length === i) break; } return _arr; } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var DEFAULT_FONT = [15, 2056, 2063, 2056, 2296, 2056, 255, 2056, 2056, 2056, 2303, 2056, 255, 5140, 65280, 65288, 7952, 5908, 64516, 62484, 5904, 5908, 62468, 62484, 65280, 63252, 5140, 5140, 63232, 63252, 5143, 5140, 3848, 3848, 5364, 5140, 63496, 63496, 3848, 3848, 31, 5140, 252, 5140, 63496, 63496, 65288, 65288, 5375, 5140, 2063, 0, 248, 2056, 65535, 65535, 61680, 61680, 65535, 0, 0, 65535, 3855, 3855, 0, 0, 95, 0, 768, 768, 15892, 15872, 9835, 12800, 24860, 17152, 13865, 30288, 2, 256, 7202, 16640, 16674, 7168, 10780, 10752, 2110, 2048, 16416, 0, 2056, 2048, 64, 0, 24604, 768, 15937, 15872, 17023, 16384, 25177, 17920, 8777, 13824, 3848, 32512, 10053, 14592, 15945, 12800, 24857, 1792, 13897, 13824, 9801, 15872, 36, 0, 16420, 0, 2068, 8769, 5140, 5120, 16674, 5128, 601, 1536, 15961, 24064, 32265, 32256, 32585, 13824, 15937, 8704, 32577, 15872, 32585, 16640, 32521, 256, 15945, 14848, 32520, 32512, 16767, 16640, 8256, 16128, 32524, 29440, 32576, 16384, 32518, 32512, 32513, 32256, 15937, 15872, 32521, 1536, 15937, 48640, 32521, 30208, 9801, 12800, 383, 256, 32576, 32512, 8032, 7936, 32560, 32512, 30472, 30464, 1912, 1792, 29001, 18176, 127, 16640, 796, 24576, 65, 32512, 513, 512, 32896, 32768, 1, 512, 9300, 30720, 32580, 14336, 14404, 10240, 14404, 32512, 14420, 22528, 2174, 2304, 18516, 15360, 32516, 30720, 17533, 16384, 8256, 15616, 32528, 27648, 16767, 16384, 31768, 31744, 31748, 30720, 14404, 14336, 31764, 2048, 2068, 31744, 31748, 2048, 18516, 9216, 1086, 17408, 15424, 31744, 7264, 7168, 31792, 31744, 27664, 27648, 19536, 15360, 25684, 19456, 2102, 16640, 119, 0, 16694, 2048, 513, 513, 28748, 28672];

var DEFAULT_PALETTE = [0, 10, 160, 170, 2560, 2570, 2640, 2730, 1365, 1375, 1525, 1535, 3925, 3935, 4085, 4095];

var Monitor = (function () {
  function Monitor(emulator, canvas) {
    _classCallCheck(this, Monitor);

    this.emulator = emulator;

    this.canvas = canvas;
    this.canvas.width = 128;
    this.canvas.height = 96;
    this.context = canvas.getContext("2d");
    this.imageData = this.context.createImageData(this.canvas.width, this.canvas.height);

    this.id = 1934226965;
    this.version = 6146;
    this.manufacturer = 476875574;
    this.connected = false;

    setTimeout(this.render.bind(this), 1000 / 30);
  }

  _createClass(Monitor, {
    init: {
      value: function init() {
        this.connected = false;
      }
    },
    interrupt: {
      value: function interrupt() {
        var code = this.emulator.Registers.A.get();
        var value = this.emulator.Registers.B.get();

        switch (code) {
          case 0:
            if (value === 0) {
              this.disconnect();
            } else {
              this.memMapScreen(value);
            }
            break;
          default:
            console.warn("Unimplemented interrupt:", code, value);
        }
      }
    },
    memMapScreen: {
      value: function memMapScreen(value) {
        this.memOffset = value;
        this.connected = true;
      }
    },
    drawCell: {
      value: function drawCell(x, y, word) {
        var glyph = word & 127;
        var blink = (word & 128) >> 7;
        var bg = (word & 3840) >> 8;
        var fg = (word & 61440) >> 12;
        this.drawGlyph(x, y, glyph, fg, bg, blink);
      }
    },
    drawGlyph: {
      value: function drawGlyph(x, y, glyph, fg, bg, blink) {
        // load font data
        var cols = [];
        glyph *= 2;
        cols[0] = this.readFont(glyph) >> 8;
        cols[1] = this.readFont(glyph) & 255;
        cols[2] = this.readFont(glyph + 1) >> 8;
        cols[3] = this.readFont(glyph + 1) & 255;

        // load colour data
        var bgSplit = this.readColours(bg);

        var _bgSplit = _slicedToArray(bgSplit, 3);

        var bgR = _bgSplit[0];
        var bgG = _bgSplit[1];
        var bgB = _bgSplit[2];

        var fgSplit = this.readColours(fg);

        var _fgSplit = _slicedToArray(fgSplit, 3);

        var fgR = _fgSplit[0];
        var fgG = _fgSplit[1];
        var fgB = _fgSplit[2];

        // draw glyph to buffer
        for (var row = 0; row < 8; row++) {
          for (var col = 0; col < 4; col++) {
            var bit = cols[col] >> row & 1;
            var index = (x * 4 + col + (y * 8 + row) * this.canvas.width) * 4;
            if (bit == 1) {
              this.imageData.data[index + 0] = fgR;
              this.imageData.data[index + 1] = fgG;
              this.imageData.data[index + 2] = fgB;
              this.imageData.data[index + 3] = 255;
            } else {
              this.imageData.data[index + 0] = bgR;
              this.imageData.data[index + 1] = bgG;
              this.imageData.data[index + 2] = bgB;
              this.imageData.data[index + 3] = 255;
            }
          }
        }
      }
    },
    readFont: {
      value: function readFont(offset) {
        // TODO read font when memory mapped
        return DEFAULT_FONT[offset];
      }
    },
    readColours: {
      value: function readColours(index) {
        // TODO read palette when memory mapped
        var colour = DEFAULT_PALETTE[index];

        var r = ((colour & 3840) >> 8) * 16;
        var g = ((colour & 240) >> 4) * 16;
        var b = (colour & 15) * 16;

        return [r, g, b];
      }
    },
    renderToBuffer: {
      value: function renderToBuffer() {
        // draw glyphs to buffer
        for (var y = 0; y < 12; y++) {
          for (var x = 0; x < 32; x++) {
            var word = this.emulator.RAM[this.memOffset + x + y * 32];
            this.drawCell(x, y, word);
          }
        }
      }
    },
    renderToCanvas: {
      value: function renderToCanvas() {
        // draw buffer to canvas
        this.context.putImageData(this.imageData, 0, 0);
      }
    },
    render: {
      value: function render() {
        if (this.connected) {
          this.renderToBuffer();
          requestAnimationFrame(this.renderToCanvas.bind(this));
        }
        setTimeout(this.render.bind(this), 1000 / 30);
      }
    }
  });

  return Monitor;
})();

module.exports = Monitor;

},{}],9:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var TRANSMIT_INTERVAL = 1000 / 10;

var Modem = (function () {
  function Modem(emulator, client) {
    _classCallCheck(this, Modem);

    this.emulator = emulator;
    this.client = client;

    this.id = 1129519376;
    this.manufacturer = 1101854075;
    this.version = 3;
  }

  _createClass(Modem, {
    init: {
      value: function init() {
        this.mask = 0;
        this.comparison = 0;

        this.generateSerialNumber();

        this.rxChannel = 0;
        this.txChannel = 0;

        this.txBuffer = [];
        this.rxBuffer = [];
        this.txDelay = 0;

        this.rxInterruptMessage = 0;

        this.client.onReceive = this.receive.bind(this);
        this.timer = setInterval(this.transmit.bind(this), TRANSMIT_INTERVAL);
        this.running = true;
      }
    },
    interrupt: {
      value: function interrupt() {
        var code = this.emulator.Registers.A.get();
        switch (code) {
          case 0:
            this.emulator.Registers.A.set(this.serialNumberA);
            this.emulator.Registers.B.set(this.serialNumberB);
            this.emulator.Registers.C.set(this.serialNumberC);
            break;
          case 1:
            this.setFilter(this.emulator.Registers.B.get(), this.emulator.Registers.C.get(), this.emulator.Registers.X.get(), this.emulator.Registers.Y.get());
            break;
          case 2:
            this.setTxChannel(this.emulator.Registers.B.get());
            break;
          case 3:
            this.setRxChannel(this.emulator.Registers.B.get());
            break;
          case 4:
            this.transmitData(this.emulator.Registers.B.get(), this.emulator.Registers.C.get());
            break;
          case 5:
            var size = this.receiveData(this.emulator.Registers.C.get());
            this.emulator.Registers.B.set(size);
            break;
          case 6:
            this.enableRxInterrupt(this.emulator.Registers.B.get());
            break;
        }
      }
    },
    generateSerialNumber: {
      value: function generateSerialNumber() {
        // As well as avoiding bit operations, JavaScript also can't generate a
        // random number more than 32 bits \o/
        this.serialNumberA = Math.floor(Math.random() * Math.pow(2, 16) - 1);
        this.serialNumberB = Math.floor(Math.random() * Math.pow(2, 16) - 1);
        this.serialNumberC = Math.floor(Math.random() * Math.pow(2, 16) - 1);
      }
    },
    setFilter: {
      value: function setFilter(maskHigh, maskLow, comparisonHigh, comparisonLow) {
        this.mask = maskHigh << 16 ^ maskLow;
        this.comparison = comparisonHigh << 16 ^ comparisonLow;
      }
    },
    setTxChannel: {
      value: function setTxChannel(channel) {
        if (channel < 0 || channel > 255) {
          this.txChannel = 0;
        } else {
          this.txChannel = channel;
        }
      }
    },
    setRxChannel: {
      value: function setRxChannel(channel) {
        if (channel < 0 || channel > 255) {
          this.rxChannel = 0;
        } else {
          this.rxChannel = channel;
        }
      }
    },
    transmitData: {
      value: function transmitData(length, memoryOffset) {
        var i = memoryOffset;
        for (var _i = memoryOffset; _i < memoryOffset + length; _i++) {
          this.txBuffer.push(this.emulator.RAM[_i]);
        }
      }
    },
    receiveData: {
      value: function receiveData(memoryOffset) {
        var i = memoryOffset;
        var length = this.rxBuffer.length;

        while (this.rxBuffer.length > 0) {
          this.emulator.RAM[i++] = this.rxBuffer.shift();
        }
        return length;
      }
    },
    enableRxInterrupt: {
      value: function enableRxInterrupt(interruptMessage) {
        this.rxInterruptMessage = interruptMessage;
      }
    },
    transmit: {
      value: function transmit() {
        if (this.txDelay > 0) {
          this.txDelay--;
        }

        if (this.txDelay == 0) {
          if (this.txBuffer.length > 0) {
            this.txDelay += this.txBuffer.length;
            this.client.transmit(this.txChannel, this.txBuffer);
            this.txBuffer = [];
          }
        }
      }
    },
    receive: {
      value: function receive(channel, data) {
        if (this.rxChannel == channel) {

          // check filter
          var filterPart = data[0] << 16 ^ data[1];
          if ((filterPart & this.mask) != this.comparison) {
            console.log("ignoring ", data);
            return;
          }

          // add to rx buffer
          for (var i = 0; i < data.length; i++) {
            this.rxBuffer.push(data[i]);
          }

          // trigger interrupt
          if (this.rxInterruptMessage) {
            this.emulator.interrupt(this.rxInterruptMessage);
          }
        }
      }
    }
  });

  return Modem;
})();

module.exports = Modem;

},{}],10:[function(require,module,exports){
"use strict";

var _createClass = (function () {
  function defineProperties(target, props) {
    for (var key in props) {
      var prop = props[key];prop.configurable = true;if (prop.value) prop.writable = true;
    }Object.defineProperties(target, props);
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
})();

var _classCallCheck = function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var Thrusters = (function () {
  function Thrusters(emulator, ship) {
    _classCallCheck(this, Thrusters);

    this.emulator = emulator;
    this.ship = ship;

    this.id = 2315028119;
    this.manufacturer = 1101854075;
    this.version = 1;
  }

  _createClass(Thrusters, {
    init: {
      value: function init() {
        this.state = 0;
      }
    },
    interrupt: {
      value: function interrupt() {
        var code = this.emulator.Registers.A.get();
        switch (code) {
          case 0:
            this.emulator.Registers.B.set(this.state);
          case 1:
            this.state = this.emulator.Registers.B.get();
        }
      }
    },
    step: {
      value: function step() {
        var forwardReverse = this.state >>> 8;
        if (forwardReverse > 15) {
          var power = (forwardReverse & 240) >>> 4;
          console.log("forward", forwardReverse.toString(16), power);
          this.ship.forward(power);
        } else if (forwardReverse > 0) {
          var power = forwardReverse & 15;
          console.log("backward", forwardReverse.toString(16), power);
          this.ship.backward(power);
        }

        switch (this.state & 255) {
          case 240:
            this.ship.rotate(-1);
            break;
          case 15:
            this.ship.rotate(1);
            break;
          default:
            this.ship.rotate(0);
            break;
        }
      }
    }
  });

  return Thrusters;
})();

module.exports = Thrusters;

},{}],11:[function(require,module,exports){
"use strict";

var _interopRequire = function _interopRequire(obj) {
  return obj && obj.__esModule ? obj["default"] : obj;
};

var _createClass = (function () {
  function defineProperties(target, props) {
    for (var key in props) {
      var prop = props[key];prop.configurable = true;if (prop.value) prop.writable = true;
    }Object.defineProperties(target, props);
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
})();

var _classCallCheck = function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var Emulator = _interopRequire(require("./dcpu/emulator"));

var Debugger = _interopRequire(require("./dcpu/debugger"));

var Thrusters = _interopRequire(require("./dcpu/thrusters"));

var Monitor = _interopRequire(require("./dcpu/lem1802"));

var Keyboard = _interopRequire(require("./dcpu/keyboard"));

var InertialNavigation = _interopRequire(require("./dcpu/inertial_navigation"));

var BytecodeLoader = _interopRequire(require("./dcpu/bytecode_loader"));

var Modem = _interopRequire(require("./dcpu/modem"));

var Client = _interopRequire(require("./client"));

var Main = (function () {
  function Main() {
    _classCallCheck(this, Main);
  }

  _createClass(Main, {
    run: {
      value: function run() {
        this.emulator = false;

        Gt.onStart = (function (ship) {
          var _this = this;

          this.emulator = new Emulator();
          this.emulator.devices = [];

          var thrusters = new Thrusters(this.emulator, ship);
          this.emulator.devices.push(thrusters);

          var monitor = new Monitor(this.emulator, this.buildMonitorCanvas());
          this.emulator.devices.push(monitor);

          var keyboard = new Keyboard(this.emulator);
          this.emulator.devices.push(keyboard);

          var nav = new InertialNavigation(this.emulator, ship);
          this.emulator.devices.push(nav);

          var modem = new Modem(this.emulator, this.client);
          this.emulator.devices.push(modem);

          this.client.connect();

          if (window.location.hash == "#debugger") {
            this.setupDebugger();
          }

          new BytecodeLoader(this.buildLoader(), function (bytecode) {
            _this.emulator.reboot();
            _this.emulator.run(bytecode);
            _this.emulator.runAsync();
          });
        }).bind(this);

        Gt.onStop = (function () {
          this.emulator.paused = true;
        }).bind(this);

        Gt.onStep = (function () {
          if (!this.emulator.paused) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
              for (var _iterator = this.emulator.devices[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var device = _step.value;

                if (device.step) {
                  device.step();
                }
              }
            } catch (err) {
              _didIteratorError = true;
              _iteratorError = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion && _iterator["return"]) {
                  _iterator["return"]();
                }
              } finally {
                if (_didIteratorError) {
                  throw _iteratorError;
                }
              }
            }
          }
        }).bind(this);

        this.client = new Client();

        Gt.c = new Gt.Controller(this.buildEtagCanvas());
      }
    },
    buildLoader: {
      value: function buildLoader() {
        var div = document.createElement("div");
        div.className = "box uploader";

        var input = document.createElement("input");
        input.type = "file";

        div.appendChild(input);

        var column = document.getElementById("left-column");
        column.insertBefore(div, column.firstChild);

        return input;
      }
    },
    buildEtagCanvas: {
      value: function buildEtagCanvas() {
        var canvas = document.createElement("canvas");
        canvas.className = "etag";
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth - 700;

        window.onresize = function () {
          canvas.height = window.innerHeight;
          canvas.width = window.innerWidth - 700;
        };

        var column = document.getElementById("right-column");
        column.appendChild(canvas);
        return canvas;
      }
    },
    buildMonitorCanvas: {
      value: function buildMonitorCanvas() {
        var canvas = document.createElement("canvas");
        canvas.className = "monitor";

        var column = document.getElementById("left-column");
        column.appendChild(canvas);
        return canvas;
      }
    },
    setupDebugger: {
      value: function setupDebugger() {
        var _this = this;

        console.log("Running debugger");

        var _debugger = new Debugger(this.emulator);
        _debugger.onStep = function (location) {
          var table = {
            val: {},
            mem: {}
          };

          for (var reg in _this.emulator.Registers) {
            var val = _this.emulator.Registers[reg].get();
            var memoryVal = _this.emulator.RAM[val] || 0;

            table.val[reg] = val.toString(16);
            table.mem[reg] = memoryVal.toString(16);
          }

          console.table(table);
        };
        _debugger.onPaused = _debugger.onStep;
        _debugger.toggleBreakpoint("0", "0");

        window.n = function () {
          _debugger.step();
        };
      }
    }
  });

  return Main;
})();

module.exports = Main;

},{"./client":2,"./dcpu/bytecode_loader":3,"./dcpu/debugger":4,"./dcpu/emulator":5,"./dcpu/inertial_navigation":6,"./dcpu/keyboard":7,"./dcpu/lem1802":8,"./dcpu/modem":9,"./dcpu/thrusters":10}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvbHVjYS9jb2RlL2RjcHUvc2hpcC1nYW1lLTIvc3JjL2xhdW5jaGVyLmpzIiwiL1VzZXJzL2x1Y2EvY29kZS9kY3B1L3NoaXAtZ2FtZS0yL3NyYy9jbGllbnQuanMiLCIvVXNlcnMvbHVjYS9jb2RlL2RjcHUvc2hpcC1nYW1lLTIvc3JjL2RjcHUvYnl0ZWNvZGVfbG9hZGVyLmpzIiwiL1VzZXJzL2x1Y2EvY29kZS9kY3B1L3NoaXAtZ2FtZS0yL3NyYy9kY3B1L2RlYnVnZ2VyLmpzIiwiL1VzZXJzL2x1Y2EvY29kZS9kY3B1L3NoaXAtZ2FtZS0yL3NyYy9kY3B1L2VtdWxhdG9yLmpzIiwiL1VzZXJzL2x1Y2EvY29kZS9kY3B1L3NoaXAtZ2FtZS0yL3NyYy9kY3B1L2luZXJ0aWFsX25hdmlnYXRpb24uanMiLCIvVXNlcnMvbHVjYS9jb2RlL2RjcHUvc2hpcC1nYW1lLTIvc3JjL2RjcHUva2V5Ym9hcmQuanMiLCIvVXNlcnMvbHVjYS9jb2RlL2RjcHUvc2hpcC1nYW1lLTIvc3JjL2RjcHUvbGVtMTgwMi5qcyIsIi9Vc2Vycy9sdWNhL2NvZGUvZGNwdS9zaGlwLWdhbWUtMi9zcmMvZGNwdS9tb2RlbS5qcyIsIi9Vc2Vycy9sdWNhL2NvZGUvZGNwdS9zaGlwLWdhbWUtMi9zcmMvZGNwdS90aHJ1c3RlcnMuanMiLCIvVXNlcnMvbHVjYS9jb2RlL2RjcHUvc2hpcC1nYW1lLTIvc3JjL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxZQUFZLENBQUM7O0FBRWIsSUFBSSxlQUFlLEdBQUcsU0FBQSxlQUFBLENBQVUsR0FBRyxFQUFFO0FBQUUsU0FBTyxHQUFHLElBQUksR0FBRyxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsR0FBRyxDQUFDO0NBQUUsQ0FBQzs7QUFFOUYsSUFKTyxJQUFJLEdBQUEsZUFBQSxDQUFBLE9BQUEsQ0FB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QyxJQUFNLEVBQUMsSUFBTSxFQUFDLEtBQU0sRUFBQyxLQUFNLEVBQUMsRUFBTSxFQUFDLEtBQU0sRUFBQyxFQUFNLEVBQUMsS0FBTSxFQUFDLEtBQU0sRUFBQyxFQUFNLEVBQUMsS0FBTSxFQUFDLEVBQU0sRUFBQyxLQUFNLEVBQUMsS0FBTSxFQUFDLEVBQU0sRUFBQyxLQUFNLEVBQUMsS0FBTSxFQUFDLEtBQU0sRUFBQyxLQUFNLEVBQUMsS0FBTSxFQUFDLEtBQU0sRUFBQyxLQUFNLEVBQUMsSUFBTSxFQUFDLElBQU0sRUFBQyxLQUFNLEVBQUMsS0FBTSxFQUFDLEVBQU0sRUFBQyxLQUFNLEVBQUMsRUFBTSxFQUFDLEtBQU0sRUFBQyxFQUFNLEVBQUMsS0FBTSxFQUFDLEVBQU0sRUFBQyxLQUFNLEVBQUMsS0FBTSxFQUFDLEVBQU0sRUFBQyxLQUFNLEVBQUMsS0FBTSxFQUFDLEtBQU0sRUFBQyxHQUFNLEVBQUMsSUFBTSxFQUFDLElBQU0sRUFBQyxLQUFNLEVBQUMsRUFBTSxFQUFDLEtBQU0sRUFBQyxLQUFNLEVBQUMsSUFBTSxFQUFDLEtBQU0sRUFBQyxLQUFNLEVBQUMsS0FBTSxFQUFDLEtBQU0sRUFBQyxHQUFNLEVBQUMsS0FBTSxFQUFDLEtBQU0sRUFBQyxLQUFNLEVBQUMsS0FBTSxFQUFDLENBQU0sRUFBQyxLQUFNLEVBQUMsRUFBTSxFQUFDLEtBQU0sRUFBQyxLQUFNLEVBQUMsS0FBTSxFQUFDLEtBQU0sRUFBQyxFQUFNLEVBQUMsS0FBTSxFQUFDLEtBQU0sRUFBQyxLQUFNLEVBQUMsRUFBTSxFQUFDLEtBQU0sRUFBQyxHQUFNLEVBQUMsS0FBTSxFQUFDLEtBQU0sRUFBQyxFQUFNLEVBQUMsS0FBTSxFQUFDLEtBQU0sRUFBQyxLQUFNLEVBQUMsR0FBTSxFQUFDLEtBQU0sRUFBQyxHQUFNLEVBQUMsS0FBTSxFQUFDLEtBQU0sRUFBQyxHQUFNLEVBQUMsS0FBTSxFQUFDLEdBQU0sRUFBQyxLQUFNLEVBQUMsR0FBTSxFQUFDLEtBQU0sRUFBQyxHQUFNLEVBQUMsS0FBTSxFQUFDLEdBQU0sRUFBQyxLQUFNLEVBQUMsR0FBTSxFQUFDLEtBQU0sRUFBQyxHQUFNLEVBQUMsS0FBTSxFQUFDLEdBQU0sRUFBQyxLQUFNLEVBQUMsR0FBTSxFQUFDLEtBQU0sRUFBQyxHQUFNLEVBQUMsS0FBTSxFQUFDLEdBQU0sRUFBQyxLQUFNLEVBQUMsR0FBTSxFQUFDLEtBQU0sRUFBQyxHQUFNLEVBQUMsS0FBTSxFQUFDLEdBQU0sRUFBQyxLQUFNLEVBQUMsS0FBTSxFQUFDLEdBQU0sRUFBQyxLQUFNLEVBQUMsR0FBTSxFQUFDLEtBQU0sRUFBQyxLQUFNLEVBQUMsR0FBTSxFQUFDLEtBQU0sRUFBQyxFQUFNLEVBQUMsS0FBTSxFQUFDLEtBQU0sRUFBQyxHQUFNLEVBQUMsS0FBTSxFQUFDLEdBQU0sRUFBQyxLQUFNLEVBQUMsRUFBTSxFQUFDLEtBQU0sRUFBQyxLQUFNLEVBQUMsR0FBTSxFQUFDLEtBQU0sRUFBQyxLQUFNLEVBQUMsR0FBTSxFQUFDLEtBQU0sRUFBQyxLQUFNLEVBQUMsR0FBTSxFQUFDLEdBQU0sRUFBQyxLQUFNLEVBQUMsR0FBTSxFQUFDLEtBQU0sRUFBQyxLQUFNLEVBQUMsR0FBTSxFQUFDLEtBQU0sRUFBQyxLQUFNLEVBQUMsR0FBTSxFQUFDLEdBQU0sRUFBQyxLQUFNLEVBQUMsR0FBTSxFQUFDLEtBQU0sRUFBQyxLQUFNLEVBQUMsR0FBTSxFQUFDLEtBQU0sRUFBQyxHQUFNLEVBQUMsS0FBTSxFQUFDLEtBQU0sRUFBQyxLQUFNLEVBQUMsS0FBTSxFQUFDLEdBQU0sRUFBQyxLQUFNLEVBQUMsQ0FBTSxFQUFDLElBQU0sRUFBQyxLQUFNLEVBQUMsS0FBTSxFQUFDLEVBQU0sRUFBQyxLQUFNLEVBQUMsR0FBTSxFQUFDLEtBQU0sRUFBQyxHQUFNLEVBQUMsS0FBTSxFQUFDLEdBQU0sRUFBQyxLQUFNLEVBQUMsR0FBTSxFQUFDLEtBQU0sRUFBQyxLQUFNLEVBQUMsR0FBTSxFQUFDLEtBQU0sRUFBQyxLQUFNLEVBQUMsSUFBTSxFQUFDLEtBQU0sRUFBQyxLQUFNLEVBQUMsR0FBTSxFQUFDLEtBQU0sRUFBQyxLQUFNLEVBQUMsR0FBTSxFQUFDLEtBQU0sRUFBQyxLQUFNLEVBQUMsR0FBTSxFQUFDLEtBQU0sRUFBQyxLQUFNLEVBQUMsR0FBTSxFQUFDLEtBQU0sRUFBQyxLQUFNLEVBQUMsS0FBTSxFQUFDLEtBQU0sRUFBQyxHQUFNLEVBQUMsSUFBTSxFQUFDLEtBQU0sRUFBQyxLQUFNLEVBQUMsRUFBTSxFQUFDLEtBQU0sRUFBQyxLQUFNLEVBQUMsS0FBTSxFQUFDLEtBQU0sRUFBQyxFQUFNLEVBQUMsS0FBTSxFQUFDLEtBQU0sRUFBQyxFQUFNLEVBQUMsS0FBTSxFQUFDLEtBQU0sRUFBQyxFQUFNLEVBQUMsS0FBTSxFQUFDLEtBQU0sRUFBQyxHQUFNLEVBQUMsS0FBTSxFQUFDLEtBQU0sRUFBQyxHQUFNLEVBQUMsS0FBTSxFQUFDLEtBQU0sRUFBQyxHQUFNLEVBQUMsS0FBTSxFQUFDLEtBQU0sRUFBQyxHQUFNLEVBQUMsS0FBTSxFQUFDLEtBQU0sRUFBQyxLQUFNLEVBQUMsS0FBTSxFQUFDLEtBQU0sRUFBQyxLQUFNLEVBQUMsS0FBTSxFQUFDLEtBQU0sRUFBQyxLQUFNLEVBQUMsS0FBTSxFQUFDLEtBQU0sRUFBQyxLQUFNLEVBQUMsS0FBTSxFQUFDLEtBQU0sRUFBQyxLQUFNLEVBQUMsS0FBTSxFQUFDLEtBQU0sRUFBQyxLQUFNLEVBQUMsS0FBTSxFQUFDLENBQU0sRUFBQyxLQUFNLEVBQUMsR0FBTSxFQUFDLEtBQU0sRUFBQyxHQUFNLEVBQUMsS0FBTSxFQUFDLENBQU0sRUFBQyxLQUFNLEVBQUMsS0FBTSxFQUFDLEtBQU0sRUFBQyxLQUFNLEVBQUMsS0FBTSxFQUFDLEdBQU0sRUFBQyxLQUFNLEVBQUMsR0FBTSxFQUFDLEtBQU0sRUFBQyxLQUFNLEVBQUMsS0FBTSxFQUFDLEVBQU0sRUFBQyxLQUFNLEVBQUMsS0FBTSxFQUFDLEVBQU0sRUFBQyxLQUFNLEVBQUMsS0FBTSxFQUFDLEVBQU0sRUFBQyxLQUFNLEVBQUMsS0FBTSxFQUFDLElBQU0sRUFBQyxLQUFNLEVBQUMsRUFBTSxFQUFDLEtBQU0sRUFBQyxLQUFNLEVBQUMsS0FBTSxFQUFDLEVBQU0sRUFBQyxLQUFNLEVBQUMsS0FBTSxFQUFDLElBQU0sRUFBQyxLQUFNLEVBQUMsRUFBTSxFQUFDLEtBQU0sRUFBQyxLQUFNLEVBQUMsS0FBTSxFQUFDLEVBQU0sRUFBQyxLQUFNLEVBQUMsS0FBTSxFQUFDLEVBQU0sRUFBQyxLQUFNLEVBQUMsS0FBTSxFQUFDLEVBQU0sRUFBQyxLQUFNLEVBQUMsS0FBTSxFQUFDLEtBQU0sRUFBQyxLQUFNLEVBQUMsR0FBTSxFQUFDLEtBQU0sRUFBQyxLQUFNLEVBQUMsS0FBTSxFQUFDLEtBQU0sRUFBQyxLQUFNLEVBQUMsR0FBTSxFQUFDLEtBQU0sRUFBQyxJQUFNLEVBQUMsS0FBTSxFQUFDLEVBQU0sRUFBQyxLQUFNLEVBQUMsS0FBTSxFQUFDLEVBQU0sRUFBQyxLQUFNLEVBQUMsRUFBTSxFQUFDLEtBQU0sRUFBQyxLQUFNLEVBQUMsRUFBTSxFQUFDLEtBQU0sRUFBQyxLQUFNLEVBQUMsRUFBTSxFQUFDLEtBQU0sRUFBQyxLQUFNLEVBQUMsS0FBTSxFQUFDLEdBQU0sRUFBQyxLQUFNLEVBQUMsSUFBTSxFQUFDLEtBQU0sRUFBQyxFQUFNLEVBQUMsS0FBTSxFQUFDLEtBQU0sRUFBQyxFQUFNLEVBQUMsS0FBTSxFQUFDLEVBQU0sRUFBQyxLQUFNLEVBQUMsS0FBTSxFQUFDLEVBQU0sRUFBQyxLQUFNLEVBQUMsS0FBTSxFQUFDLEVBQU0sRUFBQyxLQUFNLEVBQUMsQ0FBTSxFQUFDLENBQU0sRUFBQyxDQUFNLEVBQUMsQ0FBTSxFQUFDLENBQU0sQ0FBQyxDQUFBOztBQVE3dEYsSUFOcUIsY0FBYyxHQUFBLENBQUEsWUFBQTtBQUV0QixXQUZRLGNBQWMsQ0FFckIsT0FBTyxFQUFFLFFBQVEsRUFBRTtBQU03QixtQkFBZSxDQUFDLElBQUksRUFSSCxjQUFjLENBQUEsQ0FBQTs7QUFHL0IsUUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUE7QUFDdEIsUUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUE7O0FBRXhCLFFBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7QUFDckUsUUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFBO0dBQ3ZCOztBQVNELGNBQVksQ0FqQk8sY0FBYyxFQUFBO0FBVWpDLG1CQUFlLEVBQUE7QUFTWCxXQUFLLEVBVE0sU0FBQSxlQUFBLEdBQUc7QUFDaEIsWUFBSTtBQUNGLGNBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFBO0FBQzNELGNBQUksUUFBUSxFQUFFO0FBQ1osZ0JBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUE7V0FDeEIsTUFBTTtBQUNMLGdCQUFJLENBQUMsUUFBUSxFQUFFLENBQUE7V0FDaEI7U0FDRixDQUFDLE9BQU8sR0FBRyxFQUFFO0FBQ1osaUJBQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLEdBQUcsQ0FBQyxDQUFBO0FBQ2pDLGNBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQTtTQUNoQjtPQUNGO0tBVUU7QUFSSCxZQUFRLEVBQUE7QUFVSixXQUFLLEVBVkQsU0FBQSxRQUFBLEdBQUc7QUFDVCxlQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLENBQUE7QUFDcEMsWUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQTtPQUM3QjtLQVdFO0FBVEgsZ0JBQVksRUFBQTtBQVdSLFdBQUssRUFYRyxTQUFBLFlBQUEsR0FBRztBQUNiLFlBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFO0FBQ3RCLGVBQUssQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFBO0FBQy9DLGlCQUFNO1NBQ1A7O0FBRUQsWUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQTtBQUM1QixZQUFJLE1BQU0sR0FBRyxJQUFJLFVBQVUsRUFBRSxDQUFBO0FBQzdCLGNBQU0sQ0FBQyxNQUFNLEdBQUcsWUFBVztBQUN6QixjQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRTtBQUNyQyxpQkFBSyxDQUFDLG9IQUFvSCxDQUFDLENBQUE7V0FDNUg7O0FBRUQsY0FBSSxRQUFRLEdBQUcsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFBOztBQUU3RCxjQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7QUFDVCxjQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7QUFDVCxpQkFBTSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUU7QUFDOUIsZ0JBQUksR0FBRyxHQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFBO0FBQzdDLGdCQUFJLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQTs7QUFFN0Msb0JBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQSxHQUFJLElBQUksQ0FBQTtXQUNsQzs7QUFFRCxzQkFBWSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFBO0FBQzFELGtCQUFRLENBQUMsUUFBUSxDQUFDLENBQUE7U0FDbkIsQ0FBQTtBQUNELGNBQU0sQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO09BQ2pEO0tBWUU7R0FDRixDQUFDLENBQUM7O0FBRUgsU0F4RW1CLGNBQWMsQ0FBQTtDQXlFbEMsQ0FBQSxFQUFHLENBQUM7O0FBRUwsTUFBTSxDQUFDLE9BQU8sR0EzRU8sY0FBYyxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3dCbkMsU0FBUyxRQUFRLENBQUMsU0FBUyxFQUFFO0FBQzNCLE1BQUcsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLE1BQU0sa0VBQWtFLENBQUM7QUFDOUYsTUFBSSxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUM7QUFDMUIsTUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7O0FBRXRCLE1BQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO0NBQ3BDO0FBQ0QsUUFBUSxDQUFDLFNBQVMsQ0FBQyxjQUFjLEdBQUcsWUFBVztBQUM3QyxTQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7Q0FDekIsQ0FBQztBQUNGLFFBQVEsQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLEdBQUcsVUFBUyxRQUFRLEVBQUUsVUFBVSxFQUFFO0FBQ25FLFVBQVEsSUFBSSxFQUFFLENBQUM7QUFDZixNQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLEVBQzNCLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUVsQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxHQUFHLFVBQVUsQ0FBQztDQUMzQyxDQUFDO0FBQ0YsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEdBQUcsWUFBVztBQUNsQyxNQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFO0FBQ3ZCLFFBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztBQUM3QixRQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO0dBQzFCO0NBQ0YsQ0FBQztBQUNGLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxHQUFHLFlBQVc7QUFDbkMsTUFBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRTtBQUN2QixRQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFDdEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztHQUN4QjtDQUNGLENBQUM7QUFDRixRQUFRLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBRyxZQUFXO0FBQ3BDLE1BQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztDQUM3QixDQUFDOzs7QUFHRixRQUFRLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxVQUFTLFFBQVEsRUFBRSxFQUFFLENBQUM7QUFDbEQsUUFBUSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEdBQUcsVUFBUyxRQUFRLEVBQUUsRUFBRyxDQUFDO0FBQ3JELFFBQVEsQ0FBQyxTQUFTLENBQUMsYUFBYSxHQUFHLFVBQVMsUUFBUSxFQUFFLEVBQUcsQ0FBQztBQUMxRCxRQUFRLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxZQUFXLEVBQUcsQ0FBQzs7cUJBR3pDLFFBQVE7OztBQ25FVixZQUFZLENBQUM7O0FBRWIsTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsWUFBWSxFQUFFO0FBQzNDLE9BQUssRUFBRSxJQUFJO0NBQ1osQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQkgsU0FBUyxRQUFRLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUU7QUFDMUMsTUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7QUFDbEIsTUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7QUFDcEIsTUFBSSxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUM7QUFDMUIsTUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7Q0FDbkI7QUFDRCxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsU0FBUyxDQUFDLEdBQUcsR0FBRyxZQUFXO0FBQUUsU0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0NBQUUsQ0FBQTtBQUNqSCxRQUFRLENBQUMsU0FBUyxDQUFDLEdBQUcsR0FBRyxVQUFTLEdBQUcsRUFBRTtBQUFFLE1BQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDO0NBQUUsQ0FBQTs7QUFFL0QsU0FBUyxhQUFhLENBQUMsU0FBUyxFQUFFO0FBQ2hDLE1BQUksQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFDO0FBQzFCLE1BQUksQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQztDQUNwQztBQUNELGFBQWEsQ0FBQyxTQUFTLENBQUMsSUFBSSxHQUFHLGFBQWEsQ0FBQyxTQUFTLENBQUMsSUFBSSxHQUFHLGFBQWEsQ0FBQyxTQUFTLENBQUMsR0FBRyxHQUFHLFlBQVc7QUFDckcsU0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO0NBQ3BELENBQUE7QUFDRCxhQUFhLENBQUMsU0FBUyxDQUFDLEdBQUcsR0FBRyxVQUFTLEdBQUcsRUFBRTtBQUMxQyxNQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDO0NBQzlDLENBQUE7O0FBRUQsU0FBUyxvQkFBb0IsQ0FBQyxTQUFTLEVBQUU7QUFDdkMsTUFBSSxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUM7QUFDMUIsTUFBSSxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDO0FBQ25DLE1BQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO0NBQzFCO0FBQ0Qsb0JBQW9CLENBQUMsU0FBUyxDQUFDLElBQUksR0FBRyxvQkFBb0IsQ0FBQyxTQUFTLENBQUMsSUFBSSxHQUFHLG9CQUFvQixDQUFDLFNBQVMsQ0FBQyxHQUFHLEdBQUcsWUFBVztBQUMxSCxNQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO0FBQ2xDLE1BQUcsRUFBRSxJQUFJLEtBQU0sRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDekIsTUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQztBQUM3QyxTQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7Q0FDbEQsQ0FBQTtBQUNELG9CQUFvQixDQUFDLFNBQVMsQ0FBQyxHQUFHLEdBQUcsVUFBUyxHQUFHLEVBQUU7QUFDakQsTUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLEdBQUcsQ0FBQztDQUM1QyxDQUFBOztBQUdELFNBQVMsaUJBQWlCLENBQUMsU0FBUyxFQUFFO0FBQ3BDLE1BQUksQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFBO0NBQzFCO0FBQ0QsaUJBQWlCLENBQUMsU0FBUyxDQUFDLEdBQUcsR0FBRyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsSUFBSSxHQUFHLFlBQVc7QUFDOUUsU0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUM7Q0FDekMsQ0FBQTs7QUFFRCxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsSUFBSSxHQUFJLFlBQVc7QUFDN0MsU0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUM7Q0FDekMsQ0FBQTtBQUNELGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxHQUFHLEdBQUcsVUFBUyxHQUFHLEVBQUU7QUFDOUMsTUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztDQUN0QyxDQUFBOztBQUVELFNBQVMsT0FBTyxDQUFDLE1BQU0sRUFBRTtBQUN2QixNQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQztDQUNyQjtBQUNELE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxHQUFHLFlBQVc7QUFBRSxTQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7Q0FBRSxDQUFBO0FBQzNHLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxHQUFHLFVBQVMsR0FBRyxFQUFFLEVBQUksQ0FBQTtBQUMxQyxJQUFJLFFBQVEsR0FBRyxFQUFHLENBQUM7O0FBRW5CLFNBQVMsRUFBRSxDQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO0FBQzNELE1BQUksQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFDO0FBQzFCLE1BQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO0FBQ2xCLE1BQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDO0FBQ3BCLE1BQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDO0FBQ3RCLE1BQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDO0FBQ3BCLE1BQUksR0FBRyxJQUFJLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUM7QUFDbkMsTUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUM7Q0FDekI7QUFDRCxFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksR0FBRyxVQUFTLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDakMsTUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDMUMsTUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7O0FBRTFDLE1BQUcsQ0FBQyxJQUFJLEVBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyxvQkFBb0IsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUNwRCxNQUFHLENBQUMsSUFBSSxFQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsb0JBQW9CLEdBQUcsQ0FBQyxDQUFDLENBQUM7O0FBRXBELE1BQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ3ZCLE1BQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUM7Q0FDeEMsQ0FBQzs7O0FBR0YsS0FBSSxJQUFJLENBQUMsR0FBRyxFQUFJLEVBQUUsVUFBVSxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUUsVUFBVSxFQUFFLEVBQUU7QUFDOUQsVUFBUSxDQUFDLElBQUksR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7Q0FDakM7OztBQUdELElBQUksTUFBTSxHQUFHLEVBQUcsQ0FBQztBQUNqQixNQUFNLENBQUMscUJBQXFCLEdBQUcsQ0FBSSxDQUFDO0FBQ3BDLE1BQU0sQ0FBQyx5QkFBeUIsR0FBRyxFQUFJLENBQUM7QUFDeEMsTUFBTSxDQUFDLFNBQVMsR0FBRyxFQUFJLENBQUM7QUFDeEIsTUFBTSxDQUFDLGVBQWUsR0FBRyxFQUFJLENBQUM7QUFDOUIsTUFBTSxDQUFDLGlCQUFpQixHQUFHLEVBQUksQ0FBQztBQUNoQyxNQUFNLENBQUMsRUFBRSxHQUFHLEVBQUksQ0FBQztBQUNqQixNQUFNLENBQUMsRUFBRSxHQUFHLEVBQUksQ0FBQztBQUNqQixNQUFNLENBQUMsRUFBRSxHQUFHLEVBQUksQ0FBQzs7QUFFakIsSUFBSSxVQUFVLEdBQUcsQ0FBSSxDQUFDO0FBQ3RCLElBQUksVUFBVSxHQUFHLENBQUksQ0FBQztBQUN0QixJQUFJLFVBQVUsR0FBRyxDQUFJLENBQUM7QUFDdEIsSUFBSSxVQUFVLEdBQUcsQ0FBSSxDQUFDO0FBQ3RCLElBQUksVUFBVSxHQUFHLENBQUksQ0FBQztBQUN0QixJQUFJLFVBQVUsR0FBRyxDQUFJLENBQUM7QUFDdEIsSUFBSSxVQUFVLEdBQUcsQ0FBSSxDQUFDO0FBQ3RCLElBQUksVUFBVSxHQUFHLENBQUksQ0FBQztBQUN0QixJQUFJLFdBQVcsR0FBRyxFQUFJLENBQUM7QUFDdkIsSUFBSSxXQUFXLEdBQUcsRUFBSSxDQUFDO0FBQ3ZCLElBQUksV0FBVyxHQUFHLEVBQUksQ0FBQzs7QUFFdkIsSUFBSSxhQUFhLEdBQUcsQ0FBSSxDQUFDO0FBQ3pCLElBQUksYUFBYSxHQUFHLENBQUksQ0FBQztBQUN6QixJQUFJLGFBQWEsR0FBRyxDQUFJLENBQUM7QUFDekIsSUFBSSxhQUFhLEdBQUcsQ0FBSSxDQUFDO0FBQ3pCLElBQUksYUFBYSxHQUFHLENBQUksQ0FBQztBQUN6QixJQUFJLGFBQWEsR0FBRyxDQUFJLENBQUM7QUFDekIsSUFBSSxhQUFhLEdBQUcsQ0FBSSxDQUFDO0FBQ3pCLElBQUksYUFBYSxHQUFHLENBQUksQ0FBQztBQUN6QixJQUFJLGFBQWEsR0FBRyxDQUFJLENBQUM7QUFDekIsSUFBSSxhQUFhLEdBQUcsRUFBSSxDQUFDO0FBQ3pCLElBQUksYUFBYSxHQUFHLEVBQUksQ0FBQztBQUN6QixJQUFJLGFBQWEsR0FBRyxFQUFJLENBQUM7QUFDekIsSUFBSSxhQUFhLEdBQUcsRUFBSSxDQUFDO0FBQ3pCLElBQUksYUFBYSxHQUFHLEVBQUksQ0FBQztBQUN6QixJQUFJLGFBQWEsR0FBRyxFQUFJLENBQUM7O0FBRXpCLElBQUksYUFBYSxHQUFHLEVBQUksQ0FBQztBQUN6QixJQUFJLGFBQWEsR0FBRyxFQUFJLENBQUM7QUFDekIsSUFBSSxhQUFhLEdBQUcsRUFBSSxDQUFDO0FBQ3pCLElBQUksYUFBYSxHQUFHLEVBQUksQ0FBQztBQUN6QixJQUFJLGFBQWEsR0FBRyxFQUFJLENBQUM7QUFDekIsSUFBSSxhQUFhLEdBQUcsRUFBSSxDQUFDO0FBQ3pCLElBQUksYUFBYSxHQUFHLEVBQUksQ0FBQztBQUN6QixJQUFJLGFBQWEsR0FBRyxFQUFJLENBQUM7O0FBRXpCLElBQUksYUFBYSxHQUFHLEVBQUksQ0FBQztBQUN6QixJQUFJLGFBQWEsR0FBRyxFQUFJLENBQUM7O0FBRXpCLElBQUksYUFBYSxHQUFHLEVBQUksQ0FBQztBQUN6QixJQUFJLGFBQWEsR0FBRyxFQUFJLENBQUM7O0FBRXpCLElBQUksYUFBYSxHQUFHLENBQUksQ0FBQztBQUN6QixJQUFJ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R0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7O0FBRXRDLE1BQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO0FBQ25CLE1BQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDOztBQUVkLE1BQUksQ0FBQyxLQUFLLEdBQUcsRUFBRyxDQUFDO0FBQ2pCLE1BQUksQ0FBQyxZQUFZLEdBQUcsRUFBRyxDQUFDO0FBQ3hCLE1BQUksQ0FBQyxTQUFTLEdBQUc7QUFDZixLQUFDLEVBQUUsSUFBSSxRQUFRLENBQUMsR0FBRyxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUM7QUFDdEMsS0FBQyxFQUFFLElBQUksUUFBUSxDQUFDLEdBQUcsRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDO0FBQ3RDLEtBQUMsRUFBRSxJQUFJLFFBQVEsQ0FBQyxHQUFHLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQztBQUN0QyxLQUFDLEVBQUUsSUFBSSxRQUFRLENBQUMsR0FBRyxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUM7QUFDdEMsS0FBQyxFQUFFLElBQUksUUFBUSxDQUFDLEdBQUcsRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDO0FBQ3RDLEtBQUMsRUFBRSxJQUFJLFFBQVEsQ0FBQyxHQUFHLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQztBQUN0QyxLQUFDLEVBQUUsSUFBSSxRQUFRLENBQUMsR0FBRyxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUM7QUFDdEMsS0FBQyxFQUFFLElBQUksUUFBUSxDQUFDLEdBQUcsRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDO0FBQ3RDLE1BQUUsRUFBRSxJQUFJLFFBQVEsQ0FBQyxJQUFJLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQztBQUN6QyxNQUFFLEVBQUUsSUFBSSxRQUFRLENBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUM7QUFDekMsTUFBRSxFQUFFLElBQUksUUFBUSxDQUFDLElBQUksRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDO0FBQ3pDLE1BQUUsRUFBRSxJQUFJLFFBQVEsQ0FBQyxJQUFJLEVBQUUsS0FBTSxFQUFFLElBQUksQ0FBQyxFQUNyQyxDQUFDOztBQUdGLE1BQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxZQUFXO0FBQ2pDLFFBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNuQixRQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQztBQUNkLFdBQU8sQ0FBQyxDQUFDO0dBQ1YsQ0FBQztBQUNGLE1BQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUM7O0FBRTVCLE1BQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLElBQUksR0FBRyxVQUFTLEdBQUcsRUFBRTtBQUNyQyxRQUFJLENBQUMsUUFBUSxHQUFJLEtBQUssQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUN4RCxRQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsR0FBRyxDQUFDO0dBQ3hDLENBQUM7QUFDRixNQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsWUFBVztBQUNqQyxRQUFHLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxFQUNuQixPQUFPLENBQUMsR0FBRyxDQUFDLDBCQUEwQixDQUFDLENBQUM7O0FBRTFDLFFBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDaEQsUUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNyQyxRQUFJLENBQUMsUUFBUSxHQUFHLElBQUssQ0FBQyxRQUFRLEdBQUcsQ0FBQyxHQUFJLEtBQU0sQ0FBQztBQUM3QyxXQUFPLEdBQUcsQ0FBQztHQUNaLENBQUM7O0FBR0YsTUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFHLENBQUE7QUFDakIsTUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztBQUNyQyxNQUFJLENBQUMsTUFBTSxDQUFDLENBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0FBQ3JDLE1BQUksQ0FBQyxNQUFNLENBQUMsQ0FBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7QUFDckMsTUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztBQUNyQyxNQUFJLENBQUMsTUFBTSxDQUFDLENBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0FBQ3JDLE1BQUksQ0FBQyxNQUFNLENBQUMsQ0FBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7QUFDckMsTUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztBQUNyQyxNQUFJLENBQUMsTUFBTSxDQUFDLENBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0FBQ3JDLE1BQUksQ0FBQyxNQUFNLENBQUMsQ0FBSSxDQUFDLEdBQUcsSUFBSSxhQUFhLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN4RCxNQUFJLENBQUMsTUFBTSxDQUFDLENBQUksQ0FBQyxHQUFHLElBQUksYUFBYSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDeEQsTUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFJLENBQUMsR0FBRyxJQUFJLGFBQWEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3hELE1BQUksQ0FBQyxNQUFNLENBQUMsRUFBSSxDQUFDLEdBQUcsSUFBSSxhQUFhLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN4RCxNQUFJLENBQUMsTUFBTSxDQUFDLEVBQUksQ0FBQyxHQUFHLElBQUksYUFBYSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDeEQsTUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFJLENBQUMsR0FBRyxJQUFJLGFBQWEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3hELE1BQUksQ0FBQyxNQUFNLENBQUMsRUFBSSxDQUFDLEdBQUcsSUFBSSxhQUFhLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN4RCxNQUFJLENBQUMsTUFBTSxDQUFDLEVBQUksQ0FBQyxHQUFHLElBQUksYUFBYSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDeEQsTUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFJLENBQUMsR0FBRyxJQUFJLG9CQUFvQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDL0QsTUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFJLENBQUMsR0FBRyxJQUFJLG9CQUFvQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDL0QsTUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFJLENBQUMsR0FBRyxJQUFJLG9CQUFvQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDL0QsTUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFJLENBQUMsR0FBRyxJQUFJLG9CQUFvQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDL0QsTUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFJLENBQUMsR0FBRyxJQUFJLG9CQUFvQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDL0QsTUFBSSxDQUFDLE1B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Q0FBQyxDQUFDO0FBQ3JELE9BQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0tBQ2pDLENBQUM7O0FBRUYsT0FBRyxFQUFFLElBQUksRUFBRSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLENBQUMsRUFBRSxVQUFTLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDeEQsVUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRTtVQUFFLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDckMsVUFBRyxJQUFJLEtBQUssQ0FBQyxFQUFFO0FBQ2IsWUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNsQyxTQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO09BQ1YsTUFDSTtBQUNILFlBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBQ2xDLFlBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBRSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUEsR0FBSSxJQUFJLENBQUUsR0FBRyxLQUFNLENBQUMsQ0FBQztBQUMzRSxTQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxLQUFNLENBQUMsQ0FBQztPQUNyQjtLQUNGLENBQUM7O0FBRUYsT0FBRyxFQUFFLElBQUksRUFBRSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLENBQUMsRUFBRSxVQUFTLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDeEQsVUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7VUFBRSxJQUFJLEdBQUcsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFF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RTtVQUFFLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDckMsVUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFNLElBQUksSUFBSSxJQUFLLEVBQUUsR0FBSSxLQUFNLENBQUMsQ0FBQztBQUNoRSxPQUFDLENBQUMsR0FBRyxDQUFDLElBQUssSUFBSSxJQUFJLEdBQUksS0FBTSxDQUFDLENBQUM7S0FDaEMsQ0FBQzs7QUFFRixPQUFHLEVBQUUsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsQ0FBQyxFQUFFLFVBQVMsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUN4RCxVQUFJLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFO1VBQUUsSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUNyQyxVQUFHLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQSxJQUFLLENBQUMsRUFBRSxFQUFHLE1BQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxFQUFFLENBQUM7S0FFdEMsQ0FBQzs7QUFFRixPQUFHLEVBQUUsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsQ0FBQyxFQUFFLFVBQVMsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUN4RCxVQUFJLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFO1VBQUUsSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUNyQyxVQUFHLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQSxLQUFNLENBQUMsRUFBRSxFQUFHLE1BQ3RCLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxFQUFFLENBQUM7S0FFdEMsQ0FBQzs7QUFFRixPQUFHLEVBQUUsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsQ0FBQyxFQUFFLFVBQVMsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUN4RCxVQUFJLElBQUksR0FB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QUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxLQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ3JELE9BQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEtBQU0sQ0FBQyxDQUFDO0tBQ3JCLENBQUM7O0FBRUYsT0FBRyxFQUFFLElBQUksRUFBRSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLENBQUMsRUFBRSxVQUFTLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDeEQsVUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRTtVQUFFLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDckMsVUFBSSxHQUFHLEdBQUcsSUFBSSxHQUFHLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDekQsVUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEtBQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztBQUNyRCxPQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxLQUFNLENBQUMsQ0FBQztLQUNyQixDQUFDOztBQUVGLE9BQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRSxDQUFDLEVBQUUsVUFBUyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQ3hELFVBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUU7VUFBRSxJQUFJLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ3JDLE9BQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7O0FBRVosVUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFLLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFLLEtBQU0sQ0FBQyxDQUFDO0FBQy9FLFVBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBSyxLQUFNLENBQUMsQ0FBQztLQUNoRixDQUFDOztBQUVGLE9BQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRSxDQUFDLEVBQUUsVUFBUyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQ3hELFVBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUU7VUFBRSxJQUFJLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ3JDLE9BQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7O0FBRVosVUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFLLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFLLEtBQU0sQ0FBQyxDQUFDO0FBQy9FLFVBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBSyxLQUFNLENBQUMsQ0FBQztLQUNoRixDQUFDOztBQUVGLE9BQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRSxDQUFDLEVBQUUsVUFBUyxDQUFDLEVBQUU7QUFDckQsVUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ3BCLFVBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FB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LEVBQUUsS0FBTSxFQUFFLEtBQU0sRUFBRSxJQUFNLEVBQUUsSUFBTSxFQUM5RCxJQUFNLEVBQUUsSUFBTSxFQUFFLElBQU0sRUFBRSxJQUFNLEVBQUUsS0FBTSxFQUFFLEtBQU0sRUFBRSxJQUFNLEVBQUUsSUFBTSxFQUM5RCxFQUFNLEVBQUUsSUFBTSxFQUFFLEdBQU0sRUFBRSxJQUFNLEVBQUUsS0FBTSxFQUFFLEtBQU0sRUFBRSxLQUFNLEVBQUUsS0FBTSxFQUM5RCxJQUFNLEVBQUUsSUFBTSxFQUFFLElBQU0sRUFBRSxDQUFNLEVBQUUsR0FBTSxFQUFFLElBQU0sRUFBRSxLQUFNLEVBQUUsS0FBTSxFQUM5RCxLQUFNLEVBQUUsS0FBTSxFQUFFLEtBQU0sRUFBRSxDQUFNLEVBQUUsQ0FBTSxFQUFFLEtBQU0sRUFBRSxJQUFNLEVBQUUsSUFBTSxFQUM5RCxDQUFNLEVBQUUsQ0FBTSxFQUFFLEVBQU0sRUFBRSxDQUFNLEVBQUUsR0FBTSxFQUFFLEdBQU0sRUFBRSxLQUFNLEVBQUUsS0FBTSxFQUM5RCxJQUFNLEVBQUUsS0FBTSxFQUFFLEtBQU0sRUFBRSxLQUFNLEVBQUUsS0FBTSxFQUFFLEtBQU0sRUFBRSxDQUFNLEVBQUUsR0FBTSxFQUM5RCxJQUFNLEVBQUUsS0FBTSxFQUFFLEtBQU0sRUFBRSxJQUFNLEVBQUUsS0FBTSxFQUFFLEtBQU0sRUFBRSxJQUFNLEVBQUUsSUFBTSxFQUM5RCxLQUFNLEVBQUUsQ0FBTSxFQUFFLElBQU0sRUFBRSxJQUFNLEVBQUUsRUFBTSxFQUFFLENBQU0sRUFBRSxLQUFNLEVBQUUsR0FBTSxFQUM5RCxLQUFNLEVBQUUsS0FBTSxFQUFFLEtBQU0sRUFBRSxLQUFNLEVBQUUsS0FBTSxFQUFFLEtBQU0sRUFBRSxJQUFNLEVBQUUsS0FBTSxFQUM5RCxJQUFNLEVBQUUsS0FBTSxFQUFFLEtBQU0sRUFBRSxLQUFNLEVBQUUsS0FBTSxFQUFFLEtBQU0sRUFBRSxLQUFNLEVBQUUsSUFBTSxFQUM5RCxLQUFNLEVBQUUsS0FBTSxFQUFFLElBQU0sRUFBRSxLQUFNLEVBQUUsRUFBTSxFQUFFLENBQU0sRUFBRSxLQUFNLEVBQUUsQ0FBTSxFQUM5RCxJQUFNLEVBQUUsSUFBTSxFQUFFLElBQU0sRUFBRSxJQUFNLEVBQUUsS0FBTSxFQUFFLElBQU0sRUFBRSxHQUFNLEVBQUUsSUFBTSxFQUM5RCxLQUFNLEVBQUUsS0FBTSxFQUFFLEtBQU0sRUFBRSxLQUFNLEVBQUUsS0FBTSxFQUFFLEtBQU0sRUFBRSxLQUFNLEVBQUUsSUFBTSxFQUM5RCxLQUFNLEVBQUUsS0FBTSxFQUFFLEtBQU0sRUFBRSxLQUFNLEVBQUUsS0FBTSxFQUFFLEdBQU0sRUFBRSxLQUFNLEVBQUUsS0FBTSxFQUM5RCxLQUFNLEVBQUUsS0FBTSxFQUFFLEtBQU0sRUFBRSxLQUFNLEVBQUUsSUFBTSxFQUFFLEtBQU0sRUFBRSxLQUFNLEVBQUUsS0FBTSxFQUM5RCxLQUFNLEVBQUUsS0FBTSxFQUFFLEtBQU0sRUFBRSxLQUFNLEVBQUUsS0FBTSxFQUFFLEtBQU0sRUFBRSxLQUFNLEVBQUUsS0FBTSxFQUM5RCxLQUFNLEVBQUUsSUFBTSxFQUFFLEtBQU0sRUFBRSxLQUFNLEVBQUUsS0FBTSxFQUFFLEtBQU0sRUFBRSxJQUFNLEVBQUUsS0FBTSxFQUM5RCxHQUFNLEVBQUUsR0FBTSxFQUFFLEtBQU0sRUFBRSxLQUFNLEVBQUUsSUFBTSxFQUFFLElBQU0sRUFBRSxLQUFNLEVBQUUsS0FBTSxFQUM5RCxLQUFNLEVBQUUsS0FBTSxFQUFFLElBQU0sRUFBRSxJQUFNLEVBQUUsS0FBTSxFQUFFLEtBQU0sRUFBRSxHQUFNLEVBQUUsS0FBTSxFQUM5RCxHQUFNLEVBQUUsS0FBTSxFQUFFLEVBQU0sRUFBRSxLQUFNLEVBQUUsR0FBTSxFQUFFLEdBQU0sRUFBRSxLQUFNLEVBQUUsS0FBTSxFQUM5RCxDQUFNLEVBQUUsR0FBTSxFQUFFLElBQU0sRUFBRSxLQUFNLEVBQUUsS0FBTSxFQUFFLEtBQU0sRUFBRSxLQUFNLEVBQUUsS0FBTSxFQUM5RCxLQUFNLEVBQUUsS0FBTSxFQUFFLEtBQU0sRUFBRSxLQUFNLEVBQUUsSUFBTSxFQUFFLElB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QUFTLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDN0MsZ0JBQUksU0FBUyxHQUFHLEtBQUEsQ0FBSyxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7QUFFNUMsaUJBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNsQyxpQkFBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1dBQ3pDOztBQUVELGlCQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3RCLENBQUE7QUFDRCxpQkFBUyxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDO0FBQ3RDLGlCQUFTLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDOztBQUVyQyxjQUFNLENBQUMsQ0FBQyxHQUFHLFlBQVc7QUFDcEIsbUJBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUNsQixDQUFBO09BQ0Y7S0FtREU7R0FDRixDQUFDLENBQUM7O0FBRUgsU0EvS21CLElBQUksQ0FBQTtDQWdMeEIsQ0FBQSxFQUFHLENBQUM7O0FBRUwsTUFBTSxDQUFDLE9BQU8sR0FsTE8sSUFBSSxDQUFBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBNYWluIGZyb20gJy4vbWFpbidcblxuLy8gQ3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIHRoZSBnYW1lIGFuZCBydW4gaXRcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBldnQgPT4ge1xuICBsZXQgYXBwID0gbmV3IE1haW4oKVxuICBhcHAucnVuKClcbn0pXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBDbGllbnQge1xuICBjb25uZWN0KCkge1xuICAgIHRoaXMuY29ubmVjdGlvbiA9IG5ldyBXZWJTb2NrZXQodGhpcy51cmkpXG4gICAgdGhpcy5jb25uZWN0aW9uLm9ub3BlbiAgICA9IHRoaXMub25vcGVuLmJpbmQodGhpcylcbiAgICB0aGlzLmNvbm5lY3Rpb24ub25lcnJvciAgID0gdGhpcy5vbmVycm9yLmJpbmQodGhpcylcbiAgICB0aGlzLmNvbm5lY3Rpb24ub25tZXNzYWdlID0gdGhpcy5vbm1lc3NhZ2UuYmluZCh0aGlzKVxuICB9XG5cbiAgb25vcGVuKCkge1xuICAgIGNvbnNvbGUubG9nKCdbQ2xpZW50XSBDb25uZWN0ZWQnKVxuICB9XG5cbiAgb25lcnJvcihlcnIpIHtcbiAgICBjb25zb2xlLmxvZygnW0NsaWVudF0gRXJyb3InLCBlcnIpXG4gIH1cblxuICBvbm1lc3NhZ2UoZSkge1xuICAgIGNvbnNvbGUubG9nKCdbQ2xpZW50XSBEYXRhJywgZS5kYXRhKVxuICAgIHZhciBwYWNrZXQgPSBKU09OLnBhcnNlKGUuZGF0YSlcbiAgICBpZiAocGFja2V0LnR5cGUgPT0gJ3JhZGlvJykge1xuICAgICAgaWYgKHRoaXMub25SZWNlaXZlKSB7XG4gICAgICAgIHRoaXMub25SZWNlaXZlKHBhY2tldC5jaGFubmVsLCBwYWNrZXQuZGF0YSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUud2FybignTm8gb25SZWNlaXZlIHNldCcpXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUud2FybignVW5rbm93biBwYWNrZXQgdHlwZScsIHBhY2tldC50eXBlKVxuICAgIH1cbiAgfVxuXG4gIHRyYW5zbWl0KGNoYW5uZWwsIGRhdGEpIHtcbiAgICB2YXIgcGFja2V0ID0ge1xuICAgICAgdHlwZTogJ3JhZGlvJyxcbiAgICAgIGNoYW5uZWw6IGNoYW5uZWwsXG4gICAgICBkYXRhOiBkYXRhXG4gICAgfVxuICAgIHRoaXMuY29ubmVjdGlvbi5zZW5kKEpTT04uc3RyaW5naWZ5KHBhY2tldCkpXG4gIH1cblxuICBnZXQgdXJpKCkge1xuICAgIHJldHVybiBcIndzOi8vbG9jYWxob3N0OjgwODAvXCJcbiAgfVxufVxuIiwiLy8gY29tcGlsZWQgdmVyc2lvbiBvZiBwcm9ncmFtcy9jb250cm9sLmRhc21cbmNvbnN0IERFTU9fQllURUNPREUgPSBbMHg3ZjgxLDB4MDA2ZSwweDFhMDAsMHg4NGUxLDB4MWUyMCwweDdjMTIsMHhmNjE1LDB4MWZjMSwweDAwMWUsMHg3YzEyLDB4NzQwNiwweDFmYzEsMHgwMDFmLDB4N2MxMiwweDE5MTAsMHgxZmMxLDB4MDAyMCwweDdjMTIsMHgxODQyLDB4MWZjMSwweDAwMjEsMHg3YzEyLDB4ODY5NywweDFmYzEsMHgwMDIyLDB4ODhlMiwweDE4ZjMsMHg3ZjgxLDB4MDAwNCwweDYzODEsMHhmZmZmLDB4ZmZmZiwweGZmZmYsMHhmZmZmLDB4ZmZmZiwweDg0MDEsMHg3YzIxLDB4ODAwMCwweDdhNDAsMHgwMDFlLDB4NjM4MSwweDA1MDEsMHgwOTBjLDB4NjM4MSwweDAzMDEsMHg3YzAxLDB4MDAyMCwweDEwMDQsMHgwYzAyLDB4N2MwMiwweDgwMDAsMHg3YzIwLDB4MDAyOSwweDYwMDEsMHg2MzgxLDB4MGIwMSwweDIwNDEsMHg4NDUyLDB4N2Y4MSwweDAwNDYsMHg3YzIwLDB4MDAyYywweDg4NjIsMHg3YzcyLDB4MDAyMCwweDdjMjAsMHgwMDQ4LDB4ODgwMiwweDdmODEsMHgwMDM4LDB4NjA0MSwweDYzODEsMHg4NDYxLDB4ODg4MiwweGIwOTQsMHg4NDgxLDB4NjM4MSwweDBmMDEsMHgwYjAxLDB4ODQ2MSwweDdjNDEsMHgwMDIwLDB4N2MyMCwweDAwMmMsMHg3YzcyLDB4MDAxZiwweDdmODEsMHgwMDViLDB4ODg2MiwweDdmODEsMHgwMDUyLDB4NjA0MSwweDYwNjEsMHg2MzgxLDB4MDMwMSwweDBiMDEsMHgwNDQxLDB4N2M0YywweDAwMjAsMHg3YzAxLDB4ODAwMCwweDA5MDEsMHg4ODAyLDB4N2MxNiwweDgxODAsMHg3ZjgxLDB4MDA2NSwweDYwNDEsMHg2MDAxLDB4NjM4MSwweDdjMjAsMHgwMDAyLDB4N2MyMCwweDAwMjMsMHg5MDAxLDB4N2MyMSwweDQ4MDEsMHg3YTQwLDB4MDAxZiwweDg4MDEsMHg4NDIxLDB4N2E0MCwweDAwMjIsMHg3ZDQwLDB4MDBjZiwweDg0MjEsMHg3YzIwLDB4MDA1ZSwweDg0YTEsMHg4OGEyLDB4N2NiNiwweDAyZmYsMHg3ZjgxLDB4MDA4MSwweDg0YTEsMHg3YzIwLDB4MDA4ZiwweDdjMjAsMHgwMGU2LDB4N2MyMCwweDAxMjUsMHg3ZjgxLDB4MDA4MSwweDhiZDIsMHgwMTg2LDB4N2MyMCwweDAwYjgsMHg4YmQyLDB4MDE4NSwweDdjMjAsMHgwMGMxLDB4OGJkMiwweDAxODcsMHg3YzIwLDB4MDBjYSwweDdjNTIsMHgwMDkwLDB4OGJjMSwweDAxODYsMHg3YzUyLDB4MDA5MSwweDhiYzEsMHgwMTg1LDB4YzQ1MiwweDhiYzEsMHgwMTg3LDB4YTdjMSwweDAxODksMHg4YzAxLDB4N2MyMSwweDAwODIsMHg3YTQwLDB4MDAxZiwweDg4NTIsMHg4N2MxLDB4MDE4OSwweDdjMjEsMHgwMDgzLDB4N2E0MCwweDAwMWYsMHg4ODUyLDB4YzNjMSwweDAxODksMHg2MzgxLDB4NzgwMSwweDAxODgsMHhjMDE2LDB4ODgwMiwweDAzYzEsMHgwMTg4LDB4ODdjMSwweDAxODYsMHg2MzgxLDB4NzgwMSwweDAxODgsMHg4NDE0LDB4ODgwMywweDAzYzEsMHgwMTg4LDB4ODdjMSwweDAxODUsMHg2MzgxLDB4YTdjMSwweDAxODgsMHg4N2MxLDB4MDE4NywweDYzODEsMHg3YzEyLDB4NDgwMSwweDdjMjAsMHgwMGQ1LDB4N2Q2MCwweDAwMDAsMHgwYjAxLDB4ODgwMSwweDdhNDAsMHgwMDFmLDB4N2M1MiwweDAwOTAsMHg4YmMxLDB4MDE4NiwweDdjNTIsMHgwMDkxLDB4OGJjMSwweDAxODUsMHhjNDUyLDB4OGJjMSwweDAxODcsMHg2MDQxLDB4NjM4MSwweDBiMDEsMHg4NDIxLDB4NzgwMSwweDAxODgsMHhhNDE0LDB4N2MyMCwweDAwZmUsMHhhNDE2LDB4N2MyMCwweDAxMTQsMHhhNDJmLDB4NzgwMSwweDAxODksMHhhNDE0LDB4YzA0MSwweGE0MTYsMHg3YzQxLDB4MDBmMCwweDA4MmMsMHg4ODAxLDB4N2E0MCwweDAwMjIsMHg2MDQxLDB4NjM4MSwweGE4MTIsMHg3YzIxLDB4MDAyMCwweGFjMTIsMHg3YzIxLDB4MDA0MCwweGIwMTIsMHg3YzIxLDB4MDA2MCwweGI0MTIsMHg3YzIxLDB4MDA4MCwweGI4MTIsMHg3YzIxLDB4MDBhMCwweGJjMTIsMHg3YzIxLDB4MDBjMCwweGMwMTIsMHg3YzIxLDB4MDBmMCwweDYzODEsMHg4NDEyLDB4YzAyMSwweDg4MTIsMHhiYzIxLDB4OGMxMiwweGI0MjEsMHg5MDEyLDB4YWMyMSwweDk0MTIsMHhhNDIxLDB4OTgxMiwweDljMjEsMHg5YzEyLDB4OTQyMSwweGEwMTIsMHg4YzIxLDB4NjM4MSwweDdkODAsMHgwMDAxLDB4N2MyMCwweDAxMmUsMHg3YzIwLDB4MDE1ZCwweDdkODAsMHgwMDAwLDB4NjM4MSwweDdjMjEsMHhmMDAwLDB4ODRjMSwweDc4ZTEsMHgwMTg4LDB4NzhhMSwweDAxODgsMHg4Y2U3LDB4YTg4MSwweDdjNDEsMHgwMDIwLDB4OTg5MiwweDdjNDEsMHgwMDNkLDB4OWM5MiwweDdjNDEsMHgwMDNkLDB4YTRiNCwweGEwOTYsMHgxY2Q2LDB4N2M0MSwweDAwMmIsMHhjMGIyLDB4OGM5MiwweDdjNDEsMHgwMDJiLDB4YTRiNiwweDk0OTQsMHgxY2Q0LDB4N2M0MSwweDAwMmQsMHg4NGIyLDB4YTg5MiwweDdjNDEsMHgwMDJkLDB4YzA2MSwweDdjMjAsMHgwMDJjLDB4YzQ2MSwweDdjMjAsMHgwMDJjLDB4ODg4MywweDg4YzIsMHg4ODk0LDB4N2Y4MSwweDAxMzcsMHg2MzgxLDB4OGM4MSwweDdjMjEsMHhmMDAwLDB4YTdkNiwweDAxODksMHg3YzIxLDB4MGYwMCwweDdjNDEsMHgwMDRjLDB4YTA2MSwweDdjMjAsMHgwMDJjLDB4N2M0MSwweDAwMjAsMHg5YzYxLDB4N2MyMCwweDAwMmMsMHhhNDYxLDB4N2MyMCwweDAwMmMsMHg3YzIxLDB4ZjAwMCwweGE3ZDQsMHgwMTg5LDB4N2MyMSwweDBmMDAsMHg3YzQxLDB4MDA1MiwweGU0NjEsMHg3YzIwLDB4MDAyYywweDdjNDEsMHgwMDIwLDB4ZTA2MSwweDdjMjAsMHgwMDJjLDB4ZTg2MSwweDdjMjAsMHgwMDJjLDB4NjM4MSwweDAwMDAsMHgwMDAwLDB4MDAwMCwweDAwMDgsMHgwMDA4XVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCeXRlY29kZUxvYWRlciB7XG5cbiAgY29uc3RydWN0b3IoZWxlbWVudCwgY2FsbGJhY2spIHtcbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50XG4gICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrXG5cbiAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5sb2FkRnJvbUZpbGUuYmluZCh0aGlzKSlcbiAgICB0aGlzLmxvYWRGcm9tU3RvcmFnZSgpXG4gIH1cblxuICBsb2FkRnJvbVN0b3JhZ2UoKSB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCBieXRlY29kZSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJieXRlY29kZVwiKSlcbiAgICAgIGlmIChieXRlY29kZSkge1xuICAgICAgICB0aGlzLmNhbGxiYWNrKGJ5dGVjb2RlKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5sb2FkRGVtbygpXG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIkNhdWdodCBlcnJvcjpcIiwgZXJyKVxuICAgICAgdGhpcy5sb2FkRGVtbygpXG4gICAgfVxuICB9XG5cbiAgbG9hZERlbW8oKSB7XG4gICAgY29uc29sZS5sb2coXCJMb2FkaW5nIGRlbW8gYnl0ZWNvZGVcIilcbiAgICB0aGlzLmNhbGxiYWNrKERFTU9fQllURUNPREUpXG4gIH1cblxuICBsb2FkRnJvbUZpbGUoKSB7XG4gICAgaWYgKCF3aW5kb3cuRmlsZVJlYWRlcikge1xuICAgICAgYWxlcnQoXCJTb3JyeSwgeW91ciBicm93c2VyIGlzbid0IHN1cHBvcnRlZCA6KFwiKVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgbGV0IGNhbGxiYWNrID0gdGhpcy5jYWxsYmFja1xuICAgIGxldCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpXG4gICAgcmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHJlYWRlci5yZXN1bHQuaW5kZXhPZihcIlNFVCBcIikgPiAwKSB7XG4gICAgICAgIGFsZXJ0KFwiSXQgbG9va3MgbGlrZSB5b3Ugc2VsZWN0ZWQgYW4gQXNzZW1ibHkgc291cmNlIGZpbGUuIE9ubHkgY29tcGlsZWQgYnl0ZWNvZGUgKGluIGxpdHRsZSBlbmRpYW4gZm9ybWF0KSBpcyBzdXBwb3J0ZWQuXCIpXG4gICAgICB9XG5cbiAgICAgIGxldCBieXRlY29kZSA9IG5ldyBBcnJheShNYXRoLmNlaWwocmVhZGVyLnJlc3VsdC5sZW5ndGggLyAyKSlcblxuICAgICAgbGV0IGkgPSAwXG4gICAgICBsZXQgaiA9IDBcbiAgICAgIHdoaWxlKGkgPCByZWFkZXIucmVzdWx0Lmxlbmd0aCkge1xuICAgICAgICBsZXQgbG93ICA9IHJlYWRlci5yZXN1bHQuY2hhckNvZGVBdChpKyspIHx8IDBcbiAgICAgICAgbGV0IGhpZ2ggPSByZWFkZXIucmVzdWx0LmNoYXJDb2RlQXQoaSsrKSB8fCAwXG5cbiAgICAgICAgYnl0ZWNvZGVbaisrXSA9IChsb3cgPDwgOCkgKyBoaWdoXG4gICAgICB9XG5cbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiYnl0ZWNvZGVcIiwgSlNPTi5zdHJpbmdpZnkoYnl0ZWNvZGUpKVxuICAgICAgY2FsbGJhY2soYnl0ZWNvZGUpXG4gICAgfVxuICAgIHJlYWRlci5yZWFkQXNCaW5hcnlTdHJpbmcodGhpcy5lbGVtZW50LmZpbGVzWzBdKVxuICB9XG59XG4iLCIvL1xuLy8gRENQVS0xNiBEZWJ1Z2dlclxuLy9cbi8vIEJhc2VkIHVwb24gRENQVS0xNiBJREUgYnkgSm9obiBNY0Nhbm5cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9kYW5nZXJtY2Nhbm4vZGNwdTE2LWlkZVxuLy9cbi8vIENvcHlyaWdodCAoYykgMjAxMiBKb2huIE1jQ2FublxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHkgb2Zcbi8vIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW5cbi8vIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG9cbi8vIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mXG4vLyB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXG4vLyBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbi8vIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1Ncbi8vIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUlxuLy8gQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSXG4vLyBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTlxuLy8gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cbi8vXG4vL1xuXG5mdW5jdGlvbiBEZWJ1Z2dlcihfZW11bGF0b3IpIHtcbiAgaWYoIV9lbXVsYXRvci5hc3luYykgdGhyb3cgXCJFbXVsYXRvciBtdXN0IGJlIGluIGFzeW5jaHJvbm91cyBtb2RlIHRvIHVzZSBhIGRlYnVnZ2VyIHdpdGggaXQuXCI7XG4gIHRoaXMuZW11bGF0b3IgPSBfZW11bGF0b3I7XG4gIHRoaXMuYnJlYWtwb2ludHMgPSB7fTtcblxuICB0aGlzLmVtdWxhdG9yLmF0dGFjaERlYnVnZ2VyKHRoaXMpO1xufVxuRGVidWdnZXIucHJvdG90eXBlLmdldEJyZWFrcG9pbnRzID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmJyZWFrcG9pbnRzO1xufTtcbkRlYnVnZ2VyLnByb3RvdHlwZS50b2dnbGVCcmVha3BvaW50ID0gZnVuY3Rpb24obG9jYXRpb24sIGxpbmVOdW1iZXIpIHtcbiAgbG9jYXRpb24gKz0gXCJcIjsgIC8vIGNvbnZlcnQgdG8gc3RyaW5nXG4gIGlmKHRoaXMuYnJlYWtwb2ludHNbbG9jYXRpb25dKVxuICAgIGRlbGV0ZSB0aGlzLmJyZWFrcG9pbnRzW2xvY2F0aW9uXTtcbiAgZWxzZVxuICAgIHRoaXMuYnJlYWtwb2ludHNbbG9jYXRpb25dID0gbGluZU51bWJlcjtcbn07XG5EZWJ1Z2dlci5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24oKSB7XG4gIGlmKHRoaXMuZW11bGF0b3IucGF1c2VkKSB7XG4gICAgdGhpcy5lbXVsYXRvci5wYXVzZWQgPSBmYWxzZTtcbiAgICB0aGlzLmVtdWxhdG9yLnJ1bkFzeW5jKCk7XG4gIH1cbn07XG5EZWJ1Z2dlci5wcm90b3R5cGUuc3RlcCA9IGZ1bmN0aW9uKCkge1xuICBpZih0aGlzLmVtdWxhdG9yLnBhdXNlZCkge1xuICAgIGlmKCF0aGlzLmVtdWxhdG9yLnN0ZXAoKSlcbiAgICAgIHRoaXMuZW11bGF0b3IuZXhpdCgpO1xuICB9XG59O1xuRGVidWdnZXIucHJvdG90eXBlLnBhdXNlID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuZW11bGF0b3IucGF1c2VkID0gdHJ1ZTtcbn07XG5cbi8vIGV2ZW50c1xuRGVidWdnZXIucHJvdG90eXBlLm9uU3RlcCA9IGZ1bmN0aW9uKGxvY2F0aW9uKSB7fTtcbkRlYnVnZ2VyLnByb3RvdHlwZS5vblBhdXNlZCA9IGZ1bmN0aW9uKGxvY2F0aW9uKSB7IH07XG5EZWJ1Z2dlci5wcm90b3R5cGUub25JbnN0cnVjdGlvbiA9IGZ1bmN0aW9uKGxvY2F0aW9uKSB7IH07XG5EZWJ1Z2dlci5wcm90b3R5cGUub25FeGl0ID0gZnVuY3Rpb24oKSB7IH07XG5cbmV4cG9ydCB7XG4gIERlYnVnZ2VyIGFzIGRlZmF1bHRcbn07XG4iLCIvL1xuLy8gRENQVS0xNiBFbXVsYXRvclxuLy9cbi8vIEJhc2VkIHVwb24gRENQVS0xNiBJREUgYnkgSm9obiBNY0Nhbm5cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9kYW5nZXJtY2Nhbm4vZGNwdTE2LWlkZVxuLy9cbi8vIENvcHlyaWdodCAoYykgMjAxMiBKb2huIE1jQ2FublxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHkgb2Zcbi8vIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW5cbi8vIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG9cbi8vIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mXG4vLyB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXG4vLyBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbi8vIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1Ncbi8vIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUlxuLy8gQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSXG4vLyBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTlxuLy8gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cbi8vXG5cbmZ1bmN0aW9uIFJlZ2lzdGVyKF9uYW1lLCBfdmFsdWUsIF9lbXVsYXRvcikge1xuICB0aGlzLm5hbWUgPSBfbmFtZTtcbiAgdGhpcy52YWx1ZSA9IF92YWx1ZTtcbiAgdGhpcy5lbXVsYXRvciA9IF9lbXVsYXRvcjtcbiAgdGhpcy5jb250ZW50cyA9IDA7XG59XG5SZWdpc3Rlci5wcm90b3R5cGUuZ2V0QSA9IFJlZ2lzdGVyLnByb3RvdHlwZS5nZXRCID0gUmVnaXN0ZXIucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpcy5jb250ZW50czsgfVxuUmVnaXN0ZXIucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uKHZhbCkgeyB0aGlzLmNvbnRlbnRzID0gdmFsOyB9XG5cbmZ1bmN0aW9uIFJlZ2lzdGVyVmFsdWUoX3JlZ2lzdGVyKSB7XG4gIHRoaXMucmVnaXN0ZXIgPSBfcmVnaXN0ZXI7XG4gIHRoaXMuZW11bGF0b3IgPSBfcmVnaXN0ZXIuZW11bGF0b3I7XG59XG5SZWdpc3RlclZhbHVlLnByb3RvdHlwZS5nZXRBID0gUmVnaXN0ZXJWYWx1ZS5wcm90b3R5cGUuZ2V0QiA9IFJlZ2lzdGVyVmFsdWUucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5lbXVsYXRvci5SQU1bdGhpcy5yZWdpc3Rlci5nZXQoKV0gfHwgMDtcbn1cblJlZ2lzdGVyVmFsdWUucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uKHZhbCkge1xuICB0aGlzLmVtdWxhdG9yLlJBTVt0aGlzLnJlZ2lzdGVyLmdldCgpXSA9IHZhbDtcbn1cblxuZnVuY3Rpb24gUmVnaXN0ZXJQbHVzTmV4dFdvcmQoX3JlZ2lzdGVyKSB7XG4gIHRoaXMucmVnaXN0ZXIgPSBfcmVnaXN0ZXI7XG4gIHRoaXMuZW11bGF0b3IgPSBfcmVnaXN0ZXIuZW11bGF0b3I7XG4gIHRoaXMuY2FjaGVkUmVzdWx0ID0gbnVsbDtcbn1cblJlZ2lzdGVyUGx1c05leHRXb3JkLnByb3RvdHlwZS5nZXRCID0gUmVnaXN0ZXJQbHVzTmV4dFdvcmQucHJvdG90eXBlLmdldEEgPSBSZWdpc3RlclBsdXNOZXh0V29yZC5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24oKSB7XG4gIHZhciBudyA9IHRoaXMuZW11bGF0b3IubmV4dFdvcmQoKTtcbiAgaWYobncgPT0gMHhmZmZmKSBudyA9IC0xOyAgLy8gVE9ETzogd2h5IGlzIHRoaXMgbGlrZSB0aGlzPz8/PyAocmVxdWlyZWQgZm9yICc5OSBib3R0bGVzJyB0byB3b3JrLi4uKVxuICB0aGlzLmNhY2hlZFJlc3VsdCA9IHRoaXMucmVnaXN0ZXIuZ2V0KCkgKyBudztcbiAgcmV0dXJuIHRoaXMuZW11bGF0b3IuUkFNW3RoaXMuY2FjaGVkUmVzdWx0XSB8fCAwO1xufVxuUmVnaXN0ZXJQbHVzTmV4dFdvcmQucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uKHZhbCkge1xuICB0aGlzLmVtdWxhdG9yLlJBTVt0aGlzLmNhY2hlZFJlc3VsdF0gPSB2YWw7XG59XG5cblxuZnVuY3Rpb24gU3RhY2tQb2ludGVyVmFsdWUoX2VtdWxhdG9yKSB7XG4gIHRoaXMuZW11bGF0b3IgPSBfZW11bGF0b3Jcbn1cblN0YWNrUG9pbnRlclZhbHVlLnByb3RvdHlwZS5nZXQgPSBTdGFja1BvaW50ZXJWYWx1ZS5wcm90b3R5cGUuZ2V0QiA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5lbXVsYXRvci5SZWdpc3RlcnMuU1AuZ2V0KCk7XG59XG5cblN0YWNrUG9pbnRlclZhbHVlLnByb3RvdHlwZS5nZXRBID0gIGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5lbXVsYXRvci5SZWdpc3RlcnMuU1AucG9wKCk7XG59XG5TdGFja1BvaW50ZXJWYWx1ZS5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24odmFsKSB7XG4gIHRoaXMuZW11bGF0b3IuUmVnaXN0ZXJzLlNQLnB1c2godmFsKTtcbn1cblxuZnVuY3Rpb24gTGl0ZXJhbChfdmFsdWUpIHtcbiAgdGhpcy52YWx1ZSA9IF92YWx1ZTtcbn1cbkxpdGVyYWwucHJvdG90eXBlLmdldEEgPSBMaXRlcmFsLnByb3RvdHlwZS5nZXRCID0gTGl0ZXJhbC5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzLnZhbHVlOyB9XG5MaXRlcmFsLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbih2YWwpIHsgIH1cbmxldCBMaXRlcmFscyA9IHsgfTtcblxuZnVuY3Rpb24gT3AoX2VtdWxhdG9yLCBfbmFtZSwgX3ZhbHVlLCBfY3ljbGVzLCBfX2V4ZWMsIF9zZXQpIHtcbiAgdGhpcy5lbXVsYXRvciA9IF9lbXVsYXRvcjtcbiAgdGhpcy5uYW1lID0gX25hbWU7XG4gIHRoaXMudmFsdWUgPSBfdmFsdWU7XG4gIHRoaXMuY3ljbGVzID0gX2N5Y2xlcztcbiAgdGhpcy5fZXhlYyA9IF9fZXhlYztcbiAgX3NldCA9IF9zZXQgfHwgdGhpcy5lbXVsYXRvci5PcFNldDtcbiAgX3NldFt0aGlzLnZhbHVlXSA9IHRoaXM7XG59XG5PcC5wcm90b3R5cGUuZXhlYyA9IGZ1bmN0aW9uKGEsIGIpIHtcbiAgdmFyIHZhbEEgPSB0aGlzLmVtdWxhdG9yLmdldFBhcmFtVmFsdWUoYSk7XG4gIHZhciB2YWxCID0gdGhpcy5lbXVsYXRvci5nZXRQYXJhbVZhbHVlKGIpO1xuXG4gIGlmKCF2YWxBKSB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkICdhJyB2YWx1ZSBcIiArIGEpO1xuICBpZighdmFsQikgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCAnYicgdmFsdWUgXCIgKyBiKTtcblxuICB0aGlzLl9leGVjKHZhbEEsIHZhbEIpO1xuICB0aGlzLmVtdWxhdG9yLkNQVV9DWUNMRSArPSB0aGlzLmN5Y2xlcztcbn07XG5cbi8vIGxpdGVyYWxzXG5mb3IodmFyIGkgPSAweDIwLCBsaXRlcmFsVmFsID0gLTE7IGkgPCAweDQwOyBpKyssIGxpdGVyYWxWYWwrKykge1xuICBMaXRlcmFsc1tcIkxfXCIgKyBsaXRlcmFsVmFsXSA9IGk7XG59XG5cbi8vIGNvbnZlbmllbmNlIGNvbnN0YW50c1xubGV0IFZhbHVlcyA9IHsgfTtcblZhbHVlcy5SRUdJU1RFUl9WQUxVRV9PRkZTRVQgPSAweDA4O1xuVmFsdWVzLlJFR0lTVEVSX05FWFRfV09SRF9PRkZTRVQgPSAweDEwO1xuVmFsdWVzLlNQX09GRlNFVCA9IDB4MTg7XG5WYWx1ZXMuTkVYVF9XT1JEX1ZBTFVFID0gMHgxZTtcblZhbHVlcy5ORVhUX1dPUkRfTElURVJBTCA9IDB4MWY7XG5WYWx1ZXMuU1AgPSAweDFiO1xuVmFsdWVzLlBDID0gMHgxYztcblZhbHVlcy5FWCA9IDB4MWQ7XG5cbmxldCBSRUdJU1RFUl9BID0gMHgwMDtcbmxldCBSRUdJU1RFUl9CID0gMHgwMTtcbmxldCBSRUdJU1RFUl9DID0gMHgwMjtcbmxldCBSRUdJU1RFUl9YID0gMHgwMztcbmxldCBSRUdJU1RFUl9ZID0gMHgwNDtcbmxldCBSRUdJU1RFUl9aID0gMHgwNTtcbmxldCBSRUdJU1RFUl9JID0gMHgwNjtcbmxldCBSRUdJU1RFUl9KID0gMHgwNztcbmxldCBSRUdJU1RFUl9TUCA9IDB4MWI7XG5sZXQgUkVHSVNURVJfUEMgPSAweDFjO1xubGV0IFJFR0lTVEVSX0VYID0gMHgxZDtcblxubGV0IE9QRVJBVElPTl9TRVQgPSAweDAxO1xubGV0IE9QRVJBVElPTl9BREQgPSAweDAyO1xubGV0IE9QRVJBVElPTl9TVUIgPSAweDAzO1xubGV0IE9QRVJBVElPTl9NVUwgPSAweDA0O1xubGV0IE9QRVJBVElPTl9NTEkgPSAweDA1O1xubGV0IE9QRVJBVElPTl9ESVYgPSAweDA2O1xubGV0IE9QRVJBVElPTl9EVkkgPSAweDA3O1xubGV0IE9QRVJBVElPTl9NT0QgPSAweDA4O1xubGV0IE9QRVJBVElPTl9NREkgPSAweDA5O1xubGV0IE9QRVJBVElPTl9BTkQgPSAweDBhO1xubGV0IE9QRVJBVElPTl9CT1IgPSAweDBiO1xubGV0IE9QRVJBVElPTl9YT1IgPSAweDBjO1xubGV0IE9QRVJBVElPTl9TSFIgPSAweDBkO1xubGV0IE9QRVJBVElPTl9BU1IgPSAweDBlO1xubGV0IE9QRVJBVElPTl9TSEwgPSAweDBmO1xuXG5sZXQgT1BFUkFUSU9OX0lGQiA9IDB4MTA7XG5sZXQgT1BFUkFUSU9OX0lGQyA9IDB4MTE7XG5sZXQgT1BFUkFUSU9OX0lGRSA9IDB4MTI7XG5sZXQgT1BFUkFUSU9OX0lGTiA9IDB4MTM7XG5sZXQgT1BFUkFUSU9OX0lGRyA9IDB4MTQ7XG5sZXQgT1BFUkFUSU9OX0lGQSA9IDB4MTU7XG5sZXQgT1BFUkFUSU9OX0lGTCA9IDB4MTY7XG5sZXQgT1BFUkFUSU9OX0lGVSA9IDB4MTc7XG5cbmxldCBPUEVSQVRJT05fQURYID0gMHgxYTtcbmxldCBPUEVSQVRJT05fU0JYID0gMHgxYjtcblxubGV0IE9QRVJBVElPTl9TVEkgPSAweDFlO1xubGV0IE9QRVJBVElPTl9TVEQgPSAweDFmO1xuXG5sZXQgT1BFUkFUSU9OX0pTUiA9IDB4MDE7XG5sZXQgT1BFUkFUSU9OX0lOVCA9IDB4MDg7XG5sZXQgT1BFUkFUSU9OX0lBRyA9IDB4MDk7XG5sZXQgT1BFUkFUSU9OX0lBUyA9IDB4MGE7XG5sZXQgT1BFUkFUSU9OX1JGSSA9IDB4MGI7XG5sZXQgT1BFUkFUSU9OX0lBUSA9IDB4MGM7XG5cbmxldCBPUEVSQVRJT05fSFdOID0gMHgxMDtcbmxldCBPUEVSQVRJT05fSFdRID0gMHgxMTtcbmxldCBPUEVSQVRJT05fSFdJID0gMHgxMjtcblxuXG5cbmxldCBVdGlscyA9IHtcbiAgdG8zMkJpdFNpZ25lZDogZnVuY3Rpb24odmFsKSB7XG4gICAgaWYoKHZhbCAmIDB4ODAwMCkgPiAwKSB7XG4gICAgICByZXR1cm4gKCgofnZhbCkgKyAxKSAmIDB4ZmZmZikgKiAtMTsgIC8vIHR3bydzIGNvbXBsZW1lbnRcbiAgICB9XG4gICAgcmV0dXJuIHZhbDtcbiAgfSxcblxuICB0bzE2Qml0U2lnbmVkOiBmdW5jdGlvbih2YWwpIHtcbiAgICBpZih2YWwgPCAwKSB7XG4gICAgICAvL3JldHVybiAoKH52YWwpICsgMSkgJiAweGZmZmY7ICAvLyB0d28ncyBjb21wbGVtZW50XG4gICAgICByZXR1cm4gKCh2YWwgJiAweDdmZmYpIHwgMHg4MDAwKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbCAmIDB4ZmZmZjtcbiAgfSxcblxuICBieXRlVG8zMkJpdFNpZ25lZDogZnVuY3Rpb24odmFsKSB7XG4gICAgaWYoKHZhbCAmIDB4ODApID4gMCkge1xuICAgICAgcmV0dXJuICgoKH52YWwpICsgMSkgJiAweGZmKSAqIC0xOyAgLy8gdHdvJ3MgY29tcGxlbWVudFxuICAgIH1cbiAgICByZXR1cm4gdmFsO1xuICB9LFxuXG4gIHJvdW5kVG93YXJkc1plcm86IGZ1bmN0aW9uKHZhbCkge1xuICAgIGlmKHZhbCA8IDApXG4gICAgICB2YWwgPSBNYXRoLmNlaWwodmFsKTtcbiAgICBlbHNlXG4gICAgICB2YWwgPSBNYXRoLmZsb29yKHZhbCk7XG4gICAgcmV0dXJuIHZhbDtcbiAgfSxcblxuICBtYWtlSW5zdHJ1Y3Rpb246IGZ1bmN0aW9uKG9wY29kZSwgYSwgYikge1xuICAgIHZhciBpbnN0cnVjdGlvbiA9IG9wY29kZTtcbiAgICBpbnN0cnVjdGlvbiB8PSAoYiA8PCA1KTtcbiAgICBpbnN0cnVjdGlvbiB8PSAoYSA8PCAxMCk7XG4gICAgcmV0dXJuIGluc3RydWN0aW9uO1xuICB9LFxuXG4gIG1ha2VTcGVjaWFsSW5zdHJ1Y3Rpb246IGZ1bmN0aW9uKG9wY29kZSwgYSkge1xuICAgIHZhciBpbnN0cnVjdGlvbiA9IDA7XG4gICAgaW5zdHJ1Y3Rpb24gfD0gKGEgPDwgMTApO1xuICAgIGluc3RydWN0aW9uIHw9IChvcGNvZGUgPDwgNSk7XG4gICAgcmV0dXJuIGluc3RydWN0aW9uO1xuICB9LFxuXG4gIHBhcnNlSW5zdHJ1Y3Rpb246IGZ1bmN0aW9uKGluc3RydWN0aW9uKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG9wY29kZTogaW5zdHJ1Y3Rpb24gJiAweDAwMWYsXG4gICAgICBiOiAoaW5zdHJ1Y3Rpb24gJiAweDAzZTApID4+IDUsXG4gICAgICBhOiAoaW5zdHJ1Y3Rpb24gJiAweGZjMDApID4+IDEwXG4gICAgfVxuICB9LFxuXG4gIHBhcnNlU3BlY2lhbEluc3RydWN0aW9uOiBmdW5jdGlvbihpbnN0cnVjdGlvbikge1xuICAgIHJldHVybiB7XG4gICAgICBhOiAoaW5zdHJ1Y3Rpb24gJiAweGZjMDApID4+IDEwLFxuICAgICAgb3Bjb2RlOiAoaW5zdHJ1Y3Rpb24gJiAweDAzZTApID4+IDUsXG4gICAgICBiOiAwXG4gICAgfVxuICB9LFxuXG4gIGhleDogZnVuY3Rpb24obnVtKSB7XG4gICAgcmV0dXJuIFwiMHhcIiArIFV0aWxzLnRvMTZCaXRTaWduZWQobnVtKS50b1N0cmluZygxNik7XG4gIH0sXG5cbiAgaGV4MjogZnVuY3Rpb24obnVtKSB7XG4gICAgLy92YXIgc3RyID0gVXRpbHMudG8xNkJpdFNpZ25lZChudW0pLnRvU3RyaW5nKDE2KTtcbiAgICB2YXIgc3RyID0gKG51bSkudG9TdHJpbmcoMTYpO1xuICAgIHJldHVybiBcIjB4XCIgKyBcIjAwMDBcIi5zdWJzdHIoc3RyLmxlbmd0aCkgKyBzdHI7XG4gIH0sXG5cbiAgbWFrZVZpZGVvQ2VsbDogZnVuY3Rpb24oZ2x5cGgsIGJsaW5rLCBiZywgZmcpIHtcbiAgICB2YXIgcmVzdWx0ID0gZ2x5cGggJiAweDdmO1xuICAgIHJlc3VsdCB8PSAoYmxpbmsgJiAweDEpIDw8IDc7XG4gICAgcmVzdWx0IHw9IChiZyAmIDB4ZikgPDwgODtcbiAgICByZXN1bHQgfD0gKGZnICYgMHhmKSA8PCAxMjtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9LFxuXG4gIGNvbG9yMTZUbzMyOiBmdW5jdGlvbihjKSB7XG4gICAgdmFyIHIgPSAoKChjICYgMHhmMDApID4+IDgpICogMTYpIDw8IDE2O1xuICAgIHZhciBnID0gKCgoYyAmIDB4MGYwKSA+PiA0KSAqIDE2KSA8PCA4O1xuICAgIHZhciBiID0gKGMgJiAweDAwZikgKiAxNjtcbiAgICByZXR1cm4gVXRpbHMubWFrZUNvbG9yKHIgfCBnIHwgYik7XG5cbiAgfSxcblxuICBtYWtlQ29sb3I6IGZ1bmN0aW9uKGQpIHtcbiAgICB2YXIgaGV4ID0gTnVtYmVyKGQpLnRvU3RyaW5nKDE2KTtcbiAgICBoZXggPSBcIjAwMDAwMFwiLnN1YnN0cigwLCA2IC0gaGV4Lmxlbmd0aCkgKyBoZXg7XG4gICAgcmV0dXJuIFwiI1wiICsgaGV4O1xuICB9LFxuXG4gIGNyZWF0ZUltYWdlOiBmdW5jdGlvbihzcmMpIHtcbiAgICB2YXIgaW1nID0gbmV3IEltYWdlKCk7XG4gICAgaW1nLnNyYyA9IHNyYztcbiAgICByZXR1cm4gaW1nO1xuICB9XG5cbn07XG5cbmxldCBTcGVlZHMgPSB7XG4gIFwiMTAwIGtIelwiOiB7IFwiZGVsYXlGcmVxdWVuY3lcIjogMTAwMCwgXCJkZWxheVRpbWVcIjogMSB9LFxuICBcIjEwIGtIelwiOiB7IFwiZGVsYXlGcmVxdWVuY3lcIjogNTAsIFwiZGVsYXlUaW1lXCI6IDEgfSxcbiAgXCIxIGtIelwiOiB7IFwiZGVsYXlGcmVxdWVuY3lcIjogMTAsIFwiZGVsYXlUaW1lXCI6IDEwIH0sXG4gIFwiMTAwIEh6XCI6IHsgXCJkZWxheUZyZXF1ZW5jeVwiOiAxMCwgXCJkZWxheVRpbWVcIjogMTAwIH0sXG4gIFwiMTAgSHpcIjogeyBcImRlbGF5RnJlcXVlbmN5XCI6IDEsIFwiZGVsYXlUaW1lXCI6IDEwMCB9LFxufTtcblxuLyoqXG4gKiBFbXVsYXRvciBjb25zdHJ1Y3Rvci5cbiAqXG4gKiBAY29uc3RydWN0b3JcbiAqIEB0aGlzIHtFbXVsYXRvcn1cbiAqL1xuZnVuY3Rpb24gRW11bGF0b3IoKSB7XG5cbiAgdGhpcy5hc3luYyA9IHRydWU7XG4gIHRoaXMudmVyYm9zZSA9IGZhbHNlO1xuICB0aGlzLmN1cnJlbnRTcGVlZCA9IFNwZWVkc1tcIjEwMCBrSHpcIl07XG5cbiAgdGhpcy5DUFVfQ1lDTEUgPSAwO1xuICB0aGlzLlJBTSA9IFtdO1xuXG4gIHRoaXMuT3BTZXQgPSB7IH07XG4gIHRoaXMuU3BlY2lhbE9wU2V0ID0geyB9O1xuICB0aGlzLlJlZ2lzdGVycyA9IHtcbiAgICBBOiBuZXcgUmVnaXN0ZXIoXCJBXCIsIFJFR0lTVEVSX0EsIHRoaXMpLFxuICAgIEI6IG5ldyBSZWdpc3RlcihcIkJcIiwgUkVHSVNURVJfQiwgdGhpcyksXG4gICAgQzogbmV3IFJlZ2lzdGVyKFwiQ1wiLCBSRUdJU1RFUl9DLCB0aGlzKSxcbiAgICBYOiBuZXcgUmVnaXN0ZXIoXCJYXCIsIFJFR0lTVEVSX1gsIHRoaXMpLFxuICAgIFk6IG5ldyBSZWdpc3RlcihcIllcIiwgUkVHSVNURVJfWSwgdGhpcyksXG4gICAgWjogbmV3IFJlZ2lzdGVyKFwiWlwiLCBSRUdJU1RFUl9aLCB0aGlzKSxcbiAgICBJOiBuZXcgUmVnaXN0ZXIoXCJJXCIsIFJFR0lTVEVSX0ksIHRoaXMpLFxuICAgIEo6IG5ldyBSZWdpc3RlcihcIkpcIiwgUkVHSVNURVJfSiwgdGhpcyksXG4gICAgU1A6IG5ldyBSZWdpc3RlcihcIlNQXCIsIFJFR0lTVEVSX1NQLCB0aGlzKSxcbiAgICBQQzogbmV3IFJlZ2lzdGVyKFwiUENcIiwgUkVHSVNURVJfUEMsIHRoaXMpLFxuICAgIEVYOiBuZXcgUmVnaXN0ZXIoXCJFWFwiLCBSRUdJU1RFUl9FWCwgdGhpcyksXG4gICAgSUE6IG5ldyBSZWdpc3RlcihcIklBXCIsIDB4ZmZmZiwgdGhpcyksXG4gIH07XG5cblxuICB0aGlzLlJlZ2lzdGVycy5QQy5pbmMgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgdiA9IHRoaXMuZ2V0KCk7XG4gICAgdGhpcy5zZXQodisxKTtcbiAgICByZXR1cm4gdjtcbiAgfTtcbiAgdGhpcy5QQyA9IHRoaXMuUmVnaXN0ZXJzLlBDO1xuXG4gIHRoaXMuUmVnaXN0ZXJzLlNQLnB1c2ggPSBmdW5jdGlvbih2YWwpIHtcbiAgICB0aGlzLmNvbnRlbnRzID0gIFV0aWxzLnRvMTZCaXRTaWduZWQodGhpcy5jb250ZW50cyAtIDEpO1xuICAgIHRoaXMuZW11bGF0b3IuUkFNW3RoaXMuY29udGVudHNdID0gdmFsO1xuICB9O1xuICB0aGlzLlJlZ2lzdGVycy5TUC5wb3AgPSBmdW5jdGlvbigpIHtcbiAgICBpZih0aGlzLmNvbnRlbnRzID09IDApXG4gICAgICBjb25zb2xlLmxvZyhcIldhcm5pbmc6IHN0YWNrIHVuZGVyZmxvd1wiKTtcblxuICAgIHZhciB2YWwgPSB0aGlzLmVtdWxhdG9yLlJBTVt0aGlzLmNvbnRlbnRzXSB8fCAwO1xuICAgIHRoaXMuZW11bGF0b3IuUkFNW3RoaXMuY29udGVudHNdID0gMDsgIC8vIFRPRE86IHNob3VsZCB0aGUgZW11YWx0b3IgYWx0ZXIgdGhlIG1lbW9yeSBsb2NhdGlvbiB3aGVuIGl0IGlzIFBPUGVkP1xuICAgIHRoaXMuY29udGVudHMgPSAodGhpcy5jb250ZW50cyArIDEpICYgMHhmZmZmO1xuICAgIHJldHVybiB2YWw7XG4gIH07XG5cblxuICB0aGlzLlZhbHVlcyA9IHsgfVxuICB0aGlzLlZhbHVlc1sweDAwXSA9IHRoaXMuUmVnaXN0ZXJzLkE7XG4gIHRoaXMuVmFsdWVzWzB4MDFdID0gdGhpcy5SZWdpc3RlcnMuQjtcbiAgdGhpcy5WYWx1ZXNbMHgwMl0gPSB0aGlzLlJlZ2lzdGVycy5DO1xuICB0aGlzLlZhbHVlc1sweDAzXSA9IHRoaXMuUmVnaXN0ZXJzLlg7XG4gIHRoaXMuVmFsdWVzWzB4MDRdID0gdGhpcy5SZWdpc3RlcnMuWTtcbiAgdGhpcy5WYWx1ZXNbMHgwNV0gPSB0aGlzLlJlZ2lzdGVycy5aO1xuICB0aGlzLlZhbHVlc1sweDA2XSA9IHRoaXMuUmVnaXN0ZXJzLkk7XG4gIHRoaXMuVmFsdWVzWzB4MDddID0gdGhpcy5SZWdpc3RlcnMuSjtcbiAgdGhpcy5WYWx1ZXNbMHgwOF0gPSBuZXcgUmVnaXN0ZXJWYWx1ZSh0aGlzLlJlZ2lzdGVycy5BKTtcbiAgdGhpcy5WYWx1ZXNbMHgwOV0gPSBuZXcgUmVnaXN0ZXJWYWx1ZSh0aGlzLlJlZ2lzdGVycy5CKTtcbiAgdGhpcy5WYWx1ZXNbMHgwYV0gPSBuZXcgUmVnaXN0ZXJWYWx1ZSh0aGlzLlJlZ2lzdGVycy5DKTtcbiAgdGhpcy5WYWx1ZXNbMHgwYl0gPSBuZXcgUmVnaXN0ZXJWYWx1ZSh0aGlzLlJlZ2lzdGVycy5YKTtcbiAgdGhpcy5WYWx1ZXNbMHgwY10gPSBuZXcgUmVnaXN0ZXJWYWx1ZSh0aGlzLlJlZ2lzdGVycy5ZKTtcbiAgdGhpcy5WYWx1ZXNbMHgwZF0gPSBuZXcgUmVnaXN0ZXJWYWx1ZSh0aGlzLlJlZ2lzdGVycy5aKTtcbiAgdGhpcy5WYWx1ZXNbMHgwZV0gPSBuZXcgUmVnaXN0ZXJWYWx1ZSh0aGlzLlJlZ2lzdGVycy5JKTtcbiAgdGhpcy5WYWx1ZXNbMHgwZl0gPSBuZXcgUmVnaXN0ZXJWYWx1ZSh0aGlzLlJlZ2lzdGVycy5KKTtcbiAgdGhpcy5WYWx1ZXNbMHgxMF0gPSBuZXcgUmVnaXN0ZXJQbHVzTmV4dFdvcmQodGhpcy5SZWdpc3RlcnMuQSk7XG4gIHRoaXMuVmFsdWVzWzB4MTFdID0gbmV3IFJlZ2lzdGVyUGx1c05leHRXb3JkKHRoaXMuUmVnaXN0ZXJzLkIpO1xuICB0aGlzLlZhbHVlc1sweDEyXSA9IG5ldyBSZWdpc3RlclBsdXNOZXh0V29yZCh0aGlzLlJlZ2lzdGVycy5DKTtcbiAgdGhpcy5WYWx1ZXNbMHgxM10gPSBuZXcgUmVnaXN0ZXJQbHVzTmV4dFdvcmQodGhpcy5SZWdpc3RlcnMuWCk7XG4gIHRoaXMuVmFsdWVzWzB4MTRdID0gbmV3IFJlZ2lzdGVyUGx1c05leHRXb3JkKHRoaXMuUmVnaXN0ZXJzLlkpO1xuICB0aGlzLlZhbHVlc1sweDE1XSA9IG5ldyBSZWdpc3RlclBsdXNOZXh0V29yZCh0aGlzLlJlZ2lzdGVycy5aKTtcbiAgdGhpcy5WYWx1ZXNbMHgxNl0gPSBuZXcgUmVnaXN0ZXJQbHVzTmV4dFdvcmQodGhpcy5SZWdpc3RlcnMuSSk7XG4gIHRoaXMuVmFsdWVzWzB4MTddID0gbmV3IFJlZ2lzdGVyUGx1c05leHRXb3JkKHRoaXMuUmVnaXN0ZXJzLkopO1xuICB0aGlzLlZhbHVlc1sweDE4XSA9IG5ldyBTdGFja1BvaW50ZXJWYWx1ZSh0aGlzKTtcbiAgdGhpcy5WYWx1ZXNbMHgxOV0gPSBuZXcgUmVnaXN0ZXJWYWx1ZSh0aGlzLlJlZ2lzdGVycy5TUCk7XG4gIHRoaXMuVmFsdWVzWzB4MWFdID0gbmV3IFJlZ2lzdGVyUGx1c05leHRXb3JkKHRoaXMuUmVnaXN0ZXJzLlNQKTtcbiAgdGhpcy5WYWx1ZXNbMHgxYl0gPSB0aGlzLlJlZ2lzdGVycy5TUDtcbiAgdGhpcy5WYWx1ZXNbMHgxY10gPSB0aGlzLlJlZ2lzdGVycy5QQztcbiAgdGhpcy5WYWx1ZXNbMHgxZF0gPSB0aGlzLlJlZ2lzdGVycy5FWDtcbiAgdGhpcy5WYWx1ZXNbMHgxZV0gPSB7IC8vIG5leHQgd29yZCB2YWx1ZVxuICAgIGVtdWxhdG9yOiB0aGlzLFxuICAgIGdldEE6IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpcy5nZXQoKTsgfSxcbiAgICBnZXRCOiBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXMuZ2V0KCk7IH0sXG4gICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuY2FjaGVkUmVzdWx0ID0gdGhpcy5lbXVsYXRvci5uZXh0V29yZCgpO1xuICAgICAgcmV0dXJuIHRoaXMuZW11bGF0b3IuUkFNW3RoaXMuY2FjaGVkUmVzdWx0XSB8fCAwO1xuICAgIH0sXG4gICAgc2V0OiBmdW5jdGlvbih2YWwpIHtcbiAgICAgIHRoaXMuZW11bGF0b3IuUkFNW3RoaXMuY2FjaGVkUmVzdWx0XSA9IHZhbDtcbiAgICB9XG4gIH07XG4gIHRoaXMuVmFsdWVzWzB4MWZdID0geyAvLyBuZXh0IHdvcmQgbGl0ZXJhbFxuICAgIGVtdWxhdG9yOiB0aGlzLFxuICAgIGdldEE6IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpcy5nZXQoKTsgfSxcbiAgICBnZXRCOiBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXMuZ2V0KCk7IH0sXG4gICAgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXMuZW11bGF0b3IubmV4dFdvcmQoKTsgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uKHZhbCkgeyB9XG4gIH07XG5cbiAgdGhpcy5WYWx1ZXNbMHgyMF0gPSBuZXcgTGl0ZXJhbCgweGZmZmYpOyAgLy8gLTFcbiAgZm9yKHZhciBpID0gMHgyMSwgbGl0ZXJhbFZhbCA9IDA7IGkgPCAweDQwOyBpKyssIGxpdGVyYWxWYWwrKykge1xuICAgIHRoaXMuVmFsdWVzW2ldID0gbmV3IExpdGVyYWwobGl0ZXJhbFZhbCk7XG4gIH1cblxuXG4gIHRoaXMuQmFzaWNPcGVyYXRpb25zID0ge1xuICAgIFNFVDogbmV3IE9wKHRoaXMsIFwiU0VUXCIsIE9QRVJBVElPTl9TRVQsIDEsIGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgIHZhciBhVmFsID0gYS5nZXRBKCksIGJWYWwgPSBiLmdldEIoKTtcbiAgICAgIGIuc2V0KGFWYWwpO1xuXG4gICAgICAvLyBUT0RPOiBzb21lIGFwcGxpY2F0aW9ucyBhc3N1bWUgdGhhdCBzZXR0aW5nIFBDIHRvIGl0c2VsZiBzaG91bGQgdGVybWluYXRlIHRoZSBhcHBsaWNhdGlvblxuICAgICAgLy9pZihhID09IHRoaXMuZW11bGF0b3IuUmVnaXN0ZXJzLlBDICYmIGIgPT0gdGhpcy5lbXVsYXRvci5SZWdpc3RlcnMuUEMpIHtcbiAgICAgIC8vICB0aGlzLmVtdWxhdG9yLlJlZ2lzdGVycy5QQy5jb250ZW50cyA9IE51bWJlci5NQVhfVkFMVUU7XG4gICAgICAvL31cbiAgICB9KSxcblxuICAgIEFERDogbmV3IE9wKHRoaXMsIFwiQUREXCIsIE9QRVJBVElPTl9BREQsIDIsIGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgIHZhciByZXMgPSBhLmdldEEoKSArIGIuZ2V0QigpO1xuICAgICAgaWYoKHJlcyAmIDB4ZmZmZjAwMDApID4gMClcbiAgICAgICAgdGhpcy5lbXVsYXRvci5SZWdpc3RlcnMuRVguc2V0KDB4MDAwMSk7XG4gICAgICBlbHNlXG4gICAgICAgIHRoaXMuZW11bGF0b3IuUmVnaXN0ZXJzLkVYLnNldCgwKTtcbiAgICAgIGIuc2V0KHJlcyAmIDB4ZmZmZik7XG4gICAgfSksXG5cbiAgICBTVUI6IG5ldyBPcCh0aGlzLCBcIlNVQlwiLCBPUEVSQVRJT05fU1VCLCAyLCBmdW5jdGlvbihhLCBiKSB7XG4gICAgICB2YXIgYVZhbCA9IGEuZ2V0QSgpO1xuICAgICAgdmFyIHJlcyA9IGIuZ2V0QigpIC0gYVZhbDtcbiAgICAgIGlmKChyZXMpIDwgMClcbiAgICAgICAgdGhpcy5lbXVsYXRvci5SZWdpc3RlcnMuRVguc2V0KDB4ZmZmZik7XG4gICAgICBlbHNlXG4gICAgICAgIHRoaXMuZW11bGF0b3IuUmVnaXN0ZXJzLkVYLnNldCgwKTtcbiAgICAgIGIuc2V0KHJlcyAmIDB4ZmZmZik7XG5cbiAgICB9KSxcblxuICAgIE1VTDogbmV3IE9wKHRoaXMsIFwiTVVMXCIsIE9QRVJBVElPTl9NVUwsIDIsIGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgIHZhciByZXMgPSBhLmdldEEoKSAqIGIuZ2V0QigpO1xuICAgICAgdGhpcy5lbXVsYXRvci5SZWdpc3RlcnMuRVguc2V0KChyZXMgPj4gMTYpICYgMHhmZmZmKTtcbiAgICAgIGIuc2V0KHJlcyAmIDB4ZmZmZik7XG4gICAgfSksXG5cbiAgICBNTEk6IG5ldyBPcCh0aGlzLCBcIk1MSVwiLCBPUEVSQVRJT05fTUxJLCAyLCBmdW5jdGlvbihhLCBiKSB7XG4gICAgICB2YXIgYVZhbCA9IFV0aWxzLnRvMzJCaXRTaWduZWQoYS5nZXRBKCkpLCBiVmFsID0gVXRpbHMudG8zMkJpdFNpZ25lZChiLmdldEIoKSk7XG4gICAgICB2YXIgcmVzID0gYlZhbCAqIGFWYWw7XG4gICAgICB0aGlzLmVtdWxhdG9yLlJlZ2lzdGVycy5FWC5zZXQoKHJlcyA+PiAxNikgJiAweGZmZmYpO1xuICAgICAgYi5zZXQoVXRpbHMudG8xNkJpdFNpZ25lZChyZXMpKTtcbiAgICB9KSxcblxuICAgIERJVjogbmV3IE9wKHRoaXMsIFwiRElWXCIsIE9QRVJBVElPTl9ESVYsIDMsIGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgIHZhciBhVmFsID0gYS5nZXRBKCksIGJWYWwgPSBiLmdldEIoKTtcbiAgICAgIGlmKGFWYWwgPT09IDApIHtcbiAgICAgICAgdGhpcy5lbXVsYXRvci5SZWdpc3RlcnMuRVguc2V0KDApO1xuICAgICAgICBiLnNldCgwKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICB2YXIgcmVzID0gTWF0aC5mbG9vcihiVmFsIC8gYVZhbCk7XG4gICAgICAgIHRoaXMuZW11bGF0b3IuUmVnaXN0ZXJzLkVYLnNldChNYXRoLmZsb29yKCgoYlZhbCA8PCAxNikgLyBhVmFsKSkgJiAweGZmZmYpO1xuICAgICAgICBiLnNldChyZXMgJiAweGZmZmYpO1xuICAgICAgfVxuICAgIH0pLFxuXG4gICAgRFZJOiBuZXcgT3AodGhpcywgXCJEVklcIiwgT1BFUkFUSU9OX0RWSSwgMywgZnVuY3Rpb24oYSwgYikge1xuICAgICAgdmFyIGFWYWwgPSBVdGlscy50bzMyQml0U2lnbmVkKGEuZ2V0QSgpKSwgYlZhbCA9IFV0aWxzLnRvMzJCaXRTaWduZWQoYi5nZXRCKCkpO1xuICAgICAgaWYoYVZhbCA9PT0gMCkge1xuICAgICAgICB0aGlzLmVtdWxhdG9yLlJlZ2lzdGVycy5FWC5zZXQoMCk7XG4gICAgICAgIGIuc2V0KDApO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHZhciByZXMgPSBVdGlscy5yb3VuZFRvd2FyZHNaZXJvKGJWYWwgLyBhVmFsKTtcbiAgICAgICAgdGhpcy5lbXVsYXRvci5SZWdpc3RlcnMuRVguc2V0KFV0aWxzLnJvdW5kVG93YXJkc1plcm8oKChiVmFsIDw8IDE2KSAvIGFWYWwpKSAmIDB4ZmZmZik7XG4gICAgICAgIGIuc2V0KFV0aWxzLnRvMTZCaXRTaWduZWQocmVzKSk7XG4gICAgICB9XG4gICAgfSksXG5cbiAgICBNT0Q6IG5ldyBPcCh0aGlzLCBcIk1PRFwiLCBPUEVSQVRJT05fTU9ELCAzLCBmdW5jdGlvbihhLCBiKSB7XG4gICAgICB2YXIgYVZhbCA9IGEuZ2V0QSgpLCBiVmFsID0gYi5nZXRCKCk7XG4gICAgICBpZihhVmFsID09PSAwKVxuICAgICAgICBiLnNldCgwKTtcbiAgICAgIGVsc2VcbiAgICAgICAgYi5zZXQoYlZhbCAlIGFWYWwpO1xuICAgIH0pLFxuXG4gICAgTURJOiBuZXcgT3AodGhpcywgXCJNRElcIiwgT1BFUkFUSU9OX01ESSwgMywgZnVuY3Rpb24oYSwgYikge1xuICAgICAgdmFyIGFWYWwgPSBVdGlscy50bzMyQml0U2lnbmVkKGEuZ2V0QSgpKSwgYlZhbCA9IFV0aWxzLnRvMzJCaXRTaWduZWQoYi5nZXRCKCkpO1xuICAgICAgaWYoYVZhbCA9PT0gMClcbiAgICAgICAgYi5zZXQoMCk7XG4gICAgICBlbHNlXG4gICAgICAgIGIuc2V0KFV0aWxzLnRvMTZCaXRTaWduZWQoYlZhbCAlIGFWYWwpKTtcbiAgICB9KSxcblxuICAgIEFORDogbmV3IE9wKHRoaXMsIFwiQU5EXCIsIE9QRVJBVElPTl9BTkQsIDEsIGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgIHZhciBhVmFsID0gYS5nZXRBKCksIGJWYWwgPSBiLmdldEIoKTtcbiAgICAgIGIuc2V0KGJWYWwgJiBhVmFsKTtcbiAgICB9KSxcblxuICAgIEJPUjogbmV3IE9wKHRoaXMsIFwiQk9SXCIsIE9QRVJBVElPTl9CT1IsIDEsIGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgIHZhciBhVmFsID0gYS5nZXRBKCksIGJWYWwgPSBiLmdldEIoKTtcbiAgICAgIGIuc2V0KGJWYWwgfCBhVmFsKTtcbiAgICB9KSxcblxuICAgIFhPUjogbmV3IE9wKHRoaXMsIFwiWE9SXCIsIE9QRVJBVElPTl9YT1IsIDEsIGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgIHZhciBhVmFsID0gYS5nZXRBKCksIGJWYWwgPSBiLmdldEIoKTtcbiAgICAgIGIuc2V0KGJWYWwgXiBhVmFsKTtcbiAgICB9KSxcblxuICAgIFNIUjogbmV3IE9wKHRoaXMsIFwiU0hSXCIsIE9QRVJBVElPTl9TSFIsIDEsIGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgIHZhciBhVmFsID0gYS5nZXRBKCksIGJWYWwgPSBiLmdldEIoKTtcbiAgICAgIHRoaXMuZW11bGF0b3IuUmVnaXN0ZXJzLkVYLnNldCgoKGJWYWwgPDwgMTYgKSA+PiBhVmFsKSAmIDB4ZmZmZik7XG4gICAgICBiLnNldChiVmFsID4+PiBhVmFsKTtcbiAgICB9KSxcblxuICAgIEFTUjogbmV3IE9wKHRoaXMsIFwiQVNSXCIsIE9QRVJBVElPTl9BU1IsIDEsIGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgIHZhciBhVmFsID0gYS5nZXRBKCksIGJWYWwgPSBVdGlscy50bzMyQml0U2lnbmVkKGIuZ2V0QigpKTtcbiAgICAgIHRoaXMuZW11bGF0b3IuUmVnaXN0ZXJzLkVYLnNldCgoKGJWYWwgPDwgMTYpID4+PiBhVmFsKSAmIDB4ZmZmZik7XG4gICAgICBiLnNldCgoYlZhbCA+PiBhVmFsKSAmIDB4ZmZmZik7XG4gICAgfSksXG5cbiAgICBTSEw6IG5ldyBPcCh0aGlzLCBcIlNITFwiLCBPUEVSQVRJT05fU0hMLCAxLCBmdW5jdGlvbihhLCBiKSB7XG4gICAgICB2YXIgYVZhbCA9IGEuZ2V0QSgpLCBiVmFsID0gYi5nZXRCKCk7XG4gICAgICB0aGlzLmVtdWxhdG9yLlJlZ2lzdGVycy5FWC5zZXQoKChiVmFsIDw8IGFWYWwpID4+IDE2KSAmIDB4ZmZmZik7XG4gICAgICBiLnNldCgoYlZhbCA8PCBhVmFsKSAmIDB4ZmZmZik7XG4gICAgfSksXG5cbiAgICBJRkI6IG5ldyBPcCh0aGlzLCBcIklGQlwiLCBPUEVSQVRJT05fSUZCLCAyLCBmdW5jdGlvbihhLCBiKSB7XG4gICAgICB2YXIgYVZhbCA9IGEuZ2V0QSgpLCBiVmFsID0gYi5nZXRCKCk7XG4gICAgICBpZigoYlZhbCAmIGFWYWwpICE9IDApIHsgfVxuICAgICAgZWxzZSB0aGlzLmVtdWxhdG9yLnNraXBJbnN0cnVjdGlvbigpO1xuXG4gICAgfSksXG5cbiAgICBJRkM6IG5ldyBPcCh0aGlzLCBcIklGQ1wiLCBPUEVSQVRJT05fSUZDLCAyLCBmdW5jdGlvbihhLCBiKSB7XG4gICAgICB2YXIgYVZhbCA9IGEuZ2V0QSgpLCBiVmFsID0gYi5nZXRCKCk7XG4gICAgICBpZigoYlZhbCAmIGFWYWwpID09PSAwKSB7IH1cbiAgICAgIGVsc2UgdGhpcy5lbXVsYXRvci5za2lwSW5zdHJ1Y3Rpb24oKTtcblxuICAgIH0pLFxuXG4gICAgSUZFOiBuZXcgT3AodGhpcywgXCJJRkVcIiwgT1BFUkFUSU9OX0lGRSwgMiwgZnVuY3Rpb24oYSwgYikge1xuICAgICAgdmFyIGFWYWwgPSBhLmdldEEoKSwgYlZhbCA9IGIuZ2V0QigpO1xuICAgICAgaWYoYlZhbCA9PT0gYVZhbCkgeyB9XG4gICAgICBlbHNlIHRoaXMuZW11bGF0b3Iuc2tpcEluc3RydWN0aW9uKCk7XG4gICAgfSksXG5cbiAgICBJRk46IG5ldyBPcCh0aGlzLCBcIklGTlwiLCBPUEVSQVRJT05fSUZOLCAyLCBmdW5jdGlvbihhLCBiKSB7XG4gICAgICB2YXIgYVZhbCA9IGEuZ2V0QSgpLCBiVmFsID0gYi5nZXRCKCk7XG4gICAgICBpZihiVmFsICE9PSBhVmFsKSB7IH1cbiAgICAgIGVsc2UgdGhpcy5lbXVsYXRvci5za2lwSW5zdHJ1Y3Rpb24oKTtcbiAgICB9KSxcblxuICAgIElGRzogbmV3IE9wKHRoaXMsIFwiSUZHXCIsIE9QRVJBVElPTl9JRkcsIDIsIGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgIHZhciBhVmFsID0gYS5nZXRBKCksIGJWYWwgPSBiLmdldEIoKTtcbiAgICAgIGlmKGJWYWwgPiBhVmFsKSB7IH1cbiAgICAgIGVsc2UgdGhpcy5lbXVsYXRvci5za2lwSW5zdHJ1Y3Rpb24oKTtcbiAgICB9KSxcblxuICAgIElGQTogbmV3IE9wKHRoaXMsIFwiSUZBXCIsIE9QRVJBVElPTl9JRkEsIDIsIGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgIHZhciBhVmFsID0gVXRpbHMudG8zMkJpdFNpZ25lZChhLmdldEEoKSksIGJWYWwgPSBVdGlscy50bzMyQml0U2lnbmVkKGIuZ2V0QigpKTtcbiAgICAgIGlmKGJWYWwgPiBhVmFsKSB7IH1cbiAgICAgIGVsc2UgdGhpcy5lbXVsYXRvci5za2lwSW5zdHJ1Y3Rpb24oKTtcbiAgICB9KSxcblxuICAgIElGTDogbmV3IE9wKHRoaXMsIFwiSUZMXCIsIE9QRVJBVElPTl9JRkwsIDIsIGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgIHZhciBhVmFsID0gYS5nZXRBKCksIGJWYWwgPSBiLmdldEIoKTtcbiAgICAgIGlmKGJWYWwgPCBhVmFsKSB7IH1cbiAgICAgIGVsc2UgdGhpcy5lbXVsYXRvci5za2lwSW5zdHJ1Y3Rpb24oKTtcbiAgICB9KSxcblxuICAgIElGVTogbmV3IE9wKHRoaXMsIFwiSUZVXCIsIE9QRVJBVElPTl9JRlUsIDIsIGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgIHZhciBhVmFsID0gVXRpbHMudG8zMkJpdFNpZ25lZChhLmdldEEoKSksIGJWYWwgPSBVdGlscy50bzMyQml0U2lnbmVkKGIuZ2V0QigpKTtcbiAgICAgIGlmKGJWYWwgPCBhVmFsKSB7IH1cbiAgICAgIGVsc2UgdGhpcy5lbXVsYXRvci5za2lwSW5zdHJ1Y3Rpb24oKTtcbiAgICB9KSxcblxuXG4gICAgQURYOiBuZXcgT3AodGhpcywgXCJBRFhcIiwgT1BFUkFUSU9OX0FEWCwgMywgZnVuY3Rpb24oYSwgYikge1xuICAgICAgdmFyIHJlcyA9IGEuZ2V0QSgpICsgYi5nZXRCKCkgKyB0aGlzLmVtdWxhdG9yLlJlZ2lzdGVycy5FWC5nZXQoKTtcbiAgICAgIHRoaXMuZW11bGF0b3IuUmVnaXN0ZXJzLkVYLnNldChyZXMgPiAweGZmZmYgPyAxIDogMCk7XG4gICAgICBiLnNldChyZXMgJiAweGZmZmYpO1xuICAgIH0pLFxuXG4gICAgU0JYOiBuZXcgT3AodGhpcywgXCJTQlhcIiwgT1BFUkFUSU9OX1NCWCwgMywgZnVuY3Rpb24oYSwgYikge1xuICAgICAgdmFyIGFWYWwgPSBhLmdldEEoKSwgYlZhbCA9IGIuZ2V0QigpO1xuICAgICAgdmFyIHJlcyA9IGJWYWwgLSBhVmFsICsgdGhpcy5lbXVsYXRvci5SZWdpc3RlcnMuRVguZ2V0KCk7XG4gICAgICB0aGlzLmVtdWxhdG9yLlJlZ2lzdGVycy5FWC5zZXQocmVzIDwgMCA/IDB4ZmZmZiA6IDApO1xuICAgICAgYi5zZXQocmVzICYgMHhmZmZmKTtcbiAgICB9KSxcblxuICAgIFNUSTogbmV3IE9wKHRoaXMsIFwiU1RJXCIsIE9QRVJBVElPTl9TVEksIDIsIGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgIHZhciBhVmFsID0gYS5nZXRBKCksIGJWYWwgPSBiLmdldEIoKTtcbiAgICAgIGIuc2V0KGFWYWwpO1xuICAgICAgLy9hLnNldChiVmFsKTtcbiAgICAgIHRoaXMuZW11bGF0b3IuUmVnaXN0ZXJzLkkuc2V0KCh0aGlzLmVtdWxhdG9yLlJlZ2lzdGVycy5JLmdldCgpICsgMSkgJiAgMHhmZmZmKTtcbiAgICAgIHRoaXMuZW11bGF0b3IuUmVnaXN0ZXJzLkouc2V0KCh0aGlzLmVtdWxhdG9yLlJlZ2lzdGVycy5KLmdldCgpICsgMSkgJiAgMHhmZmZmKTtcbiAgICB9KSxcblxuICAgIFNURDogbmV3IE9wKHRoaXMsIFwiU1REXCIsIE9QRVJBVElPTl9TVEQsIDIsIGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgIHZhciBhVmFsID0gYS5nZXRBKCksIGJWYWwgPSBiLmdldEIoKTtcbiAgICAgIGIuc2V0KGFWYWwpO1xuICAgICAgLy9hLnNldChiVmFsKTtcbiAgICAgIHRoaXMuZW11bGF0b3IuUmVnaXN0ZXJzLkkuc2V0KCh0aGlzLmVtdWxhdG9yLlJlZ2lzdGVycy5JLmdldCgpIC0gMSkgJiAgMHhmZmZmKTtcbiAgICAgIHRoaXMuZW11bGF0b3IuUmVnaXN0ZXJzLkouc2V0KCh0aGlzLmVtdWxhdG9yLlJlZ2lzdGVycy5KLmdldCgpIC0gMSkgJiAgMHhmZmZmKTtcbiAgICB9KSxcblxuICAgIEpTUjogbmV3IE9wKHRoaXMsIFwiSlNSXCIsIE9QRVJBVElPTl9KU1IsIDMsIGZ1bmN0aW9uKGEpIHtcbiAgICAgIHZhciBhVmFsID0gYS5nZXRBKCk7XG4gICAgICB0aGlzLmVtdWxhdG9yLlJlZ2lzdGVycy5TUC5wdXNoKHRoaXMuZW11bGF0b3IuUmVnaXN0ZXJzLlBDLmdldCgpKTtcbiAgICAgIHRoaXMuZW11bGF0b3IuUmVnaXN0ZXJzLlBDLnNldChhVmFsKTtcbiAgICB9LCB0aGlzLlNwZWNpYWxPcFNldCksXG5cbiAgICBJTlQ6IG5ldyBPcCh0aGlzLCBcIklOVFwiLCBPUEVSQVRJT05fSU5ULCA0LCBmdW5jdGlvbihhKSB7XG4gICAgICB2YXIgYVZhbCA9IGEuZ2V0QSgpO1xuICAgICAgdGhpcy5lbXVsYXRvci5pbnRlcnJ1cHRRdWV1ZS5wdXNoKGFWYWwpO1xuICAgIH0sIHRoaXMuU3BlY2lhbE9wU2V0KSxcblxuICAgIElBRzogbmV3IE9wKHRoaXMsIFwiSUFHXCIsIE9QRVJBVElPTl9JQUcsIDEsIGZ1bmN0aW9uKGEpIHtcbiAgICAgIHZhciBhVmFsID0gYS5nZXRBKCk7XG4gICAgICBhLnNldCh0aGlzLmVtdWxhdG9yLlJlZ2lzdGVycy5JQS5nZXQoKSk7XG4gICAgfSwgdGhpcy5TcGVjaWFsT3BTZXQpLFxuXG4gICAgSUFTOiBuZXcgT3AodGhpcywgXCJJQVNcIiwgT1BFUkFUSU9OX0lBUywgMSwgZnVuY3Rpb24oYSkge1xuICAgICAgdGhpcy5lbXVsYXRvci5SZWdpc3RlcnMuSUEuc2V0KGEuZ2V0QSgpKTtcbiAgICB9LCB0aGlzLlNwZWNpYWxPcFNldCksXG5cbiAgICBSRkk6IG5ldyBPcCh0aGlzLCBcIlJGSVwiLCBPUEVSQVRJT05fUkZJLCAzLCBmdW5jdGlvbihhKSB7XG4gICAgICB2YXIgYVZhbCA9IGEuZ2V0QSgpO1xuICAgICAgdGhpcy5lbXVsYXRvci5pbnRlcnJ1cHRRdWV1ZWluZ0VuYWJsZWQgPSBmYWxzZTtcbiAgICAgIHRoaXMuZW11bGF0b3IuUmVnaXN0ZXJzLkEuc2V0KHRoaXMuZW11bGF0b3IuUmVnaXN0ZXJzLlNQLnBvcCgpKTtcbiAgICAgIHRoaXMuZW11bGF0b3IuUmVnaXN0ZXJzLlBDLnNldCh0aGlzLmVtdWxhdG9yLlJlZ2lzdGVycy5TUC5wb3AoKSk7XG5cbiAgICB9LCB0aGlzLlNwZWNpYWxPcFNldCksXG5cbiAgICBJQVE6IG5ldyBPcCh0aGlzLCBcIklBUVwiLCBPUEVSQVRJT05fSUFRLCAyLCBmdW5jdGlvbihhKSB7XG4gICAgICB2YXIgYVZhbCA9IGEuZ2V0QSgpO1xuICAgICAgaWYoYVZhbCA9PT0gMClcbiAgICAgICAgdGhpcy5lbXVsYXRvci5pbnRlcnJ1cHRRdWV1ZWluZ0VuYWJsZWQgPSBmYWxzZTtcbiAgICAgIGVsc2VcbiAgICAgICAgdGhpcy5lbXVsYXRvci5pbnRlcnJ1cHRRdWV1ZWluZ0VuYWJsZWQgPSB0cnVlO1xuICAgIH0sIHRoaXMuU3BlY2lhbE9wU2V0KSxcblxuICAgIEhXTjogbmV3IE9wKHRoaXMsIFwiSFdOXCIsIE9QRVJBVElPTl9IV04sIDIsIGZ1bmN0aW9uKGEpIHtcbiAgICAgIHZhciBhVmFsID0gYS5nZXRBKCk7XG4gICAgICBhLnNldCh0aGlzLmVtdWxhdG9yLmRldmljZXMubGVuZ3RoKTtcbiAgICB9LCB0aGlzLlNwZWNpYWxPcFNldCksXG5cbiAgICBIV1E6IG5ldyBPcCh0aGlzLCBcIkhXUVwiLCBPUEVSQVRJT05fSFdRLCA0LCBmdW5jdGlvbihhKSB7XG4gICAgICB2YXIgZGV2ID0gdGhpcy5lbXVsYXRvci5kZXZpY2VzW2EuZ2V0QSgpXTtcbiAgICAgIGlmKGRldikge1xuICAgICAgICB0aGlzLmVtdWxhdG9yLlJlZ2lzdGVycy5BLnNldChkZXYuaWQgJiAweGZmZmYpO1xuICAgICAgICB0aGlzLmVtdWxhdG9yLlJlZ2lzdGVycy5CLnNldCgoZGV2LmlkID4+IDE2KSAmIDB4ZmZmZik7XG4gICAgICAgIHRoaXMuZW11bGF0b3IuUmVnaXN0ZXJzLkMuc2V0KGRldi52ZXJzaW9uICYgMHhmZmZmKTtcbiAgICAgICAgdGhpcy5lbXVsYXRvci5SZWdpc3RlcnMuWC5zZXQoZGV2Lm1hbnVmYWN0dXJlciAmIDB4ZmZmZik7XG4gICAgICAgIHRoaXMuZW11bGF0b3IuUmVnaXN0ZXJzLlkuc2V0KChkZXYubWFudWZhY3R1cmVyID4+IDE2KSAmIDB4ZmZmZik7XG4gICAgICB9XG5cbiAgICB9LCB0aGlzLlNwZWNpYWxPcFNldCksXG5cbiAgICBIV0k6IG5ldyBPcCh0aGlzLCBcIkhXSVwiLCBPUEVSQVRJT05fSFdJLCA0LCBmdW5jdGlvbihhKSB7XG4gICAgICB2YXIgZGV2ID0gdGhpcy5lbXVsYXRvci5kZXZpY2VzW2EuZ2V0QSgpXTtcbiAgICAgIGlmKGRldilcbiAgICAgICAgZGV2LmludGVycnVwdCgpO1xuICAgIH0sIHRoaXMuU3BlY2lhbE9wU2V0KSxcbiAgfTtcblxuXG4gIHRoaXMuYm9vdD0gZnVuY3Rpb24oKSB7XG4gICAgY29uc29sZS5sb2coXCItLS0gRENQVS0xNiBFbXVsYXRvciAtLS1cIik7XG5cbiAgICB0aGlzLnByb2dyYW0gPSAgbnVsbDtcbiAgICB0aGlzLlBDLnNldCgwKTtcbiAgICB0aGlzLkNQVV9DWUNMRSA9IDA7XG4gICAgdGhpcy5SQU0gPSBuZXcgQXJyYXkoMHgxMDAwMCk7XG4gICAgdGhpcy5hc3luY1N0ZXBzID0gMTtcblxuICAgIHRoaXMuaW50ZXJydXB0UXVldWVpbmdFbmFibGVkID0gZmFsc2U7XG4gICAgdGhpcy5pbnRlcnJ1cHRRdWV1ZSA9IFtdO1xuXG4gICAgZm9yKHZhciByIGluIHRoaXMuUmVnaXN0ZXJzKSB7XG4gICAgICB0aGlzLlJlZ2lzdGVyc1tyXS5zZXQoMCk7XG4gICAgfVxuICAgIC8vdGhpcy5SZWdpc3RlcnMuU1Auc2V0KDB4ZmZmZik7XG5cbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5kZXZpY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLmRldmljZXNbaV0uaW5pdCgpO1xuICAgIH1cbiAgfTtcblxuICB0aGlzLnJlYm9vdD0gZnVuY3Rpb24oKSB7IHRoaXMuYm9vdCgpOyB9O1xuXG4gIC8qKlxuICAgKiBSdW4gdGhlIHByb2dyYW0gc3BlY2lmaWVkLlxuICAgKiBAIF9wcm9ncmFtIHRoZSBwcm9ncmFtIHlvdSB3YW50IHRvIHJ1biwgYXMgYW4gYXJyYXkgb2YgYnl0ZXMuXG4gICAqL1xuICB0aGlzLnJ1biA9IGZ1bmN0aW9uKF9wcm9ncmFtKSB7XG4gICAgdGhpcy5wcm9ncmFtID0gX3Byb2dyYW07XG5cbiAgICBjb25zb2xlLmxvZyhcIlJ1bm5pbmcgcHJvZ3JhbSAoXCIgKyB0aGlzLnByb2dyYW0ubGVuZ3RoICsgXCIgd29yZHMpXCIgKTtcblxuICAgIC8vIGxvYWQgcHJvZ3JhbSBpbnRvIFJBTVxuICAgIGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLnByb2dyYW0ubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmKHRoaXMucHJvZ3JhbVtpXSAhPSB1bmRlZmluZWQpXG4gICAgICAgIHRoaXMuUkFNW2ldID0gdGhpcy5wcm9ncmFtW2ldO1xuICAgIH1cblxuICAgIGlmKCF0aGlzLmFzeW5jKSB7XG4gICAgICB3aGlsZSh0aGlzLnN0ZXAoKSkgeyB9XG4gICAgICB0aGlzLmV4aXQoKTtcbiAgICB9XG4gICAgZWxzZVxuICAgICAgdGhpcy5zdGVwQXN5bmMoKTtcblxuICB9O1xuXG4gIHRoaXMuc3RlcCA9IGZ1bmN0aW9uKCkge1xuICAgIGlmKHRoaXMuUEMuZ2V0KCkgPCB0aGlzLnByb2dyYW0ubGVuZ3RoKSB7XG4gICAgICB0aGlzLm5leHRJbnN0cnVjdGlvbigpO1xuXG4gICAgICBpZih0aGlzLmF0dGFjaGVkRGVidWdnZXIgJiYgdGhpcy5wYXVzZWQpXG4gICAgICAgIHRoaXMuYXR0YWNoZWREZWJ1Z2dlci5vblN0ZXAodGhpcy5QQy5nZXQoKSk7XG5cbiAgICAgIC8vIHByb2Nlc3Mgb25lIGludGVycnVwdCBpZiB3ZSBoYXZlIG9uZVxuICAgICAgaWYodGhpcy5pbnRlcnJ1cHRRdWV1ZWluZ0VuYWJsZWQgPT0gZmFsc2UgJiYgdGhpcy5pbnRlcnJ1cHRRdWV1ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMucHJvY2Vzc0ludGVycnVwdCh0aGlzLmludGVycnVwdFF1ZXVlLnBvcCgpKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGVsc2UgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIHZhciBfdGhpcyA9IHRoaXM7XG4gIHRoaXMucGF1c2VkID0gZmFsc2U7XG5cbiAgdGhpcy5ydW5Bc3luYyA9IGZ1bmN0aW9uKCkge1xuICAgIHdoaWxlKHRydWUpIHtcbiAgICAgIGlmKE1hdGguZmxvb3IoX3RoaXMuQ1BVX0NZQ0xFIC8gX3RoaXMuY3VycmVudFNwZWVkLmRlbGF5RnJlcXVlbmN5KSA+IF90aGlzLmFzeW5jU3RlcHMpIHtcbiAgICAgICAgX3RoaXMuYXN5bmNTdGVwcysrO1xuICAgICAgICBzZXRUaW1lb3V0KF90aGlzLnJ1bkFzeW5jLCBfdGhpcy5jdXJyZW50U3BlZWQuZGVsYXlUaW1lKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgaWYoIV90aGlzLnN0ZXBBc3luYygpKVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHRoaXMuc3RlcEFzeW5jID0gZnVuY3Rpb24oKSB7XG4gICAgaWYodGhpcy5wcm9ncmFtID09IG51bGwpICAvLyBicmVhayBpZiB3ZSBoYXZlIHJlYm9vdGVkXG4gICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICBpZih0aGlzLnBhdXNlZCkge1xuICAgICAgaWYodGhpcy5hdHRhY2hlZERlYnVnZ2VyKSB7XG4gICAgICAgIHRoaXMuYXR0YWNoZWREZWJ1Z2dlci5vblBhdXNlZCh0aGlzLlBDLmdldCgpKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGlmKHRoaXMuYXR0YWNoZWREZWJ1Z2dlcikge1xuICAgICAgICBpZih0aGlzLmF0dGFjaGVkRGVidWdnZXIuYnJlYWtwb2ludHNbXCJcIit0aGlzLlBDLmdldCgpXSkge1xuICAgICAgICAgIHRoaXMucGF1c2VkID0gdHJ1ZTtcbiAgICAgICAgICB0aGlzLmF0dGFjaGVkRGVidWdnZXIub25QYXVzZWQodGhpcy5QQy5nZXQoKSk7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHZhciByZXMgPSB0aGlzLnN0ZXAoKTtcbiAgICAgIGlmKCFyZXMpXG4gICAgICAgIHRoaXMuZXhpdCgpO1xuICAgICAgcmV0dXJuIHJlcztcblxuICAgIH1cbiAgfTtcblxuICB0aGlzLm5leHRJbnN0cnVjdGlvbiA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBkYXRhID0gdGhpcy5SQU1bdGhpcy5QQy5pbmMoKV07XG4gICAgdmFyIGluc3RydWN0aW9uID0gVXRpbHMucGFyc2VJbnN0cnVjdGlvbihkYXRhKTtcbiAgICB2YXIgb3A7XG4gICAgaWYoaW5zdHJ1Y3Rpb24ub3Bjb2RlID09PSAwKSB7XG4gICAgICBpbnN0cnVjdGlvbiA9IFV0aWxzLnBhcnNlU3BlY2lhbEluc3RydWN0aW9uKGRhdGEpO1xuICAgICAgb3AgPSB0aGlzLlNwZWNpYWxPcFNldFtpbnN0cnVjdGlvbi5vcGNvZGVdO1xuICAgIH1cbiAgICBlbHNlXG4gICAgICBvcCA9IHRoaXMuT3BTZXRbaW5zdHJ1Y3Rpb24ub3Bjb2RlXTtcblxuXG5cbiAgICBpZighb3ApIHtcbiAgICAgIHZhciBlcnIgPSBcIkludmFsaWQgb3Bjb2RlIFwiICsgaW5zdHJ1Y3Rpb24ub3Bjb2RlO1xuICAgICAgY29uc29sZS53YXJuKGVycik7XG4gICAgICB0aHJvdyBlcnI7XG4gICAgfVxuXG4gICAgaWYodGhpcy52ZXJib3NlKSB7XG4gICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgVXRpbHMuaGV4KHRoaXMuUmVnaXN0ZXJzLlBDLmdldCgpKSArIFwiXFx0XCIgK1xuICAgICAgICBvcC5uYW1lICsgXCJcXHQoXCIgK1xuICAgICAgICBVdGlscy5oZXgoaW5zdHJ1Y3Rpb24uYSkgKyBcIixcXHRcIiArXG4gICAgICAgIFV0aWxzLmhleChpbnN0cnVjdGlvbi5iKSArIFwiKVwiXG4gICAgICApO1xuICAgIH1cbiAgICBvcC5leGVjKGluc3RydWN0aW9uLmEsIGluc3RydWN0aW9uLmIpO1xuXG4gICAgaWYodGhpcy5hdHRhY2hlZERlYnVnZ2VyKVxuICAgICAgdGhpcy5hdHRhY2hlZERlYnVnZ2VyLm9uSW5zdHJ1Y3Rpb24odGhpcy5QQy5nZXQoKSk7XG4gIH07XG5cbiAgdGhpcy5uZXh0V29yZCA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuQ1BVX0NZQ0xFKys7XG4gICAgcmV0dXJuIHRoaXMuUkFNW3RoaXMuUmVnaXN0ZXJzLlBDLmluYygpXTtcbiAgfTtcblxuICB0aGlzLmdldFBhcmFtVmFsdWUgPSBmdW5jdGlvbih2YWwpIHtcbiAgICByZXR1cm4gdGhpcy5WYWx1ZXNbbmV3IFN0cmluZyh2YWwpXTtcbiAgfTtcblxuICB0aGlzLnNraXBJbnN0cnVjdGlvbiA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBpbnN0cnVjdGlvbiA9IFV0aWxzLnBhcnNlSW5zdHJ1Y3Rpb24odGhpcy5SQU1bdGhpcy5QQy5pbmMoKV0pO1xuICAgIHRoaXMuQ1BVX0NZQ0xFKys7XG5cbiAgICAvLyBza2lwIFwibmV4dCB3b3JkXCIgdmFsdWVzIGJ5IGludm9raW5nIGdldCgpIG9uIHRoZSBwYXJhbXNcbiAgICB0aGlzLmdldFBhcmFtVmFsdWUoaW5zdHJ1Y3Rpb24uYSkuZ2V0KCk7XG4gICAgaWYoaW5zdHJ1Y3Rpb24ub3Bjb2RlICE9IDApXG4gICAgICB0aGlzLmdldFBhcmFtVmFsdWUoaW5zdHJ1Y3Rpb24uYikuZ2V0KCk7XG5cbiAgICBpZihpbnN0cnVjdGlvbi5vcGNvZGUgPj0gT1BFUkFUSU9OX0lGQiAmJiBpbnN0cnVjdGlvbi5vcGNvZGUgPD0gT1BFUkFUSU9OX0lGVSkge1xuICAgICAgLy8gaWYgd2UgaGF2ZSBza2lwcGVkIGEgY29uZGl0aW9uYWwgaW5zdHJ1Y3Rpb24sIHNraXAgYWRkaXRpb25hbCBpbnN0cnVjdGlvblxuICAgICAgLy8gYXQgY29zdCBvZiBhbiBhZGRpdGlvbmFsIGN5Y2xlLiAgY29udGludWUgdW50aWwgYSBub24tY29uZGl0aW9uYWwgaW5zdHJ1Y3Rpb25cbiAgICAgIC8vIGhhcyBiZWVuIHNraXBwZWRcbiAgICAgIHRoaXMuc2tpcEluc3RydWN0aW9uKCk7XG4gICAgfVxuXG4gIH07XG5cbiAgdGhpcy5wcm9jZXNzSW50ZXJydXB0ID0gZnVuY3Rpb24obWVzc2FnZSkge1xuICAgIGlmKHRoaXMuUmVnaXN0ZXJzLklBLmdldCgpICE9IDApIHtcbiAgICAgIHRoaXMuaW50ZXJydXB0UXVldWVpbmdFbmFibGVkID0gdHJ1ZTtcbiAgICAgIHRoaXMuUmVnaXN0ZXJzLlNQLnB1c2godGhpcy5SZWdpc3RlcnMuUEMuZ2V0KCkpOyAgLy8gcHVzaCBQQyBvbnRvIHRoZSBzdGFja1xuICAgICAgdGhpcy5SZWdpc3RlcnMuU1AucHVzaCh0aGlzLlJlZ2lzdGVycy5BLmdldCgpKTsgICAgLy8gZm9sbG93ZWQgYnkgcHVzaW5nIEEgdG8gdGhlIHN0YWNrXG4gICAgICB0aGlzLlJlZ2lzdGVycy5QQy5zZXQodGhpcy5SZWdpc3RlcnMuSUEuZ2V0KCkpOyAgICAvLyBzZXQgUEMgdG8gSUFcbiAgICAgIHRoaXMuUmVnaXN0ZXJzLkEuc2V0KG1lc3NhZ2UpOyAgICAgICAgICAgIC8vIHNldCBBIHRvIHRoZSBpbnRlcnJ1cHQgbWVzc2FnZVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICB9XG4gIH07XG5cbiAgdGhpcy5pbnRlcnJ1cHQgPSBmdW5jdGlvbihtZXNzYWdlKSB7XG4gICAgdGhpcy5pbnRlcnJ1cHRRdWV1ZS5wdXNoKG1lc3NhZ2UpO1xuXG4gICAgaWYodGhpcy5pbnRlcnJ1cHRRdWV1ZS5sZW5ndGggPiAyNTYpIHtcbiAgICAgIC8vIGNhdGNoIGZpcmU/XG4gICAgICBjb25zb2xlLndhcm4oXCJEQ1VQLTE2IGlzIG9uIGZpcmVcIik7XG4gICAgICB0aHJvdyBcIlRvbyBtYW55IGludGVycnVwdHNcIjtcbiAgICB9XG4gIH07XG5cbiAgdGhpcy5leGl0ID0gZnVuY3Rpb24oKSB7XG4gICAgY29uc29sZS5sb2coXCJQcm9ncmFtIGNvbXBsZXRlZCBpbiBcIiArIHRoaXMuQ1BVX0NZQ0xFICsgXCIgY3ljbGVzXCIpO1xuXG4gICAgaWYodGhpcy5hdHRhY2hlZERlYnVnZ2VyKVxuICAgICAgdGhpcy5hdHRhY2hlZERlYnVnZ2VyLm9uRXhpdCgpO1xuICB9O1xuXG4gIHRoaXMuYXR0YWNoZWREZWJ1Z2dlciA9IG51bGw7XG4gIHRoaXMuYXR0YWNoRGVidWdnZXIgPSBmdW5jdGlvbihfZGVidWdnZXIpIHtcbiAgICB0aGlzLmF0dGFjaGVkRGVidWdnZXIgPSBfZGVidWdnZXI7XG4gIH07XG5cbiAgdGhpcy5zZXRTcGVlZCA9IGZ1bmN0aW9uKG5ld1NwZWVkKSB7XG4gICAgdmFyIHNwZWVkID0gU3BlZWRzW25ld1NwZWVkXTtcbiAgICBpZighc3BlZWQpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiaW52YWxpZCBzcGVlZCBcIiArIG5ld1NwZWVkKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5jdXJyZW50U3BlZWQgPSBzcGVlZDtcbiAgICB0aGlzLmFzeW5jU3RlcHMgPSB0aGlzLkNQVV9DWUNMRSAvIHRoaXMuY3VycmVudFNwZWVkLmRlbGF5RnJlcXVlbmN5O1xuICB9XG5cbiAgdGhpcy5kZXZpY2VzID0gW107XG5cbiAgdGhpcy5ib290KCk7XG59O1xuXG4vLyBnZW5lcmljIGRldmljZSB1c2VkIGZvciB1bml0IHRlc3RzXG5mdW5jdGlvbiBEZXZpY2UoX2lkLCBfdmVyc2lvbiwgX21hbnVmYWN0dXJlciwgX2VtdWxhdG9yKSB7XG4gIHRoaXMuaWQgPSBfaWQ7XG4gIHRoaXMudmVyc2lvbiA9IF92ZXJzaW9uO1xuICB0aGlzLm1hbnVmYWN0dXJlciA9IF9tYW51ZmFjdHVyZXI7XG4gIHRoaXMuZW11bGF0b3IgPSBfZW11bGF0b3I7XG59O1xuRGV2aWNlLnByb3RvdHlwZS5pbnRlcnJ1cHQgPSBmdW5jdGlvbigpIHsgfTtcbkRldmljZS5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uKCkgeyB9O1xuXG5cbmZ1bmN0aW9uIERlYnVnZ2VyKF9lbXVsYXRvcikge1xuICBpZighX2VtdWxhdG9yLmFzeW5jKSB0aHJvdyBcIkVtdWxhdG9yIG11c3QgYmUgaW4gYXN5bmNocm9ub3VzIG1vZGUgdG8gdXNlIGEgZGVidWdnZXIgd2l0aCBpdC5cIjtcbiAgdGhpcy5lbXVsYXRvciA9IF9lbXVsYXRvcjtcbiAgdGhpcy5icmVha3BvaW50cyA9IHt9O1xuXG4gIHRoaXMuZW11bGF0b3IuYXR0YWNoRGVidWdnZXIodGhpcyk7XG59XG5EZWJ1Z2dlci5wcm90b3R5cGUuZ2V0QnJlYWtwb2ludHMgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuYnJlYWtwb2ludHM7XG59O1xuRGVidWdnZXIucHJvdG90eXBlLnRvZ2dsZUJyZWFrcG9pbnQgPSBmdW5jdGlvbihsb2NhdGlvbiwgbGluZU51bWJlcikge1xuICBsb2NhdGlvbiArPSBcIlwiOyAgLy8gY29udmVydCB0byBzdHJpbmdcbiAgaWYodGhpcy5icmVha3BvaW50c1tsb2NhdGlvbl0pXG4gICAgZGVsZXRlIHRoaXMuYnJlYWtwb2ludHNbbG9jYXRpb25dO1xuICBlbHNlXG4gICAgdGhpcy5icmVha3BvaW50c1tsb2NhdGlvbl0gPSBsaW5lTnVtYmVyO1xufTtcbkRlYnVnZ2VyLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbigpIHtcbiAgaWYodGhpcy5lbXVsYXRvci5wYXVzZWQpIHtcbiAgICB0aGlzLmVtdWxhdG9yLnBhdXNlZCA9IGZhbHNlO1xuICAgIHRoaXMuZW11bGF0b3IucnVuQXN5bmMoKTtcbiAgfVxufTtcbkRlYnVnZ2VyLnByb3RvdHlwZS5zdGVwID0gZnVuY3Rpb24oKSB7XG4gIGlmKHRoaXMuZW11bGF0b3IucGF1c2VkKSB7XG4gICAgaWYoIXRoaXMuZW11bGF0b3Iuc3RlcCgpKVxuICAgICAgdGhpcy5lbXVsYXRvci5leGl0KCk7XG4gIH1cbn07XG5EZWJ1Z2dlci5wcm90b3R5cGUucGF1c2UgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5lbXVsYXRvci5wYXVzZWQgPSB0cnVlO1xufTtcblxuLy8gZXZlbnRzXG5EZWJ1Z2dlci5wcm90b3R5cGUub25TdGVwID0gZnVuY3Rpb24obG9jYXRpb24pIHsgfTtcbkRlYnVnZ2VyLnByb3RvdHlwZS5vblBhdXNlZCA9IGZ1bmN0aW9uKGxvY2F0aW9uKSB7IH07XG5EZWJ1Z2dlci5wcm90b3R5cGUub25JbnN0cnVjdGlvbiA9IGZ1bmN0aW9uKGxvY2F0aW9uKSB7IH07XG5EZWJ1Z2dlci5wcm90b3R5cGUub25FeGl0ID0gZnVuY3Rpb24oKSB7IH07XG5cbmV4cG9ydCB7XG4gIEVtdWxhdG9yIGFzIGRlZmF1bHRcbn07XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBJbnRlcnRpYWxOYXZpZ2F0aW9uIHtcbiAgY29uc3RydWN0b3IoZW11bGF0b3IsIHNoaXApIHtcbiAgICB0aGlzLmVtdWxhdG9yID0gZW11bGF0b3JcbiAgICB0aGlzLnNoaXAgICAgID0gc2hpcFxuXG4gICAgdGhpcy5pZCAgICAgICAgICAgPSAweGU5YzgxODQyXG4gICAgdGhpcy5tYW51ZmFjdHVyZXIgPSAweDZkYjExODU3XG4gICAgdGhpcy52ZXJzaW9uICAgICAgPSAweDAyMGZcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgdGhpcy5yZWZlcmVuY2VYID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogNjU1MzYpXG4gICAgdGhpcy5yZWZlcmVuY2VZID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogNjU1MzYpXG4gIH1cblxuICBpbnRlcnJ1cHQoKSB7XG4gICAgbGV0IGNvZGUgPSB0aGlzLmVtdWxhdG9yLlJlZ2lzdGVycy5BLmdldCgpXG4gICAgc3dpdGNoIChjb2RlKSB7XG4gICAgICBjYXNlIDA6XG4gICAgICAgIHRoaXMuZW11bGF0b3IuUmVnaXN0ZXJzLlguc2V0KHRoaXMuZ2V0WFBvc2l0aW9uKCkpXG4gICAgICAgIHRoaXMuZW11bGF0b3IuUmVnaXN0ZXJzLlkuc2V0KHRoaXMuZ2V0WVBvc2l0aW9uKCkpXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIDE6XG4gICAgICAgIHRoaXMuZW11bGF0b3IuUmVnaXN0ZXJzLlguc2V0KHRoaXMuZ2V0WFZlbG9jaXR5KCkpXG4gICAgICAgIHRoaXMuZW11bGF0b3IuUmVnaXN0ZXJzLlkuc2V0KHRoaXMuZ2V0WVZlbG9jaXR5KCkpXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIDI6XG4gICAgICAgIHRoaXMuc2V0UmVmZXJlbmNlRnJhbWUoXG4gICAgICAgICAgdGhpcy5lbXVsYXRvci5SZWdpc3RlcnMuWC5nZXQoKSxcbiAgICAgICAgICB0aGlzLmVtdWxhdG9yLlJlZ2lzdGVycy5ZLmdldCgpXG4gICAgICAgIClcbiAgICB9XG4gIH1cblxuICBzZXRSZWZlcmVuY2VGcmFtZSh4LCB5KSB7XG4gICAgdGhpcy5yZWZlcmVuY2VYID0gdGhpcy5yZWZlcmVuY2VYIC0geFxuICAgIHRoaXMucmVmZXJlbmNlWSA9IHRoaXMucmVmZXJlbmNlWSAtIHlcbiAgfVxuXG4gIGdldFhQb3NpdGlvbigpIHtcbiAgICByZXR1cm4gTWF0aC5hYnModGhpcy5yZWZlcmVuY2VYICsgdGhpcy5zaGlwLnBvc2l0aW9uLngpICYgMHhmZmZmXG4gIH1cblxuICBnZXRZUG9zaXRpb24oKSB7XG4gICAgcmV0dXJuIE1hdGguYWJzKHRoaXMucmVmZXJlbmNlWSArIHRoaXMuc2hpcC5wb3NpdGlvbi55KSAmIDB4ZmZmZlxuICB9XG5cbiAgZ2V0WFZlbG9jaXR5KCkge1xuICAgIHJldHVybiBNYXRoLmFicyh0aGlzLnNoaXAudmVsb2NpdHkueCAqIDEyMCkgJiAweGZmZmZcbiAgfVxuXG4gIGdldFlWZWxvY2l0eSgpIHtcbiAgICByZXR1cm4gTWF0aC5hYnModGhpcy5zaGlwLnZlbG9jaXR5LnkgKiAxMjApICYgMHhmZmZmXG4gIH1cbn1cbiIsImxldCBrZXlNYXBwaW5nID0ge31cbmtleU1hcHBpbmdbOV0gID0gMHgwOSAvLyB0YWJcbmtleU1hcHBpbmdbOF0gID0gMHgxMCAvLyBiYWNrc3BhY2VcbmtleU1hcHBpbmdbMTNdID0gMHgxMSAvLyByZXR1cm4gLyBlbnRlclxua2V5TWFwcGluZ1s0NV0gPSAweDEyIC8vIGluc2VydFxua2V5TWFwcGluZ1s0Nl0gPSAweDEzIC8vIGRlbGV0ZVxua2V5TWFwcGluZ1szOF0gPSAweDgwIC8vIHVwIGFycm93XG5rZXlNYXBwaW5nWzQwXSA9IDB4ODEgLy8gZG93biBhcnJvd1xua2V5TWFwcGluZ1szN10gPSAweDgyIC8vIGxlZnQgYXJyb3dcbmtleU1hcHBpbmdbMzldID0gMHg4MyAvLyByaWdodCBhcnJvd1xua2V5TWFwcGluZ1sxNl0gPSAweDkwIC8vIHNoaWZ0XG5rZXlNYXBwaW5nWzE3XSA9IDB4OTEgLy8gY29udHJvbFxuXG4vLyBOb24gc3BlYyBrZXlzOlxua2V5TWFwcGluZ1szNl0gPSAweDE0IC8vIGhvbWVcbmtleU1hcHBpbmdbMzVdID0gMHgxNSAvLyBlbmRcbmtleU1hcHBpbmdbMzNdID0gMHg4NCAvLyBwYWdlIHVwXG5rZXlNYXBwaW5nWzM0XSA9IDB4ODUgLy8gcGFnZSBkb3duXG5cbmxldCBtYXBLZXkgPSBmdW5jdGlvbihldikge1xuICBpZiAoZXYuY2hhckNvZGUgPT0gMCkge1xuICAgIC8vIHVzZXIgcHJlc3NlZCBhIG5vbi1wcmludGFibGUga2V5LCB0aGlzIGlzIHRoZSBKUyBrZXkgY29kZVxuICAgIHJldHVybiBrZXlNYXBwaW5nW2V2LmtleUNvZGVdXG4gIH0gZWxzZSB7XG4gICAgLy8gdXNlciBwcmVzc2VkIGEgcHJpbnRhYmxlIGtleSwgdGhpcyBpcyB0aGUgVW5pY29kZSBjaGFyYWN0ZXIgY29kZVxuICAgIGlmIChldi5jaGFyQ29kZSA+PSAweDIwICYmIGV2LmNoYXJDb2RlIDw9IDB4N2YpIHtcbiAgICAgIHJldHVybiBldi5jaGFyQ29kZVxuICAgIH1cbiAgfVxuXG4gIC8vIGlmIHdlIGFyZSBzdGlsbCBoZXJlLCB0aGUga2V5IGlzbid0IHN1cHBvcnRlZCBieSB0aGUgRENQVSA6KFxuICByZXR1cm4gdW5kZWZpbmVkXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEtleWJvYXJkIHtcbiAgY29uc3RydWN0b3IoZW11bGF0b3IpIHtcbiAgICB0aGlzLmVtdWxhdG9yID0gZW11bGF0b3JcblxuICAgIHRoaXMuaWQgICAgICAgICAgID0gMHgzMGNmNzQwNlxuICAgIHRoaXMubWFudWZhY3R1cmVyID0gMHg0MWFjZjU3YlxuICAgIHRoaXMudmVyc2lvbiAgICAgID0gMVxuICB9XG5cbiAgaW5pdCgpIHtcbiAgICB0aGlzLmludGVycnVwdFZhbHVlID0gMFxuICAgIHRoaXMua2V5QnVmZmVyID0gW11cbiAgICB0aGlzLmRvd25LZXlzICA9IFtdXG4gICAgZG9jdW1lbnQuYm9keS5vbmtleWRvd24gID0gdGhpcy5rZXlQcmVzcy5iaW5kKHRoaXMpXG4gICAgZG9jdW1lbnQuYm9keS5vbmtleXByZXNzID0gdGhpcy5rZXlQcmVzcy5iaW5kKHRoaXMpXG4gICAgZG9jdW1lbnQuYm9keS5vbmtleXVwICAgID0gdGhpcy5rZXlSZWxlYXNlLmJpbmQodGhpcylcbiAgfVxuXG4gIGludGVycnVwdCgpIHtcbiAgICBsZXQgY29kZSA9IHRoaXMuZW11bGF0b3IuUmVnaXN0ZXJzLkEuZ2V0KClcbiAgICBzd2l0Y2ggKGNvZGUpIHtcbiAgICAgIGNhc2UgMDpcbiAgICAgICAgLy8gY2xlYXIgYnVmZmVyXG4gICAgICAgIHRoaXMuY2xlYXJCdWZmZXIoKVxuICAgICAgICBicmVha1xuICAgICAgY2FzZSAxOlxuICAgICAgICAvLyByZWFkIGxhc3QgY2hhcmFjdGVyIGludG8gQ1xuICAgICAgICBsZXQgY2hhciA9IHRoaXMucmVhZEJ1ZmZlcigpO1xuICAgICAgICB0aGlzLmVtdWxhdG9yLlJlZ2lzdGVycy5DLnNldChjaGFyKVxuICAgICAgICBicmVha1xuICAgICAgY2FzZSAyOlxuICAgICAgICAvLyBjaGVjayBpZiBrZXkgQiBpcyBkb3duLCBzZXR0aW5nIHRoZSByZXN1bHQgaW4gQ1xuICAgICAgICBsZXQga2V5ICAgID0gdGhpcy5lbXVsYXRvci5SZWdpc3RlcnMuQi5nZXQoKVxuICAgICAgICBsZXQgcmVzdWx0ID0gdGhpcy5pc0tleURvd24oa2V5KVxuICAgICAgICB0aGlzLmVtdWxhdG9yLlJlZ2lzdGVycy5DLnNldChyZXN1bHQpXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIDM6XG4gICAgICAgIC8vIHNldCBpbnRlcnJ1cHQgdmFsdWVcbiAgICAgICAgbGV0IHZhbHVlID0gdGhpcy5lbXVsYXRvci5SZWdpc3RlcnMuQi5nZXQoKVxuICAgICAgICB0aGlzLnNldEludGVycnVwdFZhbHVlKHZhbHVlKVxuICAgICAgICBicmVha1xuICAgIH1cbiAgfVxuXG4gIGNsZWFyQnVmZmVyKCkge1xuICAgIHRoaXMua2V5QnVmZmVyID0gW11cbiAgfVxuXG4gIHJlYWRCdWZmZXIoKSB7XG4gICAgbGV0IGNvZGUgPSB0aGlzLmtleUJ1ZmZlci5zaGlmdCgpXG4gICAgaWYgKGNvZGUgIT09IHVuZGVmaW5lZClcbiAgICB7XG4gICAgICByZXR1cm4gY29kZVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gMFxuICAgIH1cbiAgfVxuXG4gIGlzS2V5RG93bihjb2RlKSB7XG4gICAgaWYgKHRoaXMuZG93bktleXNbY29kZV0gPT0gdHJ1ZSkge1xuICAgICAgcmV0dXJuIDFcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIDBcbiAgICB9XG4gIH1cblxuICBzZXRJbnRlcnJ1cHRWYWx1ZSh2YWx1ZSkge1xuICAgIHRoaXMuaW50ZXJydXB0VmFsdWUgPSB2YWx1ZVxuICB9XG5cbiAga2V5UHJlc3MoZXYpIHtcbiAgICBsZXQgY29kZSA9IG1hcEtleShldilcbiAgICBpZiAoY29kZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICB0aGlzLmtleUJ1ZmZlci5wdXNoKGNvZGUpXG4gICAgdGhpcy5kb3duS2V5c1tjb2RlXSA9IHRydWVcblxuICAgIGlmICh0aGlzLmludGVycnVwdFZhbHVlID4gMCkge1xuICAgICAgdGhpcy5lbXVsYXRvci5pbnRlcnJ1cHQodGhpcy5pbnRlcnJ1cHRWYWx1ZSlcbiAgICB9XG5cbiAgICAvLyBjYXB0dXJlIHRoZSBrZXkgcHJlc3NcbiAgICBldi5wcmV2ZW50RGVmYXVsdCgpXG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICBrZXlSZWxlYXNlKGV2KSB7XG4gICAgbGV0IGNvZGUgPSBtYXBLZXkoZXYpXG4gICAgaWYgKGNvZGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgdGhpcy5kb3duS2V5c1tjb2RlXSA9IGZhbHNlXG5cbiAgICBpZiAodGhpcy5pbnRlcnJ1cHRWYWx1ZSA+IDApIHtcbiAgICAgIHRoaXMuZW11bGF0b3IuaW50ZXJydXB0KHRoaXMuaW50ZXJydXB0VmFsdWUpXG4gICAgfVxuXG4gICAgLy8gY2FwdHVyZSB0aGUga2V5IHByZXNzXG4gICAgZXYucHJldmVudERlZmF1bHQoKVxuICAgIHJldHVybiBmYWxzZVxuICB9XG59XG4iLCJjb25zdCBERUZBVUxUX0ZPTlQgPSBbXG4gIDB4MDAwZiwgMHgwODA4LCAweDA4MGYsIDB4MDgwOCwgMHgwOGY4LCAweDA4MDgsIDB4MDBmZiwgMHgwODA4LFxuICAweDA4MDgsIDB4MDgwOCwgMHgwOGZmLCAweDA4MDgsIDB4MDBmZiwgMHgxNDE0LCAweGZmMDAsIDB4ZmYwOCxcbiAgMHgxZjEwLCAweDE3MTQsIDB4ZmMwNCwgMHhmNDE0LCAweDE3MTAsIDB4MTcxNCwgMHhmNDA0LCAweGY0MTQsXG4gIDB4ZmYwMCwgMHhmNzE0LCAweDE0MTQsIDB4MTQxNCwgMHhmNzAwLCAweGY3MTQsIDB4MTQxNywgMHgxNDE0LFxuICAweDBmMDgsIDB4MGYwOCwgMHgxNGY0LCAweDE0MTQsIDB4ZjgwOCwgMHhmODA4LCAweDBmMDgsIDB4MGYwOCxcbiAgMHgwMDFmLCAweDE0MTQsIDB4MDBmYywgMHgxNDE0LCAweGY4MDgsIDB4ZjgwOCwgMHhmZjA4LCAweGZmMDgsXG4gIDB4MTRmZiwgMHgxNDE0LCAweDA4MGYsIDB4MDAwMCwgMHgwMGY4LCAweDA4MDgsIDB4ZmZmZiwgMHhmZmZmLFxuICAweGYwZjAsIDB4ZjBmMCwgMHhmZmZmLCAweDAwMDAsIDB4MDAwMCwgMHhmZmZmLCAweDBmMGYsIDB4MGYwZixcbiAgMHgwMDAwLCAweDAwMDAsIDB4MDA1ZiwgMHgwMDAwLCAweDAzMDAsIDB4MDMwMCwgMHgzZTE0LCAweDNlMDAsXG4gIDB4MjY2YiwgMHgzMjAwLCAweDYxMWMsIDB4NDMwMCwgMHgzNjI5LCAweDc2NTAsIDB4MDAwMiwgMHgwMTAwLFxuICAweDFjMjIsIDB4NDEwMCwgMHg0MTIyLCAweDFjMDAsIDB4MmExYywgMHgyYTAwLCAweDA4M2UsIDB4MDgwMCxcbiAgMHg0MDIwLCAweDAwMDAsIDB4MDgwOCwgMHgwODAwLCAweDAwNDAsIDB4MDAwMCwgMHg2MDFjLCAweDAzMDAsXG4gIDB4M2U0MSwgMHgzZTAwLCAweDQyN2YsIDB4NDAwMCwgMHg2MjU5LCAweDQ2MDAsIDB4MjI0OSwgMHgzNjAwLFxuICAweDBmMDgsIDB4N2YwMCwgMHgyNzQ1LCAweDM5MDAsIDB4M2U0OSwgMHgzMjAwLCAweDYxMTksIDB4MDcwMCxcbiAgMHgzNjQ5LCAweDM2MDAsIDB4MjY0OSwgMHgzZTAwLCAweDAwMjQsIDB4MDAwMCwgMHg0MDI0LCAweDAwMDAsXG4gIDB4MDgxNCwgMHgyMjQxLCAweDE0MTQsIDB4MTQwMCwgMHg0MTIyLCAweDE0MDgsIDB4MDI1OSwgMHgwNjAwLFxuICAweDNlNTksIDB4NWUwMCwgMHg3ZTA5LCAweDdlMDAsIDB4N2Y0OSwgMHgzNjAwLCAweDNlNDEsIDB4MjIwMCxcbiAgMHg3ZjQxLCAweDNlMDAsIDB4N2Y0OSwgMHg0MTAwLCAweDdmMDksIDB4MDEwMCwgMHgzZTQ5LCAweDNhMDAsXG4gIDB4N2YwOCwgMHg3ZjAwLCAweDQxN2YsIDB4NDEwMCwgMHgyMDQwLCAweDNmMDAsIDB4N2YwYywgMHg3MzAwLFxuICAweDdmNDAsIDB4NDAwMCwgMHg3ZjA2LCAweDdmMDAsIDB4N2YwMSwgMHg3ZTAwLCAweDNlNDEsIDB4M2UwMCxcbiAgMHg3ZjA5LCAweDA2MDAsIDB4M2U0MSwgMHhiZTAwLCAweDdmMDksIDB4NzYwMCwgMHgyNjQ5LCAweDMyMDAsXG4gIDB4MDE3ZiwgMHgwMTAwLCAweDdmNDAsIDB4N2YwMCwgMHgxZjYwLCAweDFmMDAsIDB4N2YzMCwgMHg3ZjAwLFxuICAweDc3MDgsIDB4NzcwMCwgMHgwNzc4LCAweDA3MDAsIDB4NzE0OSwgMHg0NzAwLCAweDAwN2YsIDB4NDEwMCxcbiAgMHgwMzFjLCAweDYwMDAsIDB4MDA0MSwgMHg3ZjAwLCAweDAyMDEsIDB4MDIwMCwgMHg4MDgwLCAweDgwMDAsXG4gIDB4MDAwMSwgMHgwMjAwLCAweDI0NTQsIDB4NzgwMCwgMHg3ZjQ0LCAweDM4MDAsIDB4Mzg0NCwgMHgyODAwLFxuICAweDM4NDQsIDB4N2YwMCwgMHgzODU0LCAweDU4MDAsIDB4MDg3ZSwgMHgwOTAwLCAweDQ4NTQsIDB4M2MwMCxcbiAgMHg3ZjA0LCAweDc4MDAsIDB4NDQ3ZCwgMHg0MDAwLCAweDIwNDAsIDB4M2QwMCwgMHg3ZjEwLCAweDZjMDAsXG4gIDB4NDE3ZiwgMHg0MDAwLCAweDdjMTgsIDB4N2MwMCwgMHg3YzA0LCAweDc4MDAsIDB4Mzg0NCwgMHgzODAwLFxuICAweDdjMTQsIDB4MDgwMCwgMHgwODE0LCAweDdjMDAsIDB4N2MwNCwgMHgwODAwLCAweDQ4NTQsIDB4MjQwMCxcbiAgMHgwNDNlLCAweDQ0MDAsIDB4M2M0MCwgMHg3YzAwLCAweDFjNjAsIDB4MWMwMCwgMHg3YzMwLCAweDdjMDAsXG4gIDB4NmMxMCwgMHg2YzAwLCAweDRjNTAsIDB4M2MwMCwgMHg2NDU0LCAweDRjMDAsIDB4MDgzNiwgMHg0MTAwLFxuICAweDAwNzcsIDB4MDAwMCwgMHg0MTM2LCAweDA4MDAsIDB4MDIwMSwgMHgwMjAxLCAweDcwNGMsIDB4NzAwMFxuXTtcblxuY29uc3QgREVGQVVMVF9QQUxFVFRFID0gW1xuICAweDAwMCwgMHgwMGEsIDB4MGEwLCAweDBhYSwgMHhhMDAsIDB4YTBhLCAweGE1MCwgMHhhYWEsXG4gIDB4NTU1LCAweDU1ZiwgMHg1ZjUsIDB4NWZmLCAweGY1NSwgMHhmNWYsIDB4ZmY1LCAweGZmZlxuXTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9uaXRvciB7XG4gIGNvbnN0cnVjdG9yKGVtdWxhdG9yLCBjYW52YXMpIHtcbiAgICB0aGlzLmVtdWxhdG9yID0gZW11bGF0b3JcblxuICAgIHRoaXMuY2FudmFzICAgICAgICA9IGNhbnZhc1xuICAgIHRoaXMuY2FudmFzLndpZHRoICA9IDEyOFxuICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IDk2XG4gICAgdGhpcy5jb250ZXh0ICAgICAgID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgdGhpcy5pbWFnZURhdGEgICAgID0gdGhpcy5jb250ZXh0LmNyZWF0ZUltYWdlRGF0YShcbiAgICAgIHRoaXMuY2FudmFzLndpZHRoLFxuICAgICAgdGhpcy5jYW52YXMuaGVpZ2h0XG4gICAgKVxuXG4gICAgdGhpcy5pZCAgICAgICAgICAgPSAweDczNDlmNjE1XG4gICAgdGhpcy52ZXJzaW9uICAgICAgPSAweDE4MDJcbiAgICB0aGlzLm1hbnVmYWN0dXJlciA9IDB4MWM2YzhiMzZcbiAgICB0aGlzLmNvbm5lY3RlZCAgICA9IGZhbHNlXG5cbiAgICBzZXRUaW1lb3V0KHRoaXMucmVuZGVyLmJpbmQodGhpcyksIDEwMDAgLyAzMClcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgdGhpcy5jb25uZWN0ZWQgPSBmYWxzZVxuICB9XG5cbiAgaW50ZXJydXB0KCkge1xuICAgIGxldCBjb2RlICA9IHRoaXMuZW11bGF0b3IuUmVnaXN0ZXJzLkEuZ2V0KClcbiAgICBsZXQgdmFsdWUgPSB0aGlzLmVtdWxhdG9yLlJlZ2lzdGVycy5CLmdldCgpXG5cbiAgICBzd2l0Y2goY29kZSkge1xuICAgICAgY2FzZSAwOlxuICAgICAgICBpZih2YWx1ZSA9PT0gMCkge1xuICAgICAgICAgIHRoaXMuZGlzY29ubmVjdCgpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5tZW1NYXBTY3JlZW4odmFsdWUpXG4gICAgICAgIH1cbiAgICAgICAgYnJlYWtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGNvbnNvbGUud2FybihcIlVuaW1wbGVtZW50ZWQgaW50ZXJydXB0OlwiLCBjb2RlLCB2YWx1ZSlcbiAgICB9XG4gIH1cblxuICBtZW1NYXBTY3JlZW4odmFsdWUpIHtcbiAgICB0aGlzLm1lbU9mZnNldCA9IHZhbHVlXG4gICAgdGhpcy5jb25uZWN0ZWQgPSB0cnVlXG4gIH1cblxuICBkcmF3Q2VsbCh4LCB5LCB3b3JkKSB7XG4gICAgbGV0IGdseXBoID0gd29yZCAmIDB4N2ZcbiAgICBsZXQgYmxpbmsgPSAod29yZCAmIDB4MDA4MCkgPj4gN1xuICAgIGxldCBiZyAgICA9ICh3b3JkICYgMHgwZjAwKSA+PiA4XG4gICAgbGV0IGZnICAgID0gKHdvcmQgJiAweGYwMDApID4+IDEyXG4gICAgdGhpcy5kcmF3R2x5cGgoeCwgeSwgZ2x5cGgsIGZnLCBiZywgYmxpbmspXG4gIH1cblxuICBkcmF3R2x5cGgoeCwgeSwgZ2x5cGgsIGZnLCBiZywgYmxpbmspIHtcbiAgICAvLyBsb2FkIGZvbnQgZGF0YVxuICAgIGxldCBjb2xzID0gW107XG4gICAgZ2x5cGggKj0gMjtcbiAgICBjb2xzWzBdID0gdGhpcy5yZWFkRm9udChnbHlwaCkgPj4gOFxuICAgIGNvbHNbMV0gPSB0aGlzLnJlYWRGb250KGdseXBoKSAmIDB4ZmZcbiAgICBjb2xzWzJdID0gdGhpcy5yZWFkRm9udChnbHlwaCArIDEpID4+IDhcbiAgICBjb2xzWzNdID0gdGhpcy5yZWFkRm9udChnbHlwaCArIDEpICYgMHhmZlxuXG4gICAgLy8gbG9hZCBjb2xvdXIgZGF0YVxuICAgIGxldCBiZ1NwbGl0ID0gdGhpcy5yZWFkQ29sb3VycyhiZylcbiAgICBsZXQgW2JnUiwgYmdHLCBiZ0JdID0gYmdTcGxpdFxuICAgIGxldCBmZ1NwbGl0ID0gdGhpcy5yZWFkQ29sb3VycyhmZylcbiAgICBsZXQgW2ZnUiwgZmdHLCBmZ0JdID0gZmdTcGxpdFxuXG4gICAgLy8gZHJhdyBnbHlwaCB0byBidWZmZXJcbiAgICBmb3IobGV0IHJvdyA9IDA7IHJvdyA8IDg7IHJvdysrKSB7XG4gICAgICBmb3IobGV0IGNvbCA9IDA7IGNvbCA8IDQ7IGNvbCsrKSB7XG4gICAgICAgIGxldCBiaXQgPSAoY29sc1tjb2xdID4+IHJvdykgJiAweDAxXG4gICAgICAgIGxldCBpbmRleCA9ICgoeCo0ICsgY29sKSArICh5KjggKyByb3cpICogdGhpcy5jYW52YXMud2lkdGgpICogNFxuICAgICAgICBpZihiaXQgPT0gMSkge1xuICAgICAgICAgIHRoaXMuaW1hZ2VEYXRhLmRhdGFbaW5kZXgrMF0gPSBmZ1JcbiAgICAgICAgICB0aGlzLmltYWdlRGF0YS5kYXRhW2luZGV4KzFdID0gZmdHXG4gICAgICAgICAgdGhpcy5pbWFnZURhdGEuZGF0YVtpbmRleCsyXSA9IGZnQlxuICAgICAgICAgIHRoaXMuaW1hZ2VEYXRhLmRhdGFbaW5kZXgrM10gPSAyNTVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmltYWdlRGF0YS5kYXRhW2luZGV4KzBdID0gYmdSXG4gICAgICAgICAgdGhpcy5pbWFnZURhdGEuZGF0YVtpbmRleCsxXSA9IGJnR1xuICAgICAgICAgIHRoaXMuaW1hZ2VEYXRhLmRhdGFbaW5kZXgrMl0gPSBiZ0JcbiAgICAgICAgICB0aGlzLmltYWdlRGF0YS5kYXRhW2luZGV4KzNdID0gMjU1XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZWFkRm9udChvZmZzZXQpIHtcbiAgICAvLyBUT0RPIHJlYWQgZm9udCB3aGVuIG1lbW9yeSBtYXBwZWRcbiAgICByZXR1cm4gREVGQVVMVF9GT05UW29mZnNldF1cbiAgfVxuXG4gIHJlYWRDb2xvdXJzKGluZGV4KSB7XG4gICAgLy8gVE9ETyByZWFkIHBhbGV0dGUgd2hlbiBtZW1vcnkgbWFwcGVkXG4gICAgbGV0IGNvbG91ciA9IERFRkFVTFRfUEFMRVRURVtpbmRleF1cblxuICAgIGxldCByID0gKChjb2xvdXIgJiAweGYwMCkgPj4gOCkgKiAxNlxuICAgIGxldCBnID0gKChjb2xvdXIgJiAweDBmMCkgPj4gNCkgKiAxNlxuICAgIGxldCBiID0gKGNvbG91ciAmIDB4MDBmKSAqIDE2XG5cbiAgICByZXR1cm4gW3IsIGcsIGJdXG4gIH1cblxuICByZW5kZXJUb0J1ZmZlcigpIHtcbiAgICAvLyBkcmF3IGdseXBocyB0byBidWZmZXJcbiAgICBmb3IobGV0IHkgPSAwOyB5IDwgMTI7IHkrKykge1xuICAgICAgZm9yKGxldCB4ID0gMDsgeCA8IDMyOyB4KyspIHtcbiAgICAgICAgbGV0IHdvcmQgPSB0aGlzLmVtdWxhdG9yLlJBTVt0aGlzLm1lbU9mZnNldCArIHggKyB5ICogMzJdXG4gICAgICAgIHRoaXMuZHJhd0NlbGwoeCwgeSwgd29yZClcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZW5kZXJUb0NhbnZhcygpIHtcbiAgICAvLyBkcmF3IGJ1ZmZlciB0byBjYW52YXNcbiAgICB0aGlzLmNvbnRleHQucHV0SW1hZ2VEYXRhKHRoaXMuaW1hZ2VEYXRhLCAwLCAwKVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGlmICh0aGlzLmNvbm5lY3RlZCkge1xuICAgICAgdGhpcy5yZW5kZXJUb0J1ZmZlcigpXG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5yZW5kZXJUb0NhbnZhcy5iaW5kKHRoaXMpKVxuICAgIH1cbiAgICBzZXRUaW1lb3V0KHRoaXMucmVuZGVyLmJpbmQodGhpcyksIDEwMDAgLyAzMClcbiAgfVxufVxuIiwiY29uc3QgVFJBTlNNSVRfSU5URVJWQUwgPSAxMDAwIC8gMTBcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9kZW0ge1xuICBjb25zdHJ1Y3RvcihlbXVsYXRvciwgY2xpZW50KSB7XG4gICAgdGhpcy5lbXVsYXRvciA9IGVtdWxhdG9yXG4gICAgdGhpcy5jbGllbnQgPSBjbGllbnRcblxuICAgIHRoaXMuaWQgICAgICAgICAgID0gMHg0MzUzMTkxMFxuICAgIHRoaXMubWFudWZhY3R1cmVyID0gMHg0MWFjZjU3YlxuICAgIHRoaXMudmVyc2lvbiAgICAgID0gMHgwMDAzXG4gIH1cblxuICBpbml0KCkge1xuICAgIHRoaXMubWFzayAgICAgICA9IDBcbiAgICB0aGlzLmNvbXBhcmlzb24gPSAwXG5cbiAgICB0aGlzLmdlbmVyYXRlU2VyaWFsTnVtYmVyKCk7XG5cbiAgICB0aGlzLnJ4Q2hhbm5lbCA9IDBcbiAgICB0aGlzLnR4Q2hhbm5lbCA9IDBcblxuICAgIHRoaXMudHhCdWZmZXIgICAgID0gW11cbiAgICB0aGlzLnJ4QnVmZmVyICAgICA9IFtdXG4gICAgdGhpcy50eERlbGF5ICAgICAgPSAwXG5cbiAgICB0aGlzLnJ4SW50ZXJydXB0TWVzc2FnZSA9IDBcblxuICAgIHRoaXMuY2xpZW50Lm9uUmVjZWl2ZSA9IHRoaXMucmVjZWl2ZS5iaW5kKHRoaXMpXG4gICAgdGhpcy50aW1lciA9IHNldEludGVydmFsKHRoaXMudHJhbnNtaXQuYmluZCh0aGlzKSwgVFJBTlNNSVRfSU5URVJWQUwpXG4gICAgdGhpcy5ydW5uaW5nID0gdHJ1ZVxuICB9XG5cbiAgaW50ZXJydXB0KCkge1xuICAgIGxldCBjb2RlID0gdGhpcy5lbXVsYXRvci5SZWdpc3RlcnMuQS5nZXQoKVxuICAgIHN3aXRjaCAoY29kZSkge1xuICAgICAgY2FzZSAwOlxuICAgICAgICB0aGlzLmVtdWxhdG9yLlJlZ2lzdGVycy5BLnNldCh0aGlzLnNlcmlhbE51bWJlckEpO1xuICAgICAgICB0aGlzLmVtdWxhdG9yLlJlZ2lzdGVycy5CLnNldCh0aGlzLnNlcmlhbE51bWJlckIpO1xuICAgICAgICB0aGlzLmVtdWxhdG9yLlJlZ2lzdGVycy5DLnNldCh0aGlzLnNlcmlhbE51bWJlckMpO1xuICAgICAgICBicmVha1xuICAgICAgY2FzZSAxOlxuICAgICAgICB0aGlzLnNldEZpbHRlcihcbiAgICAgICAgICB0aGlzLmVtdWxhdG9yLlJlZ2lzdGVycy5CLmdldCgpLFxuICAgICAgICAgIHRoaXMuZW11bGF0b3IuUmVnaXN0ZXJzLkMuZ2V0KCksXG4gICAgICAgICAgdGhpcy5lbXVsYXRvci5SZWdpc3RlcnMuWC5nZXQoKSxcbiAgICAgICAgICB0aGlzLmVtdWxhdG9yLlJlZ2lzdGVycy5ZLmdldCgpXG4gICAgICAgIClcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgdGhpcy5zZXRUeENoYW5uZWwoXG4gICAgICAgICAgdGhpcy5lbXVsYXRvci5SZWdpc3RlcnMuQi5nZXQoKVxuICAgICAgICApXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIDM6XG4gICAgICAgIHRoaXMuc2V0UnhDaGFubmVsKFxuICAgICAgICAgIHRoaXMuZW11bGF0b3IuUmVnaXN0ZXJzLkIuZ2V0KClcbiAgICAgICAgKVxuICAgICAgICBicmVha1xuICAgICAgY2FzZSA0OlxuICAgICAgICB0aGlzLnRyYW5zbWl0RGF0YShcbiAgICAgICAgICB0aGlzLmVtdWxhdG9yLlJlZ2lzdGVycy5CLmdldCgpLFxuICAgICAgICAgIHRoaXMuZW11bGF0b3IuUmVnaXN0ZXJzLkMuZ2V0KClcbiAgICAgICAgKVxuICAgICAgICBicmVha1xuICAgICAgY2FzZSA1OlxuICAgICAgICBsZXQgc2l6ZSA9IHRoaXMucmVjZWl2ZURhdGEoXG4gICAgICAgICAgdGhpcy5lbXVsYXRvci5SZWdpc3RlcnMuQy5nZXQoKVxuICAgICAgICApXG4gICAgICAgIHRoaXMuZW11bGF0b3IuUmVnaXN0ZXJzLkIuc2V0KHNpemUpXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIDY6XG4gICAgICAgIHRoaXMuZW5hYmxlUnhJbnRlcnJ1cHQoXG4gICAgICAgICAgdGhpcy5lbXVsYXRvci5SZWdpc3RlcnMuQi5nZXQoKVxuICAgICAgICApXG4gICAgICAgIGJyZWFrXG4gICAgfVxuICB9XG5cbiAgZ2VuZXJhdGVTZXJpYWxOdW1iZXIoKSB7XG4gICAgLy8gQXMgd2VsbCBhcyBhdm9pZGluZyBiaXQgb3BlcmF0aW9ucywgSmF2YVNjcmlwdCBhbHNvIGNhbid0IGdlbmVyYXRlIGFcbiAgICAvLyByYW5kb20gbnVtYmVyIG1vcmUgdGhhbiAzMiBiaXRzIFxcby9cbiAgICB0aGlzLnNlcmlhbE51bWJlckEgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBNYXRoLnBvdygyLCAxNikgLSAxKTtcbiAgICB0aGlzLnNlcmlhbE51bWJlckIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBNYXRoLnBvdygyLCAxNikgLSAxKTtcbiAgICB0aGlzLnNlcmlhbE51bWJlckMgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBNYXRoLnBvdygyLCAxNikgLSAxKTtcbiAgfVxuXG4gIHNldEZpbHRlcihtYXNrSGlnaCwgbWFza0xvdywgY29tcGFyaXNvbkhpZ2gsIGNvbXBhcmlzb25Mb3cpIHtcbiAgICB0aGlzLm1hc2sgICAgICAgPSAobWFza0hpZ2ggPDwgMTYpIF4gbWFza0xvdztcbiAgICB0aGlzLmNvbXBhcmlzb24gPSAoY29tcGFyaXNvbkhpZ2ggPDwgMTYpIF4gY29tcGFyaXNvbkxvdztcbiAgfVxuXG4gIHNldFR4Q2hhbm5lbChjaGFubmVsKSB7XG4gICAgaWYgKGNoYW5uZWwgPCAweDAwIHx8IGNoYW5uZWwgPiAweGZmKVxuICAgIHtcbiAgICAgIHRoaXMudHhDaGFubmVsID0gMFxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnR4Q2hhbm5lbCA9IGNoYW5uZWxcbiAgICB9XG4gIH1cblxuICBzZXRSeENoYW5uZWwoY2hhbm5lbCkge1xuICAgIGlmIChjaGFubmVsIDwgMHgwMCB8fCBjaGFubmVsID4gMHhmZilcbiAgICB7XG4gICAgICB0aGlzLnJ4Q2hhbm5lbCA9IDBcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yeENoYW5uZWwgPSBjaGFubmVsXG4gICAgfVxuICB9XG5cbiAgdHJhbnNtaXREYXRhKGxlbmd0aCwgbWVtb3J5T2Zmc2V0KSB7XG4gICAgbGV0IGkgPSBtZW1vcnlPZmZzZXRcbiAgICBmb3IobGV0IGkgPSBtZW1vcnlPZmZzZXQ7IGkgPCBtZW1vcnlPZmZzZXQgKyBsZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy50eEJ1ZmZlci5wdXNoKHRoaXMuZW11bGF0b3IuUkFNW2ldKVxuICAgIH1cbiAgfVxuXG4gIHJlY2VpdmVEYXRhKG1lbW9yeU9mZnNldCkge1xuICAgIGxldCBpID0gbWVtb3J5T2Zmc2V0XG4gICAgbGV0IGxlbmd0aCA9IHRoaXMucnhCdWZmZXIubGVuZ3RoXG5cbiAgICB3aGlsZSAodGhpcy5yeEJ1ZmZlci5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLmVtdWxhdG9yLlJBTVtpKytdID0gdGhpcy5yeEJ1ZmZlci5zaGlmdCgpXG4gICAgfVxuICAgIHJldHVybiBsZW5ndGhcbiAgfVxuXG4gIGVuYWJsZVJ4SW50ZXJydXB0KGludGVycnVwdE1lc3NhZ2UpIHtcbiAgICB0aGlzLnJ4SW50ZXJydXB0TWVzc2FnZSA9IGludGVycnVwdE1lc3NhZ2VcbiAgfVxuXG4gIHRyYW5zbWl0KCkge1xuICAgIGlmICh0aGlzLnR4RGVsYXkgPiAwKSB7XG4gICAgICB0aGlzLnR4RGVsYXktLVxuICAgIH1cblxuICAgIGlmICh0aGlzLnR4RGVsYXkgPT0gMCkge1xuICAgICAgaWYgKHRoaXMudHhCdWZmZXIubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLnR4RGVsYXkgKz0gdGhpcy50eEJ1ZmZlci5sZW5ndGhcbiAgICAgICAgdGhpcy5jbGllbnQudHJhbnNtaXQodGhpcy50eENoYW5uZWwsIHRoaXMudHhCdWZmZXIpO1xuICAgICAgICB0aGlzLnR4QnVmZmVyID0gW11cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZWNlaXZlKGNoYW5uZWwsIGRhdGEpIHtcbiAgICBpZiAodGhpcy5yeENoYW5uZWwgPT0gY2hhbm5lbCkge1xuXG4gICAgICAvLyBjaGVjayBmaWx0ZXJcbiAgICAgIGxldCBmaWx0ZXJQYXJ0ID0gKGRhdGFbMF0gPDwgMTYpIF4gZGF0YVsxXTtcbiAgICAgIGlmICgoZmlsdGVyUGFydCAmIHRoaXMubWFzaykgIT0gdGhpcy5jb21wYXJpc29uKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdpZ25vcmluZyAnLCBkYXRhKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBhZGQgdG8gcnggYnVmZmVyXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpcy5yeEJ1ZmZlci5wdXNoKGRhdGFbaV0pO1xuICAgICAgfVxuXG4gICAgICAvLyB0cmlnZ2VyIGludGVycnVwdFxuICAgICAgaWYgKHRoaXMucnhJbnRlcnJ1cHRNZXNzYWdlKSB7XG4gICAgICAgIHRoaXMuZW11bGF0b3IuaW50ZXJydXB0KHRoaXMucnhJbnRlcnJ1cHRNZXNzYWdlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFRocnVzdGVycyB7XG4gIGNvbnN0cnVjdG9yKGVtdWxhdG9yLCBzaGlwKSB7XG4gICAgdGhpcy5lbXVsYXRvciA9IGVtdWxhdG9yXG4gICAgdGhpcy5zaGlwICAgICA9IHNoaXBcblxuICAgIHRoaXMuaWQgICAgICAgICAgID0gMHg4OWZjODY5N1xuICAgIHRoaXMubWFudWZhY3R1cmVyID0gMHg0MWFjZjU3YlxuICAgIHRoaXMudmVyc2lvbiAgICAgID0gMVxuICB9XG5cbiAgaW5pdCgpIHtcbiAgICB0aGlzLnN0YXRlID0gMHgwMDAwXG4gIH1cblxuICBpbnRlcnJ1cHQoKSB7XG4gICAgbGV0IGNvZGUgPSB0aGlzLmVtdWxhdG9yLlJlZ2lzdGVycy5BLmdldCgpXG4gICAgc3dpdGNoIChjb2RlKSB7XG4gICAgICBjYXNlIDA6XG4gICAgICAgIHRoaXMuZW11bGF0b3IuUmVnaXN0ZXJzLkIuc2V0KHRoaXMuc3RhdGUpXG4gICAgICBjYXNlIDE6XG4gICAgICAgIHRoaXMuc3RhdGUgPSB0aGlzLmVtdWxhdG9yLlJlZ2lzdGVycy5CLmdldCgpXG4gICAgfVxuICB9XG5cbiAgc3RlcCgpIHtcbiAgICBsZXQgZm9yd2FyZFJldmVyc2UgPSAodGhpcy5zdGF0ZSA+Pj4gOClcbiAgICBpZiAoZm9yd2FyZFJldmVyc2UgPiAweDBmKSB7XG4gICAgICBsZXQgcG93ZXIgPSAoZm9yd2FyZFJldmVyc2UgJiAweGYwKSA+Pj4gNFxuICAgICAgY29uc29sZS5sb2coJ2ZvcndhcmQnLCBmb3J3YXJkUmV2ZXJzZS50b1N0cmluZygxNiksIHBvd2VyKVxuICAgICAgdGhpcy5zaGlwLmZvcndhcmQocG93ZXIpXG4gICAgfSBlbHNlIGlmIChmb3J3YXJkUmV2ZXJzZSA+IDApIHtcbiAgICAgIGxldCBwb3dlciA9IGZvcndhcmRSZXZlcnNlICYgMHgwZlxuICAgICAgY29uc29sZS5sb2coJ2JhY2t3YXJkJyxmb3J3YXJkUmV2ZXJzZS50b1N0cmluZygxNiksIHBvd2VyKVxuICAgICAgdGhpcy5zaGlwLmJhY2t3YXJkKHBvd2VyKVxuICAgIH1cblxuICAgIHN3aXRjaCAodGhpcy5zdGF0ZSAmIDB4ZmYpIHtcbiAgICAgIGNhc2UgMHhmMDpcbiAgICAgICAgdGhpcy5zaGlwLnJvdGF0ZSgtMSlcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgMHgwZjpcbiAgICAgICAgdGhpcy5zaGlwLnJvdGF0ZSgxKVxuICAgICAgICBicmVha1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhpcy5zaGlwLnJvdGF0ZSgwKVxuICAgICAgICBicmVha1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IEVtdWxhdG9yIGZyb20gJy4vZGNwdS9lbXVsYXRvcidcbmltcG9ydCBEZWJ1Z2dlciBmcm9tICcuL2RjcHUvZGVidWdnZXInXG5pbXBvcnQgVGhydXN0ZXJzIGZyb20gJy4vZGNwdS90aHJ1c3RlcnMnXG5pbXBvcnQgTW9uaXRvciBmcm9tICcuL2RjcHUvbGVtMTgwMidcbmltcG9ydCBLZXlib2FyZCBmcm9tICcuL2RjcHUva2V5Ym9hcmQnXG5pbXBvcnQgSW5lcnRpYWxOYXZpZ2F0aW9uIGZyb20gJy4vZGNwdS9pbmVydGlhbF9uYXZpZ2F0aW9uJ1xuaW1wb3J0IEJ5dGVjb2RlTG9hZGVyIGZyb20gJy4vZGNwdS9ieXRlY29kZV9sb2FkZXInXG5pbXBvcnQgTW9kZW0gZnJvbSAnLi9kY3B1L21vZGVtJ1xuXG5pbXBvcnQgQ2xpZW50IGZyb20gJy4vY2xpZW50J1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYWluIHtcbiAgcnVuKCkge1xuICAgIHRoaXMuZW11bGF0b3IgPSBmYWxzZVxuXG4gICAgR3Qub25TdGFydCA9IChmdW5jdGlvbihzaGlwKSB7XG4gICAgICB0aGlzLmVtdWxhdG9yID0gbmV3IEVtdWxhdG9yKClcbiAgICAgIHRoaXMuZW11bGF0b3IuZGV2aWNlcyA9IFtdXG5cbiAgICAgIGxldCB0aHJ1c3RlcnMgPSBuZXcgVGhydXN0ZXJzKHRoaXMuZW11bGF0b3IsIHNoaXApXG4gICAgICB0aGlzLmVtdWxhdG9yLmRldmljZXMucHVzaCh0aHJ1c3RlcnMpXG5cbiAgICAgIGxldCBtb25pdG9yID0gbmV3IE1vbml0b3IodGhpcy5lbXVsYXRvciwgdGhpcy5idWlsZE1vbml0b3JDYW52YXMoKSlcbiAgICAgIHRoaXMuZW11bGF0b3IuZGV2aWNlcy5wdXNoKG1vbml0b3IpXG5cbiAgICAgIGxldCBrZXlib2FyZCA9IG5ldyBLZXlib2FyZCh0aGlzLmVtdWxhdG9yKVxuICAgICAgdGhpcy5lbXVsYXRvci5kZXZpY2VzLnB1c2goa2V5Ym9hcmQpXG5cbiAgICAgIGxldCBuYXYgPSBuZXcgSW5lcnRpYWxOYXZpZ2F0aW9uKHRoaXMuZW11bGF0b3IsIHNoaXApXG4gICAgICB0aGlzLmVtdWxhdG9yLmRldmljZXMucHVzaChuYXYpXG5cbiAgICAgIGxldCBtb2RlbSA9IG5ldyBNb2RlbSh0aGlzLmVtdWxhdG9yLCB0aGlzLmNsaWVudClcbiAgICAgIHRoaXMuZW11bGF0b3IuZGV2aWNlcy5wdXNoKG1vZGVtKVxuXG4gICAgICB0aGlzLmNsaWVudC5jb25uZWN0KClcblxuICAgICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5oYXNoID09IFwiI2RlYnVnZ2VyXCIpIHtcbiAgICAgICAgdGhpcy5zZXR1cERlYnVnZ2VyKCk7XG4gICAgICB9XG5cbiAgICAgIG5ldyBCeXRlY29kZUxvYWRlcih0aGlzLmJ1aWxkTG9hZGVyKCksIGJ5dGVjb2RlID0+IHtcbiAgICAgICAgdGhpcy5lbXVsYXRvci5yZWJvb3QoKVxuICAgICAgICB0aGlzLmVtdWxhdG9yLnJ1bihieXRlY29kZSlcbiAgICAgICAgdGhpcy5lbXVsYXRvci5ydW5Bc3luYygpXG4gICAgICB9KVxuICAgIH0pLmJpbmQodGhpcylcblxuICAgIEd0Lm9uU3RvcCA9IChmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuZW11bGF0b3IucGF1c2VkID0gdHJ1ZVxuICAgIH0pLmJpbmQodGhpcylcblxuICAgIEd0Lm9uU3RlcCA9IChmdW5jdGlvbigpIHtcbiAgICAgIGlmICghdGhpcy5lbXVsYXRvci5wYXVzZWQpIHtcbiAgICAgICAgZm9yKGxldCBkZXZpY2Ugb2YgdGhpcy5lbXVsYXRvci5kZXZpY2VzKSB7XG4gICAgICAgICAgaWYgKGRldmljZS5zdGVwKSB7XG4gICAgICAgICAgICBkZXZpY2Uuc3RlcCgpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSkuYmluZCh0aGlzKVxuXG4gICAgdGhpcy5jbGllbnQgPSBuZXcgQ2xpZW50KClcblxuICAgIEd0LmMgPSBuZXcgR3QuQ29udHJvbGxlcih0aGlzLmJ1aWxkRXRhZ0NhbnZhcygpKVxuICB9XG5cbiAgYnVpbGRMb2FkZXIoKSB7XG4gICAgbGV0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgZGl2LmNsYXNzTmFtZSA9ICdib3ggdXBsb2FkZXInXG5cbiAgICBsZXQgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpXG4gICAgaW5wdXQudHlwZSA9ICdmaWxlJ1xuXG4gICAgZGl2LmFwcGVuZENoaWxkKGlucHV0KVxuXG4gICAgbGV0IGNvbHVtbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsZWZ0LWNvbHVtbicpXG4gICAgY29sdW1uLmluc2VydEJlZm9yZShkaXYsIGNvbHVtbi5maXJzdENoaWxkKVxuXG4gICAgcmV0dXJuIGlucHV0XG4gIH1cblxuICBidWlsZEV0YWdDYW52YXMoKSB7XG4gICAgbGV0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpXG4gICAgY2FudmFzLmNsYXNzTmFtZSA9ICdldGFnJ1xuICAgIGNhbnZhcy5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHRcbiAgICBjYW52YXMud2lkdGggID0gd2luZG93LmlubmVyV2lkdGggLSA3MDBcblxuICAgIHdpbmRvdy5vbnJlc2l6ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgY2FudmFzLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodFxuICAgICAgY2FudmFzLndpZHRoICA9IHdpbmRvdy5pbm5lcldpZHRoIC0gNzAwXG4gICAgfVxuXG4gICAgbGV0IGNvbHVtbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyaWdodC1jb2x1bW4nKVxuICAgIGNvbHVtbi5hcHBlbmRDaGlsZChjYW52YXMpXG4gICAgcmV0dXJuIGNhbnZhc1xuICB9XG5cbiAgYnVpbGRNb25pdG9yQ2FudmFzKCkge1xuICAgIGxldCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKVxuICAgIGNhbnZhcy5jbGFzc05hbWUgPSAnbW9uaXRvcidcblxuICAgIGxldCBjb2x1bW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGVmdC1jb2x1bW4nKVxuICAgIGNvbHVtbi5hcHBlbmRDaGlsZChjYW52YXMpXG4gICAgcmV0dXJuIGNhbnZhc1xuICB9XG5cbiAgc2V0dXBEZWJ1Z2dlcigpIHtcbiAgICBjb25zb2xlLmxvZygnUnVubmluZyBkZWJ1Z2dlcicpO1xuXG4gICAgbGV0IF9kZWJ1Z2dlciA9IG5ldyBEZWJ1Z2dlcih0aGlzLmVtdWxhdG9yKVxuICAgIF9kZWJ1Z2dlci5vblN0ZXAgPSAobG9jYXRpb24pID0+IHtcbiAgICAgIGxldCB0YWJsZSA9IHtcbiAgICAgICAgdmFsOiB7fSxcbiAgICAgICAgbWVtOiB7fVxuICAgICAgfVxuXG4gICAgICBmb3IobGV0IHJlZyBpbiB0aGlzLmVtdWxhdG9yLlJlZ2lzdGVycykge1xuICAgICAgICBsZXQgdmFsID0gdGhpcy5lbXVsYXRvci5SZWdpc3RlcnNbcmVnXS5nZXQoKTtcbiAgICAgICAgbGV0IG1lbW9yeVZhbCA9IHRoaXMuZW11bGF0b3IuUkFNW3ZhbF0gfHwgMDtcblxuICAgICAgICB0YWJsZS52YWxbcmVnXSA9IHZhbC50b1N0cmluZygxNik7XG4gICAgICAgIHRhYmxlLm1lbVtyZWddID0gbWVtb3J5VmFsLnRvU3RyaW5nKDE2KTtcbiAgICAgIH1cblxuICAgICAgY29uc29sZS50YWJsZSh0YWJsZSk7XG4gICAgfVxuICAgIF9kZWJ1Z2dlci5vblBhdXNlZCA9IF9kZWJ1Z2dlci5vblN0ZXA7XG4gICAgX2RlYnVnZ2VyLnRvZ2dsZUJyZWFrcG9pbnQoXCIwXCIsIFwiMFwiKTtcblxuICAgIHdpbmRvdy5uID0gZnVuY3Rpb24oKSB7XG4gICAgICBfZGVidWdnZXIuc3RlcCgpO1xuICAgIH1cbiAgfVxufVxuIl19
