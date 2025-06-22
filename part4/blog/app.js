const blogRouter = require('./controllers/blogs')
const express = require('express')
const config = require('./utils/config')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')
const app = express()

logger.info('connecting to ', config.MONGODB_URI)
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected')
  })
  .catch((error) => {
    logger.error('error when connecting to MongoDB', error.message)
  })

app.use(express.json())
app.use(middleware.reqLog)
app.use('/api/blogs', blogRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
