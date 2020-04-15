import React from 'react';
import consts from '../../utils/constants';

export default function AppFooter({ ...others } : React.ComponentProps<any>) {
  return (
    <footer {...others} className="ltr text-center blockquote-footer">
      Made by Waffle (v{consts.APP_VERSION})
    </footer>
  );
}