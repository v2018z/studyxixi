// 存储各种数据

type stateTypes = {
  splashWaiting: boolean,
  articleChannels: any[];
  videoChannels: any[];
  userInfo: any;
};

const state: stateTypes = {
  splashWaiting: false,
  articleChannels: [],
  videoChannels: [],
  userInfo: Object.create(null),
};

export const splashComplete = () => {
  state.splashWaiting = true;
}

export const getSplashIsComplete = () => {
  return state.splashWaiting;
}

export const setArticleChannels = (channels: [] = []) => {
  state.articleChannels = [...channels];
};

export const setVideoChannels = (channels: [] = []) => {
  state.videoChannels = [...channels];
};

export const getArticleChannels = () => {
  return state.articleChannels;
};

export const getVideoChannels = () => {
  return state.videoChannels;
};

export const setUserInfo = (userInfo: any) => {
  state.userInfo = { ...userInfo };
}