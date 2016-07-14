/**
 * http api for app
 * @author PeterL
 */
import {trendingLanResources} from './resources';
import {trendingListResources} from './resources';
import {hotwordsResources} from './resources';
import {searchResources} from './resources';
import {getRepoFilesResources} from './resources';
import {getConfigResources} from './resources';

export const getLanguage = () => trendingLanResources.get()

export const getTrending = (type = 'all') => trendingListResources.get({lang: type})

export const getHotwords = () => hotwordsResources.get()

export const search = (params) => searchResources.get(params)

export const getRepoFiles = (params) => getRepoFilesResources.get(params)

export const getConfig = () => getConfigResources.get()
