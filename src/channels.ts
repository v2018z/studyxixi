export const articles = ['1crqb964p71'];

export const videos = ['1novbsbi47k'];

export const getLgDate = async (channel: string) => {
  try {
    const url = `https://www.xuexi.cn/lgdata/${channel}.json?_st=${Math.floor(
      Date.now() / 6e4
    )}`;
    const res = await fetch(url, { credentials: 'include' });
    return await res.json();
  } catch (error) {
    return [];
  }
};

export const getArticleChannels = async () => {
  const data = await getLgDate(articles[0]);
  return data;
};

export const getVideoChannels = async () => {
  const data = await getLgDate(videos[0]);
  return data;
};
