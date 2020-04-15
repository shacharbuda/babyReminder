import React from 'react';
import BabiesDataTableContainer from '../BabiesDataTable';

export default function AppBody({ children } : React.ComponentProps<any>) {
  return (
      <div className="container d-flex align-items-center body-content">
        <BabiesDataTableContainer />
      </div>
  );
}