/**
 * url and cookie static value
 * @author PeterL
 */
export const API_ROOT = process.env.NODE_ENV === 'production' ? '.' : '/api';

export const GIT_API_ROOT = 'https://api.github.com';

export const HOST = process.env.NODE_ENV === 'production' ? 'http://gitstars.cn' : 'http://test01.gitstars.cn';
