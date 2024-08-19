"use client"

import Button from '../../../components/button'
import { usePlayerState, changeHealth, setHealth, throwDice } from '../states/player-state'

const ActionsList = () => {
    const {state, dispatch} = usePlayerState()

    return (
        <>
            <div>
                <Button disabled={state.health >= 12} className='bg-green-500' onClick={() => dispatch(changeHealth(1))}>Gain 1❤</Button> 
                <Button disabled={state.health >= 12} className='bg-green-500' onClick={() => dispatch(changeHealth(2))}>2❤</Button> 
                <Button disabled={state.health >= 12} className='bg-green-500' onClick={() => dispatch(changeHealth(3))}>3❤</Button> 
                <Button disabled={state.health >= 12} className='bg-green-500' onClick={() => dispatch(changeHealth(4))}>4❤</Button> 
                <Button disabled={state.health >= 12} className='bg-green-500' onClick={() => dispatch(changeHealth(5))}>5❤</Button> 
                <br/>
                <Button disabled={state.health <= 0} className='bg-red-500' onClick={() => dispatch(changeHealth(-1))}>Lose 1🤍</Button>
                <Button disabled={state.health <= 0} className='bg-red-500' onClick={() => dispatch(changeHealth(-2))}>2🤍</Button>
                <Button disabled={state.health <= 0} className='bg-red-500' onClick={() => dispatch(changeHealth(-3))}>3🤍</Button>
                <Button disabled={state.health <= 0} className='bg-red-500' onClick={() => dispatch(changeHealth(-4))}>4🤍</Button>
                <Button disabled={state.health <= 0} className='bg-red-500' onClick={() => dispatch(changeHealth(-5))}>5🤍</Button>
                <br/>
                <Button className='text-4xl pb-2 pt-1 mr-4 rounded-lg' onClick={() => dispatch(setHealth(12))}>Full ❤</Button>
                <Button className='text-4xl pb-2 pt-1 mr-4 rounded-lg' onClick={() => dispatch(throwDice(1))}>🎲</Button>
                <Button className='text-4xl pb-2 pt-1 rounded-lg' onClick={() => dispatch(throwDice(2))}>🎲🎲</Button>

            </div>
        </>
    )
}   
export default ActionsList