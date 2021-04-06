import { useEffect, useRef } from "react";
export const MatterportBox = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  console.log("MATTERPORTBOX", iframeRef);

  useEffect(() => {
    if (iframeRef.current) {
      console.log("iframe useeffect current ", iframeRef, "window", window);
      (window as any).MP_SDK.connect(
        iframeRef.current, // Obtained earlier
        "4495a99fb2054698909d40b29abb6de4", // Your API key
        "3.10" // SDK version you are using
        // Use the latest version you can for your app
      )
        .then(async function (theSdk: any) {
          console.log("SDK Connected!", theSdk);
        })
        .catch((error: any) => {
          console.log("error in then", error);
        });
    }
  }, [iframeRef]);

  return (
    <iframe
      className="matter-iframe"
      id="showcase_iframe"
      title="matter-iframe"
      ref={iframeRef}
      width="853"
      height="480"
      src="https://my.matterport.com/show?m=SxQL3iGyoDo&play=1"
      allow="vr"
    ></iframe>
  );
};
