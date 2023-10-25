import React, { forwardRef, ForwardedRef } from 'react'
import { Team } from '../../lib/interface'

interface TeamProps {
    data: Team
}

const Teams = forwardRef((props: TeamProps, ref: ForwardedRef<HTMLDivElement>) => {
  const winrate = Math.floor((props.data.wins) / (props.data.wins + props.data.losses) * 100)
  return (
    <div ref={ref} className='flex justify-center items-center w-full h-full py-5'>
        <div className='flex flex-col items-center gap-2 min-w-[200px] p-2 border-2 border-primary bg-secondary rounded-lg'>
          <div className='flex flex-col gap-3 items-center'>
            <div className='flex flex-col items-center w-full text-center py-2 bg-third rounded-md'>
              <p className='text-2xl font-bold'>{props.data.name}</p>
              <p>({props.data.tag})</p>
            </div>
            <img src={props.data.logo_url} />
          </div>
          <div className='flex flex-col items-center w-full'>
            <div className='flex flex-col items-center py-2 w-full'>
              <p className='text-lg w-full text-center py-1 bg-third rounded-md'>League info</p>
              <div className='w-full flex flex-col'>
                <div className='w-full flex justify-between'>
                  <p className='font-bold'>Winrate:</p>
                  <p className='font-bold'>{winrate}%</p>
                </div>
                <div className='w-full flex justify-between'>
                  <p>Wins - {props.data.wins}</p>
                  <p>Losses - {props.data.losses}</p>
                </div>
              </div>
              <div className='w-full flex justify-between'>
                <p className='font-bold'>Rating:</p>
                <p>{props.data.rating}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
})

export default Teams