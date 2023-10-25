"use client"
import React, { useState, useEffect } from 'react'
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from 'react-icons/md'
import hero_names from '../../../lib/hero_names.json'
import { Stats } from '../../../lib/interface'

interface Data {
    data: string
}

export default function Matchups({data}: Data) {
    const [ matchup, setMatchup ] = useState([] as Stats[])
    const [toggle, setToggle] = useState(false)

    const handleToggle = () => {
        setToggle(!toggle)
    }

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const response = await fetch(`https://api.opendota.com/api/heroes/${data}/matchups`, {
            method: 'GET'
        })
        const json = await response.json()
        
        const match: Stats[] = json.filter((stats: Stats) => stats.games_played > 10).map((stats: Stats) => {
            const matchId = Object.values(hero_names).find(hero => hero.id === stats.hero_id)

            if (matchId) {
                const { localized_name, img } = matchId
                const winrate = Math.floor((stats.wins / stats.games_played) * 100)
                return { ...stats, localized_name, img, winrate }
            }
        })
        match.sort((a, b) => b.winrate - a.winrate)

        setMatchup(match)
    }
    
  return (
    <div>
        <div className='flex gap-1 items-center'>
            <p className='text-2xl font-bold text-accent'>Matchups</p>
            {toggle === false ? <MdOutlineKeyboardArrowDown onClick={handleToggle} size={20} className='cursor-pointer fill-accent border-2 border-accent/80 rounded-full' /> : <MdOutlineKeyboardArrowUp onClick={handleToggle} size={20} className='cursor-pointer fill-accent border-2 border-accent/80 rounded-full' /> }
        </div>
        {matchup !== null && toggle &&
        <div>
            <div className='py-3 border-b-2 border-secondary'>
                <p className='text-lg font-bold leading-5'>Heroes to ban</p>
                <div className='flex'>
                    {matchup.slice(-5).reverse().map((item, index) => (
                        <div key={index} className='relative flex flex-col items-center'>
                            <p>{item.winrate}%</p>
                            <img src={`https://cdn.cloudflare.steamstatic.com${item.img}`} />
                            <p className='absolute bottom-1 text-background text-xs font-bold leading-none'>{item.localized_name}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className='py-3 border-b-2 border-secondary'>
                <p className='text-lg font-bold leading-5'>Best versus</p>
                <div className='grid grid-cols-5'>
                    {matchup.slice(0, 10).map((item, index) => (
                        <div key={index} className='relative flex flex-col items-center'>
                            <p>{item.winrate}%</p>
                            <img src={`https://cdn.cloudflare.steamstatic.com${item.img}`} />
                            <p className='absolute bottom-1 text-background text-xs font-bold leading-none'>{item.localized_name}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className='py-3'>
                <p className='text-lg font-bold leading-5'>Worst versus</p>
                <div className='grid grid-cols-5'>
                    {matchup.slice(-10).reverse().map((item, index) => (
                        <div key={index} className='relative flex flex-col items-center'>
                            <p>{item.winrate}%</p>
                            <img src={`https://cdn.cloudflare.steamstatic.com${item.img}`} />
                            <p className='absolute bottom-1 text-background drop-shadow-[0, 20px, 1px #000]  text-xs font-bold leading-none'>{item.localized_name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        }
    </div>
  )
}

[
    {
        "hero_id": 86,
        "games_played": 627,
        "wins": 312
    },
    {
        "hero_id": 5,
        "games_played": 410,
        "wins": 195
    },
    {
        "hero_id": 100,
        "games_played": 331,
        "wins": 158
    },
    {
        "hero_id": 19,
        "games_played": 325,
        "wins": 171
    },
    {
        "hero_id": 9,
        "games_played": 316,
        "wins": 140
    },
    {
        "hero_id": 87,
        "games_played": 308,
        "wins": 166
    },
    {
        "hero_id": 101,
        "games_played": 304,
        "wins": 142
    },
    {
        "hero_id": 104,
        "games_played": 302,
        "wins": 159
    }
]