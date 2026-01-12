import {useState} from "react"
import classes from "./ComboboxStyle.module.css"

const ComboboxComponent = ({options, onChange, value, placeholder}) => {
    const [open, setOpen] = useState(false)

    const handleChange = (val) => {
        onChange(val)
        setOpen(false)
        onChange(val)
    }

    return (

        <div className={classes.wrapper}>
            <input
                placeholder={placeholder}
                className={classes.input}
                value={value}
                onChange={e => {
                    handleChange(e.target.value)

                }}
                onFocus={() => !value && setOpen(true)}

            />
            {open && (
                <ul className={classes.list}>
                    {options
                        .filter(opt => opt.categoryName.toLowerCase().includes(value.toLowerCase()))
                        .map(opt => (
                            <li
                                className={classes.item}
                                key={opt.categoryName}
                                onClick={() => handleChange(opt.categoryName)}
                                style={{cursor: "pointer", listStyle: "none"}}
                            >
                                {opt.categoryName}
                            </li>
                        ))}
                </ul>
            )}
        </div>
    )
}

export default ComboboxComponent
