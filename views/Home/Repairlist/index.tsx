import React from 'react';
import Sidebar from '../../../shared/components/Sidebar/Sidebar';

import Header from '../../../shared/components/Header';


const Repairlist = () => {
  return (
    <>
      <Sidebar />
      <Header title="Repair List" onAddClick={function (): void {
        throw new Error('Function not implemented.');
      } } />
    </>
  );
};

export default Repairlist;