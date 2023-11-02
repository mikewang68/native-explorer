import React, { useEffect, useState } from "react";
import { Connection } from "@velas/web3";
import { useCluster, Cluster } from "providers/cluster";
import { log } from "console";

const PAGE_SIZE = 10;

  




export function LatestBlock() {
  //
  const [blockHashA, setBlockHashA] = useState<string | null>("");

    useEffect(() => {
        async function fetchData() {
            const hash = await getBlockHashA();
            if (hash) {
                setBlockHashA(hash);
            }
            console.log('啦啦啦啦阿啊啊啊啊',hash);
        }
        fetchData();
    }, []);


    const getBlockHashA = async () => {
      try {
          const url = 'http://192.168.101.101:8899';
          const requestData = {
              jsonrpc: '2.0',
              id: 1,
              method: 'getRecentBlockhash',
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
              const blockhash = jsonResponse.result.value.blockhash; // 提取"blockhash"字段的值
              console.log('啦啦啦啦阿啊啊啊啊',blockhash);
              return blockhash;
          } else {
              throw new Error('Failed to fetch data');
          }
      } catch (error) {
          console.error('!!!!!!!!!!!!!!Error:', error);
          return null;
      }
  };
 //
 

///
const [blockHeight, setBlockHeight] = useState<string | null>("");

    useEffect(() => {
        async function fetchData() {
            const height = await getBlockHeight();
            if (height) {
                setBlockHeight(height);
            }
            console.log('啦啦啦啦阿啊啊啊啊',height);
        }
        fetchData();
    }, []);

    const getBlockHeight = async () => {
      try {
          debugger
          const url = 'http://192.168.101.101:8899';
          const requestData = {
              jsonrpc: '2.0',
              id: 1,
              method: 'getEpochInfo',
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
            const blockheight = jsonResponse.result.blockHeight; // 提取"blockhash"字段的值
            console.log('啦啦啦啦阿啊啊啊啊',blockheight);
            return blockheight;
        } else {
            throw new Error('Failed to fetch data');
        }
    } catch (error) {
        console.error('!!!!!!!!!!!!!!Error:', error);
        return null;
    }
};


const [transactionCount, settransactionCount] = useState<string | null>("");

    useEffect(() => {
        async function fetchData() {
            const count = await gettransactionCount();
            if (count) {
                settransactionCount(count);
            }
            console.log('啦啦啦啦阿啊啊啊啊',count);
        }
        fetchData();
    }, []);

    const gettransactionCount = async () => {
      try {
          const url = 'http://192.168.101.101:8899';
          const requestData = {
              jsonrpc: '2.0',
              id: 1,
              method: 'getTransactionCount',
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
            const transactionCount = jsonResponse.result.value.transactionCount; // 提取"blockhash"字段的值
            console.log('啦啦啦啦阿啊啊啊啊',transactionCount);
            return transactionCount;
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
    margin: '10px 0 0 10px',
    fontWeight: 500
  }

  const latestBlockContent: any = {
    display: 'flex',
    flexDirection: 'column',
    'margin': '10px'
  }
  
  const latestBlockItemStyle: any = {
    display: 'flex',
    flexDirection: 'row',
    alignItem: 'center',
    marginBottom:"5px"
  }

  const { cluster, url } = useCluster();

  function getConnection(url: string): Connection | undefined {
    try {
      return new Connection(url);
    } catch (error) {}
  }




  
 






  // const [connection, setConnection] = useState<any>(null)

  //const [blockHeight, setBlockHeight] =  useState<number>(0)
  // 交易数量
  //const [TransactionCount, setTransactionCount] =  useState<number>(0)
  
  const [blockHash, setBlockHash] =  useState<string>('0')


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
    <div >
      <div style={titleStyle}>Block details</div>
      <div className="card">
        <div style={subTitleStyle}>
          Latest block
        </div>
        <div style={latestBlockContent}>
          <div style={latestBlockItemStyle}>
            <span style={{width: '50%'}}>Block height</span>
            <span style={{flex: 1}}>{blockHeight}</span>
          </div>
          <div style={latestBlockItemStyle}>
            <span style={{width: '50%'}}>Block hash</span>
            <span style={{flex: 1, width: '100px'}}>{blockHashA}</span>
          </div>
          <div style={latestBlockItemStyle}>
            <span style={{width: '50%'}}>Number of transaction</span>
            <span>{transactionCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
