import Data from "../Data"
import { imgLinkPage, todayData} from "../interface/Page/home"


async function getHomeData() {
    const logger = Data.baseData.logger
    const curPage = Data.baseData.curPage
}

/**
 * 获取轮播图中的数据
 * @returns 
 */
async function getCarouselData() {
    const logger = Data.baseData.logger;
    const curPage = Data.baseData.curPage;

    try {
        const CarouselsAndUrl: imgLinkPage[] = await curPage.evaluate(async () => {
            const tailButton = document.querySelector('center button + div + button');
            if (!tailButton) {
                console.error("Tail button not found");
                return [];
            }
            const region = tailButton.previousElementSibling;
            if (!region) {
                console.error("Region not found");
                return [];
            }
            const showedPic = Array.from(region.querySelectorAll('div[aria-describedby]'));
            const imgLinkPage = [];
            for (let i = 0; i < showedPic.length; i++) {
                const pic = showedPic[i];
                // 获取 CSS 文本，确保 pic 元素存在
                const span = pic.querySelector('span');
                if (!span) {
                    console.error(`Span not found for pic at index ${i}`);
                    continue;  // 如果找不到 span，跳过此元素
                }
                const imgText = span.style.cssText;
                // 正则匹配，确保匹配结果存在
                const regex = /(https?:\/\/[^\s]+?\.(jpg|png))/g;
                const matches = imgText.match(regex);
                if (!matches || matches.length === 0) {
                    console.error(`No image URL found for pic at index ${i}`);
                    continue;  // 如果没有匹配到 URL，跳过此元素
                }
                const imgUrl = matches[0];
                // 获取链接，确保 a 标签存在
                const linkElement = pic.querySelector('a');
                if (!linkElement) {
                    console.error(`Link element not found for pic at index ${i}`);
                    continue;  // 如果找不到链接，跳过此元素
                }
                const link = linkElement.href;
                imgLinkPage.push({ imgUrl, link });
            }
            return imgLinkPage;
        });
        return CarouselsAndUrl;
    } catch (error) {
        logger.error("获取轮播图数据时出现错误:", error);
        return [];
    } finally {
        Data.baseData.curPage = curPage
    }
}

async function getTodayLevelData() {
    const logger = Data.baseData.logger;
    const curPage = Data.baseData.curPage;

    try {
        const todayInfo = await curPage.evaluate(async () => {
            // 查找包含“今日信息”的 h2 元素
            const todayInfoHeadRegion = Array.from(document.querySelectorAll('h2')).filter(h2 => h2.textContent?.includes('今日信息'));
            // 确保找到的元素存在
            if (todayInfoHeadRegion.length === 0) {
                console.error('未找到包含“今日信息”的 h2 元素');
                return [];
            }
            // 获取目标元素
            const nextElement = todayInfoHeadRegion[0].nextElementSibling;
            if (!nextElement || !(nextElement instanceof HTMLElement)) {
                console.error('“今日信息”后的元素无效');
                return [];
            }
            const infoDataRegion = nextElement.nextElementSibling;
            if (!infoDataRegion || !(infoDataRegion instanceof HTMLElement)) {
                console.error('“今日信息”后数据区域的元素无效');
                return [];
            }
            // 提取信息
            const info = Array.from(infoDataRegion.querySelectorAll('p')).map(p => p.textContent || '');
            return info;
        });
        // 确保截图元素存在
        const shotElement = await curPage.$('tbody');
        if (!shotElement) {
            console.error('未找到截图元素 “tbody”');
            return { table: null, info: todayInfo };
        }
        await curPage.bringToFront();
        const shotPic = await shotElement.screenshot({ encoding: 'binary' });
        const todayData: todayData = {
            table: Buffer.from(shotPic),
            info: todayInfo
        };
        return todayData;
    } catch (error) {
        logger.error('获取今日数据失败:', error);
        return { table: null, info: [] };
    }
}

const homePage = {
    getHomeData,
    getCarouselData,
    getTodayLevelData
}

export default homePage