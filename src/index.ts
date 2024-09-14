import { Context, Schema } from 'koishi'
import type {} from 'koishi-plugin-puppeteer'
import Event from './Event'
import Data from './Data'
import commands from './commands'

export const name = 'arknights-wiki'
export const inject = {
	required: ['puppeteer']
}

export interface Config { }

export const Config: Schema<Config> = Schema.object({})

export function apply(ctx: Context) {
	Event.baseDataController.baseDataSetup(ctx)

	const argCMD = ctx.command('q-明日方舟', '查询明日方舟wiki信息').alias('q-ark')

	argCMD.subcommand('当前资讯', '查询明日方舟最新资讯').alias('ark-news')
		.action((argv, message) => {
			const logger = Data.baseData.logger
			logger.info(`正在执行 <当前资讯> 命令`)
			argv.session.send('正在获取最新资讯...')
			commands.getCarouselData(argv, message)
		})

}
