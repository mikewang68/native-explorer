import React, { useState, useEffect } from 'react';
import { useCluster, Cluster } from "providers/cluster";

export function latestBlockA() {
    const [blockHash, setBlockHash] = useState<string | null>("");

    useEffect(() => {
        async function fetchData() {
            const hash = await getBlockHash();
            if (hash) {
                setBlockHash(hash);
            }
        }
        fetchData();
    }, []);

    const getBlockHash = async () => {
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
                const blockhash = jsonResponse.result.blockhash; // 提取"blockhash"字段的值
                return blockhash;
            } else {
                throw new Error('Failed to fetch data');
            }
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
    };

    return (
        <div className="App">
            <h1>Block Hash:</h1>
            <p>{blockHash || 'Loading...'}</p >
        </div>
    );
}
