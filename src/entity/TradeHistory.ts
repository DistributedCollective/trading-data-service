import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm'
import { AbstractBaseEntity } from './AbstractBase.entity'

@Entity()
@Index(['baseToken', 'quoteToken', 'timestamp'])
export class TradeHistory extends AbstractBaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  timestamp!: number

  @Column()
  baseToken!: string

  @Column()
  quoteToken!: string

  @Column({ type: 'decimal', precision: 45, scale: 32 })
  price!: string

  @Column({ type: 'decimal', precision: 45, scale: 32 })
  amount!: string
}
