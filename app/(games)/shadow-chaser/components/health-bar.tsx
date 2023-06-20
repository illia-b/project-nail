"use client"

import { usePlayerState } from '../states/player-state'

const HealthBar = () => {
    const { state, dispatch } = usePlayerState()

    let healthString = "❤".repeat(state.health)
    return (
        <>
            <div>
                <span>Health: </span>
                <span className='tracking-[-0.3em]'>{healthString}</span>
            </div>
        </>
    )
}
export default HealthBar