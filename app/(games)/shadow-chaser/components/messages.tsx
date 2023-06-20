'use client'

import { usePlayerState } from "../states/player-state";

const Messages = () => {
    const {state, dispatch} = usePlayerState()

    let topMessage = state.messages[0]
    let prevMessage = state.messages[1]

    return (<>
        {topMessage ? 
        <div className=''>
            {topMessage}
            {prevMessage && <div className='text-base text-gray-500'>{prevMessage}</div>}
        </div>
        : 
        <div className='text-base font-light text-gray-800'>
            <em>
            No messages
            </em>
        </div>
        }
    </>)
}

export default Messages;