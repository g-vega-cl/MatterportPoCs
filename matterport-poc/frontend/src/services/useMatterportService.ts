import { useState, useEffect } from "react";
import MatterportService from "./matterportService";

export const useMatterportService = (sdk: any) => {
  const [currentMpService, setCurrentMpService] = useState<
    undefined | ReturnType<typeof MatterportService>
  >();
  // get services based on sdk once available
  useEffect(() => {
    if (!!sdk) {
      const service = MatterportService(sdk);
      setCurrentMpService(service);
    }
  }, [sdk]);

  return currentMpService;
};
