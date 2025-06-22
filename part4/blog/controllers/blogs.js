const blogRouter = require('express').Router()
const Blog = require('../models/blog')


// GET all
blogRouter.get('/', async (request, response) => {
 await Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

// POST new
blogRouter.post('/', async (request, response) => {
  const blog = await new Blog(request.body)
  if(!blog.title || !blog.url) {
    return response.status(400).json('Bad response')
  }
  blog.save().then((result) => {
    response.status(201).json(result)
  })
})

// DELETE single
blogRouter.delete('/:id', async (request,response, next)  => {
  try {
    const deleted = await Blog.findByIdAndDelete(request.params.id)
    if (!deleted) {
      return response.status(404)
    }
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

// UPDATE post
blogRouter.put('/:id', async (request, response, next) => {
  try {
  const likes = request.body.likes
  const updated = await Blog.findByIdAndUpdate(
    request.params.id,
    {likes: request.body.likes},
    {new: true, runValidators: true, context: 'query'})
  if (!updated) {
    return response.status(404).end()
  }
  response.json(updated)
  }catch(error) { 
    next(error)
  }
})

module.exports = blogRouter
