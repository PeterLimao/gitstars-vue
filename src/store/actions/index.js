import * as GlobalAction from './globalAction';
import * as SearchAction from './searchAction';
import * as StarsAction from './starsAction';
import * as TrendingAction from './trendingAction';

const actions = {};

Object.assign(actions, GlobalAction, SearchAction, StarsAction, TrendingAction);

export default actions;
