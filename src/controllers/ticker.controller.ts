import { getTickers, getTicker as getTickerById, createTicker as create, ITickerPayload } from '../models/ticker.model'
import { Ticker } from '../entity'

export const getAll = async (): Promise<Ticker[]> => {
  const tickers = await getTickers()
  return tickers
}

export const getTicker = async (id: string): Promise<Ticker | null> => {
  // validate input

  // finish validation
  const ticker = await getTickerById(Number(id))
  return ticker
}

export const createTicker = async (body: ITickerPayload): Promise<Ticker> => {
  // validate input

  // finish validation
  return await create(body)
}
