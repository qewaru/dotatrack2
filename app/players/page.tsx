"use client"
import React, { useState, useEffect } from 'react'
import { Player } from '@/lib/interface'

export default function page() {
  const [ data, setData ] = useState<Player[]>([])
  const [itemsToShow, setItemsToShow] = useState(10)
  const itemsPerPage = 10

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const response = await fetch('https://api.opendota.com/api/proPlayers', {
      method: 'GET'
    })
    const json = await response.json() as Player[]
    if (json) {
      setData(json)
    }
  }

  const handleShowMore = () => {
    setItemsToShow(itemsToShow + itemsPerPage)
  }

  return (
    <section className='w-full pt-[50px]'>
      <div className='flex justify-center w-full pt-4 pb-10'>
        <p className='text-3xl sm:text-4xl font-bold'>List of all ProPlayers</p>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 semimd:grid-cols-3 lg:grid-cols-5 gap-5 px-5'>
      {data.slice(0, itemsToShow).map((player, index) => (
        <div key={index} className='flex flex-col items-center gap-2 max-w-[400px] p-2 border-2 border-primary bg-secondary rounded-lg'>
        <p className='text-2xl font-bold w-full text-center py-2 bg-third rounded-md'>{player.name}</p>
        <img className='w-[250px] rounded-md' src={player.avatarfull} />
        <div className='flex flex-col items-center w-full'>
          <div className='flex flex-col items-center py-2 w-full'>
            <p className='text-lg w-full text-center py-1 bg-third rounded-md'>League info</p>
            <div className='w-full flex justify-between'>
              <p className='font-bold'>Role:</p>
              <p>{player.fantasy_role !== 0 ? player.fantasy_role : 'None' }</p>
            </div>
            <div className='w-full flex justify-between'>
              <p className='font-bold'>Team name:</p>
              <p>{player.team_name} - ({player.team_tag})</p>
            </div>
          </div>
          <div className='flex flex-col items-center py-2 w-full'>
            <p className='text-lg w-full text-center py-1 bg-third rounded-md'>Steam info</p>
            <div className='w-full flex justify-between'>
              <p className='font-bold'>Nickname:</p>
              <p>{player.personaname}</p>
            </div>
            <div className='w-full flex justify-between'>
              <p className='font-bold'>ID:</p>
              <p>{player.steamid}</p>
            </div>
            <div className='w-full flex justify-between'>
              <p className='font-bold'>Link:</p>
              <a className='underline hidden lg:block' href={player.profileurl}>steamcommunity.com</a>
              <a className='underline block lg:hidden' href={player.profileurl}>steam.com</a>
            </div>
          </div>
        </div>
      </div>
      ))}
      </div>
      {itemsToShow < data.length && (
        <div className='flex justify-center w-full py-5'>
        <button className='px-2 py-1 border-2 border-primary bg-secondary rounded-md hover:bg-primary hover:text-background hover:transition-all hover:duration-150' onClick={handleShowMore}>Show more</button>
        </div>
      )}
    </section>
  )
}
