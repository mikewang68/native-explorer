import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import BlockList from './BlockList';
import BlockDetail from './BlockDetail';

// interface BlockInfo {
//     blockhash: string;
//     blockHeight: number;
//     transactionCount: number;
// }

// const apiUrl = 'http://192.168.101.101:8899';

// const App: React.FC = () => {
//     const [blockInfoList, setBlockInfoList] = useState<BlockInfo[]>([]);
//     const refreshInterval = 2500;

//     useEffect(() => {
//         const fetchData = async () => {
//             // ... (获取最近五个区块信息的逻辑)
//         };

//         fetchData();

//         const intervalId = setInterval(fetchData, refreshInterval);

//         return () => {
//             clearInterval(intervalId);
//         };
//     }, []);

//     return (
//         <Router>
//             <div className="App">
//                 <Route exact path="/" render={() => <BlockList blockInfos={blockInfoList} />} />
//                 <Route path="/block/:blockHeight" component={BlockDetail} />
//             </div>
//         </Router>
//     );
// };



// 区块信息的接口定义
interface BlockInfo {
    blockhash: string;
    blockHeight: number;
    transactionCount: number;
}


const apiUrl = 'http://192.168.101.101:8899';

const RecentBlocks: React.FC = () => {
    const [blockInfoList, setBlockInfoList] = useState<BlockInfo[]>([]);
    const refreshInterval = 2500;

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 获取当前最新块的高度
                const latestBlockHeight = await getLatestBlockHeight();

                // 获取最新的五个区块信息
                const blockInfos = await getBlockInfos(latestBlockHeight, 5);

                // 更新状态
                setBlockInfoList(blockInfos);
            } catch (error) {
                console.error('Error fetching data:', error);
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

    const getLatestBlockHeight = async (): Promise<number> => {
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    jsonrpc: '2.0',
                    id: 1,
                    method: 'getBlockHeight',
                    params: [],
                }),
            });

            if (response.ok) {
                const jsonResponse = await response.json();
                return jsonResponse.result;
            } else {
                throw new Error('Failed to get latest block height');
            }
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    };

    const getBlockInfos = async (latestBlockHeight: number, count: number): Promise<BlockInfo[]> => {
        try {
            const blockInfos: BlockInfo[] = [];

            for (let i = latestBlockHeight; i > latestBlockHeight - count; i--) {
                const requestData = {
                    jsonrpc: '2.0',
                    id: 1,
                    method: 'getConfirmedBlock',
                    params: [Number(i)],
                };
                const response = await fetch(apiUrl, {
                    method: 'POST', headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestData),
                });
                if (response.ok) {
                    const jsonResponse = await response.json();
                    const blockhash = jsonResponse.result.blockhash;
                    const blockHeight = jsonResponse.result.blockHeight;
                    const transactionCount = jsonResponse.result.transactions.length ;
                    const blockInfo: BlockInfo = { blockhash, blockHeight, transactionCount, };
                    blockInfos.push(blockInfo);
                } else {
                    throw new Error('Failed to fetch data');
                }
            } return blockInfos;
        } catch (error) {
            console.error('Error:', error);
            return [];
        }
    };


    return (
        <Router>
            <div className="card">
                <Route exact path="/" render={() => <BlockList blockInfos={blockInfoList} />} />
                <Route path="/block/:blockHeight" component={BlockDetail} />
            </div>
        </Router>
    );

    return (
        <div className="card" >
            <h1 style={{ listStyleType: 'none', textAlign: 'left', fontSize: '22px', margin: '10px 5px 0px 10px' }}>Latest block:</h1>
            <table style={{ margin: '15px' }}>
                <thead>
                    <tr>
                        <th style={{ listStyleType: 'none', textAlign: 'center', fontWeight: 'bold', backgroundColor: '#ffffff' }}>Block height</th>
                        <th style={{ listStyleType: 'none', textAlign: 'center', fontWeight: 'bold', backgroundColor: '#ffffff' }}>Block hash</th>
                        <th style={{ listStyleType: 'none', textAlign: 'center', fontWeight: 'bold', backgroundColor: '#ffffff' }}>Number of transaction</th>
                    </tr>
                </thead>
                <tbody>
                    {blockInfoList.map((block, index) => (
                        <tr key={index}>
                            <th style={{ listStyleType: 'none', color: "blue", textAlign: 'center', backgroundColor: index % 2 === 0 ? '#e0e0e0' : '#ffffff' }}>{block.blockHeight}</th>
                            <th style={{ listStyleType: 'none', color: "blue", textAlign: 'center', backgroundColor: index % 2 === 0 ? '#e0e0e0' : '#ffffff' }}>{block.blockhash}</th>
                            <th style={{ listStyleType: 'none', textAlign: 'center', backgroundColor: index % 2 === 0 ? '#e0e0e0' : '#ffffff' }}>{block.transactionCount}</th>
                        </tr>))}
                </tbody>
            </table>
        </div >);
};
export default RecentBlocks;     