export interface imgLinkPage {
    imgUrl: string,
    link: string
}

export interface todayData {
    table: Buffer
    info: string[]
}

export interface operatorInfo {
    name:string
    charIconUrl:string
    leveIconUrl:string
    typeIconUrl:string
}

export interface operatorData {
    recentData: operatorInfo[]
    voucherRedemptionData: operatorInfo[]
    newCostumesData: operatorInfo[]
}

export interface operatorIconAndName {
    name: string
    icon: Buffer
}

export interface handledOperatorsData {
    recent: operatorIconAndName[]
    voucherRedemption: operatorIconAndName[]
    newCostumes: operatorIconAndName[]
}