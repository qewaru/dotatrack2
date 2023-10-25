import React from 'react'
import hero_names from '@/lib/hero_names.json'
import attributes from '@/lib/attributes.json'
import { Hero, Attribute } from '@/lib/interface'

export default function page() {
  const groupedHeroes: Record<string, Hero[]> = Object.values(hero_names).reduce((acc, hero) => {
    const attr = hero.primary_attr as string;
    if (!acc[attr]) {
      acc[attr] = [];
    }
    acc[attr].push(hero);
    return acc;
  }, {} as Record<string, Hero[]>);

  for (const attr in groupedHeroes) {
    groupedHeroes[attr].sort((a, b) =>
      a.localized_name.localeCompare(b.localized_name)
    );
  }
  
  const sortedGroups = ['str', 'agi', 'int', 'all'].map((attr) => ({
    attr,
    heroes: groupedHeroes[attr],
  }));
    

  return (
    <section className='w-full h-full pt-[50px]'>
        <div className='flex justify-around flex-col lg:flex-row w-full py-10'>
        {sortedGroups.map((group, index) => (
            <div key={index}>
                <div className='flex items-center gap-1 justify-center lg:justify-start'>
                    <img className='w-[25px]' src={`https://cdn.cloudflare.steamstatic.com${(attributes as Record<string, Attribute>)[group.attr].img}`} />
                    <p className='text-xl font-bold'>{(attributes as Record<string, Attribute>)[group.attr].name}</p>
                </div>
                <div className='py-8' key={group.attr}>
                  <ul className='flex flex-row flex-wrap justify-center lg:justify-start lg:flex-nowrap lg:flex-col gap-6'>
                    {group.heroes.map((hero) => (
                      <a href={`/heroes/${hero.id}`} className='relative w-[128px] h-[72px] sm:w-[179px] sm:h-[101px] md:w-[256px] md:h-[144px] drop-shadow-lg cursor-pointer scale-100 transition-all duration-100 hover:scale-110 hover:transition-all hover:duration-100' key={hero.id}>
                        <p className='absolute bottom-0 p-1 drop-shadow-lg font-bold text-background text-base sm:text-lg md:text-base'>{hero.localized_name}</p>
                        <img className='w-full h-full rounded-md' src={`https://cdn.cloudflare.steamstatic.com${hero.img}`} />
                      </a>
                    ))}
                  </ul>
                </div>
            </div>
        ))}
        </div>
    </section>
  )
}
