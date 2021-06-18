import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders title and author', () => {
    const blog = {
        title: 'blah blah blah',
        author: 'Dr Seuss',
    }
    const component = render(<Blog blog={blog} />)

    expect(component.container).toHaveTextContent('blah blah blah Dr Seuss')
})

test('clicking button shows like and url', () => {
    const blog = {
        title: 'blah blah bluh',
        author: 'Dr Strange',
        likes: 5,
        url: 'www.blahblah.com',
        user: {
            name: 'Dave',
        },
    }

    const component = render(<Blog blog={blog} />)
    const button = component.getByText('view')
    fireEvent.click(button)
    expect(component.container).toHaveTextContent(
        'blah blah bluh Dr Strange hidewww.blahblah.com likes: 5 likeDaveremove'
    )
})
//  NEED TO COME BACK AND FIGURE THIS OUT
// test('clicking like button twice records 2 function calls', async () => {
//     const blog = {
//         title: 'blah blah bluh',
//         author: 'Dr Strange',
//         likes: 5,
//         url: 'www.blahblah.com',
//         user: {
//             name: 'Dave',
//         },
//     }
//     const mockHandler = jest.fn()
//     const component = render(<Blog blog={blog} like={mockHandler} />)
//     const button = component.getByText('view')
//     fireEvent.click(button)
//     const button1 = component.getByText('like')
//     fireEvent.click(button1)
//     fireEvent.click(button1)
//     expect(mockHandler.mock.calls).toHaveLength(2)
// })
