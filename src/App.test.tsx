import React from 'react';
import { render } from '@testing-library/react';
import App from './app/App';
import { Provider } from 'react-redux';
import store from './app/store';

test('renders learn react link', () => {
  const { getByText } = render(<Provider store={store}>
		<App />
	</Provider>);
});
