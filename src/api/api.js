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
import {getStarsResources} from './resources';
import {HOST} from './config';

export const getLanguage = () => trendingLanResources.get();

export const getTrending = (type = 'all') => trendingListResources.get({lang: type});

export const getHotwords = () => hotwordsResources.get();

export const search = (params) => searchResources.get(params);

export const getRepoFiles = (params) => getRepoFilesResources.get(params);

export const getConfig = () => getConfigResources.get();

export const getStars = (params) => getStarsResources.get(params);

export const signin = () => 'http://test01.gitstars.cn' + '/users/sign_in.html';
