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
    describe('notes', () => {
      let globalAuth
      let noteService

      before(async () => {
        globalAuth = await mockData.mockAuthAndUser()
        noteService = require('app/modules/note')

        await noteService.create({
          title: 'Test Note 1',
          message: 'This is first test note',
          userId: globalAuth.user
        })

        await noteService.create({
          title: 'Test Note 2',
          message: 'This is second test note',
          userId: globalAuth.user
        })
      })

      it('should fail with invalid auth', () => {
        return agent.client().get(`/user/${globalAuth.user}/notes`).expect(401).promise()
      })

      it('should list user notes', async () => {
        const notes = await agent
          .client()
          .get(`/user/${globalAuth.user}/notes`)
          .set('authorization', globalAuth.token)
          .expect(200)
          .promise()

        should.exist(notes)
        notes.should.be.an.Array()
        notes.length.should.equal(2)
        notes[0].userId.should.equal(globalAuth.user)
      })

      it('should forbid reading user notes of non-current user', async () => {
        return agent
          .client()
          .get(`/user/${globalAuth.user}123/notes`)
          .set('authorization', globalAuth.token)
          .expect(403)
          .promise()
      })
    })
  })
})
