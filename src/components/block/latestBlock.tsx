import React, { useEffect, useState } from "react";
import { Connection } from "@velas/web3";
import { useCluster, Cluster } from "providers/cluster";
import { log } from "console";

const PAGE_SIZE = 10;

export function LatestBlock() {


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

  const [blockHeight, setBlockHeight] =  useState<number>(0)
  // 交易数量
  const [TransactionCount, setTransactionCount] =  useState<number>(0)
  
  const [blockHash, setBlockHash] =  useState<string>('0')


  useEffect(() => {

    // const connection = getConnection(url);
    // setConnection(connection)
    setInterval(getLatestBlock, 5000)
    getLatestBlock()
  }, [])


  const getLatestBlock = async () => {
    try {
      const connection: any = getConnection(url);
      const epochInfo = await connection.getEpochInfo();
      const blockHashInfo = await connection.getRecentBlockhash();
      // 交易数量目前调的接口
      const transactionCount = await connection.getTransactionCount();
      setBlockHeight(epochInfo.blockHeight)
      // 存交易数量
      setTransactionCount(transactionCount)
      setBlockHash(blockHashInfo.blockhash)
    } catch (error) {
      console.log(error)
    }
  };


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
            <span style={{flex: 1, width: '100px'}}>{blockHash}</span>
          </div>
          <div style={latestBlockItemStyle}>
            <span style={{width: '50%'}}>Number of transaction</span>
            <span>{TransactionCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
