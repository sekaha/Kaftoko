import { tsParticles } from '@tsparticles/engine'

import type { Engine } from '@tsparticles/engine'
import { loadBasic } from '@tsparticles/basic'
import { loadExternalPushInteraction } from '@tsparticles/interaction-external-push'
import type { ISourceOptions } from '@tsparticles/engine'

export const options: ISourceOptions = {
  fpsLimit: 40,
  particles: {
    number: {
      value: 200,
      density: {
        enable: true,
      },
    },
    color: {
      value: ['#fdcf58', '#757676', '#f27d0c', '#800909', '#f07f13'],
    },
    opacity: {
      value: { min: 0.1, max: 0.5 },
    },
    size: {
      value: { min: 1, max: 3 },
    },
    move: {
      enable: true,
      speed: 6,
      random: false,
    },
  },
  interactivity: {
    detectsOn: 'window',
    events: {
      onClick: {
        enable: true,
        mode: 'push',
      },
    },
  },
  // background: {
  // image: 'radial-gradient(#4a0000, #000)',
  // },
}

export async function loadFirePreset(
  engine: Engine,
  refresh = true
): Promise<void> {
  await loadBasic(engine, false)
  await loadExternalPushInteraction(engine, false)

  await engine.addPreset('fire', options, false)

  await engine.refresh(refresh)
}
