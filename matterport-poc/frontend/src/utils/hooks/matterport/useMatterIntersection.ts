import { useState } from 'react';
import { useEffect } from 'react';
import { MatterSDK, MatterSubscription } from './typings';

export const useMatterIntersection = (sdk?: MatterSDK) => {
  const [intersectionCache, setIntersectionCache] = useState<any>();

  useEffect(() => {
    let mySub: MatterSubscription;

    if (!!sdk) {
      mySub = sdk.Pointer.intersection.subscribe(function (intersection: any) {
        const currentIntersection = { ...intersection };
        currentIntersection.time = new Date().getTime();

        setIntersectionCache(currentIntersection);
      });
    }

    return () => {
      if (!!mySub && mySub.cancel) {
        mySub.cancel();
      }
    };
  }, [sdk]);

  return intersectionCache;
};
