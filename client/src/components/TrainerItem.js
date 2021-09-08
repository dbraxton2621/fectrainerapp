import React from 'react'

const TrainerItem = ({trainer}) => {
    return (
        <div>
            <h1>{`Name: ${trainer.first_name} + ${trainer.last_name}`}</h1>
        </div>
    )
}

export default TrainerItem