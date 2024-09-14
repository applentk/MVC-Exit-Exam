export type Cow = {
    id: number,
    color: string,
    got_lime: boolean,
    birth: {
        month: number,
        year: number
    }
}

export type Milk = {
    type: string,
    total: number
}