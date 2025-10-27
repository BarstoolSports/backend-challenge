let should
let agent
let mockData

before(() => {
  should = require('should')
  agent = require('test/lib/agent')
  mockData = require('test/lib/mock-data')
})

const tooLongTitle = 'a'.repeat(65)
const tooLongMessage = 'a'.repeat(650)

describe('api', () => {
  describe('note', () => {
    describe('create', () => {
      let globalAuth

      before(async () => {
        globalAuth = await mockData.mockAuthAndUser()
      })

      it('should fail with invalid auth', () => {
        return agent.client().post('/note').send({ title: 'Test Note', message: 'Test message' }).expect(401).promise()
      })

      it('should create a note', async () => {
        const note = await agent
          .client()
          .post('/note')
          .set('authorization', globalAuth.token)
          .send({ title: 'Test Note', message: 'Test message' })
          .expect(201)
          .promise()

        note.title.should.equal('Test Note')
        note.message.should.equal('Test message')
        note.userId.should.equal(globalAuth.user)
        should.exist(note.id)
        should.exist(note.createdAt)
        should.exist(note.modifiedAt)
      })

      it('should fail with missing title', () => {
        return agent
          .client()
          .post('/note')
          .set('authorization', globalAuth.token)
          .send({ message: 'Test message' })
          .expect(422)
          .promise()
      })

      it('should fail with missing message', () => {
        return agent
          .client()
          .post('/note')
          .set('authorization', globalAuth.token)
          .send({ title: 'Test Note' })
          .expect(422)
          .promise()
      })

      it('should fail with title too long', () => {
        return agent
          .client()
          .post('/note')
          .set('authorization', globalAuth.token)
          .send({ title: tooLongTitle, message: 'Test message' })
          .expect(422)
          .promise()
      })

      it('should fail with message too long', () => {
        return agent
          .client()
          .post('/note')
          .set('authorization', globalAuth.token)
          .send({ title: 'Test Note', message: tooLongMessage })
          .expect(422)
          .promise()
      })
    })
  })
})
