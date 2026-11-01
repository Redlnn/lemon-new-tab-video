# SPDX-License-Identifier: AGPL-3.0-only
# Copyright (c) 2026 Redlnn
# Generated public/sound-design.wav is separately licensed under CC-BY-4.0.
"""Deterministic, original transition accents. No sampled third-party sound effects."""
import math
import random
import struct
import wave
from pathlib import Path

rate = 44100
duration = 40
samples = [0.0] * (rate * duration)
rng = random.Random(20261101)

for beat in [0.15, 3, 7, 12, 17, 19, 21, 24, 28, 29.25, 30.5, 36]:
    length = int(rate * 0.5)
    start = int(beat * rate)
    phase = 0.0
    for i in range(length):
        t = i / rate
        phase += 2 * math.pi * (45 + 95 * math.exp(-t * 20)) / rate
        value = math.sin(phase) * math.exp(-t * 12) * min(t * 250, 1) * 0.16
        if start + i < len(samples):
            samples[start + i] += value
    if beat > 0.5:
        start = int((beat - 0.30) * rate)
        previous = 0.0
        for i in range(int(rate * 0.4)):
            t = i / (rate * 0.4)
            noise = rng.uniform(-1, 1)
            high = noise - previous
            previous = noise
            envelope = math.sin(math.pi * t) ** 2
            samples[start+i] += high * envelope * 0.035

for beat in [7.65, 7.8, 7.95, 8.1, 8.25, 8.4]:
    start = int(beat * rate)
    for i in range(int(rate * 0.035)):
        t = i / rate
        samples[start+i] += (math.sin(2 * math.pi * 1600 * t) + rng.uniform(-.5,.5)) * math.exp(-t * 150) * .07

target = Path(__file__).parent / 'public' / 'sound-design.wav'
with wave.open(str(target), 'wb') as output:
    output.setnchannels(1)
    output.setsampwidth(2)
    output.setframerate(rate)
    output.writeframes(b''.join(struct.pack('<h', int(max(-1,min(1,s))*32767)) for s in samples))
print(target)
