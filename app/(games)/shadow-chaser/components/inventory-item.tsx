import { usePlayerState, removeItem, addItem } from "../states/player-state"

const InventoryItem = ({item}) => {
    const { state, dispatch } = usePlayerState()

    return (
        <div key={item} className='
            border-2 border-gray-400 rounded-md w-1/2 
            flex 
            p-1 space-x-1
            justify-between items-center
            '>
            <span>{item}</span>
            <div className="space-x-1">
                <span hidden={state.inventory[item] == 1}>{state.inventory[item]}</span>

                <button onClick={() => dispatch(addItem(item))}>➕</button>
                <button onClick={() => dispatch(removeItem(item))}>❌</button>
            </div>
        </div>)    
}
export default InventoryItem