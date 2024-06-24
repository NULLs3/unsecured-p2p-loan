import React, { useState } from 'react';
import Investor from './components/Investor';
import Borrower from './components/Borrower';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('investor');

  return (
    <div>
      <h1>DeFi Protocol</h1>
      <div>
        <button onClick={() => setActiveTab('investor')}>Investor</button>
        <button onClick={() => setActiveTab('borrower')}>Borrower</button>
      </div>
      {activeTab === 'investor' && <Investor />}
      {activeTab === 'borrower' && <Borrower />}
    </div>
  );
};

export default App;