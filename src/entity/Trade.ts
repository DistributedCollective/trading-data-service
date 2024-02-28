import {
  Entity,
  Column,
  Index,
  JoinColumn,
  ManyToOne
} from 'typeorm'

import { AbstractBaseEntity } from './AbstractBase.entity'
import { Ticker } from './Ticker'

@Entity()
@Index(['baseTicker', 'quoteTicker', 'date'])
export class Trade extends AbstractBaseEntity {
  @ManyToOne(() => Ticker, { cascade: true })
  @JoinColumn()
  baseTicker!: Ticker

  @Column({ type: 'decimal', precision: 45, scale: 32 })
  baseAmount!: string

  @ManyToOne(() => Ticker, { cascade: true })
  @JoinColumn()
  quoteTicker!: Ticker

  @Column({ type: 'decimal', precision: 45, scale: 32 })
  quoteAmount!: string

  @Column({ type: 'decimal', precision: 45, scale: 32 })
  rate!: number

  @Column()
  date!: Date
}
