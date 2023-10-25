export const links = [
    {name: 'Home', link: '/'},
    {name: 'Players', link: '/players'},
    {name: 'Teams', link: '/teams'},
    {name: 'Heroes', link: '/heroes'},
] as const

export const searchSelect = [
    {name: 'Player/', value: 'players', placeholder: 'Dendi'},
    {name: 'Team/', value: 'teams', placeholder: 'Gaimin Gladiators'},
] as const

export const baseAttr = ['str', 'agi', 'int'] as const

export const stages = [
    {name: 'Start game', value: 'start_game_items'},
    {name: 'Early game', value: 'early_game_items'},
    {name: 'Mid game', value: 'mid_game_items'},
    {name: 'Late game', value: 'late_game_items'},
] as const