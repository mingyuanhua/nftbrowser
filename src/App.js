import "./App.css";
import { Button } from "antd";
import { searchNFTs } from "./utils";

// 函数的调用不要写到jsx区域
// 一般调用数据的应用可以写在哪里？
// ComponentDidMount -- 但是要刷页面
// 加个Button，之间点击按钮就能出发

const handleButtonClick = () => {
  searchNFTs("car");
};

function App() {
  return (
    <div className="App">
      <Button type="primary" onClick={handleButtonClick}>
        Test
      </Button>
    </div>
  );
}

export default App;
