let should
let agent
let mockData

before(() => {
  should = require('should')
  agent = require('test/lib/agent')
  mockData = require('test/lib/mock-data')
})

describe('api', () => {
  describe('note', () => {
    describe('create-test', () => {
      let globalAuth

      before(async () => {
        globalAuth = await mockData.mockAuthAndUser()
      })

      it('should fail with invalid auth', () => {
        return agent.client().post(`/note`).expect(401).promise()
      })

      it('should create a new note for the user', async () => {
        const body = {
          title: mockData.uuid(),
          message: mockData.uuid()
        }
        const note = await agent
          .client()
          .post(`/note`)
          .send(body)
          .set('authorization', globalAuth.token)
          .expect(200)
          .promise()
        should.exist(note)
      })
    })
  })
})
