export default class Client {
  connect() {
    this.connection = new WebSocket(this.uri)
    this.connection.onopen    = this.onopen.bind(this)
    this.connection.onerror   = this.onerror.bind(this)
    this.connection.onmessage = this.onmessage.bind(this)
  }

  onopen() {
    console.log('[Client] Connected')
  }

  onerror(err) {
    console.log('[Client] Error', err)
  }

  onmessage(e) {
    console.log('[Client] Data', e.data)
    var packet = JSON.parse(e.data)
    if (packet.type == 'radio') {
      if (this.onReceive) {
        this.onReceive(packet.channel, packet.data)
      } else {
        console.warn('No onReceive set')
      }
    } else {
      console.warn('Unknown packet type', packet.type)
    }
  }

  transmit(channel, data) {
    var packet = {
      type: 'radio',
      channel: channel,
      data: data
    }
    this.connection.send(JSON.stringify(packet))
  }

  get uri() {
    return "ws://localhost:8080/"
  }
}
