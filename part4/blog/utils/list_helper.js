var _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if(blogs.length === 0){
    return 0
  } else if (blogs.length === 1) {
    return blogs[0].likes
  }
  return blogs.reduce((sum, b) => sum + b.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((max, blog) =>
      blog.likes > max.likes ? blog : max)
}

const mostBlogs = (blogs) => {
  const authorCounts = _.countBy(blogs, 'author')
  const topAuthor = _.maxBy(
    Object.entries(authorCounts), ([, count]) => count
  )
  return {
    author: topAuthor[0],
    blogs: topAuthor[1]
  }
}

const mostLikes = (blogs) => {
  const authorLikes = _.chain(blogs)
    .groupBy('author')
    .map((authorBlogs, author) => ({
      author,
      likes: _.sumBy(authorBlogs, 'likes')
    }))
    .value()
  return _.maxBy(authorLikes, 'likes')
}

module.exports = {totalLikes, dummy, favoriteBlog, mostBlogs, mostLikes}
