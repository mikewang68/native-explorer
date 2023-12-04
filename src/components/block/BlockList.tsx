// BlockList.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface BlockInfo {
    blockhash: string;
    blockHeight: number;
    transactionCount: number;
}

const BlockList: React.FC<{ blockInfos: BlockInfo[] }> = ({ blockInfos }) => (
    <div className="card">
        <h1>Latest block:</h1>
        <table>
            <thead>
                <tr>
                    <th>Block height</th>
                    <th>Block hash</th>
                    <th>Number of transaction</th>
                </tr>
            </thead>
            <tbody>
                {blockInfos.map((block, index) => (
                    <tr key={index}>
                        <td>
                            <Link to={`/block/${block.blockHeight}`}>{block.blockHeight}</Link>
                        </td>
                        <td>
                            <Link to={`/block/${block.blockHeight}`}>{block.blockhash}</Link>
                        </td>
                        <td>{block.transactionCount}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

export default BlockList;