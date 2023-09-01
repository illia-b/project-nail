'use client'

import Abilities from './abilities';
import HealthBar from './health-bar';
import Inventory from './inventory';

const PlayerStatus = () => {
    return (
        <>
            <Abilities />
            <Inventory />
            <HealthBar />
        </>
    )
}
export default PlayerStatus;