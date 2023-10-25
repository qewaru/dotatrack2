"use client";
import React, { useEffect, useState, useRef } from 'react'
import { HiOutlineSearch } from 'react-icons/hi'
import { searchSelect } from '../../lib/data'
import { Player, Team } from '../../lib/interface'
import Players from './Players'
import Teams from './Teams'

export default function Home() { 
  const target = useRef<HTMLDivElement>(null)
  const [ data, setData ] = useState<Player | Team | null>(null)
  const [ value, setValue ] = useState({
    searchFor: 'players',
    searchValue: ''
  })

  useEffect(() => {
    if (target.current) {
      target.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [data]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectValue = event.target.value
    setValue({
      searchFor: selectValue,
      searchValue: ''
    })
    setData(null)
  }

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setValue((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }
  
  const handleSearch = async () => {
    switch (value.searchFor) {
      case "players":
        const response = await fetch('https://api.opendota.com/api/proPlayers', {
          method: 'GET'
        })
        const jsonPlayers = await response.json() as Player[]
        const matchPlayer = jsonPlayers.find((player: Player) => player.name.toLowerCase().includes(value.searchValue.toLowerCase()))
        if (matchPlayer) {
          setData(matchPlayer)
        }
        break
      
        case "teams":
          const res = await fetch('https://api.opendota.com/api/teams', {
            method: 'GET'
          })
          const jsonTeams = await res.json() as Team[]
          const matchTeams = jsonTeams.find((team: Team) => team.name.toLowerCase() === value.searchValue.toLowerCase())
          if (matchTeams) {
            setData(matchTeams)
          }
          break
    }
  }

  return (
    <>
    <section className="w-full h-screen">
        <div className='flex flex-col w-full h-full gap-10 items-center justify-center'>
          <div className='flex flex-col items-center gap-3'>
              <p className='text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#05252e] to-primary'>DotaTrack</p>
              <p className='text-lg'>Search for <span className='font-bold'>anything</span> - matches, professional players, teams and heroes.</p>
          </div>
          <div className='flex w-full justify-center'>
            <div className='flex relative'>
              <select className='absolute h-full bg-transparent pl-2 text-primary font-bold hover:text-accent cursor-pointer' name="searchFor" onChange={ handleChange }>
                {searchSelect.map((item, index) => (
                  <option key={index} value={item.value}>{item.name}</option>
                ))}
              </select>
              <input type='text' className='border-2 border-primary rounded-md min-w-[300px] pl-[60px] pr-8 py-3' onChange={ handleInput } name='searchValue' value={value.searchValue}  placeholder='Type something here' />
              <button className='absolute h-full right-0 pr-2' onClick={handleSearch}>
                <HiOutlineSearch size={20} />
              </button>
            </div>
          </div>
        </div>
    </section>
    <section>
      {data !== null ? (
        value.searchFor === 'players' ? (
          <Players ref={target} data={data as Player} />
        ) : (
          value.searchFor === 'teams' ? (
            <Teams ref={target} data={data as Team} />
          ) : 'idk'
        )
      ) : (
      <div></div>
      )}
    </section>
    </>
  )
}
