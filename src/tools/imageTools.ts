import { Color, FitEnum } from "@quanhuzeyu/sharp-for-koishi"
import Data from "../Data"
import { ComposeJoin } from "../interface/Image/image"



/**
 * 数组第一个图像作为图像的原始数据，其余图像按照混合参数参与合成
 * @param join 
 */
async function compose(join:ComposeJoin[]) {
    const sharp = Data.baseData.sharp
    // 按顺序将图像叠放 第一张图像大小设置为图像尺寸
    let curImg = join[0].img
    let background:Color = {r:0,g:0,b:0,alpha:0}
    let fit:keyof FitEnum = "contain"
    // 将数组第一个元素剔除
    join.shift()
    for(const frame of join) {
        let img = frame.img
        fit = frame.frameData.resizeFit ? frame.frameData.resizeFit:fit
        background = frame.frameData.resizeBackground ? frame.frameData.resizeBackground:background
        if(frame.frameData.width && frame.frameData.height) {
            img = await sharp(img).resize(frame.frameData.width,frame.frameData.height,{fit:fit, background:background}).png().toBuffer()
        }
        const frameData = frame.frameData
        curImg = await sharp(curImg)
            .composite([{
                input:img,
                left:frameData.x||0,
                top:frameData.y||0,
                blend:frameData.blendOption||"over",
                gravity:frameData.gravity
            }])
            .png().toBuffer()
    }
    return curImg
}

const imageTools = {
    compose
}

export default imageTools