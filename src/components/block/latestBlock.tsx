import React, { useEffect, useState } from "react";
import { Connection } from "@velas/web3";
import { useCluster, Cluster } from "providers/cluster";
import { exec } from 'child_process';
import { isTemplateSpan } from "typescript";
// const { exec } = require('child_process');
// import { log, time } from "console";

const PAGE_SIZE = 10;

//mlh

interface BlockInfo {
  blockhash: string;
  blockHeight: number;
  transactionCount: number;
}





export function LatestBlock() {

  //mlh
  const [blockInfoList, setBlockInfoList] = useState<BlockInfo[]>([]);
  const refreshInterval = 2500; // 设置刷新间隔，单位为毫秒（这里是1  秒）


  useEffect(() => {
    const fetchData = async () => {
      const blockInfos = await getBlockInfos(5); // 获取最近的五个区块信息
      if (blockInfos) {
        setBlockInfoList(blockInfos);
      }
    };

    const refreshData = () => {
      fetchData();
    };

    // 初始加载数据
    fetchData();

    // 设置定时刷新
    const intervalId = setInterval(refreshData, refreshInterval);

    // 在组件卸载时清除定时器
    return () => {
      clearInterval(intervalId);
    };
  }, []);



  const getBlockInfos = async (count: number): Promise<BlockInfo[]> => {
    try {
      const url = 'http://192.168.101.101:8899';
      const blockInfos: BlockInfo[] = [];

      for (let i = 0; i < count; i++) {
        const requestData = {
          jsonrpc: '2.0',
          id: 1,
          method: 'getConfirmedBlock',
          params: [Number(500+i)],
          // params: [String(BigInt(i)),'json'],
          // params:[ [i],'json'], // 使用 i 来获取不同块的信息
        };

        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        });

        if (response.ok) {
          const jsonResponse = await response.json();
          const blockhash = jsonResponse.result.blockhash;
          const blockHeight = jsonResponse.result.blockHeight;
          const transactionCount = jsonResponse.result.transactions.length-1;

          const blockInfo: BlockInfo = {
            blockhash,
            blockHeight,
            transactionCount,
          };

          blockInfos.push(blockInfo);
        } else {
          throw new Error('Failed to fetch data');
        }
      }

      return blockInfos;

    } catch (error) {
      console.error('Error:', error);
      return [];
    }
  };


  // const getBlockInfos = async (count: number): Promise<BlockInfo[]> => {
  //   try {
  //     const blockInfos: BlockInfo[] = [];

  //     for (let i = 0; i < count; i++) {
  //       const command = `sino block ${i}`;
  //       const blockInfoString = await executeCommand(command);

  //       // 解析命令输出的 JSON 字符串
  //       const blockInfo = JSON.parse(blockInfoString);

  //       // 将数据转换成适合展示的格式
  //       const formattedBlockInfo: BlockInfo = {
  //         blockhash: blockInfo.blockhash,
  //         blockHeight: blockInfo.blockHeight,
  //         transactionCount: blockInfo.transactionCount,
  //       };

  //       blockInfos.push(formattedBlockInfo);
  //     }

  //     return blockInfos;
  //   } catch (error) {
  //     console.error('Error:', error);
  //     return [];
  //   }
  // };

  // const executeCommand = (command: string): Promise<string> => {
  //   return new Promise<string>((resolve, reject) => {
  //     exec(command, (error: any, stdout: any, stderr: any) => {
  //       if (error) {
  //         reject(error);
  //       } else {
  //         resolve(stdout);
  //       }
  //     });
  //   });
  // };


  //
  // const [blockHashA, setBlockHashA] = useState<string | null>("");
  const [blockHashes, setBlockHashes] = useState<string[]>([]);
  // const refreshInterval = 2500; // 设置刷新间隔，单位为毫秒（这里是1  秒）

  useEffect(() => {
    const fetchData = async () => {
      const hashes = await getBlockHashes(5); // 获取最近的五条区块哈希值
      if (hashes) {
        setBlockHashes([...hashes]);
      }
    };


    const refreshData = () => {
      fetchData();
    };

    // 初始加载数据
    fetchData();

    // 设置定时刷新
    const intervalId = setInterval(refreshData, refreshInterval);

    // 在组件卸载时清除定时器
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // 方法外部定义hashes
  const hashes = ['1', '1', '1', '1', '1'];

  const getBlockHashes = async (count: number) => {
    try {
      const url = 'http://192.168.101.101:8899';
      const requestData = {
        jsonrpc: '2.0',
        id: 1,
        method: 'getRecentBlockhash',
      };

      // const hashes = [];
      // for (let i = 0; i < count; i++) {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        const blockhash = jsonResponse.result.value.blockhash;
        hashes.pop();
        hashes.unshift(blockhash);
        console.log(hashes);
      } else {
        throw new Error('Failed to fetch data');
      }
      // }
      return hashes;
    } catch (error) {
      console.error('Error:', error);
      return [];
    }
  };




  ///
  const [blockHeight, setBlockHeight] = useState<string[]>([]);


  useEffect(() => {
    const fetchData = async () => {
      const heights = await getBlockHeight(5);
      if (heights) {
        console.log(heights, 'heights');

        setBlockHeight(heights);
      }
    };

    const refreshData = () => {
      fetchData();
    };

    // 初始加载数据
    fetchData();

    // 设置定时刷新
    const intervalId = setInterval(refreshData, refreshInterval);

    // 在组件卸载时清除定时器
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // 方法外部定义heights
  const heights = ['1', '1', '1', '1', '1'];

  const getBlockHeight = async (count: number) => {
    try {

      const url = 'http://192.168.101.101:8899';
      const requestData = {
        jsonrpc: '2.0',
        id: 1,
        method: 'getEpochInfo',
      };

      //   const heights = [];
      //   for (let i = 0; i < count; i++) {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        const blockheight = jsonResponse.result.blockHeight; // 提取"blockheight"字段的值
        heights.pop();
        heights.unshift(blockheight);
        console.log(heights);
      } else {
        throw new Error('Failed to fetch data');
      }
      // } 
      return heights;
    } catch (error) {
      console.error('Error:', error);
      return [];
    }
  };


  const [transactionCount, settransactionCount] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const slot = await getSlot();
      const TransactionCount = await gettransactionCount(slot);
      if (TransactionCount) {
        settransactionCount(TransactionCount);
      }
    };

    const refreshData = () => {
      fetchData();
    };

    // 初始加载数据
    fetchData();

    // 设置定时刷新
    const intervalId = setInterval(refreshData, refreshInterval);

    // 在组件卸载时清除定时器
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const getSlot = async () => {
    try {
      const url = 'http://192.168.101.101:8899';
      const requestData = {
        jsonrpc: '2.0',
        id: 1,
        method: 'getSlot',
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        const slot = jsonResponse.result; // 提取"transactionCount"字段的值
        console.log(slot);
        return slot;
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      console.error('!!!!!!!!!!!!!!Error:', error);
      return null;
    }
  };
  const count = ['1', '1', '1', '1', '1'];
  const gettransactionCount = async (slot: Number) => {
    try {
      const url = 'http://192.168.101.101:8899';
      const requestData = {
        jsonrpc: '2.0',
        id: 1,
        method: 'getBlock',
        params: [slot],
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        const transactionCount = jsonResponse.result.transactions.length; // 提取"transactionCount"字段的值
        count.pop();
        count.unshift((transactionCount - 1).toString());
        console.log(slot, count);
        return count;
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      console.error('!!!!!!!!!!!!!!Error:', error);
      return null;
    }
  };


  const titleStyle = {
    fontSize: '24px',

    marginBottom: '10px'
  }

  const subTitleStyle = {
    fontSize: '16px',
    margin: '10px 0 10px 10px',
    fontWeight: 500
  }

  const latestBlockContent: any = {
    display: 'flex',
    // flexDirection: 'column',
    justifyContent: 'center',
    'margin': '2px',
    padding: '2px'
  }

  const latestBlockItemStyle: any = {
    // display: 'flex',
    flexDirection: 'row',
    alignItem: 'center',
    marginBottom: "5px"
  }

  const { cluster, url } = useCluster();

  function getConnection(url: string): Connection | undefined {
    try {
      return new Connection(url);
    } catch (error) { }
  }












  // const [connection, setConnection] = useState<any>(null)

  //const [blockHeight, setBlockHeight] =  useState<string>('0')
  // 交易数量
  //const [TransactionCount, setTransactionCount] =  useState<number>(0)

  const [blockHash, setBlockHash] = useState<string>('0')


  useEffect(() => {
    // async function fetchData() {
    // const hash = await setBlockHashA(hash);
    // if (hash) {
    // setBlockHashA(hash);
    // }
    // }
    // fetchData();
    // const connection = getConnection(url);
    // setConnection(connection)
    // setInterval(getLatestBlock, 5000)
    // getLatestBlock()
  }, [])


  // const getLatestBlock = async () => {
  //   try {
  //     const connection: any = getConnection(url);
  //     const epochInfo = await connection.getEpochInfo();
  //     const blockHashInfo = await connection.getRecentBlockhash();
  //     // 交易数量目前调的接口
  //     const transactionCount = await connection.getTransactionCount();
  //     setBlockHeight(epochInfo.blockHeight)
  //     // 存交易数量
  //     setTransactionCount(transactionCount)
  //     setBlockHash(blockHashInfo.blockhash)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // };

  return (

    <><div className="card">
      <h1>Recent Block Information:</h1>
      <table>
        <thead>
          <tr>
            <th>Block Height</th>
            <th>Block Hash</th>
            <th>Transaction Count</th>
          </tr>
        </thead>
        <tbody>
          {blockInfoList.map((info, index) => (<tr key={index}>
            <td>{info.blockHeight}</td>
            <td>{info.blockhash}</td>
            <td>{info.transactionCount}</td>
          </tr>))}
        </tbody>
      </table>
    </div>



      <div>
        <div style={titleStyle}>Block details</div>
        <div className="card">
          <div style={subTitleStyle}>
            <p style={{ textAlign: 'left' }}>Latest block</p>
          </div>
          <div style={latestBlockContent}>
            <div style={latestBlockItemStyle}>
              <p style={{ textAlign: 'center' }}><b>Block height</b></p>
              {/* <span style={{ width: '50%' }}>Block height</span> */}
              {/* <span style={{ flex: 1 }}>{blockHeight}</span> */}

              <span style={{ flex: 1, width: '100px' }}>{blockHeight.map((height, index) => (
                <li key={index} style={{ listStyleType: 'none', color: "blue", textAlign: 'center' ,backgroundColor: index%2 === 0?'#e0e0e0' : '#ffffff'}}>{height}</li>
              ))}</span>

            </div>
            <div style={latestBlockItemStyle}>
              <p style={{ textAlign: 'center' }}><b>Block hash</b></p>
              {/* <span style={{ flex: 1, width: '100px' }}>{blockHashA}</span> */}

              <span style={{ flex: 1, width: '100px' }}>
                {blockHashes.map((hash, index) => (
                  <li style={{ listStyleType: 'none', color: "blue" ,backgroundColor: index%2 === 0?'#e0e0e0' : '#ffffff'}} key={index}>{hash}</li>
                ))}
              </span>

            </div>
            <div style={latestBlockItemStyle}>
              <p style={{ textAlign: 'center' }}><b>Number of transaction</b></p>
              {/* <span style={{ width: '50%' }}>Number of transaction</span> */}
              <span style={{ flex: 1, width: '100px' }}>
                {transactionCount.map((hash, index) => (
                  <li style={{ listStyleType: 'none', textAlign: 'center' ,backgroundColor: index%2 === 0?'#e0e0e0' : '#ffffff'}} key={index}>{hash}</li>
                ))}
              </span>
            </div>
          </div>
        </div>
      </div></>
  );
}
