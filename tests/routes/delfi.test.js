const req = require('supertest')
const request = require('superagent')

const server = require('../../server/server')
const func = require('../../server/functions/delfiFindYear')
const baseRoute = '/api/v1/delfi'



jest.mock('../../server/functions/delfiFindYear', () => {
   return {
      // request: jest.fn(),
      getYearData: jest.fn()
   }
})

test('/api/auth routes', () => {
   expect(55).toBeTruthy()
})

test('/delfi route returns code 200', () => {
   // request.mockImplementation(() => Promise.resolve(true))
   func.mockImplementation(() => Promise.resolve({status: 200, data: 'Works'}))

   return req(server)
      .get(`${baseRoute}/2010`)
      .expect(200)
      .then(res => {
         expect(res.text).toEqual('Works')
      })
})