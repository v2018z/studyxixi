// 存储各种数据

type stateTypes = {
    articleChannels: any[],
    videoChannels: any[],
}

const state: stateTypes = {
    articleChannels: [],
    videoChannels: [],
};

export const setArticleChannels = (channels: [] = []) => {
    state.articleChannels = [...channels];
}

export const setVideoChannels = (channels: [] = []) => {
    state.videoChannels = [...channels];
}

export const getArticleChannels = () => {
    return state.articleChannels;
}

export const getVideoChannels = () => {
    return state.videoChannels;
}