process.env = Object.assign(process.env, {
  SUBGRAPH_URL: 'https://subgraph.test.sovryn.app/subgraphs/name/DistributedCollective/sovryn-subgraph',
  IS_TESTNET: true
})

/** @type {import('@ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node'
}
