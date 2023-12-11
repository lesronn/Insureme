import React from 'react';
export const navigationRef = React.createRef();

const navigate = (name, params) => {
  console.log('Navigation Hit');
  navigationRef.current?.navigate(name, params);
};
export default {
  navigate,
};
