import { difference, h } from "koishi";
import Data from "../Data";



async function convertBufferToJSX_PNG(buffer:Buffer) {
    const baseData = Data.baseData
    
    const imgJSX = h.image(buffer,'image/png')
    return imgJSX
}

const MessageTools = {
    convertBufferToJSX_PNG,
}

export default MessageTools