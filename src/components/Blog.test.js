import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
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
