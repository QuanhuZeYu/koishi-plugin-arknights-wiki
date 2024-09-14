import type { Browser, Page } from "puppeteer";
import Data from "../Data";



async function initPage() {
    const baseData = Data.baseData
    const logger = baseData.logger
    const browser = baseData.browserINST
    if(!browser || browser === undefined || browser === null) {logger.warn(`没有找到浏览器，插件异常`);return}
    logger.info(`正在初始化主页面...`)
    const page = await selectPage(browser)
    baseData.curPage = page  // 将当前控制的page设置到全局变量上
}

async function selectPage(browser: Browser) {
    let curPage_: Page
    const logger = Data.baseData.logger
    const pages = await browser.pages()
    const _pages:Page[] = await Promise.all(pages.map(async(page,index):Promise<Page> => {
        const url = page.url()
        if(url.includes('prts.wiki')) {
            return page
        }
    }))
    const selectPages = _pages.filter(result => result !== undefined)
    if(selectPages.length >= 1) {
        curPage_ = selectPages[0]
        logger.info(`找到主页，正在使用主页`, curPage_)
    } else {
        curPage_ = await browser.newPage()
        await curPage_.goto('https://prts.wiki/')
        logger.info(`没有找到主页，已新建一个新页面`)
    }
    return curPage_
}

export default initPage