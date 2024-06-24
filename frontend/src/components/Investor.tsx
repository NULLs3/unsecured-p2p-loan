import React, { useState } from 'react';

const Investor: React.FC = () => {
    const [amount, setAmount] = useState<number>(0);

    const handleProvideLiquidity = () => {
        // Code to provide liquidity
        console.log(`Providing ${amount} ETH to the pool.`);
    };

    return (
        <div>
            <h2>Investor</h2>
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                placeholder="Amount in ETH"
            />
            <button onClick={handleProvideLiquidity}>Provide Liquidity</button>
        </div>
    );
};

export default Investor;
