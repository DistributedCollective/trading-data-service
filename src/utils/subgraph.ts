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
