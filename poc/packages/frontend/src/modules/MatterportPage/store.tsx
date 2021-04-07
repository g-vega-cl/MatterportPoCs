import React, { createContext, useState } from "react";
import { MatterSDK } from "../../utils/hooks/matterport/typings";

interface MatterSdkStoreState {
  sdk: MatterSDK | undefined;
  setSdk: any;
}

export const MatterSdkStore = createContext({} as MatterSdkStoreState);

const MatterSdkStoreProvider: React.FC = ({ children }) => {
  const [sdk, setSdk] = useState<MatterSDK>();
  const value = { sdk, setSdk };

  return <MatterSdkStore.Provider value={value}>{children}</MatterSdkStore.Provider>;
};

export default MatterSdkStoreProvider;
