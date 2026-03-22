export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6

export type SimpleSchedule = {
  mode: 'simple'
  days: DayOfWeek[]
  hour: number
  minute: number
}

export type LocalCommandTask = {
  kind: 'local-command'
  command: string
  args?: string[]
  workingDir?: string
}

export type DesktopMacroStep =
  | { type: 'launch'; command: string; args?: string[] }
  | { type: 'wait'; ms: number }
  | { type: 'focusWindow'; titleIncludes: string }
  | { type: 'clickRelative'; x: number; y: number }
  | { type: 'typeText'; text: string }
  | { type: 'hotkey'; keys: string[] }

export type DesktopMacroTask = {
  kind: 'desktop-macro'
  windowTitle?: string
  steps: DesktopMacroStep[]
}

export type BrowserStep =
  | { type: 'goto'; url: string }
  | { type: 'waitFor'; selector: string; timeoutMs?: number }
  | { type: 'click'; selector: string }
  | { type: 'fill'; selector: string; value: string }
  | { type: 'extractText'; selector: string; saveAs: string }

export type BrowserTask = {
  kind: 'browser'
  browser: 'chrome' | 'chromium'
  profileId: string
  loginCheck?: { selector: string }
  steps: BrowserStep[]
}

export type TaskDefinition = LocalCommandTask | DesktopMacroTask | BrowserTask

export type JobDefinition = {
  id: string
  name: string
  enabled: boolean
  schedule: SimpleSchedule
  task: TaskDefinition
}

export type ExecutionStatus = 'pending' | 'running' | 'success' | 'failed'

export type ExecutionRecord = {
  id: string
  jobId: string
  status: ExecutionStatus
  startedAt: string
  finishedAt?: string
  summary?: string
  errorMessage?: string
}
