export const MatterportBox = () => {
  var iframe = document.getElementById('showcase_iframe');

  iframe && iframe.addEventListener('load', showcaseLoader, true);

  function showcaseLoader() {
    try {
      (window as any).MP_SDK.connect(
        iframe, // Obtained earlier
        '4495a99fb2054698909d40b29abb6de4', // Your API key
        '3.10' // SDK version you are using
        // Use the latest version you can for your app
        )
        .then(async function (theSdk:any) {
          console.log("SDK Connected!", theSdk);
        })
        .catch((error:any)=>{console.log(error)});
    }
    catch (e) {
      console.error(e);
    }
  };
  return (
    <iframe
      width="853"
      height="480"
      src="https://my.matterport.com/show?m=SxQL3iGyoDo&play=1"
      allow="vr"
      id="showcase_iframe"
    ></iframe>
  );
};
