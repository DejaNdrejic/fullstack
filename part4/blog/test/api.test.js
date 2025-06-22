const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('node:assert')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const initialBlogs = [
  {
    title: "Test Blog 1",
    author: "Author 1",
    url: "https://test1.com",
    likes: 5
  },
  {
    title: "Test Blog 2",
    author: "Author 2",
    url: "https://test2.com",
    likes: 10
  }
]

// reset DB to test data
beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(initialBlogs);
});

test('testing HTTP GET req to /api/blogs returns JSON',async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('unique identifier exists under var name id', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  assert.ok(response.body[0].id)
})

test('HTTP POST req to /api/blogs => blog post, saved to DB and blogs.length === +1', async () => {
  const newPost = {
    title: 'newBlogPost',
    author: 'Unknown',
    url: 'https://whoami.???',
  }
  await api
    .post('/api/blogs')
    .send(newPost)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  const response = await api.get('/api/blogs')
  const title = response.body.map(r => r.title)
  assert.strictEqual(response.body.length, initialBlogs.length + 1)
  assert(title.includes('newBlogPost'))
})

test('if likes property missing defaults to 0', async () => {
   const newPost2 = {
    title: 'newBlogPost2',
    author: 'Unknown2',
    url: 'https://whoami2.???',
  }
  const response = await api
    .post('/api/blogs')
    .send(newPost2)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  assert.strictEqual(response.body.likes, 0)
})

test('in HTTP POST when title or url missing throw 400', async () => {
    const missURL = {
    title: "Test",
    author: 'Unknown2',
    likes: 21
  }
    const missTitle = {
    author: 'Unknown2',
    url: 'https:/test.com',
    likes: 21
  }
   await api
    .post('/api/blogs')
    .send(missURL)
    .expect(400)
    .expect('Content-Type', /application\/json/)

   await api
    .post('/api/blogs')
    .send(missTitle)
    .expect(400)
    .expect('Content-Type', /application\/json/)
})

test('deleting blog', async () => {
  const initial = await api.get('/api/blogs')
  const toDelete = inital.body[0]
  await api
    .delete(`/api/blogs/${toDelete.id}`)
    .expect(204)
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, initialBlogs.length - 1)
})

test('updating blog', async () => { 
  const inital = api.get('/api/blogs')
  const toUpdate = inital.body[0]
  const changedLikes = {likes: 100}
  const response = await api
    .put(`/api/blogs/${toUpdate.id}`)
    .send(changedLikes)
    .expect(200)
    .expect('Content-Type', /application\/json/)
  assert.strictEqual(response.body.likes, 100)
})

// close con
after(async () => {
  await mongoose.connection.close()
})
