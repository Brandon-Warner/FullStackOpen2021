import React, { useState } from 'react'

const buttonStyle = {
    fontFamily: 'Montserrat, sansSerif',
    backgroundColor: '#f7b1a3',
}

const Toggleable = props => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }
    return (
        <div>
            <div style={hideWhenVisible}>
                <button style={buttonStyle} onClick={toggleVisibility}>
                    {props.buttonLabel}
                </button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <button style={buttonStyle} onClick={toggleVisibility}>
                    cancel
                </button>
            </div>
        </div>
    )
}

export default Toggleable
