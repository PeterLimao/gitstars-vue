/**
 * http api for app
 * @author PeterL
 */
import { trendingLanResources } from './resources';
import { trendingListResources } from './resources';
import { hotwordsResources } from './resources';
import { searchResources } from './resources';

export default {
    getLanguage () {
        return trendingLanResources.get();
    },
    getTrending (type = 'all') {
        return trendingListResources.get({lang: type});
    },
    getHotwords () {
        return hotwordsResources.get();
    },
    search (params) {
        return searchResources.get(params);
    }
};
