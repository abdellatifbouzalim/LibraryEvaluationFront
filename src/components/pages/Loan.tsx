import React, { useState, useEffect } from 'react';
import LoanList from '../Loan/LoanList'; 

const Loan: React.FC = () => {
  const [books, setLoans] = useState<Loan[]>([]);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 py-4">List of Loans</h2>
      <LoanList />
    </div>
  );
};

export default Loan;