/**
 * Note: When using the Node.JS APIs, the config file
 * doesn't apply. Instead, pass options directly to the APIs.
 *
 * All configuration options: https://remotion.dev/docs/config
 */

import { Config } from '@remotion/cli/config'

Config.setRspack(true)
Config.setVideoImageFormat('png')
Config.setOverwriteOutput(true)
Config.setDefaultPremountInSeconds(2)
Config.setCodec('h265')
Config.setCrf(18)
Config.setAudioBitrate('320k')
Config.setPixelFormat('yuv420p10le')
Config.setColorSpace('bt709')
Config.setX264Preset('veryslow')

// H.265 uses Main10 profile; High is the tier, rather than an H.264 profile.
Config.overrideFfmpegCommand(({ type, args }) => {
  if (type !== 'stitcher') return args
  return [
    ...args.slice(0, -1),
    '-profile:v', 'main10',
    '-x265-params', 'level-idc=5.1:high-tier=1',
    ...args.slice(-1),
  ]
})
