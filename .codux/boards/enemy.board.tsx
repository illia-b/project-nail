import React from 'react'
import { createBoard } from '@wixc3/react-board';
import { PlayerState } from './../../app/(games)/shadow-chaser/states/player-state'
import Enemy from './../../app/(games)/shadow-chaser/components/fight/enemy'

const createContext = () => ({
    state: {
        fight: {
            "prepare": false,
            enemies: [
                {
                    name: 'FIRST MARSH GOBLIN', rounds: 4, health: 3, damage: 2
                }
            ]
        }
    }
})
export default createBoard({
    name: 'Enemy',
    Board: () => <div>
        <PlayerState.Provider value={createContext()}>
            <Enemy index={0} />
        </PlayerState.Provider>
    </div>,
    isSnippet: true,
    environmentProps: {
        windowBackgroundColor: '#383737',
        canvasBackgroundColor: '#e5d2d2',
        windowWidth: 1646,
        windowHeight: 779
    }
});
