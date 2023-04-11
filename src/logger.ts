import debug, { type Debugger } from 'debug'

function CustomLogger (logger: Debugger): {
  (formatter: any, ...args: any[]): void
  enabled: boolean
  ifChanged: (formatter: any, ...args: any[]) => void
} {
  let value = ''
  const patched = (formatter: any, ...args: any[]): void => {
    logger(formatter, ...args)
  }
  patched.enabled = logger.enabled
  patched.ifChanged = (...args: any[]): void => {
    const newLogValue = args.map(String).join(' ')
    if (newLogValue !== value) {
      logger(newLogValue)
      value = newLogValue
    }
  }
  return patched
}

export const logApp = debug('es-app')
export const logLayout = debug('es-layout')
export const logPointerEvent = debug('es-pointer-event')
export const logKeydown = debug('es-keydown')
export const logKeyup = debug('es-keyup')
export const logInputDirection = debug('es-input-direction')
export const logPlayerBounds = debug('es-player-bounds')
export const logPlayerState = debug('es-player-state')
export const logHitboxes = debug('es-hitboxes')
export const logCameraboxBounds = CustomLogger(debug('es-camerabox-bounds'))
export const logViewportBounds = CustomLogger(debug('es-viewport-bounds'))
