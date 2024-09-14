import type {Puppeteer, Browser, Page} from 'puppeteer'
import type * as kpp from 'koishi-plugin-puppeteer'
import {LoggerService} from "@cordisjs/logger"

let browserINST:Browser
let logger:LoggerService
let curPage:Page

const baseData = {
    browserINST,
    logger,
    curPage,
}

export default baseData