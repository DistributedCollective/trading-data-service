/* eslint-env jest */
import app from './app'
import request from 'supertest'

it('testing to See if Jest Works', () => {
  expect(1).toBe(1)
})

describe('GET /', () => {
  it('responds to GET / request', async () => {
    const result = await request(app).get('/').send()
    expect(result.status).toBe(200)
    expect(result.text).toBe('Sovryn Trading Data Service Running. Stay Sovryn.')
  })
})

describe('GET /time', () => {
  it('responds to GET /time request', async () => {
    const now = Math.floor(Date.now() / 1000)
    const result = await request(app).get('/time').send()
    expect(result.status).toBe(200)
    expect(Number(result.text)).toBeCloseTo(now)
  })
})
