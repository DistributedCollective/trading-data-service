import { getRepository } from 'typeorm'
import { validate } from 'class-validator'
import { Ticker } from '../entity'
import { ValidateError } from '../errorHandlers/baseError'

export interface ITickerPayload {
  symbol: string
  name: string
  chainId: number
  address: string
  description: string
  decimals: number
}

export const getTickers = async (): Promise<Ticker[]> => {
  const tickerRepository = getRepository(Ticker)
  return await tickerRepository.find()
}

export const getTicker = async (id: number): Promise<Ticker | null> => {
  const tickerRepository = getRepository(Ticker)
  const user = await tickerRepository.findOne({ id: id })
  if (user == null) return null
  return user
}

export const createTicker = async (payload: ITickerPayload): Promise<Ticker> => {
  const tickerRepository = getRepository(Ticker)
  const ticker = new Ticker()
  ticker.symbol = payload.symbol.toUpperCase()
  ticker.name = payload.name
  ticker.chainId = payload.chainId
  ticker.address = payload.address.toLowerCase()
  ticker.description = payload.description
  ticker.decimals = payload.decimals

  const errors = await validate(ticker)
  if (errors.length > 0) {
    throw new ValidateError(errors)
  } else {
    return await tickerRepository.save({
      ...ticker,
      ...payload
    })
  }
}
