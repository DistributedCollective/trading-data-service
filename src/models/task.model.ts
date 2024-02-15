import { getRepository } from 'typeorm'
import { Task, TaskType } from '../entity/Task'

export const getLastTaskRun = async (type: TaskType): Promise<Date | null> => {
  const taskRepository = getRepository(Task)
  const task = await taskRepository.findOne({ name: type })
  if (task == null) return null
  return task.date
}

export const setLastTaskRun = async (type: TaskType, date: Date = new Date()): Promise<void> => {
  const taskRepository = getRepository(Task)

  await taskRepository.upsert({
    name: type,
    date: date
  }, {
    conflictPaths: ['name'],
    skipUpdateIfNoValuesChanged: true,
    // @ts-expect-error - upsertType is not in the type definition
    upsertType: 'on-conflict-do-update'
  })
}
