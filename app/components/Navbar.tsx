import React from 'react'
import Link from 'next/link'
import { links } from '../../lib/data'

export default function Navbar() {
  return (
    <header className='fixed z-50 w-full h-[50px] bg-primary'>
        <div className='flex w-full h-full justify-around'>
            <ul className='flex gap-5 text-lg items-center'>
                {links.map((item, index) => (
                    <li key={index} className='text-background'>
                        <Link className='hover:text-accent hover:transition-colors hover:duration-100' href={item.link}>{item.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    </header>
  )
}
