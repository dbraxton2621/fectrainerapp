import React from 'react'

const TrainerItem = ({trainer}) => {
    return (
        <div>
            <h1>{`Name: ${trainer.first_name} ${trainer.last_name}`}</h1>
            <p>{`Email: ${trainer.email}`}</p>
            <p>{`Phone: ${trainer.phone_number}`}</p>
        </div>
    )
}

export default TrainerItem