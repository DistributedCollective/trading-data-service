import { parse } from 'graphql'
import { GraphQLClient, gql } from 'graphql-request'
import { ErrorPolicy } from 'graphql-request/build/esm/types'
import config from '../config/config'

import { cleanUrl } from './helpers'
import dayjs from 'dayjs'

export const client = new GraphQLClient(cleanUrl(config.subgraph.url), {
  errorPolicy: config.subgraph.errorPolicy as ErrorPolicy
})

interface Token {
  id: string
  name: string
  symbol: string
  decimals: number
}

export const queryTokens = async (): Promise<Token[]> => {
  const document = parse(gql`
    query {
      tokens {
        id
        name
        symbol
        decimals
      }
    }
  `)

  return await client
    .request<{ tokens: Token[] }>({ document })
    .then((res) => res.tokens)
}

interface Trade {
  id: string
  timestamp: number
  _amount: string
  _return: string
  _fromToken: Token
  _toToken: Token
}

export const queryTrades = async (
  startTime: dayjs.Dayjs,
  endTime: dayjs.Dayjs
): Promise<Trade[]> => {
  const document = parse(gql`
    query ($startTime: Int!, $endTime: Int!) {
      conversions(where: { timestamp_gt: $startTime, timestamp_lte: $endTime }) {
        timestamp
        id
        _amount
        _return
        _fromToken {
          id
        }
        _toToken {
          id
        }
      }
    }
  `)

  return await client
    .request<{ conversions: Trade[] }>({
    document,
    variables: {
      startTime: startTime.unix(),
      endTime: endTime.unix()
    }
  })
    .then((res) => res.conversions)
}
