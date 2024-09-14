import { Context, Schema } from 'koishi'
import type {} from 'koishi-plugin-puppeteer'
import type {} from '@quanhuzeyu/koishi-plugin-qhzy-sharp'
import Event from './Event'
import Data from './Data'
import commands from './commands'

export const name = 'arknights-wiki'
export const inject = {
	required: ['puppeteer', 'QhzySharp']
}

export interface Config { }

export const Config: Schema<Config> = Schema.object({})

export function apply(ctx: Context) {
	Event.baseDataController.baseDataSetup(ctx)

	const argCMD = ctx.command('q-明日方舟', '查询明日方舟wiki信息').alias('q-ark')

	argCMD.subcommand('ark-news', '查询明日方舟最新资讯').alias('当前资讯')
		.action((argv, message) => {
			const logger = Data.baseData.logger
			logger.info(`正在执行 <当前资讯> 命令`)
			argv.session.send('正在获取最新资讯...')
			commands.getCarouselData(argv, message)
		});
	
	argCMD.subcommand('ark-today', '查看今日开放的关卡信息').alias('今日信息')
		.action(async (argv,message) => {
			const logger = Data.baseData.logger
			logger.info(`正在执行 <今日信息> 命令`)
			argv.session.send('正在获取今日信息...')
			await commands.getTodayLevelData(argv, message)
		})
	argCMD.subcommand('ark-operator', '查看近期新增干员，可兑换干员，新出时装').alias('查询干员资讯')
		.action((argv,message) => {
			Data.baseData.logger.info(`正在执行 <查询干员资讯> 命令`)
			commands.getOperatorData(argv, message)
		})

}
