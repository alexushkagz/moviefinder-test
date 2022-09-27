import React, { useId } from 'react';
import classes from './Select.module.css';

const Select = (props) => {
    const labelId = useId();

    const insertPlaceholder = () => {
        if (props.placeholder)
            return <option style={{color: 'gray'}} value="" disabled selected hidden>{props.placeholder}</option>;
        else return null
    }

    return (
        <div className={classes.selectWrapper}>
            <label className={classes.label} htmlFor={labelId}>{props.label}</label>
            <select className={classes.select} id={labelId} name={props.name}>
                {insertPlaceholder()}
                {props.options.map((option, index) => 
                    <option className={classes.option} key={index} value={option.value}>
                        {option.text}
                    </option>
                )}
            </select>
        </div>
    )
}

export default Select