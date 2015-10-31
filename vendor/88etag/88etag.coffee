Gt = window.Gt = {}

class Controller
  constructor: (canvas) ->
    @canvas = canvas
    @start()

  start: ->
    @universe = new Universe { canvas: @canvas }
    @universe.start()
Gt.Controller = Controller

class Universe
  LOOP_TARGET = 1000/60

  constructor: (options) ->
    @canvas = options?.canvas
    @masses = new MassStorage
    @players = new PlayerStorage
    @starfield = new Starfield
    @tick = 0

  start: ->
    @setupCanvas()
    @starfield.generate @viewpoint
    @buildPlayer()
    setInterval (=> @loop()), LOOP_TARGET
    @loop()

  setupCanvas: ->
    @viewpoint = new Viewpoint @canvas
    @ctx = @canvas.getContext '2d'
    @ctx.fillStyle = 'rgb(255, 255, 255)'
    @ctx.strokeStyle = 'rgb(255, 255, 255)'

  loop: ->
    start = Date.now()
    @checkCollisions()
    @step()
    @render()
    renderTime = Date.now() - start
    if renderTime > LOOP_TARGET
      console.log 'Frame took ' + renderTime + 'ms'

  step: ->
    @tick += 1
    @players.step()
    @masses.step()

  render: ->
    @viewpoint.update @player.ship if @player.ship?

    ctx = @ctx
    if @respawnGraphics
      ctx.save()
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect 0, 0, @canvas.width, @canvas.height
      ctx.restore()
    else
      ctx.clearRect 0, 0, @canvas.width, @canvas.height
    ctx.save()
    @starfield.render ctx, @viewpoint
    @viewpoint.translate ctx
    @masses.render ctx
    ctx.restore()

  buildPlayer: ->
    @player = new LocalPlayer { universe: this }
    @player.build()
    @players.add @player

  add: (mass) ->
    @masses.add mass
    mass.universe = this
    mass.tick ?= @tick

  update: (mass) ->
    existing = @masses.find(mass)
    if not existing? or existing.ntick < mass.ntick
      mass.universe = this
      @masses.update mass

  remove: (mass) ->
    @masses.remove mass

  checkCollisions: ->
    for id, m1 of @masses.items
        if m1.moved
          for id, m2 of @masses.items
            if m1.overlaps m2
              m1.handleCollision m2
Gt.Universe = Universe

class PlayerStorage
  constructor: ->
    @items = {}
    @length = 0

  find: (player) ->
    @items[@key player]

  add: (player) ->
    return if @find(player)?
    @length++
    @set player

  update: (player) ->
    if @find(player)?
      @set player
    else
      @add player

  remove: (player) ->
    return unless @find(player)?
    @length--
    delete @items[@key player]

  key: (player) ->
    player.id

  set: (player) ->
    @items[@key player] = player

  step: ->
    player.step() for id, player of @items

class Player
  RESPAWN_DELAY = 5000

  local: false

  constructor: (options) ->
    @id = Math.random(9999999999999) # TODO
    @universe = options.universe
    @score = 0

  build: ->
    [w, h] = [@universe.canvas?.width, @universe.canvas?.height]
    [x, y] = [Math.random() * w * 8, Math.random() * h * 8]

    @commandCentre = new CommandCentre {
      position: Vector._new(x, y)
      player: this
    }
    @universe.add @commandCentre
    @buildShip()

  buildShip: ->
    x = @commandCentre.position.x
    y = @commandCentre.position.y + @commandCentre.radius

    @ship = new Ship {
      position: Vector._new(x, y)
      rotation: Math.PI / 2
      player: this
    }
    @universe.add @ship

  respawn: ->
    setTimeout () =>
      @buildShip()
      if @universe.player == this
        @universe.respawnGraphics = true
        setTimeout () =>
          @universe.respawnGraphics = false
        , RESPAWN_DELAY / 2
    , RESPAWN_DELAY

  step: ->
    true

class LocalPlayer extends Player
  local: true

  constructor: (options) ->
    super options

  step: ->
    if @ship? && Gt.onStep?
      Gt.onStep()

  buildTurret: ->
    turret = new Turret {
      position: @ship.position,
      player: this
    }
    @universe.add turret

  buildMassDriver: ->
    massDriver = new MassDriver {
      position: @ship.position,
      player: this
    }
    @universe.add massDriver

  buildShip: ->
    super
    Gt.onStart(@ship) if Gt.onStart?

  respawn: ->
    Gt.onStop() if Gt.onStop?
    super

class Star
  STAR_RADIUS: 1.5

  constructor: (options) ->
    @position = options.position
    @alpha = options.alpha
    @z = Math.random()

  render: (ctx, viewpoint, MULT) ->
    ctx.save()

    x = @position.x - (viewpoint.position.x / (@z + 1))
    y = @position.y - (viewpoint.position.y / (@z + 1))

    # wrap stars
    x -= Math.floor(x / (viewpoint.width * MULT)) * (viewpoint.width * MULT)
    y -= Math.floor(y / (viewpoint.height * MULT)) * (viewpoint.height * MULT)

    if y > viewpoint.height
      y = y - viewpoint.height
    else if y < 0
      y = y + viewpoint.height

    ctx.translate x, y

    alpha = (1 - @z) / 2
    ctx.fillStyle = 'rgba(255, 255, 255, ' + alpha + ')'

    ctx.beginPath()
    ctx.arc 0, 0, @STAR_RADIUS, 0, Math.PI * 2, true
    ctx.closePath()
    ctx.fill()

    ctx.restore()
Gt.Star = Star

class Starfield
  NUM_STARS: 100
  MULT: 2

  constructor: ->
    @stars = []

  generate: (viewpoint) ->
    for i in [1..@NUM_STARS]
      @stars.push new Star {
        position: Vector._new(
          Math.random() * viewpoint.width * @MULT,
          Math.random() * viewpoint.height * @MULT
        )
      }

  render: (ctx, viewpoint) ->
    ctx.save()
    ctx.translate 0, 0

    @stars[star].render ctx, viewpoint, @MULT for star of @stars

    ctx.restore()
Gt.Starfield = Starfield

class MassStorage
  constructor: ->
    @items = {}
    @length = 0

  find: (mass) ->
    @items[@key mass]

  add: (mass) ->
    return if @find(mass)?
    @length++
    @set mass

  update: (mass) ->
    if @find(mass)?
      @set mass

  remove: (mass) ->
    return unless @find(mass)?
    @length--
    delete @items[@key mass]

  key: (mass) ->
    mass.id

  set: (mass) ->
    @items[@key mass] = mass

  render: (ctx) ->
    highestLayer = 0
    for id, mass of @items
      if mass.layer > highestLayer
        highestLayer = mass.layer

    for i in [0..highestLayer]
      for id, mass of @items
        if mass.layer == i
          mass.render ctx

  step: ->
    mass.step() for id, mass of @items

class Mass
  type: 'Unknown'
  mass: 1
  maxHealth: 1
  solid: true

  constructor: (options) ->
    o = options or {}
    @id = Math.random(9999999999999) # TODO
    @radius = o.radius or 1
    @position = o.position or Vector._new(0, 0)
    @velocity = o.velocity or Vector._new(0, 0)
    @acceleration = o.acceleration or Vector._new(0, 0)
    @rotation = o.rotation or 0
    @rotationalVelocity = o.rotationalVelocity or 0
    @player = o.player
    @lifetime = o.lifetime or 24 * 60
    @layer = o.layer or 0
    @health = o.health or @maxHealth
    @moved = true

  explode: ->
    @remove()

  remove: ->
    @universe.remove this

  alive: ->
     @health > 0

  overlaps: (other) ->
    return false unless other != this
    diff = Vector._length(Vector.minus(other.position, @position))
    diff < (other.radius + @radius)

  handleCollision: (other) ->
    return unless @solid and other.solid

    x = Vector.normalized(Vector.minus(@position, other.position))

    v1 = @velocity
    x1 = Vector.dotProduct(x, v1)
    v1x = Vector.times(x, x1)
    v1y = Vector.minus(v1, v1x)
    m1 = @mass

    x = Vector.times(x, -1)
    v2 = other.velocity
    x2 = Vector.dotProduct(x, v2)
    v2x = Vector.times(x, x2)
    v2y = Vector.minus(v2, v2x)
    m2 = other.mass

    @velocity = Vector._zeroSmall(Vector.times(Vector.plus(Vector.times(v1x, (m1 - m2) / (m1 + m2)), Vector.plus(Vector.times(v2x, (2 * m2) / (m1 + m2)), v1y)), 0.75))
    @acceleration = Vector._new(0, 0)

    other.velocity = Vector._zeroSmall(Vector.times(Vector.plus(Vector.times(v1x, (2 * m1) / (m1 + m2)), Vector.plus(Vector.times(v2x, (m2 - m1) / (m1 + m2)), v2y)), 0.75))
    other.acceleration = Vector._new(0, 0)

    # check that both velocities aren't zero, if so set the
    # velocity of the object with the smallest mass to be the normal
    if Vector._length(@velocity) == 0 and Vector._length(other.velocity) == 0
      if m1 < m2
        @velocity = Vector.times x, -1
      else
        other.velocity = Vector.times x, 1

    # make sure the objects are no longer touching, otherwise
    # hack away until they aren't
    while @overlaps other
      @position = Vector.plus @position, @velocity
      other.position = Vector.plus other.position, other.velocity

  step: ->
    dt = @universe.tick - @tick
    return @remove() if (@lifetime -= dt) < 0

    oldPosition = @position
    for t in [0...dt]
      @velocity = Vector.plus @velocity, @acceleration
      # magical force to stop large objects
      if Vector._length(@acceleration) == 0 && @mass >= 1000
        @velocity = Vector.times @velocity, 0.99
      @position = Vector.plus @position, @velocity
      @acceleration = Vector.times @acceleration, 0.8 # drag
      @rotation += @rotationalVelocity
    @moved = not Vector.equal oldPosition, @position

    @tick = @universe.tick

  render: (ctx) ->
    ctx.save()

    ctx.translate @position.x, @position.y
    ctx.rotate @rotation
    @_render ctx

    ctx.restore()

  _render: (ctx) ->
    # debug
    ctx.strokeStyle = 'rgb(255,0,0)'
    ctx.beginPath()
    ctx.arc 0, 0, @radius, 0, Math.PI * 2, true
    ctx.closePath()
    ctx.stroke()
Gt.Mass = Mass

class ShipTrail extends Mass
  type: 'ShipTrail'
  solid: false

  constructor: (options) ->
    @ship = options.ship
    options.radius ||= 2
    options.position ||= Vector.clone @ship.position
    options.velocity ||= Vector._new (Math.random() - 0.5) / 4, (Math.random() - 0.5) / 4
    options.lifetime = 40
    super options

  _render: (ctx) ->
    alpha = @lifetime / 40
    ctx.fillStyle = 'rgba(89,163,89,' + alpha + ')'
    ctx.beginPath()
    ctx.arc 0, 0, @radius, 0, Math.PI * 2, true
    ctx.closePath()
    ctx.fill()
Gt.ShipTrail = ShipTrail

class Ship extends Mass
  type: 'Ship'
  value: 1000
  mass: 10
  maxEnergy: 200

  constructor: (options) ->
    options ||= {}
    options.radius ||= 10
    options.layer = 2
    options.velocity = Vector._new(0, 0)
    @energy = options.energy or @maxEnergy
    @max_speed = 3
    @max_accel = 0.03
    @trailDelay = 0
    super options

  _render: (ctx) ->
    ctx.fillStyle = 'rgb(0,68,0)'
    ctx.beginPath()
    ctx.arc 0, 0, @radius, 0, Math.PI * 2, true
    ctx.closePath()
    ctx.fill()

    ctx.lineWidth = 3
    ctx.strokeStyle = 'rgb(94,87,75)'
    ctx.beginPath()
    ctx.moveTo -1.5 * @radius, -1.2 * @radius
    ctx.lineTo @radius * 1.4, -0.8 * @radius
    ctx.moveTo -1.5 * @radius, @radius * -0.4
    ctx.lineTo @radius * 1.5, @radius * -0.4
    ctx.moveTo -1.5 * @radius, @radius * 0.4
    ctx.lineTo @radius * 1.5, @radius * 0.4
    ctx.moveTo -1.5 * @radius, 1.2 * @radius
    ctx.lineTo @radius * 1.4, 0.8 * @radius
    ctx.closePath()
    ctx.stroke()

  forward: ->
    @thrust Vector.plus @acceleration, Vector.times Vector._new(@rotation), @max_accel

  backward: ->
    @thrust Vector.minus @acceleration, Vector.times Vector._new(@rotation), @max_accel

  thrust: (accel) ->
    if @trailDelay <= 0
      @universe.add new ShipTrail { ship: this }
      @trailDelay = 1
    @acceleration = accel
    @universe.update this

  power: (delta) ->
    return false if @energy + delta < 0
    @energy += delta
    @energy = @maxEnergy if @energy > @maxEnergy
    true

  step: ->
    dt = @universe.tick - @tick
    if @player.local
      @lifetime += dt
      @power dt
      @trailDelay -= dt
    return @remove() if (@lifetime -= dt) < 0

    for t in [0...dt]
      newVelocity = Vector.plus @velocity, @acceleration
      if Vector._length(newVelocity) < @max_speed
        @velocity = newVelocity
      else
        @velocity = Vector.times newVelocity, (@max_speed / Vector._length newVelocity)

      @position = Vector.plus @position, @velocity
      @acceleration = Vector.times @acceleration, 0.8 # drag
      @rotation += @rotationalVelocity
      @rotation = @rotation % (Math.PI * 2)

    @tick = @universe.tick

  rotate: (dir) ->
    if (dir > 0 && @rotationalVelocity <= 0)
      @rotationalVelocity += (Math.PI / 64) * Math.abs(dir)
    else if (dir < 0 && @rotationalVelocity >= 0)
      @rotationalVelocity -= (Math.PI / 64) * Math.abs(dir)
    else if dir == 0
      @rotationalVelocity = 0
    @universe.update this

  explode: ->
    super
    if @player.local
      @player.respawn()
Gt.Ship = Ship

class CommandCentre extends Mass
  type: 'CommandCentre'
  mass: 999999999999999999
  maxHealth: 10000

  constructor: (options) ->
    options ||= {}
    options.radius ||= 80
    options.rotationalVelocity ||= Math.PI / 512
    options.layer = 1
    super options

  step: ->
    dt = @universe.tick - @tick
    @lifetime += dt
    super

  _render: (ctx) ->
    # outer ring
    ctx.lineWidth = 3
    ctx.strokeStyle = 'rgb(96, 97, 90)'
    ctx.beginPath()
    ctx.arc 0, 0, @radius, 0, Math.PI * 2, true
    ctx.closePath()
    ctx.stroke()

    # main sections
    ctx.strokeStyle = 'rgb(254, 235, 202)'
    for i in [1..4]
      ctx.strokeRect @radius / 2, -5, @radius / 2, 10
      ctx.strokeRect @radius, -20, 2, 40
      ctx.rotate Math.PI / 2

    # inner sections
    ctx.rotate -2*@rotation
    ctx.rotate Math.PI / 8
    for i in [1..8]
      ctx.strokeRect (@radius / 2) * 1.5, -15, 2, 30
      ctx.rotate Math.PI / 4

    # health bar
    ctx.fillStyle = 'rgb(0, 25, 0)'
    ctx.beginPath()
    ctx.arc 0, 0, @radius / 2, 0, Math.PI * 2, true
    ctx.closePath()
    ctx.fill()

    ctx.fillStyle = 'rgb(0,68,0)'
    ctx.beginPath()
    ctx.arc 0, 0, 0.9 * (@radius / 2) * (@health / @maxHealth), 0, Math.PI * 2, true
    ctx.closePath()
    ctx.fill()

class Viewpoint
  BUFFER: 40

  constructor: (canvas) ->
    @position = Vector._new(0, 0)
    @width  = canvas.width
    @height = canvas.height

    setTimeout =>
      @width  = canvas.width
      @height = canvas.height
    , 250

  update: (ship) ->
    # focus on centre of ship
    @position.x = ship.position.x - (@width / 2)
    @position.y = ship.position.y - (@height / 2)

  translate: (ctx) ->
    ctx.translate -@position.x, -@position.y

  offscreen: (vector) ->
    vector = Vector.minus vector, @position
    vector.x < 0 || vector.x > @width || vector.y < 0 || vector.y > @height

class Vector
  # can pass either x, y coords or radians for a unit vector
  @_new: (x, y) ->
    [x, y] = if y? then [x, y] else [Math.cos(x), Math.sin(x)]
    x ||= 0
    y ||= 0
    @_zeroSmall({
      x: x,
      y: y
    })

  @plus: (vector, v) ->
    {
      x: vector.x + v.x,
      y: vector.y + v.y
    }

  @minus: (vector, v) ->
    {
      x: vector.x - v.x,
      y: vector.y - v.y
    }

  @times: (vector, s) ->
    {
      x: vector.x * s
      y: vector.y * s
    }

  @_length: (vector) ->
    Math.sqrt vector.x * vector.x + vector.y * vector.y

  @normalized: (vector) ->
    @times vector, (1.0 / @_length vector)

  @dotProduct: (vector, other) ->
    (vector.x * other.x) + (vector.y * other.y)

  @clone: (vector) ->
    {
      x: vector.x,
      y: vector.y
    }

  @_zeroSmall: (vector) ->
    vector.x = 0 if Math.abs(vector.x) < 0.01
    vector.y = 0 if Math.abs(vector.y) < 0.01
    vector

  @equal: (vector, other) ->
    vector.x == other.x && vector.y == other.y
Gt.Vector = Vector
