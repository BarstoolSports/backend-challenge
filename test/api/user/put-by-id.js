let agent
let mockData

before(() => {
  agent = require('test/lib/agent')
  mockData = require('test/lib/mock-data')
})

describe('api', () => {
  describe('user', () => {
    describe('put-by-id', () => {

      let globalAuth
      before(async () => {
        globalAuth = await mockData.mockAuthAndUser()
      })

      it('should fail when current user does not match the user in the query', async () => {
        await agent.client()
          .put(`/user/${globalAuth.user + 1}`)
          .set('authorization', globalAuth.token)
          .send( { user: globalAuth.user } )
          .expect(403)
      })

    })
  })
})
