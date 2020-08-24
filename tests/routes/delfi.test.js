const req = require('supertest')
const request = require('superagent')
const server = require('../../server/server')

jest.mock('../../server/routes/delfi', () => {
    return {
        request: jest.fn()
    }
})

test('Delfi route returns 200', () => {
    request.get.mockImplementation(html => Promise.resolve('works'))
    
    return req(server)
        .get('/api/v1/delfi/2015')
        .expect(200)
        .then(res => {
            expect(res).toEqual('works')
        })
})