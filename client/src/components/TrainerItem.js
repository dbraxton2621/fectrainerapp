import React from 'react'

const TrainerItem = ({trainer}) => {
    return (
        <div className="trainerItemContainer">
            <h1 className="trainerName">{`Name: ${trainer.first_name} ${trainer.last_name}`}</h1>
            <p className="trainerEmail">{`Email: ${trainer.email}`}</p>
            <p className="trainerPhoneNumber">{`Phone: ${trainer.phone_number}`}</p>
        </div>
    )
}

export default TrainerItem