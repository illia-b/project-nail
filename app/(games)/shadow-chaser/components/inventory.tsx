"use client"

import { PlayerState, usePlayerState, removeItem } from '../states/player-state'
import AddItem from './add-item'
import InventoryItem from './inventory-item'

const Inventory = () => {
    const { state, dispatch }: { state: PlayerState, dispatch: (any) => void } = usePlayerState()

    let items = Object.entries(state.inventory).filter(([key, value]) => value > 0).map(([key, value]) => { 
        return (
            <InventoryItem item={key} />
        ) 
    })
    return (
        <>
            <div className='flex w-full space-x-1 items-center'>
                <span>Inventory</span> 
                <span className='inline-block'><AddItem /></span>
            </div>
            <div className='flex w-full flex-wrap'>
                {items}
            </div>
        </>
    )
}
export default Inventory