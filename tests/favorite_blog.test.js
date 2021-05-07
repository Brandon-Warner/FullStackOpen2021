const listHelper = require('../utils/list_helper.js')

describe('favorite blog', () => {
    const blogs = [
        {
            title: 'React patterns',
            author: 'Michael Chan',
            likes: 7,
        },
        {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            likes: 5,
        },
    ]

    test('should be React Patters', () => {
        const result = listHelper.favoriteBlog(blogs)
        expect(result).toEqual({
            title: 'React patterns',
            author: 'Michael Chan',
            likes: 7,
        })
    })
})
