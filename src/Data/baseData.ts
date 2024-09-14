import type {Puppeteer, Browser, Page} from 'puppeteer'
import type * as kpp from 'koishi-plugin-puppeteer'
import {LoggerService} from "@cordisjs/logger"
import type {} from '@quanhuzeyu/koishi-plugin-qhzy-sharp'
import _s from 'sharp'
import { Config } from '..'

let browserINST:Browser
let logger:LoggerService
let config:Config
let curPage:Page
let sharp:typeof _s

const baseData = {
    browserINST,
    logger,
    config,
    curPage,
    sharp
}

export default baseData