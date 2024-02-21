import { Entity, Column, Index } from 'typeorm'

import { AbstractBaseEntity } from './AbstractBase.entity'

export enum TaskType {
  TICKER_SEARCH = 'TICKER_SEARCH',
  TRADE_SEARCH = 'TRADE_SEARCH',
}

@Entity()
@Index(['name'])
export class Task extends AbstractBaseEntity {
  @Column({ length: 255, type: 'varchar', unique: true })
  name!: TaskType

  @Column()
  date!: Date
}
