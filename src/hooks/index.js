import { useState } from 'react'

export const useField = name => {
    const [value, setValue] = useState('')
    console.log('name: ', name)
    const onChange = event => {
        setValue(event.target.value)
    }
    console.log('value: ', value)

    return {
        name,
        value,
        onChange,
    }
}
