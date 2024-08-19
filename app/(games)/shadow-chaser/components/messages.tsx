'use client'

import { usePlayerState } from "../states/player-state";

const Messages = () => {
    const {state, dispatch} = usePlayerState()

    const renderLogMessages = (logs: string[]) => {
        return logs.map((log, i) => {
            return <div key={i} className={ i === 0 ? '' : 'text-base text-gray-800' }>{log}</div>
        })
    }

    return (<>
        {state.messages.length
            ? <div className='bg-blue-100 h-20 overflow-y-auto'>
                {renderLogMessages(state.messages)}
            </div>
            : <div className='bg-blue-100 h-20 text-base font-light text-center text-gray-800 flex items-center justify-center'>
                <em>No messages</em>
            </div>
        }
    </>)
}

export default Messages;