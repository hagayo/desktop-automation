import type { JobDefinition } from '@desktop-automation/contracts'

export function renderApp(jobs: JobDefinition[]): string {
  return [
    '# Desktop Automation',
    '',
    `Loaded jobs: ${jobs.length}`,
    '',
    'This is the initial desktop app shell.'
  ].join('\n')
}
