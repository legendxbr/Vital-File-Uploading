'use client'
import Avvvatars from 'avvvatars-react'

interface Avatar {
    user: string
    size: number,
    radius?: number,
}

export default function Avatar({ user, size, radius = 4 }: Avatar) {
    return (
        <Avvvatars value={user} size={size} radius={radius} />
    )
}