"use client"

import Button from '../../../components/button'
import { useState, useRef, useEffect } from 'react'
import { usePlayerState, addItem } from '../states/player-state'

const AddItem = () => {
    const [isIdle, setIsIdle] = useState(true)
    const {playerState: state, dispatch} = usePlayerState()
    const newItemRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        newItemRef.current.onkeydown = (e) => {
            if (e.key === 'Enter') {
                confirmItem()
            }
        }
    }, [])

    useEffect(() => {
        if (!isIdle) {
          newItemRef.current?.focus();
        }
      }, [isIdle]);

    const newItem = () => {
        setIsIdle(false)
    }

    const confirmItem = () => {
        let newItem = newItemRef.current.value.toUpperCase()
        newItemRef.current.value = ""
        setIsIdle(true)
        dispatch(addItem(newItem))
    }

    const cancelItem = () => {
        newItemRef.current.value = ""
        setIsIdle(true)
    }

    return (
        <>
            <div id="idle" hidden={!isIdle}>
                <Button onClick={newItem}>➕</Button>
            </div>
            <div id="addItem" hidden={isIdle}>
                <input 
                    className='border-1 border-gray-400 rounded-md px-1 m-1 w-44 inline-block' 
                    ref={newItemRef} type="text" placeholder="Item" />
                <Button onClick={confirmItem}>➕</Button>
                <Button onClick={cancelItem}>✖</Button>
            </div>
        </>
    )
}

export default AddItem