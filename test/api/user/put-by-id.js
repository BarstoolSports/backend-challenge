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
    describe('put-by-id', () => {
      let globalAuth
      let globalUser

      before(async () => {
        globalAuth = await mockData.mockAuthAndUser()
      })

      // should fail with invalid auth
      it('should pass if user ID matches the authenticated and currents user', async () => {
        const param = globalAuth.user
        const response = await agent
          .client()
          .put(`/user/${param}`)
          .set('authorization', globalAuth.token)
          .expect(200)
          .promise()
        should.exist(response)
        param.should.equal(globalAuth.user)
      })
    })
  })
})