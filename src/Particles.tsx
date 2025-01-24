import { useReward } from 'react-rewards'

const confettiConfig = {
  fps: 120, // Frames per second
  lifetime: 300, // Time of life
  angle: 270, // Initial direction of particles in degrees
  decay: 0.94, // How much the velocity decreases each frame
  spread: 180, // Spread of particles in degrees
  startVelocity: 15, // Initial velocity of particles
  elementCount: 100, // Number of particles
  elementSize: 8, // Size of particles in px
  zIndex: 10, // z-index of particles
  position: 'fixed', // Positioning of particles
  colors: ['#A45BF1', '#25C6F6', '#72F753', '#F76C88', '#F5F770'], // Colors of particles
}

const ringoConfig = {
  fps: 120,
  lifetime: 300,
  angle: 90,
  decay: 0.92,
  spread: 180,
  rotate: true,
  startVelocity: 16,
  elementCount: 25,
  elementSize: 25,
  zIndex: 10,
  position: 'fixed',
  emoji: ['🍎', '🍏', '🍎'],
}

const uwakiConfig = {
  fps: 120,
  lifetime: 300,
  angle: 90,
  decay: 0.92,
  spread: 180,
  rotate: true,
  startVelocity: 20,
  elementCount: 20,
  elementSize: 25,
  zIndex: 10,
  position: 'fixed',
  emoji: ['💔', '💔', '💔', '❌', '💔', '❌', '💔', '❌', '🚫', '🙅‍♀️'],
}

const viossaConfettiConfig = {
  fps: 120, // Frames per second
  lifetime: 300, // Time of life
  angle: 270, // Initial direction of particles in degrees
  decay: 0.94, // How much the velocity decreases each frame
  spread: 180, // Spread of particles in degrees
  startVelocity: 15, // Initial velocity of particles
  elementCount: 100, // Number of particles
  elementSize: 8, // Size of particles in px
  zIndex: 10, // z-index of particles
  position: 'fixed', // Positioning of particles
  colors: ['#00AFF0', '#FFFFFF', '#FFFFFF', '#00baff', '#60c8ff', '#00a5e3'], // Colors of particles
}

const viossaEmojiConfig = {
  fps: 120,
  lifetime: 300,
  angle: 90,
  decay: 0.92,
  spread: 180,
  rotate: true,
  startVelocity: 20,
  elementCount: 12,
  elementSize: 25,
  zIndex: 10,
  position: 'fixed',
  emoji: ['🩵'],
}

export const useConfettiReward = () =>
  useReward('reward', 'confetti', confettiConfig)
export const useRingoAward = () => useReward('reward', 'emoji', ringoConfig)
export const useUwakiAward = () => useReward('reward', 'emoji', uwakiConfig)
export const useViossaConfettiAward = () =>
  useReward('reward', 'confetti', viossaConfettiConfig)
export const useViossaEmojiAward = () =>
  useReward('reward', 'emoji', viossaEmojiConfig)
