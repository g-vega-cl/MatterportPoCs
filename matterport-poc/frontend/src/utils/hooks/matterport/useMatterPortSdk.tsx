import { RefObject, useEffect, useState } from "react";

import { MatterSDK } from "./typings";

interface UseMatterportServiceProps {
  iframeRef: RefObject<HTMLIFrameElement>;
  apiKey: string;
  sdkVersion?: string;
}

const useMatterportSdk = (props: UseMatterportServiceProps) => {
  const { apiKey, sdkVersion, iframeRef } = props;
  const [sdk, setSdk] = useState<MatterSDK | undefined>();
  console.log("sdk ", sdk,"useMatterportSdk.tsx apikey", apiKey, " sdkVer ", sdkVersion, " iFrameRef ", iframeRef, " total props ", props );

  useEffect(() => {
    if (iframeRef.current) {
      console.log("window in iframeRef useMatterPortSdk.tsx ", window, "iframerefcurrent ", iframeRef.current);
      //WINDOW IS THE SDK!. THE SCRIPT YOU PLACE IN INDEX.HTML
      (window as any).MP_SDK.connect(
        iframeRef.current,
        apiKey ?? "", // Your API key
        sdkVersion ?? "3.2" // SDK version you are using
        // Use the latest version you can for your app
      )
        .then(async function (theSdk: any) {
          setSdk(theSdk);
          console.log("SDK Connected!");
        })
        .catch((e: any) => {
          console.log("error loading matterport sdk");
        });
    }
  }, [apiKey, iframeRef, sdkVersion]);

  return {
    sdk,
  };
};

export default useMatterportSdk;
