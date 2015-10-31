export default class Main {
  run() {
    Gt.c = new Gt.Controller(this.buildEtagCanvas())
  }

  buildEtagCanvas() {
    let canvas = document.createElement('canvas')
    canvas.className = 'etag'
    canvas.height = window.innerHeight
    canvas.width  = window.innerWidth - 700
    document.body.appendChild(canvas)
    return canvas
  }
}
