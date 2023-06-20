'use client'

import Abilities from './abilities';
import HealthBar from './health-bar';
import Inventory from './inventory';

const PlayerStatus = () => {
    return (
        <>
            <HealthBar />
            <Abilities />
            <Inventory />
        </>
    )
}
export default PlayerStatus;