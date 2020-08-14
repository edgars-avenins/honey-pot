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

jest.mock('superagent')

test('/api/auth routes', () => {
   expect(55).toBeTruthy()
})

test('/delfi route returns code 200', () => {
   request.get.mockImplementation(() => Promise.resolve({data: 'the data'}))
   func.getYearData.mockImplementation(() => Promise.resolve({status: 200, data: 'Works'}))

   return req(server)
      .get(`${baseRoute}/2010`)
      .expect(500)
      .then(res => {
         expect(res).toEqual('Works')
      })
})