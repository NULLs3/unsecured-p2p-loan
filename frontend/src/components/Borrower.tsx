import React, { useState } from 'react';

const Borrower: React.FC = () => {
    const [amount, setAmount] = useState<number>(0);

    const handleBorrow = () => {
        // Code to borrow from the pool
        console.log(`Borrowing ${amount} ETH from the pool.`);
    };

    return (
        <div>
            <h2>Borrower</h2>
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                placeholder="Amount in ETH"
            />
            <button onClick={handleBorrow}>Borrow</button>
        </div>
    );
};

export default Borrower;
