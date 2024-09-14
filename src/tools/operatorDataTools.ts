import tools from ".";
import Data from "../Data";
import { ComposeJoin } from "../interface/Image/image";
import { handledOperatorsData, operatorData, operatorIconAndName, operatorInfo } from "../interface/Page/home";
import type _s from "sharp"


async function handleOperatorsInfo(data:operatorInfo) {
    const baseData = Data.baseData
    const sharp = baseData.sharp
    const logger = baseData.logger

    const charUrl = data.charIconUrl
    const leveURL = data.leveIconUrl
    const typeUrl = data.typeIconUrl

    const charBuffer = Buffer.from(await(await fetch(charUrl)).arrayBuffer())
    const leveBuffer = Buffer.from(await(await fetch(leveURL)).arrayBuffer())
    const typeBuffer = Buffer.from(await(await fetch(typeUrl)).arrayBuffer())

    const charBuffer_meta = await sharp(charBuffer).metadata()
    const charW = charBuffer_meta.width
    const charH = charBuffer_meta.height
    const leveBuffer_meat = await sharp(leveBuffer).metadata()
    const leveW = leveBuffer_meat.width
    const leveH = leveBuffer_meat.height
    const left = charW - leveW
    const top = charH - leveH

    const join:ComposeJoin[] = [
        {img:charBuffer,frameData:{}},
        {img:leveBuffer,frameData:{gravity:"southeast",x:left,y:top}},
        {img:typeBuffer,frameData:{}}
    ]
    const operatorIcon = await tools.imageTools.compose(join)
    const operatorIconAndName:operatorIconAndName = {
        name:data.name,
        icon:operatorIcon
    }
    return operatorIconAndName
}

async function handleOperatorsData(data:operatorData) {
    const baseData = Data.baseData
    const logger = baseData.logger

    const recentAddData = data.recentData
    const voucherRedemptionData = data.voucherRedemptionData
    const newCostumesData = data.newCostumesData

    const recentAddIconAndName = await Promise.all(recentAddData.map(async (data) => {
        return await handleOperatorsInfo(data)
    }))
    const voucherRedemptionIconAndName = await Promise.all(voucherRedemptionData.map(async (data) => {
        return await handleOperatorsInfo(data)
    }))
    const newCostumesIconAndName = await Promise.all(newCostumesData.map(async (data) => {
        return await handleOperatorsInfo(data)
    }))

    const result:handledOperatorsData = {
        recent:recentAddIconAndName,
        voucherRedemption:voucherRedemptionIconAndName,
        newCostumes:newCostumesIconAndName
    }
    return result
}


const operatorDataTools = {
    handleOperatorsInfo,
    handleOperatorsData,
}

export default operatorDataTools