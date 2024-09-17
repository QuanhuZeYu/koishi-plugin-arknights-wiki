import { Context, Schema } from 'koishi'
import type {} from 'koishi-plugin-puppeteer'
import type {} from '@quanhuzeyu/koishi-plugin-qhzy-sharp'
import {} from "koishi-plugin-cron"
import Event from './Event'
import Data from './Data'
import commands from './commands'

export const name = 'arknights-wiki'
export const inject = {
	required: ['puppeteer', 'QhzySharp'],
	optional: ['cron']
}

export interface Config { 
	forward: boolean
	guildList: string[]
}

export const Config: Schema<Config> = Schema.object({
	forward: Schema.boolean().default(true).description('是否以转发形式发送'),
	guildList: Schema.array(String).description('要转发的群列表')
})

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
	argCMD.subcommand('ark-today-add', '给当前群添加定时任务获取每日信息')
		.action((argv,message) => {
			commands.addGuild(argv, message)
		})
	argCMD.subcommand('ark-today-remove', '取消当前群的定时任务')
		.action((argv,message) => {
			commands.removeGuild(argv, message)
		})
	argCMD.subcommand('ark-operator', '查看近期新增干员，可兑换干员，新出时装').alias('查询干员资讯')
		.action((argv,message) => {
			Data.baseData.logger.info(`正在执行 <查询干员资讯> 命令`)
			commands.getOperatorData(argv, message)
		})


	// 定时任务
	ctx.cron('0 0 6,18 * * ? ', async () => {
		await Event.scheduleTodayInfo(ctx)
	})
}
