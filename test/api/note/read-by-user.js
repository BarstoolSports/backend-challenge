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
    describe('read-by-user', () => {
      let globalAuth
      let note
      let anotherUserNote

      before(async () => {
        globalAuth = await mockData.mockAuthAndUser()
        note = await mockData.mockNote({ user: globalAuth.user })
        anotherUserNote = await mockData.mockNote()
      })

      it('should fail with invalid auth', () => {
        return agent.client().get(`/user/${globalAuth.user}/notes`).expect(401).promise()
      })

      it('should return user notes', async () => {
        const notes = await agent
          .client()
          .get(`/user/${globalAuth.user}/notes`)
          .set('authorization', globalAuth.token)
          .expect(200)
          .promise()
        should.exist(notes)
        notes.should.have.length(1)
        notes[0].title.should.equal(note.title)
        notes[0].title.should.not.equal(anotherUserNote.title)
      })
    })
  })
})
