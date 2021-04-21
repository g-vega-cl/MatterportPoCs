import React, { createContext, useState } from "react";
import { MatterSDK } from "../../utils/hooks/matterport/typings";

interface MatterSdkStoreState {
  sdk: MatterSDK | undefined;
  setSdk: any;
  items: any;
  setItems: any;
}

export const MatterSdkStore = createContext({} as MatterSdkStoreState);

const MatterSdkStoreProvider: React.FC = ({ children }) => {
  const [sdk, setSdk] = useState<MatterSDK>();
  const [items, setItems] = useState<any[]>([]);

  const value = { sdk, setSdk, items, setItems };

  return <MatterSdkStore.Provider value={value}>{children}</MatterSdkStore.Provider>;
};

export default MatterSdkStoreProvider;
