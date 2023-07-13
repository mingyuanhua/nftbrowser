import { Button, Card, Input, Layout, List, message } from "antd";
import { useState } from "react";
import { searchNFTs } from "./utils";
import "./App.css";

// 函数的调用不要写到jsx区域
// 一般调用数据的应用可以写在哪里？
// ComponentDidMount -- 但是要刷页面
// 加个Button，之间点击按钮就能出发

// layout is like a high level plan for UI where are which area/module take care of what
const { Header, Content } = Layout;

function App() {
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
          <Button type="primary" onClick={handleSearch}>
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
          dataSource={[1, 2, 3]}
          renderItem={(nft) => (
            <List.Item key={nft}>
              <Card title={nft} />
            </List.Item>
          )}
        />
      </Content>
    </Layout>
  );
}

export default App;
