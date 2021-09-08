import React from 'react'
import TrainerItem from './TrainerItem'

const Trainers = ({trainers}) => {
    return (
        <div>
            {trainers.map( trainer => (
                <TrainerItem key={trainer.trainer_id} trainer={trainer}/>
            ))}
        </div>
    )
}

export default Trainers