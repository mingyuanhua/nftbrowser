import { Button, Input, Layout, List, message } from "antd";
import { useState } from "react";
import { searchNFTs } from "./utils";
import "./App.css";
import NftCard from "./components/NftCard";

// 函数的调用不要写到jsx区域
// 一般调用数据的应用可以写在哪里？
// ComponentDidMount -- 但是要刷页面
// 加个Button，之间点击按钮就能出发

// layout is like a high level plan for UI where are which area/module take care of what
const { Header, Content } = Layout;

function App() {
  // 三个state 分别对应页面上的什么？
  // state的特点是它的变化能够引发它所在的Component rerender --> 小刷新机制
  // nfts存的是搜索返回的nft data

  // loading是控制页面上是否转圈圈显示 我们是选择是哪里转圈圈？除了list外，是在点击按钮的时候

  // Button props添加loading={loading} 可以转圈圈 好处是防止当前短时间内重复/没有意义的大量请求

  // list最关键的是哪几个props？dataSource和renderItem

  // Input.Group 这个Component的作用是什么？作用就是把里面的东西group在一起，这里是Input和Button放在一起对齐

  // 调API这里，aysnc语法必须和await同时出现才有意义

  // 每次调API是什么套路呢？首先 把loading状态变成true 然后写真正调API的代码 最后别忘了把loading状态变回false

  // 下一步是什么？就是把卡片改成有意义的卡片，而不是123，是真正的dataSource和Card
  // 之前Card里面写在这里可读性就差了，所以可以单独写一个Component，把List.Item直接都包出去

  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

  const handleSearch = async () => {
    if (searchText === "") {
      return;
    }

    setLoading(true);

    try {
      const data = await searchNFTs(searchText);
      setNfts(data.result);
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // We start to add functions to the UI, let's first add the search function,
  // which allow users to enter a search text and do search on NFT

  // To display the NFT search result, we choose to use a Grid of Cards
  // leveraging AntD's list + Card combination

  return (
    <Layout style={{ height: "100vh" }}>
      <Header>
        <div style={{ fontSize: 16, fontWeight: 600, color: "white" }}>
          NFT Browser
        </div>
      </Header>
      <Content
        style={{ height: "calc(100% - 64px)", padding: 20, overflowY: "auto" }}
      >
        <Input.Group compact>
          <Input
            style={{ width: 300 }}
            placeholder="Enter a NFT name to search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button loading={loading} type="primary" onClick={handleSearch}>
            Search
          </Button>
        </Input.Group>
        <List
          loading={loading}
          style={{
            marginTop: 20,
            height: "calc(100% - 52px)",
            overflow: "auto",
          }}
          grid={{
            gutter: 16,
            xs: 1,
            sm: 3,
            md: 3,
            lg: 3,
            xl: 4,
            xxl: 4,
          }}
          dataSource={nfts}
          renderItem={(nft) => <NftCard nft={nft} />}
        />
      </Content>
    </Layout>
  );
}

export default App;
