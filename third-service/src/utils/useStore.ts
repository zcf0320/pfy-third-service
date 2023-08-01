import React from 'react';
import { MobXProviderContext } from 'mobx-react';

export const useStores = (name: string) => {
  return React.useContext(MobXProviderContext)[name];
};
