import { Argv, h } from "koishi";
import Data from "../Data";
import page from "../Page";



async function getTodayLevelData(argv:Argv, message:string) {
    const session = argv.session
    const logger = Data.baseData.logger

    const todayData = await page.homePage.getTodayLevelData()
    // logger.info(todayData)
    // const img = h.image(todayData.table, 'image/png')
    const imgE = <img src={'data:image/png;base64,'+ todayData.table.toString('base64')} />
    const info = todayData.info.join('\n')
    const messageStructer = <message forward={Data.baseData.config.forward}>
        {imgE}
        {info}
    </message>
    await session.send(messageStructer)
}

export default getTodayLevelData