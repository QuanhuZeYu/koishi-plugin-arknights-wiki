import { Argv } from "koishi";
import Data from "../Data";
import page from "../Page";
import tools from "../tools";



async function getOperatorData(argv:Argv, message:string) {
    const baseData = Data.baseData
    const logger = baseData.logger

    const operatorData = await page.homePage.getOperatorsInfo()
    const recent = operatorData.recent
    const v = operatorData.voucherRedemption
    const newCostumes = operatorData.newCostumes

    const messageStruct = (
        <message>
            <quote id={argv.session.messageId} />
            {/* 将不同数组的处理逻辑封装为函数并并行执行 */}
            {'新增干员:'}
            {(await createItemElements(recent))}
            {'\n==========\n可兑换干员:'}
            {(await createItemElements(v))}
            {'\n==========\n新出时装:'}
            {(await createItemElements(newCostumes))}
        </message>
    )
    await argv.session.send(messageStruct)
}

const createItemElements = async (items) => {
    // 将 icon 转换为 JSX 并返回 JSX 元素数组
    return Promise.all(items.map(async item => {
        const icon = await tools.MessageTools.convertBufferToJSX_PNG(item.icon);
        const name = item.name;
        return (
            <p>
                {icon}
                {name}
            </p>
        );
    }));
}

export default getOperatorData