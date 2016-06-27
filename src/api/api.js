/**
 * http api for app
 * @author PeterL
 */
import {trendingLanResources} from './resources';
import {trendingListResources} from './resources';

export default {
    getLanguage () {
        return trendingLanResources.get();
    },
    getTrending (type = 'all') {
        return trendingListResources.get({lang: type});
    }
};
