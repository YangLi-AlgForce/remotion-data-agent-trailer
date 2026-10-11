"""Original synthesized demo soundtrack; no samples, network, or third-party media.

MIT licensed. Python 3 standard library only. Run from any directory.
The open-source edition intentionally includes no narration.
"""
from pathlib import Path
from array import array
import math
import random
import sys
import wave

SR = 44100
DURATION = 45.9
rng = random.Random(8)
track = array('f', [0]) * round(SR * DURATION)


def add(at, duration, sample):
    start = round(at * SR)
    for j in range(round(duration * SR)):
        i = start + j
        if 0 <= i < len(track):
            track[i] += sample(j / SR)


# Slow opening: dark drone with a restrained pulsing rhythm.
for i in range(len(track)):
    t = i / SR
    opening = max(0, min(1, (11.2 - t) / 1.2))
    attack = min(1, t / .35)
    drone = .055 * math.sin(2 * math.pi * 55 * t)
    drone += .025 * math.sin(2 * math.pi * 82.41 * t)
    drone *= .75 + .25 * math.cos(2 * math.pi * .7 * t)
    track[i] += drone * opening * attack
for beat in range(10):
    add(beat + .1, .4, lambda t: .12 * math.sin(2 * math.pi * 65 * t) * math.exp(-t * 15))

# A distant siren sits under the opening, with gentle fades.
phase = 0
for i in range(round(2.5 * SR)):
    t = i / SR
    phase += 2 * math.pi * (630 + 220 * math.sin(t * math.pi * .9)) / SR
    track[i] += .018 * math.sin(phase) * max(0, min(1, t / .3, (2.5 - t) / .6))

# Original noise impulse in place of the production ceramic recording.
add(3.15, .35, lambda t: .12 * rng.uniform(-1, 1) * math.exp(-t * 23))

# Continuous 150 BPM middle score, arpeggiated minor harmony.
step = 60 / 150 / 2
notes = [110, 130.81, 164.81, 146.83, 110, 196, 164.81, 130.81]
for k in range(math.ceil((DURATION - 10.4) / step)):
    at = 10.4 + k * step
    hz = notes[k % len(notes)]
    add(at, .27, lambda t, hz=hz: .07 * (math.sin(2 * math.pi * hz * t) + .2 * math.sin(2 * math.pi * hz * 2 * t)) * min(1, t / .005) * math.exp(-t * 14))
    if k % 2 == 0:
        add(at, .22, lambda t: .2 * math.sin(2 * math.pi * (48 * t + 4 * (1 - math.exp(-t * 35)))) * math.exp(-t * 24))
    add(at, .035, lambda t: .019 * rng.uniform(-1, 1) * math.exp(-t * 130))
    if k % 4 == 2:
        add(at, .14, lambda t: .07 * rng.uniform(-1, 1) * math.exp(-t * 40))

# Heavy stamp: sharp contact and a low wooden desk thud at the settled frame.
add(38.9, .45, lambda t: .7 * rng.uniform(-1, 1) * math.exp(-t * 160) + .4 * math.sin(2 * math.pi * 68 * t) * math.exp(-t * 22))
for base in [40.7, 43.3]:
    for column in range(3):
        for frame in [3, 7, 12, 18]:
            strength = .03 if frame < 18 else .075
            add(base + (column * 3 + frame) / 30, .055,
                lambda t, s=strength: s * (math.sin(2 * math.pi * 2400 * t) + .5 * math.sin(2 * math.pi * 3700 * t)) * math.exp(-t * 95))

# Fade score under CRT relay click and falling electrical whine.
for i in range(round(45.3 * SR), len(track)):
    t = i / SR
    track[i] *= max(0, 1 - (t - 45.3) / .35)
add(45.3, .5, lambda t: .12 * math.sin(2 * math.pi * (380 * (1 - math.exp(-t * 10)) + 95 * t)) * math.exp(-t * 8) + .06 * rng.uniform(-1, 1) * math.exp(-t * 55))

peak = max(abs(x) for x in track)
scale = .88 / max(peak, .88)
pcm = array('h', (round(max(-1, min(1, x * scale)) * 32767) for x in track))
if sys.byteorder != 'little':
    pcm.byteswap()
output = Path(__file__).resolve().parents[1] / 'public' / 'demo-audio.wav'
with wave.open(str(output), 'wb') as wav:
    wav.setnchannels(1)
    wav.setsampwidth(2)
    wav.setframerate(SR)
    wav.writeframes(pcm.tobytes())
print(f'Generated {output.name}: {DURATION}s, original score and effects, no narration.')
