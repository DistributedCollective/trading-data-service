import { parse } from 'graphql'
import { GraphQLClient, gql } from 'graphql-request'
import { ErrorPolicy } from 'graphql-request/build/esm/types'
import config from '../config/config'

import { cleanUrl } from './helpers'

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
  positionSize: string
  timestamp: number
  entryPrice: string
  collateralToken: Token
  loanToken: Token
}

export const queryTrades = async (startTime: number, endTime: number) => {
  const document = parse(gql`
    query ($startTime: Int!, $endTime: Int!) {
      trades(where: { timestamp_gte: $startTime, timestamp_lte: $endTime }) {
        id
        positionSize
        timestamp
        entryPrice
        collateralToken {
          id
        }
        loanToken {
          id
        }
      }
    }
  `);

  return await client
    .request<{ trades: Trade[] }>({
      document,
      variables: {
        startTime: (Math.floor(startTime / 1e3) | 0),
        endTime: (Math.floor(endTime / 1e3) | 0)
      }
    })
    .then((res) => res.trades);
};
