# Design Thoughts / Rants

This a work in progress document that will collect my thoughts for the design
of this game.

## Why?

From the moment I heard about 0x10c my mind started racing with ideas of how
the game would work. I love the idea of an openworld space game, but nothing
yet has really fulfilled my dreams of it. Games such as Eve and the X-series
are more like an FPS-in-space, where as I like the idea of a space trader such
as that shown in the Firefly TV series, where combat isn't really a big part of
the game.

The programmable CPU touched on another game I'd been dreaming of - an MMO
hacking game like Uplink, where you write your own programs to protect your own
systems and break into other player's systems. To me the DCPU shouldn't just
be an addon that lets you do some stuff faster, it should be the core part of
the game and interface.

As the game developed it seemed more like Minecraft with rayguns than the game
I had been dreaming of. After the game was indefinetely suspended / cancelled a
number of clones popped up but as of now, November 2015, nearly three years
after 0x10c was scrapped, none of the clones have really made any progress
towards a fun playable game and are more just tech demos.

## How?

Inspired by the values of [Megastage](https://github.com/orlof/megastage)
(another scrapped 0x10c clone), for this game I value:

* playability over graphics
* game over simulation
* getting something done (i.e. good enough) vs making it perfect

The client will be written in Javascript ES6 with the intent on making it fully
playable in the browser. This is mainly so I don't have to worry about system
incompatabilities when starting out. A desktop version isn't off the table, but
it's not what I care about right now.

I'm using parts of an old game I wrote [88etag](https://github.com/lucaspiller/88etag)
(and never finished...) for graphics. This may change in the future as one of
the main reasons why this game was never finished was because Canvas2D graphics
weren't performant enough - this was circa 2011, so performance of computers
and browsers have improved by then, but this may still be a problem.

The game will use the [DCPU-16 1.7 spec](https://github.com/lucaspiller/dcpu-specifications/blob/master/dcpu16.txt)
as released by Notch. Although numerous people have expressed issues with
Notch's spec, I believe it is perfectly fine for a game like this. Later on I
may make different versions (higher / lower memory and speed), but that is it.
There were a few projects to target higher level languages at the architecture,
so those can be revived if people don't want to write assembly.

I'm using the emulator from [DCPU IDE](http://www.dcpu-ide.com/) as it's
written in Javascript and seems to mostly match the spec. Work will need to be
done later to make it 100% compatible. If TechCompliant takes of it would be
good to make it source compatible with that (even sacrificing spec-compliance
if needs be).

Other hardware may change. I'm currently using a stripped down version of the
LEM1802 (it doesn't support custom fonts or palettes), and I feel the screen
size will be too small for the game I want to build. Increasing it from 32x12
to 80x25 will probably happen sooner or later (with a backwards compatible mode
by default). None of the other 0x10c hardware has been implemented, but I will
probably add them as-is. I don't intend to support the SPC2000 which doesn't
fit with the feel or SPED3 which I don't think is useful. A FPU will probably
be added as simulating Math in assembly on a 16bit CPU is hard - I don't want
this to be accessible only by programmers with 30 years experience writing
assembly.

Initially the game will be single player (PvE) with no multiplayer component. I
do intend for this to be multiplayer, but again it's not important right now.
Once the game is playable and fun for a single player I can work on that -
it'll probably just be me playing it anyway :)

## Game Mechanics

### Overview

You start with a (basic) spaceship and the galaxy is your oyster. Taking
inspiration from Eve and the X-series, the storyline should be minimal with
emergent gameplay based upon what the player wants to do. There needs to be
enough NPC missions so that the game won't get boring as a single player.

When multiplayer is added it will add a lot to the game, so groups can form
corporations and decide to rule the galaxy if they so desire. For that to be
viable the game will need to have thousands of players, and I don't see that
happening right now (as I write this by myself, sitting alone on my sofa) so
that can't be a requirement on it being fun.

The DCPU is the focus of the game, and should also be the interface to
everything that the player does in the game. Want to dock at the nearest
station and perform a trade? Tell your DCPU to fly to the nearest station, tell
it to request docking permission, tell it to load the trading interface and
request a trade. I don't want the player to have to program everything, so the
DCPU should come with a basic OS that lets them perform most in-game actions
(maybe not in the most efficient way).

What would really fit in with the 80s style of the game and avoid the issue of
"how do I tell my DCPU to buy 100kg of tritium at a price of 10 credits per
kilogram?" would be if each station had it's own BBS. The player connects to
that and bids for missions, reads local discussions, and make trades. Certain
actions could be done remotely (over a radio link) and others would need the
player to be docked at a station (such as physically trading goods and
upgrading/repairing ships).

I don't know how feasible it would be, but having the station run the BBS on
it's own DCPU is very appealing. Then players could not just own stations, but
run run third-party BBS software if they want. I feel the game should give the
player enough basic systems, and the rest should be emergent and up to them. If
the player wants an in-game casino they should be able to build one!

### Physics

The ships will be your basic sci-fi space ship with a fusion power supply and
propulsion system. The fusion power supply will generate power for an extremely
long time so effectively it doesn't need to be refuled. With sublight engines
ships should be able to travel up to around half light speed (150,000 km/s),
this means a trip from Sol to one of the outer planets would take around 3
hours. Time dilation will not be present in the game.

Ships will accelerate slowly, with acceleration decreasing as they
reach the top speed. It should take around 5 minutes to accelerate from 0 to
top speed in the fastest ships (and the same to decelerate) - this means a trip
from low Earth orbit to the Moon will take around 50 seconds. Larger ships will
take longer to accelerate.

Although having realistic orbital mechanics would make a very good simulation,
I think for a game it is too complicated. Taking Kerbal Space Program as an
example, even docking two ships is hard enough for new players. Once you
eliminate a limited fuel supply and plug in a DCPU to do most of the hardwork,
this feature doesn't really give the player anything but makes the simulation a
lot harder in terms of computational requirements. The game will follow basic
space physics in that an engine needs to be powered on to change the velocity
and when off the velocity doesn't change.

At sublight speeds it would take 8 years to reach the nearest star from Sol, so
some form of FTL travel is required. I don't really like the idea of 'jump
gates', so ships will require FTL drives if there are to go beyond a single
solar system (or to be carried aboard a capital ship). FTL travel requires time
for drives to charge before they can jump, this is dependant on the ship's
mass - the largest ships should take around 90 seconds to charge.

Sci-fi doesn't have any [standard for how fast FTL drives should
be](http://scifi.stackexchange.com/questions/8457/which-scifi-universe-has-the-fastest-space-ships-hyperspace-technology),
so we will say it should take around 1 week to travel across the known galaxy
at FTL speeds, that means a ship can travel at speeds of around 10 light years
/ 3 parsecs per minute. FTL drives will require their own fuel source, where
consumption is dependant on the mass of the ship and the time travelling at
FTL.

Assuming a ship has enough fuel it should be able to travel at FTL speeds for
an unlimited amount of time, but in reality they will need to drop out to
refuel fairly often. When entering FTL, ships will set the direction in which
they wish to travel, and can drop out of FTL at any time - including between
known solar systems. It's up to the pilot to not do something stupid that
requires them to fly for 5 years before they can refuel.

### Communications

Communications will be modelled on standard radio communications, where devices
broadcast to all other devices listening on that channel in the area.
Transmissions will happen instantly rather than travelling at the speed of
light as simulating that will probably be computationally and bandwidth
expensive given the number of radio communications that will probably happen.
The communication devices will provide the basic radio-link and leave protocols
up to the player.

Initially there will be no form of interstellar communications (I quite like
the idea of a Sneakernet system), but maybe a one-to-one communications device
based on quantum entanglement could be added later to allow long distance
communucations.

### Play areas

The play area will be split up into solar systems, so if the player wishes they
can travel from one side of the solar system to the other (although it would
take a very long time). Internally we will probably need to reduce this down
into smaller areas, especially once multiplayer is added, but this should
appear transparent to the user.

Travel between solar systems will only be possible via FTL drives, which will
cause the player to switch from one play area to another.

Players should be able to drop out of FTL between solar systems which will put
them in another play area. Internally the play areas should be very light
weight and require minimal resources when there is no active DCPU or
player in them.

## Further reading

Hardware:

* [Notch's 0x10c DCPU-16 and hardware specifications](https://github.com/lucaspiller/dcpu-specifications/)
* [My hardware specifications](https://github.com/lucaspiller/ship-game/tree/master/docs/hardware)

Software / Tooling:

* [0x10c Standards Committee](https://github.com/0x10cStandardsCommittee/0x10c-Standards)
* [My sample programs](https://github.com/lucaspiller/ship-game/tree/master/programs)
* [DCPU-16 Apps](http://www.dcpu16apps.com/)
* Search GitHub for 'DCPU' - hardly anything is 100% spec compatible, so
  YMMV

0x10c clones:

* Trillek - [Homepage](http://trillek.org/), [GitHub](https://github.com/trillek-team), [Reddit](https://www.reddit.com/r/trillek/)
* TechCompliant - [GitHub](https://github.com/paultech), [Reddit](https://www.reddit.com/r/techcompliant/)
* MegaStage - [GitHub](https://github.com/orlof/megastage)

## Reference

### Units

|            | Km       | Au       | Light-year | Parsec   |
|------------|----------|----------|------------|----------|
| Km         | 1        | 1.50E+08 | 9.46E+12   | 3.09E+13 |
| Au         | 6.68E-09 | 1        | 6.32E+04   | 2.06E+05 |
| Light Year | 1.06E-13 | 1.58E-05 | 1          | 3.26E+00 |
| Parsec     | 3.24E-14 | 4.85E-06 | 3.07E-01   | 1        |

c (speed of light) = 3.00E+08 m/s
