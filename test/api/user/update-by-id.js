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
        const body = {
          firstName: 'Jeffrey',
          lastName: 'Pope',
          email: 'jpopeufl@gmail.com'
        }
        return agent.client().put(`/user/${globalAuth.user}`).send(body).expect(401).promise()
      })

      it('should update user', async () => {
        const body = {
          firstName: 'Jeffrey',
          lastName: 'Pope',
          email: 'jpopeufl@gmail.com'
        }
        const user = await agent
          .client()
          .put(`/user/${globalAuth.user}`)
          .send(body)
          .set('authorization', globalAuth.token)
          .expect(200)
          .promise()
        should.exist(user)
        user.id.should.equal(globalAuth.user)
      })
    })
  })
})
