import Data from "../Data"
import { imgLinkPage } from "../interface/Page/home"


async function getHomeData() {
    const logger = Data.baseData.logger
    const curPage = Data.baseData.curPage
}

async function getCarouselData() {
    const logger = Data.baseData.logger
    const curPage = Data.baseData.curPage
    const CarouselsAndUrl:imgLinkPage[] = await curPage.evaluate(async () => {
        const tailButton = document.querySelector('center button + div + button')
        const region = tailButton.previousElementSibling
        const showedPic = Array.from(region.querySelectorAll('div[aria-describedby]'))
        const imgLinkPage = []
        for(let i=0; i<showedPic.length; i++) {
            const pic = showedPic[i]
            
            const imgText = pic.querySelector('span').style.cssText
            const regex = /(https?:\/\/[^\s]+?\.(jpg|png))/g
            const matches = imgText.match(regex)[0]
            
            const href = pic.querySelector('a').href
            const url = href

            imgLinkPage.push({imgUrl:matches, link:url})
        }
        return imgLinkPage
    })
    return CarouselsAndUrl
}


const homePage = {
    getHomeData,
    getCarouselData
}

export default homePage