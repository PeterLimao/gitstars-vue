/**
 * http api for app
 * @author PeterL
 */
import {trendingLanResources} from './resources';

export default {
    getLanguage () {
        return trendingLanResources.get();
    }
};
