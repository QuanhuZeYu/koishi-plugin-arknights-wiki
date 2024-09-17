import { Context } from "koishi";
import Data from "../Data";
import { todayData } from "../interface/Page/home";
import page from "../Page";
import tools from "../tools";


async function scheduleTodayInfo(ctx:Context) {
    const baseData = Data.baseData
    const logger = baseData.logger
    const guildList = baseData.config.guildList
    
    const today:todayData = await page.homePage.getTodayLevelData()
    const message = <message>
        {await tools.MessageTools.convertBufferToJSX_PNG(today.table)}
        {today.info}
    </message>;
    ctx.broadcast(guildList, message)
}

export default scheduleTodayInfo