export interface Player {
    name: string,
    avatarfull: string,
    steamid: string,
    account_id: number,
    personaname: string,
    fantasy_role: number,
    team_name: string,
    team_tag: string,
    team_id: string,
    loccountrycode: string,
    profileurl: string
}

export interface Team {
    logo_url: string,
    team_id: number,
    rating: number,
    wins: number,
    losses: number,
    last_match_time: number,
    name: string,
    tag: string
}

export interface Hero {
    id: number;
    localized_name: string;
    primary_attr: string;
    img: string
}

export interface Attribute {
    img: string;
    name: string;
}

export interface HeroDetails {
    id: number,
    name: string,
    localized_name: string,
    primary_attr: string,
    attack_type: string,
    roles: string[],
    icon: string,
    base_health: number,
    base_mana: number,
    base_str: number,
    base_agi: number,
    base_int: number,
    [key: string]: any
}

export interface Stats {
    hero_id: number,
    games_played: number,
    wins: number,
    localized_name: string,
    img: string,
    winrate: number
}

export interface ItemArray {
    id: string,
    popularity: number,
    type: string,
    details: any,
}