import React from 'react';
import Sidebar from '../../../shared/components/Sidebar/Sidebar';
import Header from '../../../shared/components/Header';
// import './Container.scss';

const Customer = () => {
  return (
    <>
      <Sidebar />
      <Header title="Customers" onAddClick={function (): void {
        throw new Error('Function not implemented.');
      } } />
    </>
  );
};

export default Customer;