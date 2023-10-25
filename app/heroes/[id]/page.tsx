"use client"
import React, { useEffect, useState } from 'react'
import hero_names from '@/lib/hero_names.json'
import attributes from '@/lib/attributes.json'
import items from '@/lib/items.json'
import { stages, baseAttr } from '@/lib/data'
import Items from '../components/Items'
import Matchups from '../components/Matchups'
import { Attribute, HeroDetails, ItemArray } from '@/lib/interface'

export default function page({ params }: {params: { id: string }}) {
    const attributeJson: { [key: string]: Attribute } = attributes

    const [ itemData, setItemData ] = useState<Record<string, ItemArray[]>>({})

    const data: HeroDetails | undefined = Object.values(hero_names).find(
        (hero) => hero.id.toString() === params.id
    )

    let attributeData: Attribute | undefined
    if (data) {
        const primaryAttr = data.primary_attr;
        if (primaryAttr && attributeJson[primaryAttr]) {
          attributeData = attributeJson[primaryAttr]
        }
      }

    useEffect(() => {
        fetchData(data)
    }, [data])

    const fetchData = async (data: HeroDetails | undefined) => {
        if (!data) {
            return;
          }
        const response = await fetch(`https://api.opendota.com/api/heroes/${data.id}/itemPopularity`, {
            method: 'GET'
        })
        const json = await response.json()
        if (json) {
            const itemsArray: ItemArray[] = []
            
            for (const gameStage in json) {
              const stageName = stages.find((stage) => stage.value === gameStage)?.name
              if (!stageName) {
                continue;
              }
              for (const itemId in json[gameStage]) {
                const popularity = json[gameStage][itemId]
                const itemDetails = Object.values(items).find(item => item.id === parseInt(itemId))
                if (itemDetails) { 
                  if (gameStage === 'start_game_items') {
                    itemsArray.push({
                        id: itemId,
                        popularity,
                        type: stageName,
                        details: itemDetails,
                      })
                  } else if (itemDetails.components !== null) {
                    itemsArray.push({
                        id: itemId,
                        popularity,
                        type: stageName,
                        details: itemDetails,
                      })
                  }
                }
              }
            }

            const sortedItems: Record<string, ItemArray[]>  = {}
            itemsArray.forEach((item) => {
              if (!sortedItems[item.type]) {
                sortedItems[item.type] = []
              }
              sortedItems[item.type].push(item)
            })
        
            for (const gameStage in sortedItems) {
              sortedItems[gameStage].sort((a, b) => b.popularity - a.popularity)
            }

            setItemData(sortedItems)
            console.log(sortedItems)
        }
    }

  return (
    <section className='py-20'>
        {attributeData && data &&
            <div className='flex flex-col gap-10 justify-center sm:flex-row sm:justify-around'>
                <div className='flex flex-col gap-3'>
                    <div className='flex flex-col'>
                        <div className='flex items-center justify-center'>
                            <img className='w-[35px] h-[35px]' src={`https://cdn.cloudflare.steamstatic.com${data?.icon}`} />
                            <p className='text-5xl font-bold'>{data?.localized_name}</p>
                        </div>
                        <div className='flex items-center justify-center'>
                            <img className='w-[20px] drop-shadow-md' src={`https://cdn.cloudflare.steamstatic.com${attributeData.img}`} />
                            <p className='text-xl'>{attributeData.name}</p>
                        </div>
                    </div>
                    <div className='flex flex-col items-center'>
                        <p className='text-xl'>Roles</p>
                        <div className='flex gap-1 font-bold text-lg'>
                            {data?.roles.map((role, index) => (
                                <p key={index}>{role}</p>
                            ))}
                        </div>
                    </div>
                    <div className='flex flex-col items-center'>
                        <p className='text-xl'>Attack type</p>
                        <p className='text-lg font-bold'>{data?.attack_type}</p>
                    </div>
                    <div className='flex flex-col items-center'>
                        <p className='text-2xl font-bold'>Stats</p>
                        <div className='flex gap-3'>
                            <div className='min-w-[150px]'>
                                <div className='w-full py-1 px-5 bg-green-300 text-center'>{data?.base_health + (data?.base_str * 22)}</div>
                                <div className='w-full py-1 px-5 bg-blue-300 text-center'>{data?.base_mana + (data?.base_int * 12)}</div>
                            </div>
                            <div>
                                {baseAttr.map((attr) => (
                                    <div className='flex gap-1' key={attr}>
                                        <img className='w-[20px] h-[20px]' src={`https://cdn.cloudflare.steamstatic.com${attributes[attr].img}`}  />
                                        <p>{data['base_' + attr]}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col items-center sm:items-start gap-3 sm:w-[30%]'>
                    <p className='text-4xl font-bold'>Hero guide</p>
                    <div className='flex flex-col gap-10 sm:gap-0'>
                        <Items itemData={itemData} />
                        <Matchups data={params.id} />
                    </div>
                </div>
            </div>
        }
    </section>
  )
}