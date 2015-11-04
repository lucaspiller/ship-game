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

},{"./main":7}],2:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

// compiled version of programs/thruster_demo.dasm
var DEMO_BYTECODE = [6656, 34017, 7712, 31762, 34455, 32641, 13, 35042, 6386, 32641, 83, 32641, 2, 8129, 17, 32641, 7, 65535, 33793, 31296, 17, 31786, 255, 31745, 61440, 43, 34817, 31296, 17, 25473, 33793, 31296, 17, 31786, 255, 31745, 3840, 43, 34817, 31296, 17, 25473, 33793, 31296, 17, 31786, 255, 34817, 31296, 17, 25473, 33793, 31296, 17, 31786, 65280, 31745, 240, 43, 34817, 31296, 17, 25473, 33793, 31296, 17, 31786, 65280, 49153, 43, 34817, 31296, 17, 25473, 33793, 31296, 17, 31786, 65280, 34817, 31296, 17, 25473, 31937, 32768, 33889, 33921, 32978, 31776, 101, 31988, 65520, 31776, 117, 31988, 65520, 34017, 35010, 44258, 32641, 87, 33906, 31776, 18, 34930, 31776, 42, 35954, 31776, 30, 36978, 31776, 42, 34914, 38002, 33889, 25473, 33938, 31776, 51, 34962, 31776, 74, 37010, 31776, 63, 38034, 31776, 74, 34946, 40082, 33921, 25473];

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

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
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
        return Math.abs(this.ship.velocity.x * 1000) & 65535;
      }
    },
    getYVelocity: {
      value: function getYVelocity() {
        return Math.abs(this.ship.velocity.y * 1000) & 65535;
      }
    }
  });

  return IntertialNavigation;
})();

module.exports = IntertialNavigation;

},{}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

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
        switch (this.state >>> 8) {
          case 15:
            this.ship.backward();
            break;
          case 240:
            this.ship.forward();
            break;
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

},{}],7:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Emulator = _interopRequire(require("./dcpu/emulator"));

var Thrusters = _interopRequire(require("./dcpu/thrusters"));

var Monitor = _interopRequire(require("./dcpu/lem1802"));

var InertialNavigation = _interopRequire(require("./dcpu/inertial_navigation"));

var BytecodeLoader = _interopRequire(require("./dcpu/bytecode_loader"));

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

          var nav = new InertialNavigation(this.emulator, ship);
          this.emulator.devices.push(nav);

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
    }
  });

  return Main;
})();

module.exports = Main;

},{"./dcpu/bytecode_loader":2,"./dcpu/emulator":3,"./dcpu/inertial_navigation":4,"./dcpu/lem1802":5,"./dcpu/thrusters":6}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvbHVjYS9jb2RlL2RjcHUvc2hpcC1nYW1lLTIvc3JjL2xhdW5jaGVyLmpzIiwiL1VzZXJzL2x1Y2EvY29kZS9kY3B1L3NoaXAtZ2FtZS0yL3NyYy9kY3B1L2J5dGVjb2RlX2xvYWRlci5qcyIsIi9Vc2Vycy9sdWNhL2NvZGUvZGNwdS9zaGlwLWdhbWUtMi9zcmMvZGNwdS9lbXVsYXRvci5qcyIsIi9Vc2Vycy9sdWNhL2NvZGUvZGNwdS9zaGlwLWdhbWUtMi9zcmMvZGNwdS9pbmVydGlhbF9uYXZpZ2F0aW9uLmpzIiwiL1VzZXJzL2x1Y2EvY29kZS9kY3B1L3NoaXAtZ2FtZS0yL3NyYy9kY3B1L2xlbTE4MDIuanMiLCIvVXNlcnMvbHVjYS9jb2RlL2RjcHUvc2hpcC1nYW1lLTIvc3JjL2RjcHUvdGhydXN0ZXJzLmpzIiwiL1VzZXJzL2x1Y2EvY29kZS9kY3B1L3NoaXAtZ2FtZS0yL3NyYy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsWUFBWSxDQUFDOztBQUViLElBQUksZUFBZSxHQUFHLFNBQUEsZUFBQSxDQUFVLEdBQUcsRUFBRTtBQUFFLFNBQU8sR0FBRyxJQUFJLEdBQUcsQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztDQUFFLENBQUM7O0FBRTlGLElBSk8sSUFBSSxHQUFBLGVBQUEsQ0FBQSxPQUFBLENBQU0sUUFBUSxDQUFBLENBQUEsQ0FBQTs7O0FBR3pCLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxVQUFBLEdBQUcsRUFBSTtBQUNuRCxNQUFJLEdBQUcsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFBO0FBQ3BCLEtBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQTtDQUNWLENBQUMsQ0FBQTs7Ozs7Ozs7OztBQ0xGLElBQU0sYUFBYSxHQUFHLENBQUMsSUFBTSxFQUFDLEtBQU0sRUFBQyxJQUFNLEVBQUMsS0FBTSxFQUFDLEtBQU0sRUFBQyxLQUFNLEVBQUMsRUFBTSxFQUFDLEtBQU0sRUFBQyxJQUFNLEVBQUMsS0FBTSxFQUFDLEVBQU0sRUFBQyxLQUFNLEVBQUMsQ0FBTSxFQUFDLElBQU0sRUFBQyxFQUFNLEVBQUMsS0FBTSxFQUFDLENBQU0sRUFBQyxLQUFNLEVBQUMsS0FBTSxFQUFDLEtBQU0sRUFBQyxFQUFNLEVBQUMsS0FBTSxFQUFDLEdBQU0sRUFBQyxLQUFNLEVBQUMsS0FBTSxFQUFDLEVBQU0sRUFBQyxLQUFNLEVBQUMsS0FBTSxFQUFDLEVBQU0sRUFBQyxLQUFNLEVBQUMsS0FBTSxFQUFDLEtBQU0sRUFBQyxFQUFNLEVBQUMsS0FBTSxFQUFDLEdBQU0sRUFBQyxLQUFNLEVBQUMsSUFBTSxFQUFDLEVBQU0sRUFBQyxLQUFNLEVBQUMsS0FBTSxFQUFDLEVBQU0sRUFBQyxLQUFNLEVBQUMsS0FBTSxFQUFDLEtBQU0sRUFBQyxFQUFNLEVBQUMsS0FBTSxFQUFDLEdBQU0sRUFBQyxLQUFNLEVBQUMsS0FBTSxFQUFDLEVBQU0sRUFBQyxLQUFNLEVBQUMsS0FBTSxFQUFDLEtBQU0sRUFBQyxFQUFNLEVBQUMsS0FBTSxFQUFDLEtBQU0sRUFBQyxLQUFNLEVBQUMsR0FBTSxFQUFDLEVBQU0sRUFBQyxLQUFNLEVBQUMsS0FBTSxFQUFDLEVBQU0sRUFBQyxLQUFNLEVBQUMsS0FBTSxFQUFDLEtBQU0sRUFBQyxFQUFNLEVBQUMsS0FBTSxFQUFDLEtBQU0sRUFBQyxLQUFNLEVBQUMsRUFBTSxFQUFDLEtBQU0sRUFBQyxLQUFNLEVBQUMsRUFBTSxFQUFDLEtBQU0sRUFBQyxLQUFNLEVBQUMsS0FBTSxFQUFDLEVBQU0sRUFBQyxLQUFNLEVBQUMsS0FBTSxFQUFDLEtBQU0sRUFBQyxLQUFNLEVBQUMsRUFBTSxFQUFDLEtBQU0sRUFBQyxLQUFNLEVBQUMsS0FBTSxFQUFDLEtBQU0sRUFBQyxLQUFNLEVBQUMsS0FBTSxFQUFDLEtBQU0sRUFBQyxHQUFN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QWEsR0FBRyxDQUFJLENBQUM7QUFDekIsSUFBSSxhQUFhLEdBQUcsQ0FBSSxDQUFDO0FBQ3pCLElBQUksYUFBYSxHQUFHLENBQUksQ0FBQztBQUN6QixJQUFJLGFBQWEsR0FBRyxDQUFJLENBQUM7QUFDekIsSUFBSSxhQUFhLEdBQUcsQ0FBSSxDQUFDO0FBQ3pCLElBQUksYUFBYSxHQUFHLEVBQUksQ0FBQztBQUN6QixJQUFJLGFBQWEsR0FBRyxFQUFJLENBQUM7QUFDekIsSUFBSSxhQUFhLEdBQUcsRUFBSSxDQUFDO0FBQ3pCLElBQUksYUFBYSxHQUFHLEVBQUksQ0FBQztBQUN6QixJQUFJLGFBQWEsR0FBRyxFQUFJLENBQUM7QUFDekIsSUFBSSxhQUFhLEdBQUcsRUFBSSxDQUFDOztBQUV6QixJQUFJLGFBQWEsR0FBRyxFQUFJLENBQUM7QUFDekIsSUFBSSxhQUFhLEdBQUcsRUFBSSxDQUFDO0FBQ3pCLElBQUksYUFBYSxHQUFHLEVBQUksQ0FBQztBQUN6QixJQUFJLGFBQWEsR0FBRyxFQUFJLENBQUM7QUFDekIsSUFBSSxhQUFhLEdBQUcsRUFBSSxDQUFDO0FBQ3pCLElBQUksYUFBYSxHQUFHLEVBQUksQ0FBQztBQUN6QixJQUFJLGFBQWEsR0FBRyxFQUFJLENBQUM7QUFDekIsSUFBSSxhQUFhLEdBQUcsRUFBSSxDQUFDOztBQUV6QixJQUFJLGFBQWEsR0FBRyxFQUFJLENBQUM7QUFDekIsSUFBSSxhQUFhLEdBQUcsRUFBSSxDQUFDOztBQUV6QixJQUFJLGFBQWEsR0FBRyxFQUFJLENBQUM7QUFDekIsSUFBSSxhQUFhLEdBQUcsRUFBSSxDQUFDOztBQUV6QixJQUFJLGFBQWEsR0FBRyxDQUFJLENBQUM7QUFDekIsSUFBSSxhQUFhLEdBQUcsQ0FBSSxDQUFDO0FBQ3pCLElBQUksYUFBYSxHQUFHLENBQUksQ0FBQztBQUN6QixJQUFJLGFBQWEsR0FBRyxFQUFJLENBQUM7QUFDekIsSUFBSSxhQUFhLEdBQUcsRUFBSSxDQUFDO0FBQ3pCLElBQUksYUFBYSxHQUFHLEVBQUksQ0FBQzs7QUFFekIsSUFB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QyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0FBQ3JDLE1BQUksQ0FBQyxNQUFNLENBQUMsQ0FBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7QUFDckMsTUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztBQUNyQyxNQUFJLENBQUMsTUFBTSxDQUFDLENBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0FBQ3JDLE1BQUksQ0FBQyxNQUFNLENBQUMsQ0FBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7QUFDckMsTUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFJLENBQUMsR0FBRyxJQUFJLGFBQWEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3hELE1BQUksQ0FBQyxNQUFNLENBQUMsQ0FBSSxDQUFDLEdBQUcsSUFBSSxhQUFhLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN4RCxNQUFJLENBQUMsTUFBTSxDQUFDLEVBQUksQ0FBQyxHQUFHLElBQUksYUFBYSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDeEQsTUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFJLENBQUMsR0FBRyxJQUFJLGFBQWEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3hELE1BQUksQ0FBQyxNQUFNLENBQUMsRUFBSSxDQUFDLEdBQUcsSUFBSSxhQUFhLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN4RCxNQUFJLENBQUMsTUFBTSxDQUFDLEVBQUksQ0FBQyxHQUFHLElBQUksYUFBYSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDeEQsTUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFJLENBQUMsR0FBRyxJQUFJLGFBQWEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3hELE1BQUksQ0FBQyxNQUFNLENBQUMsRUFBSSxDQUFDLEdBQUcsSUFBSSxhQUFhLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN4RCxNQUFJLENBQUMsTUFBTSxDQUFDLEVBQUksQ0FBQyxHQUFHLElBQUksb0JBQW9CLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMvRCxNQUFJLENBQUMsTUFBTSxDQUFDLEVBQUksQ0FBQyxHQUFHLElBQUksb0JBQW9CLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMvRCxNQUFJLENBQUMsTUFBTSxDQUFDLEVBQUksQ0FBQyxHQUFHLElBQUksb0JBQW9CLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMvRCxNQUFJLENBQUMsTUFBTSxDQUFDLEVBQUksQ0FBQyxHQUFHLElBQUksb0JBQW9CLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMvRCxNQUFJLENBQUMsTUFBTSxDQUFDLEVBQUksQ0FBQyxHQUFHLElBQUksb0JBQW9CLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMvRCxNQUFJLENBQUMsTUFBTSxDQUFDLEVBQUksQ0FBQyxHQUFHLElBQUksb0JBQW9CLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMvRCxNQUFJLENBQUMsTUFBTSxDQUFDLEVBQUksQ0FBQyxHQUFHLElBQUksb0JBQW9CLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMvRCxNQUFJLENBQUMsTUFBTSxDQUFDLEVBQUksQ0FBQyxHQUFHLElBQUksb0JBQW9CLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMvRCxN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QUFFLENBQUMsRUFBRSxVQUFTLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDeEQsVUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUM5QixVQUFHLENBQUMsR0FBRyxHQUFHLFVBQVUsQ0FBQSxHQUFJLENBQUMsRUFDdkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFNLENBQUMsQ0FBQyxLQUV2QyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3BDLE9BQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEtBQU0sQ0FBQyxDQUFDO0tBQ3JCLENBQUM7O0FBRUYsT0FBRyxFQUFFLElBQUksRUFBRSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLENBQUMsRUFBRSxVQUFTLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDeEQsVUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ3BCLFVBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUM7QUFDMUIsVUFBRyxBQUFDLEdBQUcsR0FBSSxDQUFDLEVBQ1YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxLQUFNLENBQUMsQ0FBQyxLQUV2QyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3BDLE9BQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEtBQU0sQ0FBQyxDQUFDO0tBRXJCLENBQUM7O0FBRUYsT0FBRyxFQUFFLElBQUksRUFBRSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLENBQUMsRUFBRSxVQUFTLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDeEQsVUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUM5QixVQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEFBQUMsR0FBRyxJQUFJLEVBQUUsR0FBSSxLQUFNLENBQUMsQ0FBQztBQUNyRCxPQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxLQUFNLENBQUMsQ0FBQztLQUNyQixDQUFDOztBQUVGLE9BQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRSxDQUFDLEVBQUUsVUFBUyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQ3hELFVBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1VBQUUsSUFBSSxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7QUFDL0UsVUFBSSxHQUFHLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQztBQUN0QixVQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEFBQUMsR0FBRyxJQUFJLEVBQUUsR0FBSSxLQUFNLENBQUMsQ0FBQztBQUNyRCxPQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztLQUNqQyxDQUFDOztBQUVGLE9BQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRSxDQUFDLEVBQUUsVUFBUyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQ3hELFVBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUU7VUFBRSxJQUFJLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ3JDLFVBQUcsSUFBSSxLQUFLLENBQUMsRUFBRTtBQUNiLFlBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDbEMsU0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztPQUNWLE1BQ0k7QUFDSCxZQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQztBQUNsQyxZQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUUsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFBLEdBQUksSUFBSSxDQUFFLEdBQUcsS0FBTSxDQUFDLENBQUM7QUFDM0UsU0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsS0FBTSxDQUFDLENBQUM7T0FDckI7S0FDRixDQUFDOztBQUVGLE9BQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRSxDQUFDLEVBQUUsVUFBUyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQ3hELFVBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1VBQUUsSUFBSSxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7QUFDL0UsVUFBRyxJQUFJLEtBQUssQ0FBQyxFQUFFO0FBQ2IsWUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNsQyxTQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO09BQ1YsTUFDSTtBQUNILFlBQUksR0FBRyxHQUFHLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFDOUMsWUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUUsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFBLEdBQUksSUFBSSxDQUFFLEdBQUcsS0FBTSxDQUFDLENBQUM7QUFDdkYsU0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7T0FDakM7S0FDRixDQUFDOztBQUVGLE9BQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRSxDQUFDLEVBQUUsVUFBUyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQ3hELFVBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUU7VUFBRSxJQUFJLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ3JDLFVBQUcsSUFBSSxLQUFLLENBQUMsRUFDWCxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBRVQsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUM7S0FDdEIsQ0FBQzs7QUFFRixPQUFHLEVBQUUsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsQ0FBQyxFQUFFLFVBQVMsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUN4RCxVQUFJLElBQUksR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztVQUFFLElBQUksR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQy9FLFVBQUcsSUFBSSxLQUFLLENBQUMsRUFDWCxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBRVQsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO0tBQzNDLENBQUM7O0FBRUYsT0FBRyxFQUFFLElBQUksRUFBRSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLENBQUMsRUFBRSxVQUFTLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDeEQsVUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRTtVQUFFLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDckMsT0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUM7S0FDcEIsQ0FBQzs7QUFFRixPQUFHLEVBQUUsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsQ0FBQyxFQUFFLFVBQVMsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUN4RCxVQUFJLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFO1VBQUUsSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUNyQyxPQUFDLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQztLQUNwQixDQUFDOztBQUVGLE9BQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRSxDQUFDLEVBQUUsVUFBUyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQ3hELFVBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUU7VUFBRSxJQUFJLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ3JDLE9BQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDO0tBQ3BCLENBQUM7O0FBRUYsT0FBRyxFQUFFLElBQUksRUFBRSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLENBQUMsRUFBRSxVQUFTLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDeEQsVUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRTtVQUFFLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDckMsVUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxBQUFDLEFBQUMsSUFBSSxJQUFJLEVBQUUsSUFBTSxJQUFJLEdBQUksS0FBTSxDQUFDLENBQUM7QUFDakUsT0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLENBQUM7S0FDdEIsQ0FBQzs7QUFFRixPQUFHLEVBQUUsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsQ0FBQyxFQUFFLFVBQVMsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUN4RCxVQUFJLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFO1VBQUUsSUFBSSxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7QUFDMUQsVUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxBQUFDLEFBQUMsSUFBSSxJQUFJLEVBQUUsS0FBTSxJQUFJLEdBQUksS0FBTSxDQUFDLENBQUM7QUFDakUsT0FBQyxDQUFDLEdBQUcsQ0FBQyxBQUFDLElBQUksSUFBSSxJQUFJLEdBQUksS0FBTSxDQUFDLENBQUM7S0FDaEMsQ0FBQzs7QUFFRixPQUFHLEVBQUUsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsQ0FBQyxFQUFFLFVBQVMsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUN4RCxVQUFJLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFO1VBQUUsSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUNyQyxVQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEFBQUMsQUFBQyxJQUFJLElBQUksSUFBSSxJQUFLLEVBQUUsR0FBSSxLQUFNLENBQUMsQ0FBQztBQUNoRSxPQUFDLENBQUMsR0FBRyxDQUFDLEFBQUMsSUFBSSxJQUFJLElBQUksR0FBSSxLQUFNLENBQUMsQ0FBQztLQUNoQyxDQUFDOztBQUVGLE9BQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRSxDQUFDLEVBQUUsVUFB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QUFFO1VBQUUsSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUNyQyxVQUFJLEdBQUcsR0FBRyxJQUFJLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUN6RCxVQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsS0FBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ3JELE9BQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEtBQU0sQ0FBQyxDQUFDO0tBQ3JCLENBQUM7O0FBRUYsT0FBRyxFQUFFLElBQUksRUFBRSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLENBQUMsRUFBRSxVQUFTLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDeEQsVUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRTtVQUFFLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDckMsT0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7QUFFWixVQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEFBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBSyxLQUFNLENBQUMsQ0FBQztBQUMvRSxVQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEFBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBSyxLQUFNLENBQUMsQ0FBQztLQUNoRixDQUFDOztBQUVGLE9BQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRSxDQUFDLEVBQUUsVUFBUyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQ3hELFVBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUU7VUFBRSxJQUFJLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ3JDLE9BQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7O0FBRVosVUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxBQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUssS0FBTSxDQUFDLENBQUM7QUFDL0UsVUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxBQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUssS0FBTSxDQUFDLENBQUM7S0FDaEYsQ0FBQzs7QUFFRixPQUFHLEVBQUUsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsQ0FBQyxFQUFFLFVBQVMsQ0FBQyxFQUFFO0FBQ3JELFVBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUNwQixVQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0FBQ2xFLFVBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDdEMsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDOztBQUVyQixPQUFHLEVBQUUsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsQ0FBQyxFQUFFLFVBQVMsQ0FBQyxFQUFFO0FBQ3JELFVBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUNwQixVQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDekMsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDOztBQUVyQixPQUFHLEVBQUUsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsQ0FBQyxFQUFFLFVBQVMsQ0FBQyxFQUFFO0FBQ3JELFVBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUNwQixPQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0tBQ3pDLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQzs7QUFFckIsT0FBRyxFQUFFLElBQUksRUFBRSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLENBQUMsRUFBRSxVQUFTLENBQUMsRUFBRTtBQUNyRCxVQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0tBQzFDLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQzs7QUFFckIsT0FBRyxFQUFFLElBQUksRUFBRSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLENBQUMsRUFBRSxVQUFTLENBQUMsRUFBRTtBQUNyRCxVQUFJLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDcEIsVUFBSSxDQUFDLFFBQVEsQ0FBQyx3QkFBd0IsR0FBRyxLQUFLLENBQUM7QUFDL0MsVUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztBQUNoRSxVQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0tBRWxFLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQzs7QUFFckIsT0FBRyxFQUFFLElBQUksRUFBRSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLENBQUMsRUFBRSxVQUFTLENBQUMsRUFBRTtBQUNyRCxVQUFJLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDcEIsVUFBRyxJQUFJLEtBQUssQ0FBQyxFQUNYLElBQUksQ0FBQyxRQUFRLENBQUMsd0JBQXdCLEdBQUcsS0FBSyxDQUFDLEtBRS9DLElBQUksQ0FBQyxRQUFRLENBQUMsd0JBQXdCLEdBQUcsSUFBSSxDQUFDO0tBQ2pELEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQzs7QUFFckIsT0FBRyxFQUFFLElBQUksRUFBRSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLENBQUMsRUFBRSxVQUFTLENBQUMsRUFBRTtBQUNyRCxVQUFJLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDcEIsT0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUNyQyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUM7O0FBRXJCLE9BQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRSxDQUFDLEVBQUUsVUFBUyxDQUFDLEVBQUU7QUFDckQsVUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7QUFDMUMsVUFBRyxHQUFHLEVBQUU7QUFDTixZQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsS0FBTSxDQUFDLENBQUM7QUFDL0MsWUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxBQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksRUFBRSxHQUFJLEtBQU0sQ0FBQyxDQUFDO0FBQ3ZELFlBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sR0FBRyxLQUFNLENBQUMsQ0FBQztBQUNwRCxZQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEdBQUcsS0FBTSxDQUFDLENBQUM7QUFDekQsWUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxBQUFDLEdBQUcsQ0FBQyxZQUFZLElBQUksRUFBRSxHQUFJLEtBQU0sQ0FBQyxDQUFDO09BQ2xFO0tBRUYsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDOztBQUVyQixPQUFHLEVBQUUsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsQ0FBQyxFQUFFLFVBQVMsQ0FBQyxFQUFFO0FBQ3JELFVBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQzFDLFVBQUcsR0FBRyxFQUNKLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztLQUNuQixFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsRUFDdEIsQ0FBQzs7QUFHRixNQUFJLENBQUMsSUFBSSxHQUFFLFlBQVc7QUFDcEIsV0FBTyxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDOztBQUV4QyxRQUFJLENBQUMsT0FBTyxHQUFJLElBQUksQ0FBQztBQUNyQixRQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNmLFFBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO0FBQ25CLFFBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxLQUFLLENBQUMsS0FBTyxDQUFDLENBQUM7QUFDOUIsUUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7O0FBRXBCLFFBQUksQ0FBQyx3QkFBd0IsR0FBRyxLQUFLLENBQUM7QUFDdEMsUUFBSSxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7O0FBRXpCLFNBQUksSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtBQUMzQixVQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUMxQjs7O0FBR0QsU0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQzNDLFVBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDeEI7R0FDRixDQUFDOztBQUVGLE1BQUksQ0FBQyxNQUFNLEdBQUUsWUFBVztBQUFFLFFBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztHQUFFLENBQUM7Ozs7OztBQU16QyxNQUFJLENBQUMsR0FBRyxHQUFHLFVBQVMsUUFBUSxFQUFFO0FBQzVCLFFBQUksQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDOztBQUV4QixXQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBRSxDQUFDOzs7QUFHcEUsU0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQzNDLFVBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxTQUFTLEVBQzdCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNqQzs7QUFFRCxRQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtBQUNkLGFBQU0sSUFBSSxDQUFDLElBQUksRUFBRSxFQUFFLEVBQUc7QUFDdEIsVUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0tBQ2IsTUFFQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7R0FFcEIsQ0FBQzs7QUFFRixNQUFJLENBQUMsSUFBSSxHQUFHLFlBQVc7QUFDckIsUUFBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFO0FBQ3RDLFVBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQzs7QUFFdkIsVUFBRyxJQUFJLENBQUMsZ0JBQWdCLElBQUksSUFBSSxDQUFDLE1BQU0sRUFDckMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7OztBQUc5QyxVQUFHLElBQUksQ0FBQyx3QkFBd0IsSUFBSSxLQUFLLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO0FBQzNFLFlBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7T0FDbEQ7O0FBRUQsYUFBTyxJQUFJLENBQUM7S0FDYixNQUNJLE9BQU8sS0FBSyxDQUFDO0dBQ25CLENBQUM7O0FBRUYsTUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDO0FBQ2pCLE1BQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDOztBQUVwQixNQUFJLENBQUMsUUFBUSxHQUFHLFlBQVc7QUFDekIsV0FBTSxJQUFJLEVBQUU7QUFDVixVQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxVQUFVLEVBQUU7QUFDckYsYUFBSyxDQUFDLFVBQVUsRUFBRSxDQUFDO0FBQ25CLGtCQUFVLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ3pELGNBQU07T0FDUCxNQUNJO0FBQ0gsWUFBRyxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsRUFDbkIsTUFBTTtPQUNUO0tBQ0Y7R0FDRixDQUFBOztBQUVELE1BQUksQ0FBQyxTQUFTLEdBQUcsWUFBVztBQUMxQixRQUFHLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSTtBQUNyQixhQUFPLEtBQUssQ0FBQzs7QUFFZixRQUFHLElBQUksQ0FBQyxNQUFNLEVBQUU7QUFDZCxVQUFHLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtBQUN4QixZQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztBQUM5QyxlQUFPLEtBQUssQ0FBQztPQUNkO0tBQ0YsTUFDSTtBQUNILFVBQUcsSUFBSSxDQUFDLGdCQUFnQixFQUFFO0FBQ3hCLFlBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxFQUFFLEdBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFO0FBQ3RELGNBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0FBQ25CLGNBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0FBQzlDLGlCQUFPLEtBQUssQ0FBQztTQUNkO09BQ0Y7O0FBRUQsVUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ3RCLFVBQUcsQ0FBQyxHQUFHLEVBQ0wsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ2QsYUFBTyxHQUFHLENBQUM7S0FFWjtHQUNGLENBQUM7O0FBRUYsTUFBSSxDQUFDLGVBQWUsR0FBRyxZQUFXO0FBQ2hDLFFBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0FBQ25DLFFBQUksV0FBVyxHQUFHLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUMvQyxRQUFJLEVBQUUsQ0FBQztBQUNQLFFBQUcsV0FBVyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7QUFDM0IsaUJBQVcsR0FBRyxLQUFLLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDbEQsUUFBRSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQzVDLE1BRUMsRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDOztBQUl0QyxRQUFHLENBQUMsRUFBRSxFQUFFO0FBQ04sVUFBSSxHQUFHLEdBQUcsaUJBQWlCLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQztBQUNqRCxhQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2xCLFlBQU0sR0FBRyxDQUFDO0tBQ1g7O0FBRUQsUUFBRyxJQUFJLENBQUMsT0FBTyxFQUFFO0FBQ2YsYUFBTyxDQUFDLEdBQUcsQ0FDVCxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsSUFBSSxHQUN6QyxFQUFFLENBQUMsSUFBSSxHQUFHLEtBQUssR0FDZixLQUFLLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLEdBQ2hDLEtBQUssQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FDL0IsQ0FBQztLQUNIO0FBQ0QsTUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7QUFFdEMsUUFBRyxJQUFJLENBQUMsZ0JBQWdCLEVBQ3RCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0dBQ3RELENBQUM7O0FBRUYsTUFBSSxDQUFDLFFBQVEsR0FBRyxZQUFXO0FBQ3pCLFFBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztBQUNqQixXQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztHQUMxQyxDQUFDOztBQUVGLE1BQUksQ0FBQyxhQUFhLEdBQUcsVUFBUyxHQUFHLEVBQUU7QUFDakMsV0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7R0FDckMsQ0FBQzs7QUFFRixNQUFJLENBQUMsZUFBZSxHQUFHLFlBQVc7QUFDaEMsUUFBSSxXQUFXLEdBQUcsS0FBSyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDbEUsUUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDOzs7QUFHakIsUUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDeEMsUUFBRyxXQUFXLENBQUMsTUFBTSxJQUFJLENBQUMsRUFDeEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7O0FBRTFDLFFBQUcsV0FBVyxDQUFDLE1BQU0sSUFBSSxhQUFhLElBQUksV0FBVyxDQUFDLE1BQU0sSUFBSSxhQUFhLEVBQUU7Ozs7QUFJN0UsVUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0tBQ3hCO0dBRUYsQ0FBQzs7QUFFRixNQUFJLENBQUMsZ0JBQWdCLEdBQUcsVUFBUyxPQUFPLEVBQUU7QUFDeEMsUUFBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEVBQUU7QUFDL0IsVUFBSSxDQUFDLHdCQUF3QixHQUFHLElBQUksQ0FBQztBQUNyQyxVQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztBQUNoRCxVQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztBQUMvQyxVQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztBQUMvQyxVQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDL0IsTUFDSSxFQUNKO0dBQ0YsQ0FBQzs7QUFFRixNQUFJLENBQUMsU0FBUyxHQUFHLFVBQVMsT0FBTyxFQUFFO0FBQ2pDLFFBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDOztBQUVsQyxRQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxHQUFHLEdBQUcsRUFBRTs7QUFFbkMsYUFBTyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0FBQ25DLFlBQU0scUJBQXFCLENBQUM7S0FDN0I7R0FDRixDQUFDOztBQUVGLE1BQUksQ0FBQyxJQUFJLEdBQUcsWUFBVztBQUNyQixXQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixHQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDLENBQUM7O0FBRWxFLFFBQUcsSUFBSSxDQUFDLGdCQUFnQixFQUN0QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLENBQUM7R0FDbEMsQ0FBQzs7QUFFRixNQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO0FBQzdCLE1BQUksQ0FBQyxjQUFjLEdBQUcsVUFBUyxTQUFTLEVBQUU7QUFDeEMsUUFBSSxDQUFDLGdCQUFnQixHQUFHLFNBQVMsQ0FBQztHQUNuQyxDQUFDOztBQUVGLE1BQUksQ0FBQyxRQUFRLEdBQUcsVUFBUyxRQUFRLEVBQUU7QUFDakMsUUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzdCLFFBQUcsQ0FBQyxLQUFLLEVBQUU7QUFDVCxhQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixHQUFHLFFBQVEsQ0FBQyxDQUFDO0FBQ3pDLGFBQU87S0FDUjtBQUNELFFBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO0FBQzFCLFFBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQztHQUNyRSxDQUFBOztBQUVELE1BQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDOztBQUVsQixNQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7Q0FDYixDQUFDOzs7QUFHRixTQUFTLE1BQU0sQ0FBQyxHQUFHLEVBQUUsUUFBUSxFQUFFLGFBQWEsRUFBRSxTQUFTLEVBQUU7QUFDdkQsTUFBSSxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUM7QUFDZCxNQUFJLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQztBQUN4QixNQUFJLENBQUMsWUFBWSxHQUFHLGFBQWEsQ0FBQztBQUNsQyxNQUFJLENBQUMsUUFBUSxHQUFHLFNBQVMsQ0FBQztDQUMzQixDQUFDO0FBQ0YsTUFBTSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEdBQUcsWUFBVyxFQUFHLENBQUM7QUFDNUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsWUFBVyxFQUFHLENBQUM7O0FBR3ZDLFNBQVMsUUFBUSxDQUFDLFNBQVMsRUFBRTtBQUMzQixNQUFHLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxNQUFNLGtFQUFrRSxDQUFDO0FBQzlGLE1BQUksQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFDO0FBQzFCLE1BQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDOztBQUV0QixNQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztDQUNwQztBQUNELFFBQVEsQ0FBQyxTQUFTLENBQUMsY0FBYyxHQUFHLFlBQVc7QUFDN0MsU0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO0NBQ3pCLENBQUM7QUFDRixRQUFRLENBQUMsU0FBUyxDQUFDLGdCQUFnQixHQUFHLFVBQVMsUUFBUSxFQUFFLFVBQVUsRUFBRTtBQUNuRSxVQUFRLElBQUksRUFBRSxDQUFDO0FBQ2YsTUFBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxFQUMzQixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUMsS0FFbEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsR0FBRyxVQUFVLENBQUM7Q0FDM0MsQ0FBQztBQUNGLFFBQVEsQ0FBQyxTQUFTLENBQUMsR0FBRyxHQUFHLFlBQVc7QUFDbEMsTUFBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRTtBQUN2QixRQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7QUFDN0IsUUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztHQUMxQjtDQUNGLENBQUM7QUFDRixRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksR0FBRyxZQUFXO0FBQ25DLE1BQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUU7QUFDdkIsUUFBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLEVBQ3RCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7R0FDeEI7Q0FDRixDQUFDO0FBQ0YsUUFBUSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEdBQUcsWUFBVztBQUNwQyxNQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7Q0FDN0IsQ0FBQzs7O0FBR0YsUUFBUSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsVUFBUyxRQUFRLEVBQUUsRUFBRyxDQUFDO0FBQ25ELFFBQVEsQ0FBQyxTQUFTLENBQUMsUUFBUSxHQUFHLFVBQVMsUUFBUSxFQUFFLEVBQUcsQ0FBQztBQUNyRCxRQUFRLENBQUMsU0FBUyxDQUFDLGFBQWEsR0FBRyxVQUFTLFFBQVEsRUFBRSxFQUFHLENBQUM7QUFDMUQsUUFBUSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsWUFBVyxFQUFHLENBQUM7O3FCQUd6QyxRQUFROzs7QUM3NUJWLFlBQVksQ0FBQzs7QUFFYixJQUFJLFlBQVksR0FBRyxDQUFDLFlBQVk7QUFBRSxXQUFTLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUU7QUFBRSxTQUFLLElBQUksR0FBRyxJQUFJLEtBQUssRUFBRTtBQUFFLFVBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFLLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxJQUFLLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7S0FBRSxNQUFPLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO0dBQUUsT0FBUSxVQUFVLFdBQVcsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFO0FBQUUsUUFBSSxVQUFVLEVBQUUsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQyxJQUFLLFdBQVcsRUFBRSxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUMsT0FBUSxXQUFXLENBQUM7R0FBRSxDQUFDO0NBQUUsQ0FBQSxFQUFHLENBQUM7O0FBRWhjLElBQUksZUFBZSxHQUFHLFNBQUEsZUFBQSxDQUFVLFFBQVEsRUFBRSxXQUFXLEVBQUU7QUFBRSxNQUFJLEVBQUUsUUFBUSxZQUFZLFdBQVcsQ0FBQSxFQUFHO0FBQUUsVUFBTSxJQUFJLFNBQVMsQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO0dBQUU7Q0FBRSxDQUFDOztBQUVqSyxJQU5xQixtQkFBbUIsR0FBQSxDQUFBLFlBQUE7QUFDM0IsV0FEUSxtQkFBbUIsQ0FDMUIsUUFBUSxFQUFFLElBQUksRUFBRTtBQU8xQixtQkFBZSxDQUFDLElBQUksRUFSSCxtQkFBbUIsQ0FBQSxDQUFBOztBQUVwQyxRQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQTtBQUN4QixRQUFJLENBQUMsSUFBSSxHQUFPLElBQUksQ0FBQTs7QUFFcEIsUUFBSSxDQUFDLEVBQUUsR0FBYSxVQUFVLENBQUE7QUFDOUIsUUFBSSxDQUFDLFlBQVksR0FBRyxVQUFVLENBQUE7QUFDOUIsUUFBSSxDQUFDLE9BQU8sR0FBUSxHQUFNLENBQUE7R0FDM0I7O0FBVUQsY0FBWSxDQWxCTyxtQkFBbUIsRUFBQTtBQVV0QyxRQUFJLEVBQUE7QUFVQSxXQUFLLEVBVkwsU0FBQSxJQUFBLEdBQUc7QUFDTCxZQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEtBQUssQ0FBQyxDQUFBO0FBQ25ELFlBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsS0FBSyxDQUFDLENBQUE7T0FDcEQ7S0FXRTtBQVRILGFBQVMsRUFBQTtBQVdMLFdBQUssRUFYQSxTQUFBLFNBQUEsR0FBRztBQUNWLFlBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQTtBQUMxQyxnQkFBUSxJQUFJO0FBQ1YsZUFBSyxDQUFDO0FBQ0osZ0JBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUE7QUFDbEQsZ0JBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUE7QUFDbEQsa0JBQUs7QUFBQSxlQUNGLENBQUM7QUFDSixnQkFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQTtBQUNsRCxnQkFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQTtBQUNsRCxrQkFBSztBQUFBLGVBQ0YsQ0FBQztBQUNKLGdCQUFJLENBQUMsaUJBQWlCLENBQ3BCLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFDL0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUNoQyxDQUFBO0FBQUEsU0FDSjtPQUNGO0tBU0U7QUFQSCxxQkFBaUIsRUFBQTtBQVNiLFdBQUssRUFUUSxTQUFBLGlCQUFBLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUN0QixZQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFBO0FBQ3JDLFlBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUE7T0FDdEM7S0FVRTtBQVJILGdCQUFZLEVBQUE7QUFVUixXQUFLLEVBVkcsU0FBQSxZQUFBLEdBQUc7QUFDYixlQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFNLENBQUE7T0FDakU7S0FXRTtBQVRILGdCQUFZLEVBQUE7QUFXUixXQUFLLEVBWEcsU0FBQSxZQUFBLEdBQUc7QUFDYixlQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFNLENBQUE7T0FDakU7S0FZRTtBQVZILGdCQUFZLEVBQUE7QUFZUixXQUFLLEVBWkcsU0FBQSxZQUFBLEdBQUc7QUFDYixlQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLEtBQU0sQ0FBQTtPQUN0RDtLQWFFO0FBWEgsZ0JBQVksRUFBQTtBQWFSLFdBQUssRUFiRyxTQUFBLFlBQUEsR0FBRztBQUNiLGVBQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsS0FBTSxDQUFBO09BQ3REO0tBY0U7R0FDRixDQUFDLENBQUM7O0FBRUgsU0F0RW1CLG1CQUFtQixDQUFBO0NBdUV2QyxDQUFBLEVBQUcsQ0FBQzs7QUFFTCxNQUFNLENBQUMsT0FBTyxHQXpFTyxtQkFBbUIsQ0FBQTs7Ozs7Ozs7Ozs7QUNBeEMsSUFBTSxZQUFZLEdBQUcsQ0FDbkIsRUFBTSxFQUFFLElBQU0sRUFBRSxJQUFNLEVBQUUsSUFBTSxFQUFFLElBQU0sRUFBRSxJQUFNLEVBQUUsR0FBTSxFQUFFLElBQU0sRUFDOUQsSUFBTSxFQUFFLElBQU0sRUFBRSxJQUFNLEVBQUUsSUFBTSxFQUFFLEdBQU0sRUFBRSxJQUFNLEVBQUUsS0FBTSxFQUFFLEtBQU0sRUFDOUQsSUFBTSxFQUFFLElBQU0sRUFBRSxLQUFNLEVBQUUsS0FBTSxFQUFFLElBQU0sRUFBRSxJQUFNLEVBQUUsS0FBTSxFQUFFLEtBQU0sRUFDOUQsS0FBTSxFQUFFLEtBQU0sRUFBRSxJQUFNLEVBQUUsSUFBTSxFQUFFLEtBQU0sRUFBRSxLQUFNLEVBQUUsSUFBTSxFQUFFLElBQU0sRUFDOUQsSUFBTSxFQUFFLElBQU0sRUFBRSxJQUFNLEVBQUUsSUFBTSxFQUFFLEtBQU0sRUFBRSxLQUFNLEVBQUUsSUFBTSxFQUFFLElBQU0sRUFDOUQsRUFBTSxFQUFFLElBQU0sRUFBRSxHQUFNLEVBQUUsSUFBTSxFQUFFLEtBQU0sRUFBRSxLQUFNLEVBQUUsS0FBTSxFQUFFLEtBQU0sRUFDOUQsSUFBTSxFQUFFLElBQU0sRUFBRSxJQUFNLEVBQUUsQ0FBTSxFQUFFLEdBQU0sRUFBRSxJQUFNLEVBQUUsS0FBTSxFQUFFLEtBQU0sRUFDOUQsS0FBTSxFQUFFLEtBQU0sRUFBRSxLQUFNLEVBQUUsQ0FBTSxFQUFFLENBQU0sRUFBRSxLQUFNLEVBQUUsSUFBTSxFQUFFLElBQU0sRUFDOUQsQ0FBTSxFQUFFLENBQU0sRUFBRSxFQUFNLEVBQUUsQ0FBTSxFQUFFLEdBQU0sRUFBRSxHQUFNLEVBQUUsS0FBTSxFQUFFLEtBQU0sRUFDOUQsSUFBTSxFQUFFLEtBQU0sRUFBRSxLQUFNLEVBQUUsS0FBTSxFQUFFLEtBQU0sRUFBRSxLQUFNLEVBQUUsQ0FBTSxFQUFFLEdBQU0sRUFDOUQsSUFBTSxFQUFFLEtBQU0sRUFBRSxLQUFNLEVBQUUsSUFBTSxFQUFFLEtBQU0sRUFBRSxLQUFNLEVBQUUsSUFBTSxFQUFFLElBQU0sRUFDOUQsS0FBTSxFQUFFLENBQU0sRUFBRSxJQUFNLEVBQUUsSUFBTSxFQUFFLEVBQU0sRUFBRSxDQUFNLEVBQUUsS0FBTSxFQUFFLEdBQU0sRUFDOUQsS0FBTSxFQUFFLEtBQU0sRUFBRSxLQUFNLEVBQUUsS0FBTSxFQUFFLEtBQU0sRUFBRSxLQUFNLEVBQUUsSUFBTSxFQUFFLEtBQU0sRUFDOUQsSUFBTSxFQUFFLEtBQU0sRUFBRSxLQUFNLEVBQUUsS0FBTSxFQUFFLEtBQU0sRUFBRSxLQUFNLEVBQUUsS0FBTSxFQUFFLElBQU0sRUFDOUQsS0FBTSxFQUFFLEtBQU0sRUFBRSxJQUFNLEVBQUUsS0FBTSxFQUFFLEVBQU0sRUFBRSxDQUFNLEVBQUUsS0FBTSxFQUFFLENBQU0sRUFDOUQsSUFBTSxFQUFFLElBQU0sRUFBRSxJQUFNLEVBQUUsSUFBTSxFQUFFLEtBQU0sRUFBRSxJQUFNLEVBQUUsR0FBTSxFQUFFLElBQU0sRUFDOUQsS0FBTSxFQUFFLEtBQU0sRUFBRSxLQUFNLEVBQUUsS0FBTSxFQUFFLEtBQU0sRUFBRSxLQUFNLEVBQUUsS0FBTSxFQUFFLElBQU0sRUFDOUQsS0FBTSxFQUFFLEtBQU0sRUFBRSxLQUFNLEVBQUUsS0FBTSxFQUFFLEtBQU0sRUFBRSxHQUFNLEVBQUUsS0FBTSxFQUFFLEtBQU0sRUFDOUQsS0FBTSxFQUFFLEtBQU0sRUFBRSxLQUFNLEVBQUUsS0FBTSxFQUFFLElBQU0sRUFBRSxLQUFNLEVBQUUsS0FBTSxFQUFFLEtBQU0sRUFDOUQsS0FBTSxFQUFFLEtBQU0sRUFBRSxLQUFNLEVBQUUsS0FBTSxFQUFFLEtBQU0sRUFBRSxLQUFNLEVBQUUsS0FBTSxFQUFFLEtBQU0sRUFDOUQsS0FBTSxFQUFFLElBQU0sRUFBRSxLQUFNLEVBQUUsS0FBTSxFQUFFLEtBQU0sRUFBRSxLQUFNLEVBQUUsSUFBTSxFQUFFLEtBQU0sRUFDOUQsR0FBTSxFQUFFLEdBQU0sRUFBRSxLQUFNLEVBQUUsS0FBTSxFQUFFLElBQU0sRUFBRSxJQUFNLEVBQUUsS0FBTSxFQUFFLEtBQU0sRUFDOUQsS0FBTSxFQUFFLEtBQU0sRUFBRSxJQUFNLEVBQUUsSUFBTSxFQUFFLEtBQU0sRUFBRSxLQUFNLEVBQUUsR0FBTSxFQUFFLEtBQU0sRUFDOUQsR0FBTSxFQUFFLEtBQU0sRUFBRSxFQUFNLEVBQUUsS0FBTSxFQUFFLEdBQU0sRUFBRSxHQUFNLEVBQUUsS0FBTSxFQUFFLEtBQU0sRUFDOUQsQ0FBTSxFQUFFLEdBQU0sRUFBRSxJQUFNLEVBQUUsS0FBTSxFQUFFLEtBQU0sRUFBRSxLQUFNLEVBQUUsS0FBTSxFQUFFLEtBQU0sRUFDOUQsS0FBTSxFQUFFLEtBQU0sRUFBRSxLQUFNLEVBQUUsS0FBTSxFQUFFLElBQU0sRUFBRSxJQUFNLEVBQUUsS0FBTSxFQUFFLEtBQU0sRUFDOUQsS0FBTSxFQUFFLEtBQU0sRUFBRSxLQUFNLEVBQUUsS0FBTSxFQUFFLElBQU0sRUFBRSxLQUFNLEVBQUUsS0FBTSxFQUFFLEtBQU0sRUFDOUQsS0FBTSxFQUFFLEtBQU0sRUFBRSxLQUFNLEVBQUUsS0FBTSxFQUFFLEtBQU0sRUFBRSxLQUFNLEVBQUUsS0FBTSxFQUFFLEtBQU0sRUFDOUQsS0FBTSxFQUFFLElBQU0sRUFBRSxJQUFNLEVBQUUs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QUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0FBQzdDLGNBQU0sQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFBO0FBQ3pCLGNBQU0sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQTtBQUNsQyxjQUFNLENBQUMsS0FBSyxHQUFJLE1BQU0sQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFBOztBQUV2QyxjQUFNLENBQUMsUUFBUSxHQUFHLFlBQVc7QUFDM0IsZ0JBQU0sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQTtBQUNsQyxnQkFBTSxDQUFDLEtBQUssR0FBSSxNQUFNLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQTtTQUN4QyxDQUFBOztBQUVELFlBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLENBQUE7QUFDcEQsY0FBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQTtBQUMxQixlQUFPLE1BQU0sQ0FBQTtPQUNkOztBQUVELHNCQUFrQjthQUFBLDhCQUFHO0FBQ25CLFlBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUE7QUFDN0MsY0FBTSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUE7O0FBRTVCLFlBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLENBQUE7QUFDbkQsY0FBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQTtBQUMxQixlQUFPLE1BQU0sQ0FBQTtPQUNkOzs7O1NBL0VrQixJQUFJOzs7aUJBQUosSUFBSSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgTWFpbiBmcm9tICcuL21haW4nXG5cbi8vIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgZ2FtZSBhbmQgcnVuIGl0XG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZXZ0ID0+IHtcbiAgbGV0IGFwcCA9IG5ldyBNYWluKClcbiAgYXBwLnJ1bigpXG59KVxuIiwiLy8gY29tcGlsZWQgdmVyc2lvbiBvZiBwcm9ncmFtcy90aHJ1c3Rlcl9kZW1vLmRhc21cbmNvbnN0IERFTU9fQllURUNPREUgPSBbMHgxYTAwLDB4ODRlMSwweDFlMjAsMHg3YzEyLDB4ODY5NywweDdmODEsMHgwMDBkLDB4ODhlMiwweDE4ZjIsMHg3ZjgxLDB4MDA1MywweDdmODEsMHgwMDAyLDB4MWZjMSwweDAwMTEsMHg3ZjgxLDB4MDAwNywweGZmZmYsMHg4NDAxLDB4N2E0MCwweDAwMTEsMHg3YzJhLDB4MDBmZiwweDdjMDEsMHhmMDAwLDB4MDAyYiwweDg4MDEsMHg3YTQwLDB4MDAxMSwweDYzODEsMHg4NDAxLDB4N2E0MCwweDAwMTEsMHg3YzJhLDB4MDBmZiwweDdjMDEsMHgwZjAwLDB4MDAyYiwweDg4MDEsMHg3YTQwLDB4MDAxMSwweDYzODEsMHg4NDAxLDB4N2E0MCwweDAwMTEsMHg3YzJhLDB4MDBmZiwweDg4MDEsMHg3YTQwLDB4MDAxMSwweDYzODEsMHg4NDAxLDB4N2E0MCwweDAwMTEsMHg3YzJhLDB4ZmYwMCwweDdjMDEsMHgwMGYwLDB4MDAyYiwweDg4MDEsMHg3YTQwLDB4MDAxMSwweDYzODEsMHg4NDAxLDB4N2E0MCwweDAwMTEsMHg3YzJhLDB4ZmYwMCwweGMwMDEsMHgwMDJiLDB4ODgwMSwweDdhNDAsMHgwMDExLDB4NjM4MSwweDg0MDEsMHg3YTQwLDB4MDAxMSwweDdjMmEsMHhmZjAwLDB4ODgwMSwweDdhNDAsMHgwMDExLDB4NjM4MSwweDdjYzEsMHg4MDAwLDB4ODQ2MSwweDg0ODEsMHg4MGQyLDB4N2MyMCwweDAwNjUsMHg3Y2Y0LDB4ZmZmMCwweDdjMjAsMHgwMDc1LDB4N2NmNCwweGZmZjAsMHg4NGUxLDB4ODhjMiwweGFjZTIsMHg3ZjgxLDB4MDA1NywweDg0NzIsMHg3YzIwLDB4MDAxMiwweDg4NzIsMHg3YzIwLDB4MDAyYSwweDhjNzIsMHg3YzIwLDB4MDAxZSwweDkwNzIsMHg3YzIwLDB4MDAyYSwweDg4NjIsMHg5NDcyLDB4ODQ2MSwweDYzODEsMHg4NDkyLDB4N2MyMCwweDAwMzMsMHg4ODkyLDB4N2MyMCwweDAwNGEsMHg5MDkyLDB4N2MyMCwweDAwM2YsMHg5NDkyLDB4N2MyMCwweDAwNGEsMHg4ODgyLDB4OWM5MiwweDg0ODEsMHg2MzgxXVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCeXRlY29kZUxvYWRlciB7XG5cbiAgY29uc3RydWN0b3IoZWxlbWVudCwgY2FsbGJhY2spIHtcbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50XG4gICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrXG5cbiAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5sb2FkRnJvbUZpbGUuYmluZCh0aGlzKSlcbiAgICB0aGlzLmxvYWRGcm9tU3RvcmFnZSgpXG4gIH1cblxuICBsb2FkRnJvbVN0b3JhZ2UoKSB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCBieXRlY29kZSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJieXRlY29kZVwiKSlcbiAgICAgIGlmIChieXRlY29kZSkge1xuICAgICAgICB0aGlzLmNhbGxiYWNrKGJ5dGVjb2RlKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5sb2FkRGVtbygpXG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIkNhdWdodCBlcnJvcjpcIiwgZXJyKVxuICAgICAgdGhpcy5sb2FkRGVtbygpXG4gICAgfVxuICB9XG5cbiAgbG9hZERlbW8oKSB7XG4gICAgY29uc29sZS5sb2coXCJMb2FkaW5nIGRlbW8gYnl0ZWNvZGVcIilcbiAgICB0aGlzLmNhbGxiYWNrKERFTU9fQllURUNPREUpXG4gIH1cblxuICBsb2FkRnJvbUZpbGUoKSB7XG4gICAgaWYgKCF3aW5kb3cuRmlsZVJlYWRlcikge1xuICAgICAgYWxlcnQoXCJTb3JyeSwgeW91ciBicm93c2VyIGlzbid0IHN1cHBvcnRlZCA6KFwiKVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgbGV0IGNhbGxiYWNrID0gdGhpcy5jYWxsYmFja1xuICAgIGxldCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpXG4gICAgcmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgbGV0IGJ5dGVjb2RlID0gbmV3IEFycmF5KE1hdGguY2VpbChyZWFkZXIucmVzdWx0Lmxlbmd0aCAvIDIpKVxuXG4gICAgICBsZXQgaSA9IDBcbiAgICAgIGxldCBqID0gMFxuICAgICAgd2hpbGUoaSA8IHJlYWRlci5yZXN1bHQubGVuZ3RoKSB7XG4gICAgICAgIGxldCBsb3cgID0gcmVhZGVyLnJlc3VsdC5jaGFyQ29kZUF0KGkrKykgfHwgMFxuICAgICAgICBsZXQgaGlnaCA9IHJlYWRlci5yZXN1bHQuY2hhckNvZGVBdChpKyspIHx8IDBcblxuICAgICAgICBieXRlY29kZVtqKytdID0gKGxvdyA8PCA4KSArIGhpZ2hcbiAgICAgIH1cblxuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJieXRlY29kZVwiLCBKU09OLnN0cmluZ2lmeShieXRlY29kZSkpXG4gICAgICBjYWxsYmFjayhieXRlY29kZSlcbiAgICB9XG4gICAgcmVhZGVyLnJlYWRBc0JpbmFyeVN0cmluZyh0aGlzLmVsZW1lbnQuZmlsZXNbMF0pXG4gIH1cbn1cbiIsIi8vXG4vLyBEQ1BVLTE2IEVtdWxhdG9yXG4vL1xuLy8gQmFzZWQgdXBvbiBEQ1BVLTE2IElERSBieSBKb2huIE1jQ2FublxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2Rhbmdlcm1jY2Fubi9kY3B1MTYtaWRlXG4vL1xuLy8gQ29weXJpZ2h0IChjKSAyMDEyIEpvaG4gTWNDYW5uXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weSBvZlxuLy8gdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpblxuLy8gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0b1xuLy8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2Zcbi8vIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbi8vIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuLy8gY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTU1xuLy8gRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SXG4vLyBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVJcbi8vIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOXG4vLyBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuLy9cblxuZnVuY3Rpb24gUmVnaXN0ZXIoX25hbWUsIF92YWx1ZSwgX2VtdWxhdG9yKSB7XG4gIHRoaXMubmFtZSA9IF9uYW1lO1xuICB0aGlzLnZhbHVlID0gX3ZhbHVlO1xuICB0aGlzLmVtdWxhdG9yID0gX2VtdWxhdG9yO1xuICB0aGlzLmNvbnRlbnRzID0gMDtcbn1cblJlZ2lzdGVyLnByb3RvdHlwZS5nZXRBID0gUmVnaXN0ZXIucHJvdG90eXBlLmdldEIgPSBSZWdpc3Rlci5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzLmNvbnRlbnRzOyB9XG5SZWdpc3Rlci5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24odmFsKSB7IHRoaXMuY29udGVudHMgPSB2YWw7IH1cblxuZnVuY3Rpb24gUmVnaXN0ZXJWYWx1ZShfcmVnaXN0ZXIpIHtcbiAgdGhpcy5yZWdpc3RlciA9IF9yZWdpc3RlcjtcbiAgdGhpcy5lbXVsYXRvciA9IF9yZWdpc3Rlci5lbXVsYXRvcjtcbn1cblJlZ2lzdGVyVmFsdWUucHJvdG90eXBlLmdldEEgPSBSZWdpc3RlclZhbHVlLnByb3RvdHlwZS5nZXRCID0gUmVnaXN0ZXJWYWx1ZS5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmVtdWxhdG9yLlJBTVt0aGlzLnJlZ2lzdGVyLmdldCgpXSB8fCAwO1xufVxuUmVnaXN0ZXJWYWx1ZS5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24odmFsKSB7XG4gIHRoaXMuZW11bGF0b3IuUkFNW3RoaXMucmVnaXN0ZXIuZ2V0KCldID0gdmFsO1xufVxuXG5mdW5jdGlvbiBSZWdpc3RlclBsdXNOZXh0V29yZChfcmVnaXN0ZXIpIHtcbiAgdGhpcy5yZWdpc3RlciA9IF9yZWdpc3RlcjtcbiAgdGhpcy5lbXVsYXRvciA9IF9yZWdpc3Rlci5lbXVsYXRvcjtcbiAgdGhpcy5jYWNoZWRSZXN1bHQgPSBudWxsO1xufVxuUmVnaXN0ZXJQbHVzTmV4dFdvcmQucHJvdG90eXBlLmdldEIgPSBSZWdpc3RlclBsdXNOZXh0V29yZC5wcm90b3R5cGUuZ2V0QSA9IFJlZ2lzdGVyUGx1c05leHRXb3JkLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbigpIHtcbiAgdmFyIG53ID0gdGhpcy5lbXVsYXRvci5uZXh0V29yZCgpO1xuICBpZihudyA9PSAweGZmZmYpIG53ID0gLTE7ICAvLyBUT0RPOiB3aHkgaXMgdGhpcyBsaWtlIHRoaXM/Pz8/IChyZXF1aXJlZCBmb3IgJzk5IGJvdHRsZXMnIHRvIHdvcmsuLi4pXG4gIHRoaXMuY2FjaGVkUmVzdWx0ID0gdGhpcy5yZWdpc3Rlci5nZXQoKSArIG53O1xuICByZXR1cm4gdGhpcy5lbXVsYXRvci5SQU1bdGhpcy5jYWNoZWRSZXN1bHRdIHx8IDA7XG59XG5SZWdpc3RlclBsdXNOZXh0V29yZC5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24odmFsKSB7XG4gIHRoaXMuZW11bGF0b3IuUkFNW3RoaXMuY2FjaGVkUmVzdWx0XSA9IHZhbDtcbn1cblxuXG5mdW5jdGlvbiBTdGFja1BvaW50ZXJWYWx1ZShfZW11bGF0b3IpIHtcbiAgdGhpcy5lbXVsYXRvciA9IF9lbXVsYXRvclxufVxuU3RhY2tQb2ludGVyVmFsdWUucHJvdG90eXBlLmdldCA9IFN0YWNrUG9pbnRlclZhbHVlLnByb3RvdHlwZS5nZXRCID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmVtdWxhdG9yLlJlZ2lzdGVycy5TUC5nZXQoKTtcbn1cblxuU3RhY2tQb2ludGVyVmFsdWUucHJvdG90eXBlLmdldEEgPSAgZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmVtdWxhdG9yLlJlZ2lzdGVycy5TUC5wb3AoKTtcbn1cblN0YWNrUG9pbnRlclZhbHVlLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbih2YWwpIHtcbiAgdGhpcy5lbXVsYXRvci5SZWdpc3RlcnMuU1AucHVzaCh2YWwpO1xufVxuXG5mdW5jdGlvbiBMaXRlcmFsKF92YWx1ZSkge1xuICB0aGlzLnZhbHVlID0gX3ZhbHVlO1xufVxuTGl0ZXJhbC5wcm90b3R5cGUuZ2V0QSA9IExpdGVyYWwucHJvdG90eXBlLmdldEIgPSBMaXRlcmFsLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXMudmFsdWU7IH1cbkxpdGVyYWwucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uKHZhbCkgeyAgfVxubGV0IExpdGVyYWxzID0geyB9O1xuXG5mdW5jdGlvbiBPcChfZW11bGF0b3IsIF9uYW1lLCBfdmFsdWUsIF9jeWNsZXMsIF9fZXhlYywgX3NldCkge1xuICB0aGlzLmVtdWxhdG9yID0gX2VtdWxhdG9yO1xuICB0aGlzLm5hbWUgPSBfbmFtZTtcbiAgdGhpcy52YWx1ZSA9IF92YWx1ZTtcbiAgdGhpcy5jeWNsZXMgPSBfY3ljbGVzO1xuICB0aGlzLl9leGVjID0gX19leGVjO1xuICBfc2V0ID0gX3NldCB8fCB0aGlzLmVtdWxhdG9yLk9wU2V0O1xuICBfc2V0W3RoaXMudmFsdWVdID0gdGhpcztcbn1cbk9wLnByb3RvdHlwZS5leGVjID0gZnVuY3Rpb24oYSwgYikge1xuICB2YXIgdmFsQSA9IHRoaXMuZW11bGF0b3IuZ2V0UGFyYW1WYWx1ZShhKTtcbiAgdmFyIHZhbEIgPSB0aGlzLmVtdWxhdG9yLmdldFBhcmFtVmFsdWUoYik7XG5cbiAgaWYoIXZhbEEpIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgJ2EnIHZhbHVlIFwiICsgYSk7XG4gIGlmKCF2YWxCKSB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkICdiJyB2YWx1ZSBcIiArIGIpO1xuXG4gIHRoaXMuX2V4ZWModmFsQSwgdmFsQik7XG4gIHRoaXMuZW11bGF0b3IuQ1BVX0NZQ0xFICs9IHRoaXMuY3ljbGVzO1xufTtcblxuLy8gbGl0ZXJhbHNcbmZvcih2YXIgaSA9IDB4MjAsIGxpdGVyYWxWYWwgPSAtMTsgaSA8IDB4NDA7IGkrKywgbGl0ZXJhbFZhbCsrKSB7XG4gIExpdGVyYWxzW1wiTF9cIiArIGxpdGVyYWxWYWxdID0gaTtcbn1cblxuLy8gY29udmVuaWVuY2UgY29uc3RhbnRzXG5sZXQgVmFsdWVzID0geyB9O1xuVmFsdWVzLlJFR0lTVEVSX1ZBTFVFX09GRlNFVCA9IDB4MDg7XG5WYWx1ZXMuUkVHSVNURVJfTkVYVF9XT1JEX09GRlNFVCA9IDB4MTA7XG5WYWx1ZXMuU1BfT0ZGU0VUID0gMHgxODtcblZhbHVlcy5ORVhUX1dPUkRfVkFMVUUgPSAweDFlO1xuVmFsdWVzLk5FWFRfV09SRF9MSVRFUkFMID0gMHgxZjtcblZhbHVlcy5TUCA9IDB4MWI7XG5WYWx1ZXMuUEMgPSAweDFjO1xuVmFsdWVzLkVYID0gMHgxZDtcblxubGV0IFJFR0lTVEVSX0EgPSAweDAwO1xubGV0IFJFR0lTVEVSX0IgPSAweDAxO1xubGV0IFJFR0lTVEVSX0MgPSAweDAyO1xubGV0IFJFR0lTVEVSX1ggPSAweDAzO1xubGV0IFJFR0lTVEVSX1kgPSAweDA0O1xubGV0IFJFR0lTVEVSX1ogPSAweDA1O1xubGV0IFJFR0lTVEVSX0kgPSAweDA2O1xubGV0IFJFR0lTVEVSX0ogPSAweDA3O1xubGV0IFJFR0lTVEVSX1NQID0gMHgxYjtcbmxldCBSRUdJU1RFUl9QQyA9IDB4MWM7XG5sZXQgUkVHSVNURVJfRVggPSAweDFkO1xuXG5sZXQgT1BFUkFUSU9OX1NFVCA9IDB4MDE7XG5sZXQgT1BFUkFUSU9OX0FERCA9IDB4MDI7XG5sZXQgT1BFUkFUSU9OX1NVQiA9IDB4MDM7XG5sZXQgT1BFUkFUSU9OX01VTCA9IDB4MDQ7XG5sZXQgT1BFUkFUSU9OX01MSSA9IDB4MDU7XG5sZXQgT1BFUkFUSU9OX0RJViA9IDB4MDY7XG5sZXQgT1BFUkFUSU9OX0RWSSA9IDB4MDc7XG5sZXQgT1BFUkFUSU9OX01PRCA9IDB4MDg7XG5sZXQgT1BFUkFUSU9OX01ESSA9IDB4MDk7XG5sZXQgT1BFUkFUSU9OX0FORCA9IDB4MGE7XG5sZXQgT1BFUkFUSU9OX0JPUiA9IDB4MGI7XG5sZXQgT1BFUkFUSU9OX1hPUiA9IDB4MGM7XG5sZXQgT1BFUkFUSU9OX1NIUiA9IDB4MGQ7XG5sZXQgT1BFUkFUSU9OX0FTUiA9IDB4MGU7XG5sZXQgT1BFUkFUSU9OX1NITCA9IDB4MGY7XG5cbmxldCBPUEVSQVRJT05fSUZCID0gMHgxMDtcbmxldCBPUEVSQVRJT05fSUZDID0gMHgxMTtcbmxldCBPUEVSQVRJT05fSUZFID0gMHgxMjtcbmxldCBPUEVSQVRJT05fSUZOID0gMHgxMztcbmxldCBPUEVSQVRJT05fSUZHID0gMHgxNDtcbmxldCBPUEVSQVRJT05fSUZBID0gMHgxNTtcbmxldCBPUEVSQVRJT05fSUZMID0gMHgxNjtcbmxldCBPUEVSQVRJT05fSUZVID0gMHgxNztcblxubGV0IE9QRVJBVElPTl9BRFggPSAweDFhO1xubGV0IE9QRVJBVElPTl9TQlggPSAweDFiO1xuXG5sZXQgT1BFUkFUSU9OX1NUSSA9IDB4MWU7XG5sZXQgT1BFUkFUSU9OX1NURCA9IDB4MWY7XG5cbmxldCBPUEVSQVRJT05fSlNSID0gMHgwMTtcbmxldCBPUEVSQVRJT05fSU5UID0gMHgwODtcbmxldCBPUEVSQVRJT05fSUFHID0gMHgwOTtcbmxldCBPUEVSQVRJT05fSUFTID0gMHgwYTtcbmxldCBPUEVSQVRJT05fUkZJID0gMHgwYjtcbmxldCBPUEVSQVRJT05fSUFRID0gMHgwYztcblxubGV0IE9QRVJBVElPTl9IV04gPSAweDEwO1xubGV0IE9QRVJBVElPTl9IV1EgPSAweDExO1xubGV0IE9QRVJBVElPTl9IV0kgPSAweDEyO1xuXG5cblxubGV0IFV0aWxzID0ge1xuICB0bzMyQml0U2lnbmVkOiBmdW5jdGlvbih2YWwpIHtcbiAgICBpZigodmFsICYgMHg4MDAwKSA+IDApIHtcbiAgICAgIHJldHVybiAoKCh+dmFsKSArIDEpICYgMHhmZmZmKSAqIC0xOyAgLy8gdHdvJ3MgY29tcGxlbWVudFxuICAgIH1cbiAgICByZXR1cm4gdmFsO1xuICB9LFxuXG4gIHRvMTZCaXRTaWduZWQ6IGZ1bmN0aW9uKHZhbCkge1xuICAgIGlmKHZhbCA8IDApIHtcbiAgICAgIC8vcmV0dXJuICgofnZhbCkgKyAxKSAmIDB4ZmZmZjsgIC8vIHR3bydzIGNvbXBsZW1lbnRcbiAgICAgIHJldHVybiAoKHZhbCAmIDB4N2ZmZikgfCAweDgwMDApO1xuICAgIH1cbiAgICByZXR1cm4gdmFsICYgMHhmZmZmO1xuICB9LFxuXG4gIGJ5dGVUbzMyQml0U2lnbmVkOiBmdW5jdGlvbih2YWwpIHtcbiAgICBpZigodmFsICYgMHg4MCkgPiAwKSB7XG4gICAgICByZXR1cm4gKCgofnZhbCkgKyAxKSAmIDB4ZmYpICogLTE7ICAvLyB0d28ncyBjb21wbGVtZW50XG4gICAgfVxuICAgIHJldHVybiB2YWw7XG4gIH0sXG5cbiAgcm91bmRUb3dhcmRzWmVybzogZnVuY3Rpb24odmFsKSB7XG4gICAgaWYodmFsIDwgMClcbiAgICAgIHZhbCA9IE1hdGguY2VpbCh2YWwpO1xuICAgIGVsc2VcbiAgICAgIHZhbCA9IE1hdGguZmxvb3IodmFsKTtcbiAgICByZXR1cm4gdmFsO1xuICB9LFxuXG4gIG1ha2VJbnN0cnVjdGlvbjogZnVuY3Rpb24ob3Bjb2RlLCBhLCBiKSB7XG4gICAgdmFyIGluc3RydWN0aW9uID0gb3Bjb2RlO1xuICAgIGluc3RydWN0aW9uIHw9IChiIDw8IDUpO1xuICAgIGluc3RydWN0aW9uIHw9IChhIDw8IDEwKTtcbiAgICByZXR1cm4gaW5zdHJ1Y3Rpb247XG4gIH0sXG5cbiAgbWFrZVNwZWNpYWxJbnN0cnVjdGlvbjogZnVuY3Rpb24ob3Bjb2RlLCBhKSB7XG4gICAgdmFyIGluc3RydWN0aW9uID0gMDtcbiAgICBpbnN0cnVjdGlvbiB8PSAoYSA8PCAxMCk7XG4gICAgaW5zdHJ1Y3Rpb24gfD0gKG9wY29kZSA8PCA1KTtcbiAgICByZXR1cm4gaW5zdHJ1Y3Rpb247XG4gIH0sXG5cbiAgcGFyc2VJbnN0cnVjdGlvbjogZnVuY3Rpb24oaW5zdHJ1Y3Rpb24pIHtcbiAgICByZXR1cm4ge1xuICAgICAgb3Bjb2RlOiBpbnN0cnVjdGlvbiAmIDB4MDAxZixcbiAgICAgIGI6IChpbnN0cnVjdGlvbiAmIDB4MDNlMCkgPj4gNSxcbiAgICAgIGE6IChpbnN0cnVjdGlvbiAmIDB4ZmMwMCkgPj4gMTBcbiAgICB9XG4gIH0sXG5cbiAgcGFyc2VTcGVjaWFsSW5zdHJ1Y3Rpb246IGZ1bmN0aW9uKGluc3RydWN0aW9uKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGE6IChpbnN0cnVjdGlvbiAmIDB4ZmMwMCkgPj4gMTAsXG4gICAgICBvcGNvZGU6IChpbnN0cnVjdGlvbiAmIDB4MDNlMCkgPj4gNSxcbiAgICAgIGI6IDBcbiAgICB9XG4gIH0sXG5cbiAgaGV4OiBmdW5jdGlvbihudW0pIHtcbiAgICByZXR1cm4gXCIweFwiICsgVXRpbHMudG8xNkJpdFNpZ25lZChudW0pLnRvU3RyaW5nKDE2KTtcbiAgfSxcblxuICBoZXgyOiBmdW5jdGlvbihudW0pIHtcbiAgICAvL3ZhciBzdHIgPSBVdGlscy50bzE2Qml0U2lnbmVkKG51bSkudG9TdHJpbmcoMTYpO1xuICAgIHZhciBzdHIgPSAobnVtKS50b1N0cmluZygxNik7XG4gICAgcmV0dXJuIFwiMHhcIiArIFwiMDAwMFwiLnN1YnN0cihzdHIubGVuZ3RoKSArIHN0cjtcbiAgfSxcblxuICBtYWtlVmlkZW9DZWxsOiBmdW5jdGlvbihnbHlwaCwgYmxpbmssIGJnLCBmZykge1xuICAgIHZhciByZXN1bHQgPSBnbHlwaCAmIDB4N2Y7XG4gICAgcmVzdWx0IHw9IChibGluayAmIDB4MSkgPDwgNztcbiAgICByZXN1bHQgfD0gKGJnICYgMHhmKSA8PCA4O1xuICAgIHJlc3VsdCB8PSAoZmcgJiAweGYpIDw8IDEyO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH0sXG5cbiAgY29sb3IxNlRvMzI6IGZ1bmN0aW9uKGMpIHtcbiAgICB2YXIgciA9ICgoKGMgJiAweGYwMCkgPj4gOCkgKiAxNikgPDwgMTY7XG4gICAgdmFyIGcgPSAoKChjICYgMHgwZjApID4+IDQpICogMTYpIDw8IDg7XG4gICAgdmFyIGIgPSAoYyAmIDB4MDBmKSAqIDE2O1xuICAgIHJldHVybiBVdGlscy5tYWtlQ29sb3IociB8IGcgfCBiKTtcblxuICB9LFxuXG4gIG1ha2VDb2xvcjogZnVuY3Rpb24oZCkge1xuICAgIHZhciBoZXggPSBOdW1iZXIoZCkudG9TdHJpbmcoMTYpO1xuICAgIGhleCA9IFwiMDAwMDAwXCIuc3Vic3RyKDAsIDYgLSBoZXgubGVuZ3RoKSArIGhleDtcbiAgICByZXR1cm4gXCIjXCIgKyBoZXg7XG4gIH0sXG5cbiAgY3JlYXRlSW1hZ2U6IGZ1bmN0aW9uKHNyYykge1xuICAgIHZhciBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICBpbWcuc3JjID0gc3JjO1xuICAgIHJldHVybiBpbWc7XG4gIH1cblxufTtcblxubGV0IFNwZWVkcyA9IHtcbiAgXCIxMDAga0h6XCI6IHsgXCJkZWxheUZyZXF1ZW5jeVwiOiAxMDAwLCBcImRlbGF5VGltZVwiOiAxIH0sXG4gIFwiMTAga0h6XCI6IHsgXCJkZWxheUZyZXF1ZW5jeVwiOiA1MCwgXCJkZWxheVRpbWVcIjogMSB9LFxuICBcIjEga0h6XCI6IHsgXCJkZWxheUZyZXF1ZW5jeVwiOiAxMCwgXCJkZWxheVRpbWVcIjogMTAgfSxcbiAgXCIxMDAgSHpcIjogeyBcImRlbGF5RnJlcXVlbmN5XCI6IDEwLCBcImRlbGF5VGltZVwiOiAxMDAgfSxcbiAgXCIxMCBIelwiOiB7IFwiZGVsYXlGcmVxdWVuY3lcIjogMSwgXCJkZWxheVRpbWVcIjogMTAwIH0sXG59O1xuXG4vKipcbiAqIEVtdWxhdG9yIGNvbnN0cnVjdG9yLlxuICpcbiAqIEBjb25zdHJ1Y3RvclxuICogQHRoaXMge0VtdWxhdG9yfVxuICovXG5mdW5jdGlvbiBFbXVsYXRvcigpIHtcblxuICB0aGlzLmFzeW5jID0gdHJ1ZTtcbiAgdGhpcy52ZXJib3NlID0gZmFsc2U7XG4gIHRoaXMuY3VycmVudFNwZWVkID0gU3BlZWRzW1wiMTAwIGtIelwiXTtcblxuICB0aGlzLkNQVV9DWUNMRSA9IDA7XG4gIHRoaXMuUkFNID0gW107XG5cbiAgdGhpcy5PcFNldCA9IHsgfTtcbiAgdGhpcy5TcGVjaWFsT3BTZXQgPSB7IH07XG4gIHRoaXMuUmVnaXN0ZXJzID0ge1xuICAgIEE6IG5ldyBSZWdpc3RlcihcIkFcIiwgUkVHSVNURVJfQSwgdGhpcyksXG4gICAgQjogbmV3IFJlZ2lzdGVyKFwiQlwiLCBSRUdJU1RFUl9CLCB0aGlzKSxcbiAgICBDOiBuZXcgUmVnaXN0ZXIoXCJDXCIsIFJFR0lTVEVSX0MsIHRoaXMpLFxuICAgIFg6IG5ldyBSZWdpc3RlcihcIlhcIiwgUkVHSVNURVJfWCwgdGhpcyksXG4gICAgWTogbmV3IFJlZ2lzdGVyKFwiWVwiLCBSRUdJU1RFUl9ZLCB0aGlzKSxcbiAgICBaOiBuZXcgUmVnaXN0ZXIoXCJaXCIsIFJFR0lTVEVSX1osIHRoaXMpLFxuICAgIEk6IG5ldyBSZWdpc3RlcihcIklcIiwgUkVHSVNURVJfSSwgdGhpcyksXG4gICAgSjogbmV3IFJlZ2lzdGVyKFwiSlwiLCBSRUdJU1RFUl9KLCB0aGlzKSxcbiAgICBTUDogbmV3IFJlZ2lzdGVyKFwiU1BcIiwgUkVHSVNURVJfU1AsIHRoaXMpLFxuICAgIFBDOiBuZXcgUmVnaXN0ZXIoXCJQQ1wiLCBSRUdJU1RFUl9QQywgdGhpcyksXG4gICAgRVg6IG5ldyBSZWdpc3RlcihcIkVYXCIsIFJFR0lTVEVSX0VYLCB0aGlzKSxcbiAgICBJQTogbmV3IFJlZ2lzdGVyKFwiSUFcIiwgMHhmZmZmLCB0aGlzKSxcbiAgfTtcblxuXG4gIHRoaXMuUmVnaXN0ZXJzLlBDLmluYyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciB2ID0gdGhpcy5nZXQoKTtcbiAgICB0aGlzLnNldCh2KzEpO1xuICAgIHJldHVybiB2O1xuICB9O1xuICB0aGlzLlBDID0gdGhpcy5SZWdpc3RlcnMuUEM7XG5cbiAgdGhpcy5SZWdpc3RlcnMuU1AucHVzaCA9IGZ1bmN0aW9uKHZhbCkge1xuICAgIHRoaXMuY29udGVudHMgPSAgVXRpbHMudG8xNkJpdFNpZ25lZCh0aGlzLmNvbnRlbnRzIC0gMSk7XG4gICAgdGhpcy5lbXVsYXRvci5SQU1bdGhpcy5jb250ZW50c10gPSB2YWw7XG4gIH07XG4gIHRoaXMuUmVnaXN0ZXJzLlNQLnBvcCA9IGZ1bmN0aW9uKCkge1xuICAgIGlmKHRoaXMuY29udGVudHMgPT0gMClcbiAgICAgIGNvbnNvbGUubG9nKFwiV2FybmluZzogc3RhY2sgdW5kZXJmbG93XCIpO1xuXG4gICAgdmFyIHZhbCA9IHRoaXMuZW11bGF0b3IuUkFNW3RoaXMuY29udGVudHNdIHx8IDA7XG4gICAgdGhpcy5lbXVsYXRvci5SQU1bdGhpcy5jb250ZW50c10gPSAwOyAgLy8gVE9ETzogc2hvdWxkIHRoZSBlbXVhbHRvciBhbHRlciB0aGUgbWVtb3J5IGxvY2F0aW9uIHdoZW4gaXQgaXMgUE9QZWQ/XG4gICAgdGhpcy5jb250ZW50cyA9ICh0aGlzLmNvbnRlbnRzICsgMSkgJiAweGZmZmY7XG4gICAgcmV0dXJuIHZhbDtcbiAgfTtcblxuXG4gIHRoaXMuVmFsdWVzID0geyB9XG4gIHRoaXMuVmFsdWVzWzB4MDBdID0gdGhpcy5SZWdpc3RlcnMuQTtcbiAgdGhpcy5WYWx1ZXNbMHgwMV0gPSB0aGlzLlJlZ2lzdGVycy5CO1xuICB0aGlzLlZhbHVlc1sweDAyXSA9IHRoaXMuUmVnaXN0ZXJzLkM7XG4gIHRoaXMuVmFsdWVzWzB4MDNdID0gdGhpcy5SZWdpc3RlcnMuWDtcbiAgdGhpcy5WYWx1ZXNbMHgwNF0gPSB0aGlzLlJlZ2lzdGVycy5ZO1xuICB0aGlzLlZhbHVlc1sweDA1XSA9IHRoaXMuUmVnaXN0ZXJzLlo7XG4gIHRoaXMuVmFsdWVzWzB4MDZdID0gdGhpcy5SZWdpc3RlcnMuSTtcbiAgdGhpcy5WYWx1ZXNbMHgwN10gPSB0aGlzLlJlZ2lzdGVycy5KO1xuICB0aGlzLlZhbHVlc1sweDA4XSA9IG5ldyBSZWdpc3RlclZhbHVlKHRoaXMuUmVnaXN0ZXJzLkEpO1xuICB0aGlzLlZhbHVlc1sweDA5XSA9IG5ldyBSZWdpc3RlclZhbHVlKHRoaXMuUmVnaXN0ZXJzLkIpO1xuICB0aGlzLlZhbHVlc1sweDBhXSA9IG5ldyBSZWdpc3RlclZhbHVlKHRoaXMuUmVnaXN0ZXJzLkMpO1xuICB0aGlzLlZhbHVlc1sweDBiXSA9IG5ldyBSZWdpc3RlclZhbHVlKHRoaXMuUmVnaXN0ZXJzLlgpO1xuICB0aGlzLlZhbHVlc1sweDBjXSA9IG5ldyBSZWdpc3RlclZhbHVlKHRoaXMuUmVnaXN0ZXJzLlkpO1xuICB0aGlzLlZhbHVlc1sweDBkXSA9IG5ldyBSZWdpc3RlclZhbHVlKHRoaXMuUmVnaXN0ZXJzLlopO1xuICB0aGlzLlZhbHVlc1sweDBlXSA9IG5ldyBSZWdpc3RlclZhbHVlKHRoaXMuUmVnaXN0ZXJzLkkpO1xuICB0aGlzLlZhbHVlc1sweDBmXSA9IG5ldyBSZWdpc3RlclZhbHVlKHRoaXMuUmVnaXN0ZXJzLkopO1xuICB0aGlzLlZhbHVlc1sweDEwXSA9IG5ldyBSZWdpc3RlclBsdXNOZXh0V29yZCh0aGlzLlJlZ2lzdGVycy5BKTtcbiAgdGhpcy5WYWx1ZXNbMHgxMV0gPSBuZXcgUmVnaXN0ZXJQbHVzTmV4dFdvcmQodGhpcy5SZWdpc3RlcnMuQik7XG4gIHRoaXMuVmFsdWVzWzB4MTJdID0gbmV3IFJlZ2lzdGVyUGx1c05leHRXb3JkKHRoaXMuUmVnaXN0ZXJzLkMpO1xuICB0aGlzLlZhbHVlc1sweDEzXSA9IG5ldyBSZWdpc3RlclBsdXNOZXh0V29yZCh0aGlzLlJlZ2lzdGVycy5YKTtcbiAgdGhpcy5WYWx1ZXNbMHgxNF0gPSBuZXcgUmVnaXN0ZXJQbHVzTmV4dFdvcmQodGhpcy5SZWdpc3RlcnMuWSk7XG4gIHRoaXMuVmFsdWVzWzB4MTVdID0gbmV3IFJlZ2lzdGVyUGx1c05leHRXb3JkKHRoaXMuUmVnaXN0ZXJzLlopO1xuICB0aGlzLlZhbHVlc1sweDE2XSA9IG5ldyBSZWdpc3RlclBsdXNOZXh0V29yZCh0aGlzLlJlZ2lzdGVycy5JKTtcbiAgdGhpcy5WYWx1ZXNbMHgxN10gPSBuZXcgUmVnaXN0ZXJQbHVzTmV4dFdvcmQodGhpcy5SZWdpc3RlcnMuSik7XG4gIHRoaXMuVmFsdWVzWzB4MThdID0gbmV3IFN0YWNrUG9pbnRlclZhbHVlKHRoaXMpO1xuICB0aGlzLlZhbHVlc1sweDE5XSA9IG5ldyBSZWdpc3RlclZhbHVlKHRoaXMuUmVnaXN0ZXJzLlNQKTtcbiAgdGhpcy5WYWx1ZXNbMHgxYV0gPSBuZXcgUmVnaXN0ZXJQbHVzTmV4dFdvcmQodGhpcy5SZWdpc3RlcnMuU1ApO1xuICB0aGlzLlZhbHVlc1sweDFiXSA9IHRoaXMuUmVnaXN0ZXJzLlNQO1xuICB0aGlzLlZhbHVlc1sweDFjXSA9IHRoaXMuUmVnaXN0ZXJzLlBDO1xuICB0aGlzLlZhbHVlc1sweDFkXSA9IHRoaXMuUmVnaXN0ZXJzLkVYO1xuICB0aGlzLlZhbHVlc1sweDFlXSA9IHsgLy8gbmV4dCB3b3JkIHZhbHVlXG4gICAgZW11bGF0b3I6IHRoaXMsXG4gICAgZ2V0QTogZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzLmdldCgpOyB9LFxuICAgIGdldEI6IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpcy5nZXQoKTsgfSxcbiAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5jYWNoZWRSZXN1bHQgPSB0aGlzLmVtdWxhdG9yLm5leHRXb3JkKCk7XG4gICAgICByZXR1cm4gdGhpcy5lbXVsYXRvci5SQU1bdGhpcy5jYWNoZWRSZXN1bHRdIHx8IDA7XG4gICAgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uKHZhbCkge1xuICAgICAgdGhpcy5lbXVsYXRvci5SQU1bdGhpcy5jYWNoZWRSZXN1bHRdID0gdmFsO1xuICAgIH1cbiAgfTtcbiAgdGhpcy5WYWx1ZXNbMHgxZl0gPSB7IC8vIG5leHQgd29yZCBsaXRlcmFsXG4gICAgZW11bGF0b3I6IHRoaXMsXG4gICAgZ2V0QTogZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzLmdldCgpOyB9LFxuICAgIGdldEI6IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpcy5nZXQoKTsgfSxcbiAgICBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpcy5lbXVsYXRvci5uZXh0V29yZCgpOyB9LFxuICAgIHNldDogZnVuY3Rpb24odmFsKSB7IH1cbiAgfTtcblxuICB0aGlzLlZhbHVlc1sweDIwXSA9IG5ldyBMaXRlcmFsKDB4ZmZmZik7ICAvLyAtMVxuICBmb3IodmFyIGkgPSAweDIxLCBsaXRlcmFsVmFsID0gMDsgaSA8IDB4NDA7IGkrKywgbGl0ZXJhbFZhbCsrKSB7XG4gICAgdGhpcy5WYWx1ZXNbaV0gPSBuZXcgTGl0ZXJhbChsaXRlcmFsVmFsKTtcbiAgfVxuXG5cbiAgdGhpcy5CYXNpY09wZXJhdGlvbnMgPSB7XG4gICAgU0VUOiBuZXcgT3AodGhpcywgXCJTRVRcIiwgT1BFUkFUSU9OX1NFVCwgMSwgZnVuY3Rpb24oYSwgYikge1xuICAgICAgdmFyIGFWYWwgPSBhLmdldEEoKSwgYlZhbCA9IGIuZ2V0QigpO1xuICAgICAgYi5zZXQoYVZhbCk7XG5cbiAgICAgIC8vIFRPRE86IHNvbWUgYXBwbGljYXRpb25zIGFzc3VtZSB0aGF0IHNldHRpbmcgUEMgdG8gaXRzZWxmIHNob3VsZCB0ZXJtaW5hdGUgdGhlIGFwcGxpY2F0aW9uXG4gICAgICAvL2lmKGEgPT0gdGhpcy5lbXVsYXRvci5SZWdpc3RlcnMuUEMgJiYgYiA9PSB0aGlzLmVtdWxhdG9yLlJlZ2lzdGVycy5QQykge1xuICAgICAgLy8gIHRoaXMuZW11bGF0b3IuUmVnaXN0ZXJzLlBDLmNvbnRlbnRzID0gTnVtYmVyLk1BWF9WQUxVRTtcbiAgICAgIC8vfVxuICAgIH0pLFxuXG4gICAgQUREOiBuZXcgT3AodGhpcywgXCJBRERcIiwgT1BFUkFUSU9OX0FERCwgMiwgZnVuY3Rpb24oYSwgYikge1xuICAgICAgdmFyIHJlcyA9IGEuZ2V0QSgpICsgYi5nZXRCKCk7XG4gICAgICBpZigocmVzICYgMHhmZmZmMDAwMCkgPiAwKVxuICAgICAgICB0aGlzLmVtdWxhdG9yLlJlZ2lzdGVycy5FWC5zZXQoMHgwMDAxKTtcbiAgICAgIGVsc2VcbiAgICAgICAgdGhpcy5lbXVsYXRvci5SZWdpc3RlcnMuRVguc2V0KDApO1xuICAgICAgYi5zZXQocmVzICYgMHhmZmZmKTtcbiAgICB9KSxcblxuICAgIFNVQjogbmV3IE9wKHRoaXMsIFwiU1VCXCIsIE9QRVJBVElPTl9TVUIsIDIsIGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgIHZhciBhVmFsID0gYS5nZXRBKCk7XG4gICAgICB2YXIgcmVzID0gYi5nZXRCKCkgLSBhVmFsO1xuICAgICAgaWYoKHJlcykgPCAwKVxuICAgICAgICB0aGlzLmVtdWxhdG9yLlJlZ2lzdGVycy5FWC5zZXQoMHhmZmZmKTtcbiAgICAgIGVsc2VcbiAgICAgICAgdGhpcy5lbXVsYXRvci5SZWdpc3RlcnMuRVguc2V0KDApO1xuICAgICAgYi5zZXQocmVzICYgMHhmZmZmKTtcblxuICAgIH0pLFxuXG4gICAgTVVMOiBuZXcgT3AodGhpcywgXCJNVUxcIiwgT1BFUkFUSU9OX01VTCwgMiwgZnVuY3Rpb24oYSwgYikge1xuICAgICAgdmFyIHJlcyA9IGEuZ2V0QSgpICogYi5nZXRCKCk7XG4gICAgICB0aGlzLmVtdWxhdG9yLlJlZ2lzdGVycy5FWC5zZXQoKHJlcyA+PiAxNikgJiAweGZmZmYpO1xuICAgICAgYi5zZXQocmVzICYgMHhmZmZmKTtcbiAgICB9KSxcblxuICAgIE1MSTogbmV3IE9wKHRoaXMsIFwiTUxJXCIsIE9QRVJBVElPTl9NTEksIDIsIGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgIHZhciBhVmFsID0gVXRpbHMudG8zMkJpdFNpZ25lZChhLmdldEEoKSksIGJWYWwgPSBVdGlscy50bzMyQml0U2lnbmVkKGIuZ2V0QigpKTtcbiAgICAgIHZhciByZXMgPSBiVmFsICogYVZhbDtcbiAgICAgIHRoaXMuZW11bGF0b3IuUmVnaXN0ZXJzLkVYLnNldCgocmVzID4+IDE2KSAmIDB4ZmZmZik7XG4gICAgICBiLnNldChVdGlscy50bzE2Qml0U2lnbmVkKHJlcykpO1xuICAgIH0pLFxuXG4gICAgRElWOiBuZXcgT3AodGhpcywgXCJESVZcIiwgT1BFUkFUSU9OX0RJViwgMywgZnVuY3Rpb24oYSwgYikge1xuICAgICAgdmFyIGFWYWwgPSBhLmdldEEoKSwgYlZhbCA9IGIuZ2V0QigpO1xuICAgICAgaWYoYVZhbCA9PT0gMCkge1xuICAgICAgICB0aGlzLmVtdWxhdG9yLlJlZ2lzdGVycy5FWC5zZXQoMCk7XG4gICAgICAgIGIuc2V0KDApO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHZhciByZXMgPSBNYXRoLmZsb29yKGJWYWwgLyBhVmFsKTtcbiAgICAgICAgdGhpcy5lbXVsYXRvci5SZWdpc3RlcnMuRVguc2V0KE1hdGguZmxvb3IoKChiVmFsIDw8IDE2KSAvIGFWYWwpKSAmIDB4ZmZmZik7XG4gICAgICAgIGIuc2V0KHJlcyAmIDB4ZmZmZik7XG4gICAgICB9XG4gICAgfSksXG5cbiAgICBEVkk6IG5ldyBPcCh0aGlzLCBcIkRWSVwiLCBPUEVSQVRJT05fRFZJLCAzLCBmdW5jdGlvbihhLCBiKSB7XG4gICAgICB2YXIgYVZhbCA9IFV0aWxzLnRvMzJCaXRTaWduZWQoYS5nZXRBKCkpLCBiVmFsID0gVXRpbHMudG8zMkJpdFNpZ25lZChiLmdldEIoKSk7XG4gICAgICBpZihhVmFsID09PSAwKSB7XG4gICAgICAgIHRoaXMuZW11bGF0b3IuUmVnaXN0ZXJzLkVYLnNldCgwKTtcbiAgICAgICAgYi5zZXQoMCk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgdmFyIHJlcyA9IFV0aWxzLnJvdW5kVG93YXJkc1plcm8oYlZhbCAvIGFWYWwpO1xuICAgICAgICB0aGlzLmVtdWxhdG9yLlJlZ2lzdGVycy5FWC5zZXQoVXRpbHMucm91bmRUb3dhcmRzWmVybygoKGJWYWwgPDwgMTYpIC8gYVZhbCkpICYgMHhmZmZmKTtcbiAgICAgICAgYi5zZXQoVXRpbHMudG8xNkJpdFNpZ25lZChyZXMpKTtcbiAgICAgIH1cbiAgICB9KSxcblxuICAgIE1PRDogbmV3IE9wKHRoaXMsIFwiTU9EXCIsIE9QRVJBVElPTl9NT0QsIDMsIGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgIHZhciBhVmFsID0gYS5nZXRBKCksIGJWYWwgPSBiLmdldEIoKTtcbiAgICAgIGlmKGFWYWwgPT09IDApXG4gICAgICAgIGIuc2V0KDApO1xuICAgICAgZWxzZVxuICAgICAgICBiLnNldChiVmFsICUgYVZhbCk7XG4gICAgfSksXG5cbiAgICBNREk6IG5ldyBPcCh0aGlzLCBcIk1ESVwiLCBPUEVSQVRJT05fTURJLCAzLCBmdW5jdGlvbihhLCBiKSB7XG4gICAgICB2YXIgYVZhbCA9IFV0aWxzLnRvMzJCaXRTaWduZWQoYS5nZXRBKCkpLCBiVmFsID0gVXRpbHMudG8zMkJpdFNpZ25lZChiLmdldEIoKSk7XG4gICAgICBpZihhVmFsID09PSAwKVxuICAgICAgICBiLnNldCgwKTtcbiAgICAgIGVsc2VcbiAgICAgICAgYi5zZXQoVXRpbHMudG8xNkJpdFNpZ25lZChiVmFsICUgYVZhbCkpO1xuICAgIH0pLFxuXG4gICAgQU5EOiBuZXcgT3AodGhpcywgXCJBTkRcIiwgT1BFUkFUSU9OX0FORCwgMSwgZnVuY3Rpb24oYSwgYikge1xuICAgICAgdmFyIGFWYWwgPSBhLmdldEEoKSwgYlZhbCA9IGIuZ2V0QigpO1xuICAgICAgYi5zZXQoYlZhbCAmIGFWYWwpO1xuICAgIH0pLFxuXG4gICAgQk9SOiBuZXcgT3AodGhpcywgXCJCT1JcIiwgT1BFUkFUSU9OX0JPUiwgMSwgZnVuY3Rpb24oYSwgYikge1xuICAgICAgdmFyIGFWYWwgPSBhLmdldEEoKSwgYlZhbCA9IGIuZ2V0QigpO1xuICAgICAgYi5zZXQoYlZhbCB8IGFWYWwpO1xuICAgIH0pLFxuXG4gICAgWE9SOiBuZXcgT3AodGhpcywgXCJYT1JcIiwgT1BFUkFUSU9OX1hPUiwgMSwgZnVuY3Rpb24oYSwgYikge1xuICAgICAgdmFyIGFWYWwgPSBhLmdldEEoKSwgYlZhbCA9IGIuZ2V0QigpO1xuICAgICAgYi5zZXQoYlZhbCBeIGFWYWwpO1xuICAgIH0pLFxuXG4gICAgU0hSOiBuZXcgT3AodGhpcywgXCJTSFJcIiwgT1BFUkFUSU9OX1NIUiwgMSwgZnVuY3Rpb24oYSwgYikge1xuICAgICAgdmFyIGFWYWwgPSBhLmdldEEoKSwgYlZhbCA9IGIuZ2V0QigpO1xuICAgICAgdGhpcy5lbXVsYXRvci5SZWdpc3RlcnMuRVguc2V0KCgoYlZhbCA8PCAxNiApID4+IGFWYWwpICYgMHhmZmZmKTtcbiAgICAgIGIuc2V0KGJWYWwgPj4+IGFWYWwpO1xuICAgIH0pLFxuXG4gICAgQVNSOiBuZXcgT3AodGhpcywgXCJBU1JcIiwgT1BFUkFUSU9OX0FTUiwgMSwgZnVuY3Rpb24oYSwgYikge1xuICAgICAgdmFyIGFWYWwgPSBhLmdldEEoKSwgYlZhbCA9IFV0aWxzLnRvMzJCaXRTaWduZWQoYi5nZXRCKCkpO1xuICAgICAgdGhpcy5lbXVsYXRvci5SZWdpc3RlcnMuRVguc2V0KCgoYlZhbCA8PCAxNikgPj4+IGFWYWwpICYgMHhmZmZmKTtcbiAgICAgIGIuc2V0KChiVmFsID4+IGFWYWwpICYgMHhmZmZmKTtcbiAgICB9KSxcblxuICAgIFNITDogbmV3IE9wKHRoaXMsIFwiU0hMXCIsIE9QRVJBVElPTl9TSEwsIDEsIGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgIHZhciBhVmFsID0gYS5nZXRBKCksIGJWYWwgPSBiLmdldEIoKTtcbiAgICAgIHRoaXMuZW11bGF0b3IuUmVnaXN0ZXJzLkVYLnNldCgoKGJWYWwgPDwgYVZhbCkgPj4gMTYpICYgMHhmZmZmKTtcbiAgICAgIGIuc2V0KChiVmFsIDw8IGFWYWwpICYgMHhmZmZmKTtcbiAgICB9KSxcblxuICAgIElGQjogbmV3IE9wKHRoaXMsIFwiSUZCXCIsIE9QRVJBVElPTl9JRkIsIDIsIGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgIHZhciBhVmFsID0gYS5nZXRBKCksIGJWYWwgPSBiLmdldEIoKTtcbiAgICAgIGlmKChiVmFsICYgYVZhbCkgIT0gMCkgeyB9XG4gICAgICBlbHNlIHRoaXMuZW11bGF0b3Iuc2tpcEluc3RydWN0aW9uKCk7XG5cbiAgICB9KSxcblxuICAgIElGQzogbmV3IE9wKHRoaXMsIFwiSUZDXCIsIE9QRVJBVElPTl9JRkMsIDIsIGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgIHZhciBhVmFsID0gYS5nZXRBKCksIGJWYWwgPSBiLmdldEIoKTtcbiAgICAgIGlmKChiVmFsICYgYVZhbCkgPT09IDApIHsgfVxuICAgICAgZWxzZSB0aGlzLmVtdWxhdG9yLnNraXBJbnN0cnVjdGlvbigpO1xuXG4gICAgfSksXG5cbiAgICBJRkU6IG5ldyBPcCh0aGlzLCBcIklGRVwiLCBPUEVSQVRJT05fSUZFLCAyLCBmdW5jdGlvbihhLCBiKSB7XG4gICAgICB2YXIgYVZhbCA9IGEuZ2V0QSgpLCBiVmFsID0gYi5nZXRCKCk7XG4gICAgICBpZihiVmFsID09PSBhVmFsKSB7IH1cbiAgICAgIGVsc2UgdGhpcy5lbXVsYXRvci5za2lwSW5zdHJ1Y3Rpb24oKTtcbiAgICB9KSxcblxuICAgIElGTjogbmV3IE9wKHRoaXMsIFwiSUZOXCIsIE9QRVJBVElPTl9JRk4sIDIsIGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgIHZhciBhVmFsID0gYS5nZXRBKCksIGJWYWwgPSBiLmdldEIoKTtcbiAgICAgIGlmKGJWYWwgIT09IGFWYWwpIHsgfVxuICAgICAgZWxzZSB0aGlzLmVtdWxhdG9yLnNraXBJbnN0cnVjdGlvbigpO1xuICAgIH0pLFxuXG4gICAgSUZHOiBuZXcgT3AodGhpcywgXCJJRkdcIiwgT1BFUkFUSU9OX0lGRywgMiwgZnVuY3Rpb24oYSwgYikge1xuICAgICAgdmFyIGFWYWwgPSBhLmdldEEoKSwgYlZhbCA9IGIuZ2V0QigpO1xuICAgICAgaWYoYlZhbCA+IGFWYWwpIHsgfVxuICAgICAgZWxzZSB0aGlzLmVtdWxhdG9yLnNraXBJbnN0cnVjdGlvbigpO1xuICAgIH0pLFxuXG4gICAgSUZBOiBuZXcgT3AodGhpcywgXCJJRkFcIiwgT1BFUkFUSU9OX0lGQSwgMiwgZnVuY3Rpb24oYSwgYikge1xuICAgICAgdmFyIGFWYWwgPSBVdGlscy50bzMyQml0U2lnbmVkKGEuZ2V0QSgpKSwgYlZhbCA9IFV0aWxzLnRvMzJCaXRTaWduZWQoYi5nZXRCKCkpO1xuICAgICAgaWYoYlZhbCA+IGFWYWwpIHsgfVxuICAgICAgZWxzZSB0aGlzLmVtdWxhdG9yLnNraXBJbnN0cnVjdGlvbigpO1xuICAgIH0pLFxuXG4gICAgSUZMOiBuZXcgT3AodGhpcywgXCJJRkxcIiwgT1BFUkFUSU9OX0lGTCwgMiwgZnVuY3Rpb24oYSwgYikge1xuICAgICAgdmFyIGFWYWwgPSBhLmdldEEoKSwgYlZhbCA9IGIuZ2V0QigpO1xuICAgICAgaWYoYlZhbCA8IGFWYWwpIHsgfVxuICAgICAgZWxzZSB0aGlzLmVtdWxhdG9yLnNraXBJbnN0cnVjdGlvbigpO1xuICAgIH0pLFxuXG4gICAgSUZVOiBuZXcgT3AodGhpcywgXCJJRlVcIiwgT1BFUkFUSU9OX0lGVSwgMiwgZnVuY3Rpb24oYSwgYikge1xuICAgICAgdmFyIGFWYWwgPSBVdGlscy50bzMyQml0U2lnbmVkKGEuZ2V0QSgpKSwgYlZhbCA9IFV0aWxzLnRvMzJCaXRTaWduZWQoYi5nZXRCKCkpO1xuICAgICAgaWYoYlZhbCA8IGFWYWwpIHsgfVxuICAgICAgZWxzZSB0aGlzLmVtdWxhdG9yLnNraXBJbnN0cnVjdGlvbigpO1xuICAgIH0pLFxuXG5cbiAgICBBRFg6IG5ldyBPcCh0aGlzLCBcIkFEWFwiLCBPUEVSQVRJT05fQURYLCAzLCBmdW5jdGlvbihhLCBiKSB7XG4gICAgICB2YXIgcmVzID0gYS5nZXRBKCkgKyBiLmdldEIoKSArIHRoaXMuZW11bGF0b3IuUmVnaXN0ZXJzLkVYLmdldCgpO1xuICAgICAgdGhpcy5lbXVsYXRvci5SZWdpc3RlcnMuRVguc2V0KHJlcyA+IDB4ZmZmZiA/IDEgOiAwKTtcbiAgICAgIGIuc2V0KHJlcyAmIDB4ZmZmZik7XG4gICAgfSksXG5cbiAgICBTQlg6IG5ldyBPcCh0aGlzLCBcIlNCWFwiLCBPUEVSQVRJT05fU0JYLCAzLCBmdW5jdGlvbihhLCBiKSB7XG4gICAgICB2YXIgYVZhbCA9IGEuZ2V0QSgpLCBiVmFsID0gYi5nZXRCKCk7XG4gICAgICB2YXIgcmVzID0gYlZhbCAtIGFWYWwgKyB0aGlzLmVtdWxhdG9yLlJlZ2lzdGVycy5FWC5nZXQoKTtcbiAgICAgIHRoaXMuZW11bGF0b3IuUmVnaXN0ZXJzLkVYLnNldChyZXMgPCAwID8gMHhmZmZmIDogMCk7XG4gICAgICBiLnNldChyZXMgJiAweGZmZmYpO1xuICAgIH0pLFxuXG4gICAgU1RJOiBuZXcgT3AodGhpcywgXCJTVElcIiwgT1BFUkFUSU9OX1NUSSwgMiwgZnVuY3Rpb24oYSwgYikge1xuICAgICAgdmFyIGFWYWwgPSBhLmdldEEoKSwgYlZhbCA9IGIuZ2V0QigpO1xuICAgICAgYi5zZXQoYVZhbCk7XG4gICAgICAvL2Euc2V0KGJWYWwpO1xuICAgICAgdGhpcy5lbXVsYXRvci5SZWdpc3RlcnMuSS5zZXQoKHRoaXMuZW11bGF0b3IuUmVnaXN0ZXJzLkkuZ2V0KCkgKyAxKSAmICAweGZmZmYpO1xuICAgICAgdGhpcy5lbXVsYXRvci5SZWdpc3RlcnMuSi5zZXQoKHRoaXMuZW11bGF0b3IuUmVnaXN0ZXJzLkouZ2V0KCkgKyAxKSAmICAweGZmZmYpO1xuICAgIH0pLFxuXG4gICAgU1REOiBuZXcgT3AodGhpcywgXCJTVERcIiwgT1BFUkFUSU9OX1NURCwgMiwgZnVuY3Rpb24oYSwgYikge1xuICAgICAgdmFyIGFWYWwgPSBhLmdldEEoKSwgYlZhbCA9IGIuZ2V0QigpO1xuICAgICAgYi5zZXQoYVZhbCk7XG4gICAgICAvL2Euc2V0KGJWYWwpO1xuICAgICAgdGhpcy5lbXVsYXRvci5SZWdpc3RlcnMuSS5zZXQoKHRoaXMuZW11bGF0b3IuUmVnaXN0ZXJzLkkuZ2V0KCkgLSAxKSAmICAweGZmZmYpO1xuICAgICAgdGhpcy5lbXVsYXRvci5SZWdpc3RlcnMuSi5zZXQoKHRoaXMuZW11bGF0b3IuUmVnaXN0ZXJzLkouZ2V0KCkgLSAxKSAmICAweGZmZmYpO1xuICAgIH0pLFxuXG4gICAgSlNSOiBuZXcgT3AodGhpcywgXCJKU1JcIiwgT1BFUkFUSU9OX0pTUiwgMywgZnVuY3Rpb24oYSkge1xuICAgICAgdmFyIGFWYWwgPSBhLmdldEEoKTtcbiAgICAgIHRoaXMuZW11bGF0b3IuUmVnaXN0ZXJzLlNQLnB1c2godGhpcy5lbXVsYXRvci5SZWdpc3RlcnMuUEMuZ2V0KCkpO1xuICAgICAgdGhpcy5lbXVsYXRvci5SZWdpc3RlcnMuUEMuc2V0KGFWYWwpO1xuICAgIH0sIHRoaXMuU3BlY2lhbE9wU2V0KSxcblxuICAgIElOVDogbmV3IE9wKHRoaXMsIFwiSU5UXCIsIE9QRVJBVElPTl9JTlQsIDQsIGZ1bmN0aW9uKGEpIHtcbiAgICAgIHZhciBhVmFsID0gYS5nZXRBKCk7XG4gICAgICB0aGlzLmVtdWxhdG9yLmludGVycnVwdFF1ZXVlLnB1c2goYVZhbCk7XG4gICAgfSwgdGhpcy5TcGVjaWFsT3BTZXQpLFxuXG4gICAgSUFHOiBuZXcgT3AodGhpcywgXCJJQUdcIiwgT1BFUkFUSU9OX0lBRywgMSwgZnVuY3Rpb24oYSkge1xuICAgICAgdmFyIGFWYWwgPSBhLmdldEEoKTtcbiAgICAgIGEuc2V0KHRoaXMuZW11bGF0b3IuUmVnaXN0ZXJzLklBLmdldCgpKTtcbiAgICB9LCB0aGlzLlNwZWNpYWxPcFNldCksXG5cbiAgICBJQVM6IG5ldyBPcCh0aGlzLCBcIklBU1wiLCBPUEVSQVRJT05fSUFTLCAxLCBmdW5jdGlvbihhKSB7XG4gICAgICB0aGlzLmVtdWxhdG9yLlJlZ2lzdGVycy5JQS5zZXQoYS5nZXRBKCkpO1xuICAgIH0sIHRoaXMuU3BlY2lhbE9wU2V0KSxcblxuICAgIFJGSTogbmV3IE9wKHRoaXMsIFwiUkZJXCIsIE9QRVJBVElPTl9SRkksIDMsIGZ1bmN0aW9uKGEpIHtcbiAgICAgIHZhciBhVmFsID0gYS5nZXRBKCk7XG4gICAgICB0aGlzLmVtdWxhdG9yLmludGVycnVwdFF1ZXVlaW5nRW5hYmxlZCA9IGZhbHNlO1xuICAgICAgdGhpcy5lbXVsYXRvci5SZWdpc3RlcnMuQS5zZXQodGhpcy5lbXVsYXRvci5SZWdpc3RlcnMuU1AucG9wKCkpO1xuICAgICAgdGhpcy5lbXVsYXRvci5SZWdpc3RlcnMuUEMuc2V0KHRoaXMuZW11bGF0b3IuUmVnaXN0ZXJzLlNQLnBvcCgpKTtcblxuICAgIH0sIHRoaXMuU3BlY2lhbE9wU2V0KSxcblxuICAgIElBUTogbmV3IE9wKHRoaXMsIFwiSUFRXCIsIE9QRVJBVElPTl9JQVEsIDIsIGZ1bmN0aW9uKGEpIHtcbiAgICAgIHZhciBhVmFsID0gYS5nZXRBKCk7XG4gICAgICBpZihhVmFsID09PSAwKVxuICAgICAgICB0aGlzLmVtdWxhdG9yLmludGVycnVwdFF1ZXVlaW5nRW5hYmxlZCA9IGZhbHNlO1xuICAgICAgZWxzZVxuICAgICAgICB0aGlzLmVtdWxhdG9yLmludGVycnVwdFF1ZXVlaW5nRW5hYmxlZCA9IHRydWU7XG4gICAgfSwgdGhpcy5TcGVjaWFsT3BTZXQpLFxuXG4gICAgSFdOOiBuZXcgT3AodGhpcywgXCJIV05cIiwgT1BFUkFUSU9OX0hXTiwgMiwgZnVuY3Rpb24oYSkge1xuICAgICAgdmFyIGFWYWwgPSBhLmdldEEoKTtcbiAgICAgIGEuc2V0KHRoaXMuZW11bGF0b3IuZGV2aWNlcy5sZW5ndGgpO1xuICAgIH0sIHRoaXMuU3BlY2lhbE9wU2V0KSxcblxuICAgIEhXUTogbmV3IE9wKHRoaXMsIFwiSFdRXCIsIE9QRVJBVElPTl9IV1EsIDQsIGZ1bmN0aW9uKGEpIHtcbiAgICAgIHZhciBkZXYgPSB0aGlzLmVtdWxhdG9yLmRldmljZXNbYS5nZXRBKCldO1xuICAgICAgaWYoZGV2KSB7XG4gICAgICAgIHRoaXMuZW11bGF0b3IuUmVnaXN0ZXJzLkEuc2V0KGRldi5pZCAmIDB4ZmZmZik7XG4gICAgICAgIHRoaXMuZW11bGF0b3IuUmVnaXN0ZXJzLkIuc2V0KChkZXYuaWQgPj4gMTYpICYgMHhmZmZmKTtcbiAgICAgICAgdGhpcy5lbXVsYXRvci5SZWdpc3RlcnMuQy5zZXQoZGV2LnZlcnNpb24gJiAweGZmZmYpO1xuICAgICAgICB0aGlzLmVtdWxhdG9yLlJlZ2lzdGVycy5YLnNldChkZXYubWFudWZhY3R1cmVyICYgMHhmZmZmKTtcbiAgICAgICAgdGhpcy5lbXVsYXRvci5SZWdpc3RlcnMuWS5zZXQoKGRldi5tYW51ZmFjdHVyZXIgPj4gMTYpICYgMHhmZmZmKTtcbiAgICAgIH1cblxuICAgIH0sIHRoaXMuU3BlY2lhbE9wU2V0KSxcblxuICAgIEhXSTogbmV3IE9wKHRoaXMsIFwiSFdJXCIsIE9QRVJBVElPTl9IV0ksIDQsIGZ1bmN0aW9uKGEpIHtcbiAgICAgIHZhciBkZXYgPSB0aGlzLmVtdWxhdG9yLmRldmljZXNbYS5nZXRBKCldO1xuICAgICAgaWYoZGV2KVxuICAgICAgICBkZXYuaW50ZXJydXB0KCk7XG4gICAgfSwgdGhpcy5TcGVjaWFsT3BTZXQpLFxuICB9O1xuXG5cbiAgdGhpcy5ib290PSBmdW5jdGlvbigpIHtcbiAgICBjb25zb2xlLmxvZyhcIi0tLSBEQ1BVLTE2IEVtdWxhdG9yIC0tLVwiKTtcblxuICAgIHRoaXMucHJvZ3JhbSA9ICBudWxsO1xuICAgIHRoaXMuUEMuc2V0KDApO1xuICAgIHRoaXMuQ1BVX0NZQ0xFID0gMDtcbiAgICB0aGlzLlJBTSA9IG5ldyBBcnJheSgweDEwMDAwKTtcbiAgICB0aGlzLmFzeW5jU3RlcHMgPSAxO1xuXG4gICAgdGhpcy5pbnRlcnJ1cHRRdWV1ZWluZ0VuYWJsZWQgPSBmYWxzZTtcbiAgICB0aGlzLmludGVycnVwdFF1ZXVlID0gW107XG5cbiAgICBmb3IodmFyIHIgaW4gdGhpcy5SZWdpc3RlcnMpIHtcbiAgICAgIHRoaXMuUmVnaXN0ZXJzW3JdLnNldCgwKTtcbiAgICB9XG4gICAgLy90aGlzLlJlZ2lzdGVycy5TUC5zZXQoMHhmZmZmKTtcblxuICAgIGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmRldmljZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXMuZGV2aWNlc1tpXS5pbml0KCk7XG4gICAgfVxuICB9O1xuXG4gIHRoaXMucmVib290PSBmdW5jdGlvbigpIHsgdGhpcy5ib290KCk7IH07XG5cbiAgLyoqXG4gICAqIFJ1biB0aGUgcHJvZ3JhbSBzcGVjaWZpZWQuXG4gICAqIEAgX3Byb2dyYW0gdGhlIHByb2dyYW0geW91IHdhbnQgdG8gcnVuLCBhcyBhbiBhcnJheSBvZiBieXRlcy5cbiAgICovXG4gIHRoaXMucnVuID0gZnVuY3Rpb24oX3Byb2dyYW0pIHtcbiAgICB0aGlzLnByb2dyYW0gPSBfcHJvZ3JhbTtcblxuICAgIGNvbnNvbGUubG9nKFwiUnVubmluZyBwcm9ncmFtIChcIiArIHRoaXMucHJvZ3JhbS5sZW5ndGggKyBcIiB3b3JkcylcIiApO1xuXG4gICAgLy8gbG9hZCBwcm9ncmFtIGludG8gUkFNXG4gICAgZm9yKHZhciBpID0gMDsgaSA8IHRoaXMucHJvZ3JhbS5sZW5ndGg7IGkrKykge1xuICAgICAgaWYodGhpcy5wcm9ncmFtW2ldICE9IHVuZGVmaW5lZClcbiAgICAgICAgdGhpcy5SQU1baV0gPSB0aGlzLnByb2dyYW1baV07XG4gICAgfVxuXG4gICAgaWYoIXRoaXMuYXN5bmMpIHtcbiAgICAgIHdoaWxlKHRoaXMuc3RlcCgpKSB7IH1cbiAgICAgIHRoaXMuZXhpdCgpO1xuICAgIH1cbiAgICBlbHNlXG4gICAgICB0aGlzLnN0ZXBBc3luYygpO1xuXG4gIH07XG5cbiAgdGhpcy5zdGVwID0gZnVuY3Rpb24oKSB7XG4gICAgaWYodGhpcy5QQy5nZXQoKSA8IHRoaXMucHJvZ3JhbS5sZW5ndGgpIHtcbiAgICAgIHRoaXMubmV4dEluc3RydWN0aW9uKCk7XG5cbiAgICAgIGlmKHRoaXMuYXR0YWNoZWREZWJ1Z2dlciAmJiB0aGlzLnBhdXNlZClcbiAgICAgICAgdGhpcy5hdHRhY2hlZERlYnVnZ2VyLm9uU3RlcCh0aGlzLlBDLmdldCgpKTtcblxuICAgICAgLy8gcHJvY2VzcyBvbmUgaW50ZXJydXB0IGlmIHdlIGhhdmUgb25lXG4gICAgICBpZih0aGlzLmludGVycnVwdFF1ZXVlaW5nRW5hYmxlZCA9PSBmYWxzZSAmJiB0aGlzLmludGVycnVwdFF1ZXVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy5wcm9jZXNzSW50ZXJydXB0KHRoaXMuaW50ZXJydXB0UXVldWUucG9wKCkpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgZWxzZSByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgdmFyIF90aGlzID0gdGhpcztcbiAgdGhpcy5wYXVzZWQgPSBmYWxzZTtcblxuICB0aGlzLnJ1bkFzeW5jID0gZnVuY3Rpb24oKSB7XG4gICAgd2hpbGUodHJ1ZSkge1xuICAgICAgaWYoTWF0aC5mbG9vcihfdGhpcy5DUFVfQ1lDTEUgLyBfdGhpcy5jdXJyZW50U3BlZWQuZGVsYXlGcmVxdWVuY3kpID4gX3RoaXMuYXN5bmNTdGVwcykge1xuICAgICAgICBfdGhpcy5hc3luY1N0ZXBzKys7XG4gICAgICAgIHNldFRpbWVvdXQoX3RoaXMucnVuQXN5bmMsIF90aGlzLmN1cnJlbnRTcGVlZC5kZWxheVRpbWUpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBpZighX3RoaXMuc3RlcEFzeW5jKCkpXG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdGhpcy5zdGVwQXN5bmMgPSBmdW5jdGlvbigpIHtcbiAgICBpZih0aGlzLnByb2dyYW0gPT0gbnVsbCkgIC8vIGJyZWFrIGlmIHdlIGhhdmUgcmVib290ZWRcbiAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIGlmKHRoaXMucGF1c2VkKSB7XG4gICAgICBpZih0aGlzLmF0dGFjaGVkRGVidWdnZXIpIHtcbiAgICAgICAgdGhpcy5hdHRhY2hlZERlYnVnZ2VyLm9uUGF1c2VkKHRoaXMuUEMuZ2V0KCkpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgaWYodGhpcy5hdHRhY2hlZERlYnVnZ2VyKSB7XG4gICAgICAgIGlmKHRoaXMuYXR0YWNoZWREZWJ1Z2dlci5icmVha3BvaW50c1tcIlwiK3RoaXMuUEMuZ2V0KCldKSB7XG4gICAgICAgICAgdGhpcy5wYXVzZWQgPSB0cnVlO1xuICAgICAgICAgIHRoaXMuYXR0YWNoZWREZWJ1Z2dlci5vblBhdXNlZCh0aGlzLlBDLmdldCgpKTtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdmFyIHJlcyA9IHRoaXMuc3RlcCgpO1xuICAgICAgaWYoIXJlcylcbiAgICAgICAgdGhpcy5leGl0KCk7XG4gICAgICByZXR1cm4gcmVzO1xuXG4gICAgfVxuICB9O1xuXG4gIHRoaXMubmV4dEluc3RydWN0aW9uID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGRhdGEgPSB0aGlzLlJBTVt0aGlzLlBDLmluYygpXTtcbiAgICB2YXIgaW5zdHJ1Y3Rpb24gPSBVdGlscy5wYXJzZUluc3RydWN0aW9uKGRhdGEpO1xuICAgIHZhciBvcDtcbiAgICBpZihpbnN0cnVjdGlvbi5vcGNvZGUgPT09IDApIHtcbiAgICAgIGluc3RydWN0aW9uID0gVXRpbHMucGFyc2VTcGVjaWFsSW5zdHJ1Y3Rpb24oZGF0YSk7XG4gICAgICBvcCA9IHRoaXMuU3BlY2lhbE9wU2V0W2luc3RydWN0aW9uLm9wY29kZV07XG4gICAgfVxuICAgIGVsc2VcbiAgICAgIG9wID0gdGhpcy5PcFNldFtpbnN0cnVjdGlvbi5vcGNvZGVdO1xuXG5cblxuICAgIGlmKCFvcCkge1xuICAgICAgdmFyIGVyciA9IFwiSW52YWxpZCBvcGNvZGUgXCIgKyBpbnN0cnVjdGlvbi5vcGNvZGU7XG4gICAgICBjb25zb2xlLndhcm4oZXJyKTtcbiAgICAgIHRocm93IGVycjtcbiAgICB9XG5cbiAgICBpZih0aGlzLnZlcmJvc2UpIHtcbiAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICBVdGlscy5oZXgodGhpcy5SZWdpc3RlcnMuUEMuZ2V0KCkpICsgXCJcXHRcIiArXG4gICAgICAgIG9wLm5hbWUgKyBcIlxcdChcIiArXG4gICAgICAgIFV0aWxzLmhleChpbnN0cnVjdGlvbi5hKSArIFwiLFxcdFwiICtcbiAgICAgICAgVXRpbHMuaGV4KGluc3RydWN0aW9uLmIpICsgXCIpXCJcbiAgICAgICk7XG4gICAgfVxuICAgIG9wLmV4ZWMoaW5zdHJ1Y3Rpb24uYSwgaW5zdHJ1Y3Rpb24uYik7XG5cbiAgICBpZih0aGlzLmF0dGFjaGVkRGVidWdnZXIpXG4gICAgICB0aGlzLmF0dGFjaGVkRGVidWdnZXIub25JbnN0cnVjdGlvbih0aGlzLlBDLmdldCgpKTtcbiAgfTtcblxuICB0aGlzLm5leHRXb3JkID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5DUFVfQ1lDTEUrKztcbiAgICByZXR1cm4gdGhpcy5SQU1bdGhpcy5SZWdpc3RlcnMuUEMuaW5jKCldO1xuICB9O1xuXG4gIHRoaXMuZ2V0UGFyYW1WYWx1ZSA9IGZ1bmN0aW9uKHZhbCkge1xuICAgIHJldHVybiB0aGlzLlZhbHVlc1tuZXcgU3RyaW5nKHZhbCldO1xuICB9O1xuXG4gIHRoaXMuc2tpcEluc3RydWN0aW9uID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGluc3RydWN0aW9uID0gVXRpbHMucGFyc2VJbnN0cnVjdGlvbih0aGlzLlJBTVt0aGlzLlBDLmluYygpXSk7XG4gICAgdGhpcy5DUFVfQ1lDTEUrKztcblxuICAgIC8vIHNraXAgXCJuZXh0IHdvcmRcIiB2YWx1ZXMgYnkgaW52b2tpbmcgZ2V0KCkgb24gdGhlIHBhcmFtc1xuICAgIHRoaXMuZ2V0UGFyYW1WYWx1ZShpbnN0cnVjdGlvbi5hKS5nZXQoKTtcbiAgICBpZihpbnN0cnVjdGlvbi5vcGNvZGUgIT0gMClcbiAgICAgIHRoaXMuZ2V0UGFyYW1WYWx1ZShpbnN0cnVjdGlvbi5iKS5nZXQoKTtcblxuICAgIGlmKGluc3RydWN0aW9uLm9wY29kZSA+PSBPUEVSQVRJT05fSUZCICYmIGluc3RydWN0aW9uLm9wY29kZSA8PSBPUEVSQVRJT05fSUZVKSB7XG4gICAgICAvLyBpZiB3ZSBoYXZlIHNraXBwZWQgYSBjb25kaXRpb25hbCBpbnN0cnVjdGlvbiwgc2tpcCBhZGRpdGlvbmFsIGluc3RydWN0aW9uXG4gICAgICAvLyBhdCBjb3N0IG9mIGFuIGFkZGl0aW9uYWwgY3ljbGUuICBjb250aW51ZSB1bnRpbCBhIG5vbi1jb25kaXRpb25hbCBpbnN0cnVjdGlvblxuICAgICAgLy8gaGFzIGJlZW4gc2tpcHBlZFxuICAgICAgdGhpcy5za2lwSW5zdHJ1Y3Rpb24oKTtcbiAgICB9XG5cbiAgfTtcblxuICB0aGlzLnByb2Nlc3NJbnRlcnJ1cHQgPSBmdW5jdGlvbihtZXNzYWdlKSB7XG4gICAgaWYodGhpcy5SZWdpc3RlcnMuSUEuZ2V0KCkgIT0gMCkge1xuICAgICAgdGhpcy5pbnRlcnJ1cHRRdWV1ZWluZ0VuYWJsZWQgPSB0cnVlO1xuICAgICAgdGhpcy5SZWdpc3RlcnMuU1AucHVzaCh0aGlzLlJlZ2lzdGVycy5QQy5nZXQoKSk7ICAvLyBwdXNoIFBDIG9udG8gdGhlIHN0YWNrXG4gICAgICB0aGlzLlJlZ2lzdGVycy5TUC5wdXNoKHRoaXMuUmVnaXN0ZXJzLkEuZ2V0KCkpOyAgICAvLyBmb2xsb3dlZCBieSBwdXNpbmcgQSB0byB0aGUgc3RhY2tcbiAgICAgIHRoaXMuUmVnaXN0ZXJzLlBDLnNldCh0aGlzLlJlZ2lzdGVycy5JQS5nZXQoKSk7ICAgIC8vIHNldCBQQyB0byBJQVxuICAgICAgdGhpcy5SZWdpc3RlcnMuQS5zZXQobWVzc2FnZSk7ICAgICAgICAgICAgLy8gc2V0IEEgdG8gdGhlIGludGVycnVwdCBtZXNzYWdlXG4gICAgfVxuICAgIGVsc2Uge1xuICAgIH1cbiAgfTtcblxuICB0aGlzLmludGVycnVwdCA9IGZ1bmN0aW9uKG1lc3NhZ2UpIHtcbiAgICB0aGlzLmludGVycnVwdFF1ZXVlLnB1c2gobWVzc2FnZSk7XG5cbiAgICBpZih0aGlzLmludGVycnVwdFF1ZXVlLmxlbmd0aCA+IDI1Nikge1xuICAgICAgLy8gY2F0Y2ggZmlyZT9cbiAgICAgIGNvbnNvbGUud2FybihcIkRDVVAtMTYgaXMgb24gZmlyZVwiKTtcbiAgICAgIHRocm93IFwiVG9vIG1hbnkgaW50ZXJydXB0c1wiO1xuICAgIH1cbiAgfTtcblxuICB0aGlzLmV4aXQgPSBmdW5jdGlvbigpIHtcbiAgICBjb25zb2xlLmxvZyhcIlByb2dyYW0gY29tcGxldGVkIGluIFwiICsgdGhpcy5DUFVfQ1lDTEUgKyBcIiBjeWNsZXNcIik7XG5cbiAgICBpZih0aGlzLmF0dGFjaGVkRGVidWdnZXIpXG4gICAgICB0aGlzLmF0dGFjaGVkRGVidWdnZXIub25FeGl0KCk7XG4gIH07XG5cbiAgdGhpcy5hdHRhY2hlZERlYnVnZ2VyID0gbnVsbDtcbiAgdGhpcy5hdHRhY2hEZWJ1Z2dlciA9IGZ1bmN0aW9uKF9kZWJ1Z2dlcikge1xuICAgIHRoaXMuYXR0YWNoZWREZWJ1Z2dlciA9IF9kZWJ1Z2dlcjtcbiAgfTtcblxuICB0aGlzLnNldFNwZWVkID0gZnVuY3Rpb24obmV3U3BlZWQpIHtcbiAgICB2YXIgc3BlZWQgPSBTcGVlZHNbbmV3U3BlZWRdO1xuICAgIGlmKCFzcGVlZCkge1xuICAgICAgY29uc29sZS5sb2coXCJpbnZhbGlkIHNwZWVkIFwiICsgbmV3U3BlZWQpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmN1cnJlbnRTcGVlZCA9IHNwZWVkO1xuICAgIHRoaXMuYXN5bmNTdGVwcyA9IHRoaXMuQ1BVX0NZQ0xFIC8gdGhpcy5jdXJyZW50U3BlZWQuZGVsYXlGcmVxdWVuY3k7XG4gIH1cblxuICB0aGlzLmRldmljZXMgPSBbXTtcblxuICB0aGlzLmJvb3QoKTtcbn07XG5cbi8vIGdlbmVyaWMgZGV2aWNlIHVzZWQgZm9yIHVuaXQgdGVzdHNcbmZ1bmN0aW9uIERldmljZShfaWQsIF92ZXJzaW9uLCBfbWFudWZhY3R1cmVyLCBfZW11bGF0b3IpIHtcbiAgdGhpcy5pZCA9IF9pZDtcbiAgdGhpcy52ZXJzaW9uID0gX3ZlcnNpb247XG4gIHRoaXMubWFudWZhY3R1cmVyID0gX21hbnVmYWN0dXJlcjtcbiAgdGhpcy5lbXVsYXRvciA9IF9lbXVsYXRvcjtcbn07XG5EZXZpY2UucHJvdG90eXBlLmludGVycnVwdCA9IGZ1bmN0aW9uKCkgeyB9O1xuRGV2aWNlLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24oKSB7IH07XG5cblxuZnVuY3Rpb24gRGVidWdnZXIoX2VtdWxhdG9yKSB7XG4gIGlmKCFfZW11bGF0b3IuYXN5bmMpIHRocm93IFwiRW11bGF0b3IgbXVzdCBiZSBpbiBhc3luY2hyb25vdXMgbW9kZSB0byB1c2UgYSBkZWJ1Z2dlciB3aXRoIGl0LlwiO1xuICB0aGlzLmVtdWxhdG9yID0gX2VtdWxhdG9yO1xuICB0aGlzLmJyZWFrcG9pbnRzID0ge307XG5cbiAgdGhpcy5lbXVsYXRvci5hdHRhY2hEZWJ1Z2dlcih0aGlzKTtcbn1cbkRlYnVnZ2VyLnByb3RvdHlwZS5nZXRCcmVha3BvaW50cyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5icmVha3BvaW50cztcbn07XG5EZWJ1Z2dlci5wcm90b3R5cGUudG9nZ2xlQnJlYWtwb2ludCA9IGZ1bmN0aW9uKGxvY2F0aW9uLCBsaW5lTnVtYmVyKSB7XG4gIGxvY2F0aW9uICs9IFwiXCI7ICAvLyBjb252ZXJ0IHRvIHN0cmluZ1xuICBpZih0aGlzLmJyZWFrcG9pbnRzW2xvY2F0aW9uXSlcbiAgICBkZWxldGUgdGhpcy5icmVha3BvaW50c1tsb2NhdGlvbl07XG4gIGVsc2VcbiAgICB0aGlzLmJyZWFrcG9pbnRzW2xvY2F0aW9uXSA9IGxpbmVOdW1iZXI7XG59O1xuRGVidWdnZXIucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uKCkge1xuICBpZih0aGlzLmVtdWxhdG9yLnBhdXNlZCkge1xuICAgIHRoaXMuZW11bGF0b3IucGF1c2VkID0gZmFsc2U7XG4gICAgdGhpcy5lbXVsYXRvci5ydW5Bc3luYygpO1xuICB9XG59O1xuRGVidWdnZXIucHJvdG90eXBlLnN0ZXAgPSBmdW5jdGlvbigpIHtcbiAgaWYodGhpcy5lbXVsYXRvci5wYXVzZWQpIHtcbiAgICBpZighdGhpcy5lbXVsYXRvci5zdGVwKCkpXG4gICAgICB0aGlzLmVtdWxhdG9yLmV4aXQoKTtcbiAgfVxufTtcbkRlYnVnZ2VyLnByb3RvdHlwZS5wYXVzZSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmVtdWxhdG9yLnBhdXNlZCA9IHRydWU7XG59O1xuXG4vLyBldmVudHNcbkRlYnVnZ2VyLnByb3RvdHlwZS5vblN0ZXAgPSBmdW5jdGlvbihsb2NhdGlvbikgeyB9O1xuRGVidWdnZXIucHJvdG90eXBlLm9uUGF1c2VkID0gZnVuY3Rpb24obG9jYXRpb24pIHsgfTtcbkRlYnVnZ2VyLnByb3RvdHlwZS5vbkluc3RydWN0aW9uID0gZnVuY3Rpb24obG9jYXRpb24pIHsgfTtcbkRlYnVnZ2VyLnByb3RvdHlwZS5vbkV4aXQgPSBmdW5jdGlvbigpIHsgfTtcblxuZXhwb3J0IHtcbiAgRW11bGF0b3IgYXMgZGVmYXVsdFxufTtcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEludGVydGlhbE5hdmlnYXRpb24ge1xuICBjb25zdHJ1Y3RvcihlbXVsYXRvciwgc2hpcCkge1xuICAgIHRoaXMuZW11bGF0b3IgPSBlbXVsYXRvclxuICAgIHRoaXMuc2hpcCAgICAgPSBzaGlwXG5cbiAgICB0aGlzLmlkICAgICAgICAgICA9IDB4ZTljODE4NDJcbiAgICB0aGlzLm1hbnVmYWN0dXJlciA9IDB4NmRiMTE4NTdcbiAgICB0aGlzLnZlcnNpb24gICAgICA9IDB4MDIwZlxuICB9XG5cbiAgaW5pdCgpIHtcbiAgICB0aGlzLnJlZmVyZW5jZVggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA2NTUzNilcbiAgICB0aGlzLnJlZmVyZW5jZVkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA2NTUzNilcbiAgfVxuXG4gIGludGVycnVwdCgpIHtcbiAgICBsZXQgY29kZSA9IHRoaXMuZW11bGF0b3IuUmVnaXN0ZXJzLkEuZ2V0KClcbiAgICBzd2l0Y2ggKGNvZGUpIHtcbiAgICAgIGNhc2UgMDpcbiAgICAgICAgdGhpcy5lbXVsYXRvci5SZWdpc3RlcnMuWC5zZXQodGhpcy5nZXRYUG9zaXRpb24oKSlcbiAgICAgICAgdGhpcy5lbXVsYXRvci5SZWdpc3RlcnMuWS5zZXQodGhpcy5nZXRZUG9zaXRpb24oKSlcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgdGhpcy5lbXVsYXRvci5SZWdpc3RlcnMuWC5zZXQodGhpcy5nZXRYVmVsb2NpdHkoKSlcbiAgICAgICAgdGhpcy5lbXVsYXRvci5SZWdpc3RlcnMuWS5zZXQodGhpcy5nZXRZVmVsb2NpdHkoKSlcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgdGhpcy5zZXRSZWZlcmVuY2VGcmFtZShcbiAgICAgICAgICB0aGlzLmVtdWxhdG9yLlJlZ2lzdGVycy5YLmdldCgpLFxuICAgICAgICAgIHRoaXMuZW11bGF0b3IuUmVnaXN0ZXJzLlkuZ2V0KClcbiAgICAgICAgKVxuICAgIH1cbiAgfVxuXG4gIHNldFJlZmVyZW5jZUZyYW1lKHgsIHkpIHtcbiAgICB0aGlzLnJlZmVyZW5jZVggPSB0aGlzLnJlZmVyZW5jZVggLSB4XG4gICAgdGhpcy5yZWZlcmVuY2VZID0gdGhpcy5yZWZlcmVuY2VZIC0geVxuICB9XG5cbiAgZ2V0WFBvc2l0aW9uKCkge1xuICAgIHJldHVybiBNYXRoLmFicyh0aGlzLnJlZmVyZW5jZVggKyB0aGlzLnNoaXAucG9zaXRpb24ueCkgJiAweGZmZmZcbiAgfVxuXG4gIGdldFlQb3NpdGlvbigpIHtcbiAgICByZXR1cm4gTWF0aC5hYnModGhpcy5yZWZlcmVuY2VZICsgdGhpcy5zaGlwLnBvc2l0aW9uLnkpICYgMHhmZmZmXG4gIH1cblxuICBnZXRYVmVsb2NpdHkoKSB7XG4gICAgcmV0dXJuIE1hdGguYWJzKHRoaXMuc2hpcC52ZWxvY2l0eS54ICogMTAwMCkgJiAweGZmZmZcbiAgfVxuXG4gIGdldFlWZWxvY2l0eSgpIHtcbiAgICByZXR1cm4gTWF0aC5hYnModGhpcy5zaGlwLnZlbG9jaXR5LnkgKiAxMDAwKSAmIDB4ZmZmZlxuICB9XG59XG4iLCJjb25zdCBERUZBVUxUX0ZPTlQgPSBbXG4gIDB4MDAwZiwgMHgwODA4LCAweDA4MGYsIDB4MDgwOCwgMHgwOGY4LCAweDA4MDgsIDB4MDBmZiwgMHgwODA4LFxuICAweDA4MDgsIDB4MDgwOCwgMHgwOGZmLCAweDA4MDgsIDB4MDBmZiwgMHgxNDE0LCAweGZmMDAsIDB4ZmYwOCxcbiAgMHgxZjEwLCAweDE3MTQsIDB4ZmMwNCwgMHhmNDE0LCAweDE3MTAsIDB4MTcxNCwgMHhmNDA0LCAweGY0MTQsXG4gIDB4ZmYwMCwgMHhmNzE0LCAweDE0MTQsIDB4MTQxNCwgMHhmNzAwLCAweGY3MTQsIDB4MTQxNywgMHgxNDE0LFxuICAweDBmMDgsIDB4MGYwOCwgMHgxNGY0LCAweDE0MTQsIDB4ZjgwOCwgMHhmODA4LCAweDBmMDgsIDB4MGYwOCxcbiAgMHgwMDFmLCAweDE0MTQsIDB4MDBmYywgMHgxNDE0LCAweGY4MDgsIDB4ZjgwOCwgMHhmZjA4LCAweGZmMDgsXG4gIDB4MTRmZiwgMHgxNDE0LCAweDA4MGYsIDB4MDAwMCwgMHgwMGY4LCAweDA4MDgsIDB4ZmZmZiwgMHhmZmZmLFxuICAweGYwZjAsIDB4ZjBmMCwgMHhmZmZmLCAweDAwMDAsIDB4MDAwMCwgMHhmZmZmLCAweDBmMGYsIDB4MGYwZixcbiAgMHgwMDAwLCAweDAwMDAsIDB4MDA1ZiwgMHgwMDAwLCAweDAzMDAsIDB4MDMwMCwgMHgzZTE0LCAweDNlMDAsXG4gIDB4MjY2YiwgMHgzMjAwLCAweDYxMWMsIDB4NDMwMCwgMHgzNjI5LCAweDc2NTAsIDB4MDAwMiwgMHgwMTAwLFxuICAweDFjMjIsIDB4NDEwMCwgMHg0MTIyLCAweDFjMDAsIDB4MmExYywgMHgyYTAwLCAweDA4M2UsIDB4MDgwMCxcbiAgMHg0MDIwLCAweDAwMDAsIDB4MDgwOCwgMHgwODAwLCAweDAwNDAsIDB4MDAwMCwgMHg2MDFjLCAweDAzMDAsXG4gIDB4M2U0MSwgMHgzZTAwLCAweDQyN2YsIDB4NDAwMCwgMHg2MjU5LCAweDQ2MDAsIDB4MjI0OSwgMHgzNjAwLFxuICAweDBmMDgsIDB4N2YwMCwgMHgyNzQ1LCAweDM5MDAsIDB4M2U0OSwgMHgzMjAwLCAweDYxMTksIDB4MDcwMCxcbiAgMHgzNjQ5LCAweDM2MDAsIDB4MjY0OSwgMHgzZTAwLCAweDAwMjQsIDB4MDAwMCwgMHg0MDI0LCAweDAwMDAsXG4gIDB4MDgxNCwgMHgyMjQxLCAweDE0MTQsIDB4MTQwMCwgMHg0MTIyLCAweDE0MDgsIDB4MDI1OSwgMHgwNjAwLFxuICAweDNlNTksIDB4NWUwMCwgMHg3ZTA5LCAweDdlMDAsIDB4N2Y0OSwgMHgzNjAwLCAweDNlNDEsIDB4MjIwMCxcbiAgMHg3ZjQxLCAweDNlMDAsIDB4N2Y0OSwgMHg0MTAwLCAweDdmMDksIDB4MDEwMCwgMHgzZTQ5LCAweDNhMDAsXG4gIDB4N2YwOCwgMHg3ZjAwLCAweDQxN2YsIDB4NDEwMCwgMHgyMDQwLCAweDNmMDAsIDB4N2YwYywgMHg3MzAwLFxuICAweDdmNDAsIDB4NDAwMCwgMHg3ZjA2LCAweDdmMDAsIDB4N2YwMSwgMHg3ZTAwLCAweDNlNDEsIDB4M2UwMCxcbiAgMHg3ZjA5LCAweDA2MDAsIDB4M2U0MSwgMHhiZTAwLCAweDdmMDksIDB4NzYwMCwgMHgyNjQ5LCAweDMyMDAsXG4gIDB4MDE3ZiwgMHgwMTAwLCAweDdmNDAsIDB4N2YwMCwgMHgxZjYwLCAweDFmMDAsIDB4N2YzMCwgMHg3ZjAwLFxuICAweDc3MDgsIDB4NzcwMCwgMHgwNzc4LCAweDA3MDAsIDB4NzE0OSwgMHg0NzAwLCAweDAwN2YsIDB4NDEwMCxcbiAgMHgwMzFjLCAweDYwMDAsIDB4MDA0MSwgMHg3ZjAwLCAweDAyMDEsIDB4MDIwMCwgMHg4MDgwLCAweDgwMDAsXG4gIDB4MDAwMSwgMHgwMjAwLCAweDI0NTQsIDB4NzgwMCwgMHg3ZjQ0LCAweDM4MDAsIDB4Mzg0NCwgMHgyODAwLFxuICAweDM4NDQsIDB4N2YwMCwgMHgzODU0LCAweDU4MDAsIDB4MDg3ZSwgMHgwOTAwLCAweDQ4NTQsIDB4M2MwMCxcbiAgMHg3ZjA0LCAweDc4MDAsIDB4NDQ3ZCwgMHg0MDAwLCAweDIwNDAsIDB4M2QwMCwgMHg3ZjEwLCAweDZjMDAsXG4gIDB4NDE3ZiwgMHg0MDAwLCAweDdjMTgsIDB4N2MwMCwgMHg3YzA0LCAweDc4MDAsIDB4Mzg0NCwgMHgzODAwLFxuICAweDdjMTQsIDB4MDgwMCwgMHgwODE0LCAweDdjMDAsIDB4N2MwNCwgMHgwODAwLCAweDQ4NTQsIDB4MjQwMCxcbiAgMHgwNDNlLCAweDQ0MDAsIDB4M2M0MCwgMHg3YzAwLCAweDFjNjAsIDB4MWMwMCwgMHg3YzMwLCAweDdjMDAsXG4gIDB4NmMxMCwgMHg2YzAwLCAweDRjNTAsIDB4M2MwMCwgMHg2NDU0LCAweDRjMDAsIDB4MDgzNiwgMHg0MTAwLFxuICAweDAwNzcsIDB4MDAwMCwgMHg0MTM2LCAweDA4MDAsIDB4MDIwMSwgMHgwMjAxLCAweDcwNGMsIDB4NzAwMFxuXTtcblxuY29uc3QgREVGQVVMVF9QQUxFVFRFID0gW1xuICAweDAwMCwgMHgwMGEsIDB4MGEwLCAweDBhYSwgMHhhMDAsIDB4YTBhLCAweGE1MCwgMHhhYWEsXG4gIDB4NTU1LCAweDU1ZiwgMHg1ZjUsIDB4NWZmLCAweGY1NSwgMHhmNWYsIDB4ZmY1LCAweGZmZlxuXTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9uaXRvciB7XG4gIGNvbnN0cnVjdG9yKGVtdWxhdG9yLCBjYW52YXMpIHtcbiAgICB0aGlzLmVtdWxhdG9yID0gZW11bGF0b3JcblxuICAgIHRoaXMuY2FudmFzICAgICAgICA9IGNhbnZhc1xuICAgIHRoaXMuY2FudmFzLndpZHRoICA9IDEyOFxuICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IDk2XG4gICAgdGhpcy5jb250ZXh0ICAgICAgID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgdGhpcy5pbWFnZURhdGEgICAgID0gdGhpcy5jb250ZXh0LmNyZWF0ZUltYWdlRGF0YShcbiAgICAgIHRoaXMuY2FudmFzLndpZHRoLFxuICAgICAgdGhpcy5jYW52YXMuaGVpZ2h0XG4gICAgKVxuXG4gICAgdGhpcy5pZCAgICAgICAgICAgPSAweDczNDlmNjE1XG4gICAgdGhpcy52ZXJzaW9uICAgICAgPSAweDE4MDJcbiAgICB0aGlzLm1hbnVmYWN0dXJlciA9IDB4MWM2YzhiMzZcbiAgICB0aGlzLmNvbm5lY3RlZCAgICA9IGZhbHNlXG5cbiAgICBzZXRUaW1lb3V0KHRoaXMucmVuZGVyLmJpbmQodGhpcyksIDEwMDAgLyAzMClcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgdGhpcy5jb25uZWN0ZWQgPSBmYWxzZVxuICB9XG5cbiAgaW50ZXJydXB0KCkge1xuICAgIGxldCBjb2RlICA9IHRoaXMuZW11bGF0b3IuUmVnaXN0ZXJzLkEuZ2V0KClcbiAgICBsZXQgdmFsdWUgPSB0aGlzLmVtdWxhdG9yLlJlZ2lzdGVycy5CLmdldCgpXG5cbiAgICBzd2l0Y2goY29kZSkge1xuICAgICAgY2FzZSAwOlxuICAgICAgICBpZih2YWx1ZSA9PT0gMCkge1xuICAgICAgICAgIHRoaXMuZGlzY29ubmVjdCgpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5tZW1NYXBTY3JlZW4odmFsdWUpXG4gICAgICAgIH1cbiAgICAgICAgYnJlYWtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGNvbnNvbGUud2FybihcIlVuaW1wbGVtZW50ZWQgaW50ZXJydXB0OlwiLCBjb2RlLCB2YWx1ZSlcbiAgICB9XG4gIH1cblxuICBtZW1NYXBTY3JlZW4odmFsdWUpIHtcbiAgICB0aGlzLm1lbU9mZnNldCA9IHZhbHVlXG4gICAgdGhpcy5jb25uZWN0ZWQgPSB0cnVlXG4gIH1cblxuICBkcmF3Q2VsbCh4LCB5LCB3b3JkKSB7XG4gICAgbGV0IGdseXBoID0gd29yZCAmIDB4N2ZcbiAgICBsZXQgYmxpbmsgPSAod29yZCAmIDB4MDA4MCkgPj4gN1xuICAgIGxldCBiZyAgICA9ICh3b3JkICYgMHgwZjAwKSA+PiA4XG4gICAgbGV0IGZnICAgID0gKHdvcmQgJiAweGYwMDApID4+IDEyXG4gICAgdGhpcy5kcmF3R2x5cGgoeCwgeSwgZ2x5cGgsIGZnLCBiZywgYmxpbmspXG4gIH1cblxuICBkcmF3R2x5cGgoeCwgeSwgZ2x5cGgsIGZnLCBiZywgYmxpbmspIHtcbiAgICAvLyBsb2FkIGZvbnQgZGF0YVxuICAgIGxldCBjb2xzID0gW107XG4gICAgZ2x5cGggKj0gMjtcbiAgICBjb2xzWzBdID0gdGhpcy5yZWFkRm9udChnbHlwaCkgPj4gOFxuICAgIGNvbHNbMV0gPSB0aGlzLnJlYWRGb250KGdseXBoKSAmIDB4ZmZcbiAgICBjb2xzWzJdID0gdGhpcy5yZWFkRm9udChnbHlwaCArIDEpID4+IDhcbiAgICBjb2xzWzNdID0gdGhpcy5yZWFkRm9udChnbHlwaCArIDEpICYgMHhmZlxuXG4gICAgLy8gbG9hZCBjb2xvdXIgZGF0YVxuICAgIGxldCBiZ1NwbGl0ID0gdGhpcy5yZWFkQ29sb3VycyhiZylcbiAgICBsZXQgW2JnUiwgYmdHLCBiZ0JdID0gYmdTcGxpdFxuICAgIGxldCBmZ1NwbGl0ID0gdGhpcy5yZWFkQ29sb3VycyhmZylcbiAgICBsZXQgW2ZnUiwgZmdHLCBmZ0JdID0gZmdTcGxpdFxuXG4gICAgLy8gZHJhdyBnbHlwaCB0byBidWZmZXJcbiAgICBmb3IobGV0IHJvdyA9IDA7IHJvdyA8IDg7IHJvdysrKSB7XG4gICAgICBmb3IobGV0IGNvbCA9IDA7IGNvbCA8IDQ7IGNvbCsrKSB7XG4gICAgICAgIGxldCBiaXQgPSAoY29sc1tjb2xdID4+IHJvdykgJiAweDAxXG4gICAgICAgIGxldCBpbmRleCA9ICgoeCo0ICsgY29sKSArICh5KjggKyByb3cpICogdGhpcy5jYW52YXMud2lkdGgpICogNFxuICAgICAgICBpZihiaXQgPT0gMSkge1xuICAgICAgICAgIHRoaXMuaW1hZ2VEYXRhLmRhdGFbaW5kZXgrMF0gPSBmZ1JcbiAgICAgICAgICB0aGlzLmltYWdlRGF0YS5kYXRhW2luZGV4KzFdID0gZmdHXG4gICAgICAgICAgdGhpcy5pbWFnZURhdGEuZGF0YVtpbmRleCsyXSA9IGZnQlxuICAgICAgICAgIHRoaXMuaW1hZ2VEYXRhLmRhdGFbaW5kZXgrM10gPSAyNTVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmltYWdlRGF0YS5kYXRhW2luZGV4KzBdID0gYmdSXG4gICAgICAgICAgdGhpcy5pbWFnZURhdGEuZGF0YVtpbmRleCsxXSA9IGJnR1xuICAgICAgICAgIHRoaXMuaW1hZ2VEYXRhLmRhdGFbaW5kZXgrMl0gPSBiZ0JcbiAgICAgICAgICB0aGlzLmltYWdlRGF0YS5kYXRhW2luZGV4KzNdID0gMjU1XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZWFkRm9udChvZmZzZXQpIHtcbiAgICAvLyBUT0RPIHJlYWQgZm9udCB3aGVuIG1lbW9yeSBtYXBwZWRcbiAgICByZXR1cm4gREVGQVVMVF9GT05UW29mZnNldF1cbiAgfVxuXG4gIHJlYWRDb2xvdXJzKGluZGV4KSB7XG4gICAgLy8gVE9ETyByZWFkIHBhbGV0dGUgd2hlbiBtZW1vcnkgbWFwcGVkXG4gICAgbGV0IGNvbG91ciA9IERFRkFVTFRfUEFMRVRURVtpbmRleF1cblxuICAgIGxldCByID0gKChjb2xvdXIgJiAweGYwMCkgPj4gOCkgKiAxNlxuICAgIGxldCBnID0gKChjb2xvdXIgJiAweDBmMCkgPj4gNCkgKiAxNlxuICAgIGxldCBiID0gKGNvbG91ciAmIDB4MDBmKSAqIDE2XG5cbiAgICByZXR1cm4gW3IsIGcsIGJdXG4gIH1cblxuICByZW5kZXJUb0J1ZmZlcigpIHtcbiAgICAvLyBkcmF3IGdseXBocyB0byBidWZmZXJcbiAgICBmb3IobGV0IHkgPSAwOyB5IDwgMTI7IHkrKykge1xuICAgICAgZm9yKGxldCB4ID0gMDsgeCA8IDMyOyB4KyspIHtcbiAgICAgICAgbGV0IHdvcmQgPSB0aGlzLmVtdWxhdG9yLlJBTVt0aGlzLm1lbU9mZnNldCArIHggKyB5ICogMzJdXG4gICAgICAgIHRoaXMuZHJhd0NlbGwoeCwgeSwgd29yZClcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZW5kZXJUb0NhbnZhcygpIHtcbiAgICAvLyBkcmF3IGJ1ZmZlciB0byBjYW52YXNcbiAgICB0aGlzLmNvbnRleHQucHV0SW1hZ2VEYXRhKHRoaXMuaW1hZ2VEYXRhLCAwLCAwKVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGlmICh0aGlzLmNvbm5lY3RlZCkge1xuICAgICAgdGhpcy5yZW5kZXJUb0J1ZmZlcigpXG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5yZW5kZXJUb0NhbnZhcy5iaW5kKHRoaXMpKVxuICAgIH1cbiAgICBzZXRUaW1lb3V0KHRoaXMucmVuZGVyLmJpbmQodGhpcyksIDEwMDAgLyAzMClcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGhydXN0ZXJzIHtcbiAgY29uc3RydWN0b3IoZW11bGF0b3IsIHNoaXApIHtcbiAgICB0aGlzLmVtdWxhdG9yID0gZW11bGF0b3JcbiAgICB0aGlzLnNoaXAgICAgID0gc2hpcFxuXG4gICAgdGhpcy5pZCAgICAgICAgICAgPSAweDg5ZmM4Njk3XG4gICAgdGhpcy5tYW51ZmFjdHVyZXIgPSAweDQxYWNmNTdiXG4gICAgdGhpcy52ZXJzaW9uICAgICAgPSAxXG4gIH1cblxuICBpbml0KCkge1xuICAgIHRoaXMuc3RhdGUgPSAweDAwMDBcbiAgfVxuXG4gIGludGVycnVwdCgpIHtcbiAgICBsZXQgY29kZSA9IHRoaXMuZW11bGF0b3IuUmVnaXN0ZXJzLkEuZ2V0KClcbiAgICBzd2l0Y2ggKGNvZGUpIHtcbiAgICAgIGNhc2UgMDpcbiAgICAgICAgdGhpcy5lbXVsYXRvci5SZWdpc3RlcnMuQi5zZXQodGhpcy5zdGF0ZSlcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHRoaXMuZW11bGF0b3IuUmVnaXN0ZXJzLkIuZ2V0KClcbiAgICB9XG4gIH1cblxuICBzdGVwKCkge1xuICAgIHN3aXRjaCAodGhpcy5zdGF0ZSA+Pj4gOCkge1xuICAgICAgY2FzZSAweDBmOlxuICAgICAgICB0aGlzLnNoaXAuYmFja3dhcmQoKVxuICAgICAgICBicmVha1xuICAgICAgY2FzZSAweGYwOlxuICAgICAgICB0aGlzLnNoaXAuZm9yd2FyZCgpXG4gICAgICAgIGJyZWFrXG4gICAgfVxuXG4gICAgc3dpdGNoICh0aGlzLnN0YXRlICYgMHhmZikge1xuICAgICAgY2FzZSAweGYwOlxuICAgICAgICB0aGlzLnNoaXAucm90YXRlKC0xKVxuICAgICAgICBicmVha1xuICAgICAgY2FzZSAweDBmOlxuICAgICAgICB0aGlzLnNoaXAucm90YXRlKDEpXG4gICAgICAgIGJyZWFrXG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aGlzLnNoaXAucm90YXRlKDApXG4gICAgICAgIGJyZWFrXG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgRW11bGF0b3IgZnJvbSAnLi9kY3B1L2VtdWxhdG9yJ1xuaW1wb3J0IFRocnVzdGVycyBmcm9tICcuL2RjcHUvdGhydXN0ZXJzJ1xuaW1wb3J0IE1vbml0b3IgZnJvbSAnLi9kY3B1L2xlbTE4MDInXG5pbXBvcnQgSW5lcnRpYWxOYXZpZ2F0aW9uIGZyb20gJy4vZGNwdS9pbmVydGlhbF9uYXZpZ2F0aW9uJ1xuaW1wb3J0IEJ5dGVjb2RlTG9hZGVyIGZyb20gJy4vZGNwdS9ieXRlY29kZV9sb2FkZXInXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1haW4ge1xuICBydW4oKSB7XG4gICAgdGhpcy5lbXVsYXRvciA9IGZhbHNlXG5cbiAgICBHdC5vblN0YXJ0ID0gKGZ1bmN0aW9uKHNoaXApIHtcbiAgICAgIHRoaXMuZW11bGF0b3IgPSBuZXcgRW11bGF0b3IoKVxuICAgICAgdGhpcy5lbXVsYXRvci5kZXZpY2VzID0gW11cblxuICAgICAgbGV0IHRocnVzdGVycyA9IG5ldyBUaHJ1c3RlcnModGhpcy5lbXVsYXRvciwgc2hpcClcbiAgICAgIHRoaXMuZW11bGF0b3IuZGV2aWNlcy5wdXNoKHRocnVzdGVycylcblxuICAgICAgbGV0IG1vbml0b3IgPSBuZXcgTW9uaXRvcih0aGlzLmVtdWxhdG9yLCB0aGlzLmJ1aWxkTW9uaXRvckNhbnZhcygpKVxuICAgICAgdGhpcy5lbXVsYXRvci5kZXZpY2VzLnB1c2gobW9uaXRvcilcblxuICAgICAgbGV0IG5hdiA9IG5ldyBJbmVydGlhbE5hdmlnYXRpb24odGhpcy5lbXVsYXRvciwgc2hpcClcbiAgICAgIHRoaXMuZW11bGF0b3IuZGV2aWNlcy5wdXNoKG5hdilcblxuICAgICAgbmV3IEJ5dGVjb2RlTG9hZGVyKHRoaXMuYnVpbGRMb2FkZXIoKSwgYnl0ZWNvZGUgPT4ge1xuICAgICAgICB0aGlzLmVtdWxhdG9yLnJlYm9vdCgpXG4gICAgICAgIHRoaXMuZW11bGF0b3IucnVuKGJ5dGVjb2RlKVxuICAgICAgICB0aGlzLmVtdWxhdG9yLnJ1bkFzeW5jKClcbiAgICAgIH0pXG4gICAgfSkuYmluZCh0aGlzKVxuXG4gICAgR3Qub25TdG9wID0gKGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5lbXVsYXRvci5wYXVzZWQgPSB0cnVlXG4gICAgfSkuYmluZCh0aGlzKVxuXG4gICAgR3Qub25TdGVwID0gKGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKCF0aGlzLmVtdWxhdG9yLnBhdXNlZCkge1xuICAgICAgICBmb3IobGV0IGRldmljZSBvZiB0aGlzLmVtdWxhdG9yLmRldmljZXMpIHtcbiAgICAgICAgICBpZiAoZGV2aWNlLnN0ZXApIHtcbiAgICAgICAgICAgIGRldmljZS5zdGVwKClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KS5iaW5kKHRoaXMpXG5cbiAgICBHdC5jID0gbmV3IEd0LkNvbnRyb2xsZXIodGhpcy5idWlsZEV0YWdDYW52YXMoKSlcbiAgfVxuXG4gIGJ1aWxkTG9hZGVyKCkge1xuICAgIGxldCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGRpdi5jbGFzc05hbWUgPSAnYm94IHVwbG9hZGVyJ1xuXG4gICAgbGV0IGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKVxuICAgIGlucHV0LnR5cGUgPSAnZmlsZSdcblxuICAgIGRpdi5hcHBlbmRDaGlsZChpbnB1dClcblxuICAgIGxldCBjb2x1bW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGVmdC1jb2x1bW4nKVxuICAgIGNvbHVtbi5pbnNlcnRCZWZvcmUoZGl2LCBjb2x1bW4uZmlyc3RDaGlsZClcblxuICAgIHJldHVybiBpbnB1dFxuICB9XG5cbiAgYnVpbGRFdGFnQ2FudmFzKCkge1xuICAgIGxldCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKVxuICAgIGNhbnZhcy5jbGFzc05hbWUgPSAnZXRhZydcbiAgICBjYW52YXMuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0XG4gICAgY2FudmFzLndpZHRoICA9IHdpbmRvdy5pbm5lcldpZHRoIC0gNzAwXG5cbiAgICB3aW5kb3cub25yZXNpemUgPSBmdW5jdGlvbigpIHtcbiAgICAgIGNhbnZhcy5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHRcbiAgICAgIGNhbnZhcy53aWR0aCAgPSB3aW5kb3cuaW5uZXJXaWR0aCAtIDcwMFxuICAgIH1cblxuICAgIGxldCBjb2x1bW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmlnaHQtY29sdW1uJylcbiAgICBjb2x1bW4uYXBwZW5kQ2hpbGQoY2FudmFzKVxuICAgIHJldHVybiBjYW52YXNcbiAgfVxuXG4gIGJ1aWxkTW9uaXRvckNhbnZhcygpIHtcbiAgICBsZXQgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJylcbiAgICBjYW52YXMuY2xhc3NOYW1lID0gJ21vbml0b3InXG5cbiAgICBsZXQgY29sdW1uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xlZnQtY29sdW1uJylcbiAgICBjb2x1bW4uYXBwZW5kQ2hpbGQoY2FudmFzKVxuICAgIHJldHVybiBjYW52YXNcbiAgfVxufVxuIl19
