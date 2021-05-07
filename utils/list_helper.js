// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogList) =>
    blogList.reduce((likes, blog) => {
        return likes + blog.likes
    }, 0)

const favoriteBlog = (blogList) => {
    blogList.sort((a, b) => {
        a.likes > b.likes ? -1 : 1
        console.table(blogList)
    })
    return blogList[0]
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
}
