import React from 'react';
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const rtlTheme = createMuiTheme({
	direction: 'rtl',
});

export default function RTL({ children } : React.ComponentProps<any>) {
  return (
    <StylesProvider jss={jss}>
			<ThemeProvider theme={rtlTheme}>
      	{children}
			</ThemeProvider>
    </StylesProvider>
  );
}
