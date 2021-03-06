import './MatterportBox.scss';

import { Typography } from '@material-ui/core';
import React, { RefObject, useCallback, useContext, useEffect, useRef, useState } from 'react';

import { CoordsPoint, MATTERPORT_CONNECTION } from '../../modules/MatterportPage/constants';
import { MatterSdkStore } from '../../modules/MatterportPage/store';
import { MatterPhase } from '../../utils/hooks/matterport/typings';
import { useMatterIntersection } from '../../utils/hooks/matterport/useMatterIntersection';
import { useMatterPhase } from '../../utils/hooks/matterport/useMatterPhase';
import { useMatterPose } from '../../utils/hooks/matterport/useMatterPose';
import { useHover } from '../../utils/hooks/useHover';

interface IMatterportBoxProps {
  iframeRef: RefObject<HTMLIFrameElement>;
  showFormTag: boolean;
  tagCoords: {
    position: CoordsPoint;
    normal: CoordsPoint;
  };
  setTagCoords: (coords: { position: CoordsPoint; normal: CoordsPoint }) => void;
  onLoad: () => void;
}

const MatterportBox: React.FC<IMatterportBoxProps> = (props) => {
  const { showFormTag, setTagCoords, iframeRef, onLoad } = props;

  // matterport sdk stuff
  const { sdk } = useContext(MatterSdkStore);
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
        }, 200),
      );
    }
    // We don't want an infinite loop and onlye want to know if we are being hovered
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isButtonContainerHovered]);

  useEffect(() => {
    if (!showFormTag || !sdk || !poseCache || !intersectionCache) return;

    if (showFormTag && isIframeContainerHovered) {
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
        }, 1000),
      );
    }
    return () => {
      clearTimeout(showButtonTimeOut);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showFormTag, sdk, intersectionCache, poseCache]);

  return (
    <div className="column">
      <div className="matter-box">
        <div className="iframe-container" ref={iframeContainerRef}>
          <iframe
            ref={iframeRef}
            src={MATTERPORT_CONNECTION.iframeURL}
            title="matter-iframe"
            frameBorder="0"
            allowFullScreen
            allow="vr"
            className="matter-iframe"
            id="showcase_iframe"
          ></iframe>
        </div>

        {toggleAddButton && (
          <div className="button-container" ref={buttonContainerRef}>
            <button
              ref={addButtonRef}
              className="add-label"
              style={{ top: buttonPosition.y - 18, left: buttonPosition.x - 35 }}
              onClick={saveCoords}
            >
              Add tag here
            </button>
          </div>
        )}
      </div>

      <div>
        {showFormTag && !sdkError && (
          <Typography>Hover the showcase and stay still were you want to add the tag</Typography>
        )}
        {sdkError && (
          <Typography className="error">
            It seems that we had an error while loading the app, please refresh the page
          </Typography>
        )}
      </div>
    </div>
  );
};

export default MatterportBox;
