import type { JobDefinition } from '@desktop-automation/contracts'

export type CompiledSchedule = {
  platform: 'windows' | 'macos'
  nativeId: string
  payload: Record<string, unknown>
}

export function validateSimpleSchedule(job: JobDefinition): void {
  const { hour, minute, days } = job.schedule

  if (hour < 0 || hour > 23) {
    throw new Error('hour must be between 0 and 23')
  }

  if (minute < 0 || minute > 59) {
    throw new Error('minute must be between 0 and 59')
  }

  if (!Array.isArray(days) || days.length === 0) {
    throw new Error('at least one day must be selected')
  }
}

export function compileForWindows(job: JobDefinition): CompiledSchedule {
  validateSimpleSchedule(job)

  return {
    platform: 'windows',
    nativeId: `desktop-automation-${job.id}`,
    payload: {
      scheduler: 'schtasks',
      days: job.schedule.days,
      hour: job.schedule.hour,
      minute: job.schedule.minute
    }
  }
}

export function compileForMac(job: JobDefinition): CompiledSchedule {
  validateSimpleSchedule(job)

  return {
    platform: 'macos',
    nativeId: `com.hagayo.desktop-automation.${job.id}`,
    payload: {
      scheduler: 'launchd',
      days: job.schedule.days,
      hour: job.schedule.hour,
      minute: job.schedule.minute
    }
  }
}
