let should
let agent
let mockData

before(() => {
  should = require('should')
  agent = require('test/lib/agent')
  mockData = require('test/lib/mock-data')
})

describe('api', () => {
  describe('user', () => {
    describe('update-by-id', () => {
      let globalAuth

      before(async () => {
        globalAuth = await mockData.mockAuthAndUser()
      })

      it('should fail with invalid auth', () => {
        return agent.client().get(`/user/${globalAuth.user}`).expect(401).promise()
      })

      it('should throw 403 for valid auth and non-matching userId param', async () => {
        const user = await agent
          .client()
          .put(`/user/${globalAuth.user}123`)
          .set('authorization', globalAuth.token)
          .expect(403)
          .promise()
      })

      it('should update user with valid auth', async () => {
        const user = await agent
          .client()
          .put(`/user/${globalAuth.user}`)
          .set('authorization', globalAuth.token)
          .expect(200)
          .promise()
        should.exist(user)
        user.id.should.equal(globalAuth.user)
      })
    })
  })
})
