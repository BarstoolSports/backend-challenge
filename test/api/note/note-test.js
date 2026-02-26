let should
let agent
let mockData
let NoteModel

before(async () => {
  should = require('should')
  agent = require('test/lib/agent')
  mockData = require('test/lib/mock-data')
})

describe('api', () => {
  describe('note', () => {
    describe('insert-by-id', () => {
        let globalAuth
        before(async () => {
          globalAuth = await mockData.mockAuthAndUser()
       })
  
        it('should insert notes for the currently logged in user', async () => {
          const response = await agent
            .client()
            .post(`/note`)
            .set('authorization', globalAuth.token)
            .send({ 
                userId: globalAuth.user,
                title: "Backend-challenge test",
                message: "testing api for backend challenge"
            })
            .expect(200)
            .promise()
          
            response.should.have.property('userId')
            response.should.have.property('title')
            response.should.have.property('message')
            response.userId.should.equal(globalAuth.user)
          })
    })


    describe('read-by-id', () => {
        let globalAuth
        before(async () => {
          globalAuth = await mockData.mockAuthAndUser()
       })
  
        it('should return notes notes for successfully logged in user', async () => {
          const response = await agent
            .client()
            .post(`/note`)
            .set('authorization', globalAuth.token)
            .send({ 
                userId: globalAuth.user,
                title: "Backend-challenge test2",
                message: "testing api for backend challenge2"
            })
            .expect(200)
            .promise()
          
            response.should.have.property('userId')
            response.should.have.property('title')
            response.should.have.property('message')
            response.userId.should.equal(globalAuth.user)
          })
  
        it('should filter notes by message', async () => {
          const query = 'backend challenge' // matches the inserted title
          // Act
          const res = await agent
            .client()
            .get(`/user/${globalAuth.user}/notes?search=${query}`)
            .set('authorization', globalAuth.token)
              .expect(200)
              .promise()
          // Assert
          res.notes.should.be.Array()
          res.notes.length.should.be.above(0)
          res.notes.forEach(note => note.message.should.match(new RegExp(query, 'i')))

        });

        it('should paginate notes correctly', async () => {

           await agent
            .client()
            .post(`/note`)
            .set('authorization', globalAuth.token)
            .send({ 
                userId: globalAuth.user,
                title: "Backend-challenge test2",
                message: "testing api for backend challenge2"
            })
            .expect(200)
            .promise()
          
            const page = 1;
            const limit = 1;

            const res = await agent
              .client()
              .get(`/user/${globalAuth.user}/notes?page=${page}&limit=${limit}`)
              .set('authorization', globalAuth.token)
              .expect(200)
            .promise();

            res.notes.should.be.Array()
            res.notes.length.should.equal(limit)           // 1 item on page
            res.pagination.should.have.property('total', 2) // total items across all pages
            res.pagination.should.have.property('page', page)   // 1
            res.pagination.should.have.property('limit', limit) // 1
            res.pagination.should.have.property('pages', 2)     // total=2, limit=1 => 2 pages
        });


        it('should sort results correctly', async () => {
            
            const sort = '-createdAt';

            // Fetch sorted notes
            const response = await agent
            .client()
            .get(`/user/${globalAuth.user}/notes?sort=${sort}`)
            .set('authorization', globalAuth.token)
            .expect(200)
            .promise();

            // Assert the sorting logic
            response.notes.should.be.Array();
            response.notes.length.should.be.above(1);
            new Date(response.notes[1].createdAt).getTime().should.be.below(new Date(response.notes[0].createdAt).getTime());
        });
    })



})

})