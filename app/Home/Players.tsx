import React, { forwardRef, ForwardedRef } from 'react'
import { Player } from '../../lib/interface'

interface PlayerProps {
    data: Player
}

const Players = forwardRef((props: PlayerProps, ref: ForwardedRef<HTMLDivElement>) => {
  return (
    <div ref={ref} className='flex justify-center items-center w-full h-full py-5'>
        <div className='flex flex-col items-center gap-2 min-w-[400px] p-2 border-2 border-primary bg-secondary rounded-lg'>
          <p className='text-2xl font-bold w-full text-center py-2 bg-third rounded-md'>{props.data.name}</p>
          <img className='w-[250px] rounded-md' src={props.data.avatarfull} />
          <div className='flex flex-col items-center w-full'>
            <div className='flex flex-col items-center py-2 w-full'>
              <p className='text-lg w-full text-center py-1 bg-third rounded-md'>League info</p>
              <div className='w-full flex justify-between'>
                <p className='font-bold'>Role:</p>
                <p>{props.data.fantasy_role}</p>
              </div>
              <div className='w-full flex justify-between'>
                <p className='font-bold'>Team name:</p>
                <p>{props.data.team_name} - ({props.data.team_tag})</p>
              </div>
            </div>
            <div className='flex flex-col items-center py-2 w-full'>
              <p className='text-lg w-full text-center py-1 bg-third rounded-md'>Steam info</p>
              <div className='w-full flex justify-between'>
                <p className='font-bold'>Nickname:</p>
                <p>{props.data.personaname}</p>
              </div>
              <div className='w-full flex justify-between'>
                <p className='font-bold'>ID:</p>
                <p>{props.data.steamid}</p>
              </div>
              <div className='w-full flex justify-between'>
                <p className='font-bold'>Link:</p>
                <a className='underline' href={props.data.profileurl}>steamcommunity.com</a>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
})

export default Players