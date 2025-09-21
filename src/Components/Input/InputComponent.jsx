import React from 'react';
import classes from './InputStyle.module.css'

const InputComponent = ({onChange, placeholder, ...props}) => {
    return (
        <input className={classes.input} {...props} onChange={onChange} placeholder={placeholder} />
    )
}

export default InputComponent;