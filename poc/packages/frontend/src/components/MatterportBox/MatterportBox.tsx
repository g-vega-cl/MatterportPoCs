import './MatterportBox.scss';
import React, { RefObject, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { CoordsPoint, MATTERPORT_CONNECTION } from '../../modules/MatterportPage/constants';
import { MatterSdkStore } from '../../modules/MatterportPage/store';
import { MatterPhase } from '../../utils/hooks/matterport/typings';
import { useMatterIntersection } from '../../utils/hooks/matterport/useMatterIntersection';
import { useMatterPhase } from '../../utils/hooks/matterport/useMatterPhase';
import { useMatterPose } from '../../utils/hooks/matterport/useMatterPose';
import { useHover } from '../../utils/hooks/useHover';
import LightOverlay from 'components/MatterportBox/Overlay/LightOverlay';

interface IMatterportBoxProps {
  iframeRef: RefObject<HTMLIFrameElement>;
  showOverlay: boolean;
  setShowOverlay: any;
  overlayItem: any;
  setOverlayItem: any;
  setTagCoords: (coords: { position: CoordsPoint; normal: CoordsPoint }) => void;
  onLoad: () => void;
}

const MatterportBox: React.FC<IMatterportBoxProps> = ({
  setTagCoords,
  iframeRef,
  onLoad,
  showOverlay,
  setShowOverlay,
  overlayItem,
  setOverlayItem,
}) => {
  // matterport sdk stuff
  const { sdk, items } = useContext(MatterSdkStore);
  const poseCache = useMatterPose(sdk);
  const intersectionCache = useMatterIntersection(sdk);
  const matterPhase = useMatterPhase(sdk);

  // item refs
  const buttonContainerRef = useRef<HTMLDivElement>(null);
  const addButtonRef = useRef<HTMLButtonElement>(null);
  const iframeContainerRef = useRef<HTMLDivElement>(null);

  // hover states
  const isButtonContainerHovered = useHover(buttonContainerRef);
  const isButtonHovered = useHover(addButtonRef);
  const isIframeContainerHovered = useHover(iframeContainerRef);

  // states
  const [showButtonTimeOut, setShowButtonTimeOut] = useState<any>();
  const [containerButtonTimeOut, setContainerButtonTimeOut] = useState<any>();
  const [toggleAddButton, setToggleAddButton] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
  const [iframeSize, setIframeSize] = useState({ w: 0, h: 0 });
  const [sdkError, setSdkError] = useState(false);
  // handlers
  const saveCoords = useCallback(
    (e) => {
      e.preventDefault();
      // 3d cords is interesction
      // const coords3D = { position: poseCache, normal: poseCache };
      // const coords3D = matterportService.get3DCoords();

      setTagCoords(intersectionCache);
      setToggleAddButton(false);
    },
    [intersectionCache, setTagCoords],
  );

  const updateCoords = useCallback(() => {
    setTagCoords(intersectionCache);
    setToggleAddButton(false);
  }, [intersectionCache, setTagCoords]);

  /*
   * Trigger onLoad callback
   */
  useEffect(() => {
    if (matterPhase === MatterPhase.PLAYING) {
      onLoad();
    }
  }, [matterPhase, onLoad]);

  /*
   * Set error if the intersection cache or the pose didn't load
   */
  useEffect(() => {
    if (matterPhase === MatterPhase.STARTING && (!poseCache || !intersectionCache)) {
      setSdkError(true);
    }
  }, [intersectionCache, matterPhase, poseCache]);

  /*
   * When iframe is ready store it'z size
   */
  useEffect(() => {
    if (iframeRef.current) {
      setIframeSize({
        w: iframeRef.current.clientWidth,
        h: iframeRef.current.clientHeight,
      });
    }
  }, [iframeRef]);

  /*
   * If button container hovered then hide button and container
   */
  useEffect(() => {
    if (isButtonContainerHovered) {
      setContainerButtonTimeOut(
        setTimeout(() => {
          if (isButtonContainerHovered && !isButtonHovered) {
            clearTimeout(containerButtonTimeOut);
            setToggleAddButton(false);
          }
        }, 500),
      );
    }
    // We don't want an infinite loop and onlye want to know if we are being hovered
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isButtonContainerHovered]);

  useEffect(() => {
    if (!sdk || !poseCache || !intersectionCache) return;
    if (isIframeContainerHovered) {
      // reset and hide on move
      clearTimeout(showButtonTimeOut);
      setToggleAddButton(false);
      // when done moving show add button
      setShowButtonTimeOut(
        setTimeout(() => {
          const position = sdk.Conversion.worldToScreen(
            intersectionCache.position,
            poseCache,
            iframeSize,
          );
          setButtonPosition(position);
          setToggleAddButton(true);
          addButtonRef.current?.focus();
          updateCoords();
        }, 3000),
      );
    }
    return () => {
      clearTimeout(showButtonTimeOut);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sdk, intersectionCache, poseCache]);

  useEffect(() => {
    if (sdk && showOverlay === false) {
      sdk?.on(sdk.Mattertag.Event.CLICK, function (tagSid: string) {
        console.log(tagSid + ' was selected');
        setShowOverlay(true);
        console.log("items: ", items) //!The plan is to find the item by tagSid and make it setOverlayItem
        if(items){
          const currentItem = items.find((item:any)=>item.matterportId === tagSid)
          console.log("current item ", currentItem)
          if(currentItem){
            setOverlayItem(currentItem);
          } 
        }
      });
    }
  }, [sdk, showOverlay, setShowOverlay]);

  return (
    <div className="column" style={{ height: '100%' }}>
      <div className="matter-box" style={{ height: '100%' }}>
        <div className="iframe-container" ref={iframeContainerRef} style={{ height: '100%' }}>
          <iframe
            className="matter-iframe"
            id="showcase_iframe"
            title="matter-iframe"
            ref={iframeRef}
            width="100%"
            height="100%"
            // src="https://my.matterport.com/show?m=SxQL3iGyoDo&play=1"
            src="https://my.matterport.com/show/?m=pGeppb6sA6D&play=1"
            allow="vr"
          ></iframe>
        </div>
        {showOverlay && (
          <div className="overlay-container">
            {/* {overlayItem.type === 'Light' && (<LightOverlay item={overlayItem} setShowOverlay={setShowOverlay} />)} */}
            <LightOverlay item={overlayItem} setShowOverlay={setShowOverlay} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MatterportBox;
