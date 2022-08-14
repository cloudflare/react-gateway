import React from 'react';

export const withExposedSetState = (Component) => {
  let setState;
  let setSetState = (setStateParam) => {
    setState = setStateParam;
  };
  return {
    setState: (state) => {
      setState(state);
    },
    Component: (props) => <Component setSetState={setSetState} {...props} />
  };
};

