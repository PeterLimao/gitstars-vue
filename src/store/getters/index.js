import * as GlobalGetter from './globalGetter';
import * as SearchGetter from './searchGetter';
import * as StarsGetter from './starsGetter';
import * as TrendingGetter from './trendingGetter';

const getters = {};

Object.assign(getters, GlobalGetter, SearchGetter, StarsGetter, TrendingGetter);

export default getters;
