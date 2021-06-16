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

    expect(component.container).toHaveTextContent('blah blah blah')
    expect(component.container).toHaveTextContent('Dr Seuss')
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

    const mockHandler = jest.fn()

    const component = render(<Blog blog={blog} setVisible={mockHandler} />)
    const button = component.getByText('view')

    fireEvent.click(button)

    expect(component.container).toHaveTextContent('www.blahblah.com')
    expect(component.container).toHaveTextContent('5')
})
