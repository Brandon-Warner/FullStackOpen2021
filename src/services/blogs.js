import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = async newObject => {
    const config = {
        headers: { Authorization: token },
    }
    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

const postBlog = async blogObject => {
    const config = {
        headers: { Authorization: token },
    }
    console.log('blogObject: ', blogObject)
    const response = await axios.post(baseUrl, blogObject, config)
    console.log('response data: ', response.data)
    return response.data
}

const addLike = async blogId => {
    const config = {
        headers: { Authorization: token },
    }
    const blogs = await getAll()
    const blog = blogs.find(b => b.id === blogId)
    const updated = { ...blog, likes: blog.likes + 1 }
    console.log('updated:', updated)

    const response = await axios.put(
        `${baseUrl}/${updated.id}`,
        updated,
        config
    )
    console.log('response data: ', response.data)
    return response.data
}

const removeBlog = async blogId => {
    const config = {
        headers: { Authorization: token },
    }
    const blogs = await getAll()
    const blog = blogs.find(b => b.id === blogId)

    const response = await axios.delete(`${baseUrl}/${blog.id}`, config)
    console.log('response data: ', response.data)
    return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, setToken, postBlog, addLike, removeBlog }
