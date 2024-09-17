import { Argv } from "koishi";
import Data from "../Data";



async function removeGuild(argv:Argv, message:string) {
    const baseData = Data.baseData
    const logger = baseData.logger
    const config = baseData.config

    const session = argv.session
    const guild = session.event.guild.id || session.guildId
    if(config.guildList.includes(guild)) {
        const index = config.guildList.indexOf(guild)
        config.guildList.splice(index, 1)
        await session.send("已从任务列表中移除当前群组")
    } else {
        logger.info(`当前群组不在任务列表中`)
        await session.send("当前群组不在任务列表中")
    }
}

export default removeGuild