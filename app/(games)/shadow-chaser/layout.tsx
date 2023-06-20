"use client"

import { PlayerStateProvider } from "./states/player-state"

export default function ShadowChaserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (      
    <>
    <PlayerStateProvider>
      {children}
    </PlayerStateProvider>
    </>      
  )
}
