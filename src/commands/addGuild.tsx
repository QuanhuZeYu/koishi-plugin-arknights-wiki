import { Argv } from "koishi";
import Data from "../Data";


async function addGuild(argv:Argv, message:string) {
    const baseData = Data.baseData
    const config = baseData.config
    const logger = baseData.logger
    const session = argv.session

    const guild = session.event.guild.id
    if(config.guildList.includes(guild)) {
        logger.info(`当前群组已在任务列表`)
        await session.send("当前群组已在任务列表")
    } else {
        config.guildList.push(guild)
        await session.send("已将当前群组添加到任务列表中")
    }
}

export default addGuild