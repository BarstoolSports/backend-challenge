let should
let agent
let mockData

before(() => {
  should = require('should')
  agent = require('test/lib/agent')
  mockData = require('test/lib/mock-data')
})

describe('api', () => {
  describe('auth', () => {
    describe('login', () => {
      let globalEmail
      let globalPassword
      let globalAuth

      before(async () => {
        globalEmail = `${mockData.uuid()}@test.com`
        globalPassword = mockData.uuid()
        globalAuth = await mockData.mockAuthAndUser({
          email: globalEmail,
          password: await mockData.hash(globalPassword)
        })
      })

      it('should login a user', async () => {
        const body = {
          email: globalEmail,
          password: globalPassword
        }
        const { auth, user } = await agent.client().post('/auth/login').send(body).expect(200).promise()
        should.exist(auth)
        should.exist(user)
        globalAuth.id.should.equal(auth.id)
        auth.user.should.equal(user.id)
        user.email.should.equal(body.email)
      })
    })
  })
})
