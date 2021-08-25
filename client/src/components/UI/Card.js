import React from 'react'
import classes from './Card.module.css';

const Card = (props) => {
    return (
        <div className={classes["card-container"]}>
            <h4>{props.heading}</h4>
            <div>{props.count}</div>
        </div>
    )
}

export default Card;