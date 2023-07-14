import { Button, Modal, Skeleton, Table, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { InfoCircleOutlined } from "@ant-design/icons";
import { getContractNFTs } from "../utils";

// link要多传个render来处理link，渲染一下
const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },

  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "External Link",
    dataIndex: "external_url",
    key: "external_url",
    render: (value) => {
      if (value) {
        return (
          <a href={value} target="_blank" rel="noreferrer">
            View
          </a>
        );
      }

      return "--";
    },
  },
];

// 肚子里的ModalContent单独写一个Component 因为要call api
// 点开的时候借助了哪个lifecycle？关闭的时候借助了哪个lifecycle？DidMount和DidUnmount
const ModalContent = ({ tokenAddress }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  // useEffect哪种写法保证了类似ComponentDidMount？, [] 空数组 ！！！
  // 因为useEffect里不能直接写await async 需要单独写个函数

  // filter函数做了什么？对resp.result过滤，来一个放不放他走
  // (item) => item.metadata !== null 这个回调函数是过滤的逻辑 不是的才留下来
  // map做了什么？遍历完后返回一个数组，来一个每一个都做转换包装替换塞到新数组返回
  useEffect(() => {
    getContractNFTs(tokenAddress)
      .then((resp) => {
        const filteredData = resp.result.filter(
          (item) => item.metadata !== null
        );
        const parsedData = filteredData.map((item) =>
          JSON.parse(item.metadata)
        );
        setData(parsedData);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Skeleton是条条的loading效果
  if (loading) {
    return <Skeleton active />;
  }

  return <Table rowKey="name" columns={columns} dataSource={data} />;
};

const ContractNfts = ({ tokenAddress }) => {
  // modal开关
  const [modalOpen, setModalOpen] = useState();

  return (
    <>
      <Tooltip title="NFT(s) in its contract">
        <Button
          style={{ border: "none" }}
          size="large"
          shape="circle"
          icon={<InfoCircleOutlined />}
          onClick={() => setModalOpen(true)}
        />
      </Tooltip>
      <Modal
        width={1000}
        title="NFT(s) List"
        destroyOnClose
        open={modalOpen}
        footer={null}
        onCancel={() => setModalOpen(false)}
      >
        <ModalContent tokenAddress={tokenAddress} />
      </Modal>
    </>
  );
};

export default ContractNfts;
