import React from 'react'
import { createBoard } from '@wixc3/react-board'
import ShadowsChaser from '../../app/(games)/shadow-chaser/page'
import { PlayerState } from '../../app/(games)/shadow-chaser/states/player-state'

const createContext = () => ({
    state: {
        fight: {
            inFight: false,
            prepare: false,
            enemies: [
                
            ]
        }
    }
})

export default createBoard({
    name: 'Shadow Chaser',
    Board: () => <div>
        <PlayerState.Provider value={createContext()}>
            <ShadowsChaser />
        </PlayerState.Provider></div>,
    isSnippet: true,
    environmentProps: {
        windowWidth: 714
    }
});
