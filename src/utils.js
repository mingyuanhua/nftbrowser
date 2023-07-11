const origin = "https://deep-index.moralis.io";
const apiKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImZhNjBhYTQxLTZhYTQtNDAzNi05YzU3LTY2MTFhMmU0NGZhZSIsIm9yZ0lkIjoiMzQ3MzYyIiwidXNlcklkIjoiMzU3MDU2IiwidHlwZUlkIjoiYjY4NTZlZDItMjE4OC00NDhmLWExYzgtM2VmMjViZDE2NTM1IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE2ODg4NTQwODYsImV4cCI6NDg0NDYxNDA4Nn0.1wIbuNksJhJE15AJomZx1voxJfiTJGKT3g2Kpa7kKp0";

// https://docs.moralis.io/reference/nft-api

// 为什么要有export？因为别的文件要用它
// async 放到函数里的话 需要和await相对应使用 await是把什么打平了？本来要写callapi.then(resp => {})
export const searchNFTs = async (searchText) => {
  // use string template
  // 为什么要用URL Class呢？因为有提供函数，可以给URL添加 query params 参数
  const url = new URL(`${origin}/api/v2/nft/search`);

  url.searchParams.append("chain", "eth");
  url.searchParams.append("format", "decimal");
  url.searchParams.append("q", searchText);
  url.searchParams.append("filter", "name");
  url.searchParams.append("limit", "12");

  // header上两个东西分别干什么的？
  // 发起API call，每个API call是向后端问题，能够接受的获取格式是JSON
  // 为什么要传API key？为什么要知道是谁调用的？要知道用的频率如何，判断是否要收费
  const response = await fetch(url, {
    headers: {
      accept: "application/json",
      "X-API-KEY": apiKey,
    },
  });

  return response.json();
};

export const getNFTTrades = async (tokenAddress) => {
  const url = new URL(`${origin}/api/v2/nft/${tokenAddress}/trades`);
  url.searchParams.append("chain", "eth");
  url.searchParams.append("marketplace", "opensea");
  url.searchParams.append("limit", "20");

  const response = await fetch(url, {
    headers: {
      accept: "application/json",
      "X-API-KEY": apiKey,
    },
  });
  return response.json();
};

export const getContractNFTs = async (tokenAddress) => {
  const url = new URL(`${origin}/api/v2/nft/${tokenAddress}`);
  url.searchParams.append("chain", "eth");
  url.searchParams.append("format", "decimal");
  url.searchParams.append("limit", "20");

  const response = await fetch(url, {
    headers: {
      accept: "application/json",
      "X-API-KEY": apiKey,
    },
  });
  return response.json();
};
