import { useState } from 'react';
import { useEffect } from 'react';
import { MatterSDK, MatterPose, MatterSubscription } from './typings';

export const useMatterPose = (sdk?: MatterSDK) => {
  const [poseCache, setPoseCache] = useState<MatterPose>();

  useEffect(() => {
    let mySub: MatterSubscription;

    if (!!sdk) {
      if (!!sdk.Camera.pose) {
        mySub = sdk.Camera.pose.subscribe((pose) => {
          setPoseCache(pose);
        });
      } else {
        console.warn('SDK Pose not loaded');
      }
    }
    return () => {
      if (!!mySub && mySub.cancel) {
        mySub.cancel();
      }
    };
  }, [sdk]);

  return poseCache;
};
