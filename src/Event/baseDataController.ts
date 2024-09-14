import { Context } from "koishi";
import Data from "../Data";
import {} from 'koishi-plugin-puppeteer'
import type { Browser } from "puppeteer";
import initPage from "./Private/__initMainPage";

/**
 * 初始化 browserINST logger
 * @param ctx 
 */
async function baseDataSetup(ctx:Context) {
    const baseData = Data.baseData
    baseData.browserINST = ctx.puppeteer.browser as any as Browser
    const logger = baseData.logger = ctx.logger
    baseData.sharp = ctx.QhzySharp.Sharp
    logger.info(`插件基础数据已加载完毕`)
    await initPage()
}

/**
 * 暂未实现，伪代码
 */
function baseDataDispose() {
    const baseData = Data.baseData
    const logger = baseData.logger
    logger.info(`正在卸载插件基础数据...`)
    baseData.browserINST = null
    baseData.curPage = null
    logger.info(`插件基础数据已卸载完毕`)
}

const baseDataController = { 
    baseDataSetup, baseDataDispose 
}

export default baseDataController