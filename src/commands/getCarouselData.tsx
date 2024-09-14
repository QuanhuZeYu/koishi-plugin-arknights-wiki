import { Argv } from "koishi";
import Data from "../Data";
import page from "../Page";

/**
 * 运行执行获取首页轮播图数据
 * @param argv 
 * @param message 
 */
async function getCarouselData(argv:Argv, message:string) {
    const sesstion = argv.session
    const logger = Data.baseData.logger
    
    const carouselsAndLink = await page.homePage.getCarouselData()
    const structArr = []
    for(let i=0; i<carouselsAndLink.length; i++) {
        const p = <p>
            <img src={carouselsAndLink[i].imgUrl} />
            {carouselsAndLink[i].link}
        </p>
        structArr.push(p)
    }
    structArr.join('')
    const messageStructer = <message forward={Data.baseData.config.forward}>
        {structArr}
    </message>

    await sesstion.send(messageStructer)
}

export default getCarouselData