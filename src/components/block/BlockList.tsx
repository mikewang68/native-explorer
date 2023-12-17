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
        <h1 style={{ listStyleType: 'none', textAlign: 'left', fontSize: '22px', margin: '10px 5px 0px 10px' }}>Latest block:</h1>
        <table style={{ margin: '10px' }}>
            <thead>
                <tr>
                    <th style={{ listStyleType: 'none', textAlign: 'center', fontWeight: 'bold', backgroundColor: '#ffffff' }}>Block height</th>
                    <th style={{ listStyleType: 'none', textAlign: 'center', fontWeight: 'bold', backgroundColor: '#ffffff' }}>Block hash</th>
                    <th style={{ listStyleType: 'none', textAlign: 'center', fontWeight: 'bold', backgroundColor: '#ffffff' }}>Number of transaction</th>
                </tr>
            </thead>
            <tbody>
                {blockInfos.map((block, index) => (
                    <tr key={index}>
                        <td style={{ listStyleType: 'none', color: "blue", textAlign: 'center', backgroundColor: index % 2 === 0 ? '#e0e0e0' : '#ffffff' }}>
                            <Link to={`/block/${block.blockHeight}`}>{block.blockHeight}</Link>
                        </td>
                        <td style={{ listStyleType: 'none', color: "blue", textAlign: 'center', backgroundColor: index % 2 === 0 ? '#e0e0e0' : '#ffffff' }}>
                            <Link to={`/block/${block.blockHeight}`}>{block.blockhash}</Link>
                        </td>
                        <td style={{ listStyleType: 'none', textAlign: 'center', backgroundColor: index % 2 === 0 ? '#e0e0e0' : '#ffffff' }}>{block.transactionCount}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

export default BlockList;