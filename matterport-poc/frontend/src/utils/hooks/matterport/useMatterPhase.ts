import { useEffect, useState } from 'react';

import { MatterSDK, MatterPhase, MatterSubscription } from './typings';

export const useMatterPhase = (sdk?: MatterSDK) => {
  const [phase, setPhase] = useState<MatterPhase>();

  useEffect(() => {
    let mySub: MatterSubscription;

    if (!!sdk) {
      mySub = sdk.App.state.subscribe((appState) => {
        setPhase(appState.phase);
      });
    }

    return () => {
      if (!!mySub && mySub.cancel) {
        mySub.cancel();
      }
    };
  }, [sdk]);

  return phase;
};
