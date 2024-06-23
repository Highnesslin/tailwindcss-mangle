import path from 'node:path'
import fs from 'node:fs/promises'
import { createDefineConfig, loadConfig } from 'c12'
import type { UserConfig } from './types'
import { getDefaultUserConfig } from './defaults'
import { configName } from './constants'

export function getConfig(cwd?: string) {
  return loadConfig<UserConfig>({
    name: configName,
    defaults: {
      ...getDefaultUserConfig(),
    },
    cwd,
  })
}

export const defineConfig = createDefineConfig<UserConfig>()

export function initConfig(cwd: string) {
  return fs.writeFile(
    path.resolve(cwd, `${configName}.config.ts`),
    `import { defineConfig } from 'tailwindcss-patch'

export default defineConfig({})
`,
    'utf8',
  )
}
