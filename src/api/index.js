import {
    trendingLanResources,
    trendingListResources,
    hotwordsResources,
    searchResources,
    getRepoFilesResources,
    getConfigResources,
    getStarsResources,
    getReadmeResources,
    getGithubFilesResources
} from './resources';
import {
    GIT_CONTENT_HOST,
    GIT_ROOT
} from './config';

export const getLanguage = () => trendingLanResources.get();

export const getTrending = (type = 'all') => trendingListResources.get({ lang: type });

export const getHotwords = () => hotwordsResources.get();

export const search = (params) => searchResources.get(params);

export const getRepoFiles = (params) => getRepoFilesResources.get(params);

export const getConfig = () => getConfigResources.get();

export const getStars = (params) => getStarsResources.get(params);

export const getReadme = (params) => getReadmeResources.get(params);

export const getGithubFiles = (params) => getGithubFilesResources.get(params);

export const signin = () => 'http://test01.gitstars.cn' + '/users/sign_in.html';

export const getContentHost = () => GIT_CONTENT_HOST;

export const getGitHost = () => GIT_ROOT;
