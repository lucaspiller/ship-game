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
  if(!_emulator.async) throw "Emulator must be in asynchronous mode to use a debugger with it.";
  this.emulator = _emulator;
  this.breakpoints = {};

  this.emulator.attachDebugger(this);
}
Debugger.prototype.getBreakpoints = function() {
  return this.breakpoints;
};
Debugger.prototype.toggleBreakpoint = function(location, lineNumber) {
  location += "";  // convert to string
  if(this.breakpoints[location])
    delete this.breakpoints[location];
  else
    this.breakpoints[location] = lineNumber;
};
Debugger.prototype.run = function() {
  if(this.emulator.paused) {
    this.emulator.paused = false;
    this.emulator.runAsync();
  }
};
Debugger.prototype.step = function() {
  if(this.emulator.paused) {
    if(!this.emulator.step())
      this.emulator.exit();
  }
};
Debugger.prototype.pause = function() {
  this.emulator.paused = true;
};

// events
Debugger.prototype.onStep = function(location) {};
Debugger.prototype.onPaused = function(location) { };
Debugger.prototype.onInstruction = function(location) { };
Debugger.prototype.onExit = function() { };

export {
  Debugger as default
};
