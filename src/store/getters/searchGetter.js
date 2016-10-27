export const getSearch = function ({ search }) {
    return search.isSearch;
};

export const getCacheKeywords = function ({ search }) {
    return search.cacheKeywords;
};

export const getSearchLoadmoreIndex = function ({ search }) {
    return search.searchLoadmoreIndex;
};

export const getSearchScrollPosition = function ({ search }) {
    return search.searchScrollPosition;
};

export const getHotwords = function ({ search }) {
    return search.hotwords;
};

export const getSearchTrendingList = function ({ search }) {
    return search.searchTrendingList;
};
