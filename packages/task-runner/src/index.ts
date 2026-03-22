import type { BrowserTask, DesktopMacroTask, ExecutionRecord, JobDefinition, LocalCommandTask } from '@desktop-automation/contracts'

export async function runJob(job: JobDefinition): Promise<ExecutionRecord> {
  const startedAt = new Date().toISOString()

  try {
    switch (job.task.kind) {
      case 'local-command':
        await runLocalCommand(job.task)
        break
      case 'desktop-macro':
        await runDesktopMacro(job.task)
        break
      case 'browser':
        await runBrowserTask(job.task)
        break
      default:
        throw new Error('unsupported task kind')
    }

    return {
      id: crypto.randomUUID(),
      jobId: job.id,
      status: 'success',
      startedAt,
      finishedAt: new Date().toISOString(),
      summary: 'Task completed successfully'
    }
  } catch (error) {
    return {
      id: crypto.randomUUID(),
      jobId: job.id,
      status: 'failed',
      startedAt,
      finishedAt: new Date().toISOString(),
      errorMessage: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

async function runLocalCommand(task: LocalCommandTask): Promise<void> {
  console.log('local command skeleton', task.command, task.args ?? [])
}

async function runDesktopMacro(task: DesktopMacroTask): Promise<void> {
  console.log('desktop macro skeleton', task.windowTitle ?? '(no title)')
  for (const step of task.steps) {
    console.log('macro step', step.type)
  }
}

async function runBrowserTask(task: BrowserTask): Promise<void> {
  console.log('browser task skeleton', task.browser, task.profileId)
  for (const step of task.steps) {
    console.log('browser step', step.type)
  }
}
