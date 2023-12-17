import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

// 区块详细信息的接口定义
interface BlockDetailInfo {
    blockhash: string;
    transactions: TransactionInfo[];
    blockHeight: number;
    timestamp: number;
    // 其他区块详细信息字段
}

// 交易信息的接口定义
interface TransactionInfo {
    transactionHash: string;
    transactionType: string;
    signer: string;
    transactionFee: number;
    timestamp: number;
}

const BlockDetail: React.FC = () => {
    const { blockHeight } = useParams<{ blockHeight: string }>();
    const [blockDetails, setBlockDetails] = useState<BlockDetailInfo | null>(null);
    const apiUrl = 'http://192.168.101.101:8899';

    useEffect(() => {
        const fetchBlockDetails = async () => {
            try {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        jsonrpc: '2.0',
                        id: 1,
                        method: 'getConfirmedBlock',
                        params: [Number(blockHeight)],
                    }),
                });

                if (response.ok) {
                    const jsonResponse = await response.json();
                    // 解析获取的区块详细信息
                    const blockDetails: BlockDetailInfo = {
                        blockhash: jsonResponse.result.blockhash,
                        transactions: mapTransactions(jsonResponse.result.transactions),
                        blockHeight: jsonResponse.result.blockHeight,
                        timestamp: jsonResponse.result.blockTime,
                    };
                    setBlockDetails(blockDetails);
                } else {
                    throw new Error('Failed to fetch block details');
                }
            } catch (error) {
                console.error('Error fetching block details:', error);
            }
        };

        fetchBlockDetails();
    }, [blockHeight]);

    // 映射交易信息
    const mapTransactions = (transactions: any[]): TransactionInfo[] => {
        return transactions.map((tx: any) => ({
            transactionHash: tx.transaction.message.recentBlockhash,
            transactionType: 'YourTransactionTypeHere',
            signer: tx.transaction.message.accountKeys[0],
            transactionFee: tx.meta.fee, 
            timestamp: blockDetails?.timestamp || 0,
        }));
    };
    return (
        <div className="card">
            <Link to={`/`}><button style={{ listStyleType: 'none', textAlign: 'left', fontSize: '20px', margin: '15px 20px 0px 10px' }}>返回</button></Link>
            <p style={{ listStyleType: 'none', textAlign: 'left', fontSize: '22px', margin: '15px 5px 10px 10px'}}>区块详细信息</p>
            {blockDetails && (<div>
                <p style={{ margin: '0px 10px 0px 10px',background:'#e0e0e0', fontSize: '17px'}}><b style={{fontWeight: 'bolder'}}>区块哈希:</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{blockDetails.blockhash}</p>
                <p style={{ margin: '0px 10px 0px 10px',background:'#ffffff', fontSize: '17px'}}><b style={{fontWeight: 'bolder'}}>区块高度:</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{blockDetails.blockHeight}</p>
                <p style={{ margin: '0px 10px 0px 10px',background:'#e0e0e0', fontSize: '17px'}}><b style={{fontWeight: 'bolder'}}>出块时间:</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{new Date(blockDetails.timestamp * 1000).toLocaleString()}</p >
                <p style={{ margin: '0px 10px 0px 10px',background:'#ffffff', fontSize: '17px'}}><b style={{fontWeight: 'bolder'}}>交易数量:</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{blockDetails.transactions.length}</p >
                <h2 style={{ listStyleType: 'none', textAlign: 'left', fontSize: '22px', margin: '30px 5px 15px 10px' }}>交易列表</h2>
                <table>
                    <thead>
                        <tr>
                            <th style={{ listStyleType: 'none', textAlign: 'center', fontWeight: 'bold', backgroundColor: '#ffffff', fontSize: '15px', borderRight:'1px solid black'}}>交易哈希</th>
                            {/* <th>交易类型</th> */}
                            <th style={{ listStyleType: 'none', textAlign: 'center', fontWeight: 'bold', backgroundColor: '#ffffff', fontSize: '15px', borderRight:'1px solid black'}}>签名者</th>
                            <th style={{ listStyleType: 'none', textAlign: 'center', fontWeight: 'bold', backgroundColor: '#ffffff', fontSize: '15px', borderRight:'1px solid black', whiteSpace: 'nowrap'}}>交易费用</th>
                            <th style={{ listStyleType: 'none', textAlign: 'center', fontWeight: 'bold', backgroundColor: '#ffffff', fontSize: '15px'}}>交易时间</th>
                        </tr>
                    </thead>
                    <tbody>
                        {blockDetails.transactions.map((tx, index) => (
                            <tr key={index}>
                                <td
                                    style={{
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                        maxWidth: '150px',
                                        marginTop: '11px',
                                        borderRight:'1px solid black'
                                        
                                    }}
                                    title={tx.transactionHash}
                                >
                                    {tx.transactionHash}
                                </td>
                                {/* <td>{tx.transactionType}</td> */}
                                <td style={{textAlign: 'center',borderRight:'1px solid black'}}>{tx.signer}</td>
                                <td style={{textAlign: 'center',borderRight:'1px solid black'}}>{tx.transactionFee}</td>
                                <td style={{textAlign: 'center'}}>{new Date(tx.timestamp * 1000).toLocaleString()}</td>
                            </tr>))}
                    </tbody>
                </table>
            </div>)}
        </div>);
};



 /**                               <div
                                    style={{
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                        maxWidth: '150px',
                                        marginTop: '11px',
                                        borderRight:'1px solid black'
                                        
                                    }}
                                    title={tx.transactionHash}
                                >
                                    {tx.transactionHash}
                                </div>
*/ 
//     interface BlockDetailInfo {
//     blockhash: string;
//     transactions: any[]; // 根据实际数据结构定义
//     // 其他块详细信息字段
// }

// const BlockDetail: React.FC = () => {
//             const { blockHeight } = useParams<{ blockHeight: string }>();
//             const [blockDetails, setBlockDetails] = useState<BlockDetailInfo | null>(null);
//             const apiUrl = 'http://192.168.101.101:8899';


//             useEffect(() => {
//                 const fetchBlockDetails = async () => {
//                     try {
//                         const response = await fetch(apiUrl, {
//                             method: 'POST',
//                             headers: {
//                                 'Content-Type': 'application/json',
//                             },
//                             body: JSON.stringify({
//                                 jsonrpc: '2.0',
//                                 id: 1,
//                                 method: 'getConfirmedBlock',
//                                 params: [Number(blockHeight)],
//                             }),
//                         });

//                         if (response.ok) {
//                             const jsonResponse = await response.json();
//                             const blockDetails = jsonResponse.result;
//                             setBlockDetails(blockDetails);
//                         } else {
//                             throw new Error('Failed to fetch block details');
//                         }
//                     } catch (error) {
//                         console.error('Error fetching block details:', error);
//                     }
//                 };

//                 fetchBlockDetails();
//             }, [blockHeight]);

// const titleStyle = {
//     fontSize: '24px',
//     marginBottom: '10px'
// }
// const subTitleStyle = {
//     fontSize: '16px',
//     margin: '10px 0 10px 10px',
//     fontWeight: 500
// }
// return (
//     <div className="BlockDetail">
//         <div style={titleStyle}>BlockDetails</div>
//         <Link to={`/`}><button>返回</button></Link>
//         <div style={subTitleStyle}>
//             <p style={{ textAlign: 'left' }}>Block Height: {blockHeight}</p>
//         </div>
//         {blockDetails && (
//             <div>
//                 <p style={{ margin: '0px 0px 10px 10px' }}>Block Hash: {blockDetails.blockhash}</p >
//                 <p style={{ margin: '0px 0px 10px 10px' }}>Transaction Count: {blockDetails.transactions.length - 1}</p >
//                 {/* 其他块详细信息的显示 */}
//             </div>
//         )}
//     </div>
// );
//         };

export default BlockDetail;