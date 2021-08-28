import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('form receives title, author, url when new blog is created', () => {
    const createBlog = jest.fn()

    const component = render(<BlogForm />)

    const title = component.container.querySelector('.title')
    const author = component.container.querySelector('.author')
    const url = component.container.querySelector('.url')
    const form = component.container.querySelector('.formDiv')

    fireEvent.change(title, {
        target: { value: 'title1' },
    })
    fireEvent.change(author, {
        target: { value: 'author1' },
    })
    fireEvent.change(url, {
        target: { value: 'url1' },
    })

    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
})
