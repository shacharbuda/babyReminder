import React from 'react';
import util from '../../utils/util';

export function AppHeader(props: Props) {	
		return (
      <header className="container d-flex justify-content-between">
          <h1 className="m-auto text-center">תינוק תזכורת</h1>
          <h5 className="m-auto text-center">{util.getTimeInDayGreet()}<br />{props.displayName}!</h5>
      </header>
			);
}

interface Props {
	// From container
  displayName: string;
};