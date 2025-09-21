import React from 'react';
import classes from "./Select.module.css"

const SelectComponent = ({options, defaultValue, value, onChange}) => {
    console.log("Select component " + options);
    return (


        <select className={classes.select}
                value={value}
                onChange= {event=>
                {
                    console.log(event.target.value)
                    return onChange(event)}
        }>

            <option disabled value="">
                {defaultValue}
            </option>


            {options.map(option => (
                <option key={option.value} value={option.value}>{option.name}</option>
            ))}



        </select>
    )

}


export default SelectComponent;