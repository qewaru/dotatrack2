"use client"
import React, { useState, useEffect } from 'react'
import { Team } from '../../lib/interface'

export default function page() {
  const [ data, setData ] = useState<Team[]>([])
  const [itemsToShow, setItemsToShow] = useState(10)
  const itemsPerPage = 10

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const response = await fetch('https://api.opendota.com/api/teams', {
      method: 'GET'
    })
    const json = await response.json() as Team[]
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
        <p className='text-3xl sm:text-4xl font-bold'>List of all ProTeams</p>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 semimd:grid-cols-3 lg:grid-cols-5 gap-5 px-5'>
      {data.slice(0, itemsToShow).map((team, index) => (
        <div key={index} className='flex flex-col items-center gap-2 min-w-[200px] p-2 border-2 border-primary bg-secondary rounded-lg'>
        <div className='flex flex-col gap-3 items-center'>
          <div className='flex flex-col items-center w-full text-center py-2 bg-third rounded-md'>
            <p className='text-2xl font-bold'>{team.name}</p>
            <p>({team.tag})</p>
          </div>
          <div className='w-[250px] h-[250px] flex items-center justify-center'>
            <img alt='logo-img' src={team.logo_url} />
          </div>
        </div>
        <div className='flex flex-col items-center w-full'>
          <div className='flex flex-col items-center py-2 w-full'>
            <p className='text-lg w-full text-center py-1 bg-third rounded-md'>League info</p>
            <div className='w-full flex flex-col'>
              <div className='w-full flex justify-between'>
                <p className='font-bold'>Winrate:</p>
                <p className='font-bold'>{Math.floor((team.wins) / (team.wins + team.losses) * 100)}%</p>
              </div>
              <div className='w-full flex justify-between'>
                <p>Wins - {team.wins}</p>
                <p>Losses - {team.losses}</p>
              </div>
            </div>
            <div className='w-full flex justify-between'>
              <p className='font-bold'>Rating:</p>
              <p>{team.rating}</p>
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
