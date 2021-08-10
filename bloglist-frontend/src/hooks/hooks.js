import { useState } from 'react'

const useField = type => {
    const [value, setValue] = useState('')

    const onChange = event => {
        setValue(event.target.value)
    }
    const reset = () => {
        setValue('')
    }

    const effect = {
        type,
        value,
        onChange,
    }

    return {
        effect,
        reset,
    }
}

export default useField
