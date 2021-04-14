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
    describe('register', () => {
      it('should register a user', async () => {
        const body = {
          email: `${mockData.uuid()}@test.com`,
          password: mockData.uuid(),
          firstName: mockData.uuid(),
          lastName: mockData.uuid()
        }
        const { auth, user } = await agent.client().post('/auth/register').send(body).expect(201).promise()
        should.exist(auth)
        should.exist(user)
        auth.user.should.equal(user.id)
        user.email.should.equal(body.email)
        user.firstName.should.equal(body.firstName)
        user.lastName.should.equal(body.lastName)
      })
    })
  })
})
