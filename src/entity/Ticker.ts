import {
  Entity,
  Column,
  Unique,
  OneToMany
} from 'typeorm'

import { Length } from 'class-validator'

import { AbstractBaseEntity } from './AbstractBase.entity'
import { Trade } from './Trade'

@Entity()
@Unique(['chainId', 'address'])
export class Ticker extends AbstractBaseEntity {
  @Column({ unique: true })
  @Length(2, 10)
  symbol!: string

  @Column()
  @Length(2, 128)
  name!: string

  @Column()
  @Length(1, 8)
  chainId!: number

  @Column({ nullable: true })
  address!: string

  @Column({ nullable: true })
  description!: string

  @Column({ default: 18 })
  decimals!: number

  @OneToMany(() => Trade, trade => trade.baseTicker)
  baseTrades!: Trade[]

  @OneToMany(() => Trade, trade => trade.quoteTicker)
  quoteTrades!: Trade[]
}
