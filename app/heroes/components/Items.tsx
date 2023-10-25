"use client"
import React, {useState} from 'react'
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from 'react-icons/md'
import { ItemArray } from '@/lib/interface'

interface ItemProps {
    itemData: Record<string, ItemArray[]>
}

const Items: React.FC<ItemProps> = ({itemData}) => {
    const [toggle, setToggle] = useState(false)

    const handleToggle = () => {
        setToggle(!toggle)
    }

  return (
    <div>
        <div className='flex gap-1 items-center'>
            <p className='text-2xl font-bold text-accent'>Item build</p>
            {toggle === false ? <MdOutlineKeyboardArrowDown onClick={handleToggle} size={20} className='cursor-pointer fill-accent border-2 border-accent/80 rounded-full' /> : <MdOutlineKeyboardArrowUp onClick={handleToggle} size={20} className='cursor-pointer fill-accent border-2 border-accent/80 rounded-full' /> }
        </div>
        {toggle &&
            <div className='flex flex-col gap-7'>
                {itemData && Object.keys(itemData).map((type) => (
                    <div key={type}>
                        <p className='text-lg'>{type}</p>
                        <div className='grid grid-cols-5 place-items-center gap-1'>
                            {itemData[type].map((item) => (
                                <div className='parent-plate relative flex justify-center items-center w-full p-1' key={item.id}>
                                    <img className='plate-image w-full' src={`https://cdn.cloudflare.steamstatic.com${item.details.img}`} />
                                    <p className='plate-text absolute text-center text-sm px-1'>{item.details.dname}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        }
    </div>
  )
}

export default Items