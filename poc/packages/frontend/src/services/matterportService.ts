import { IItem } from "./itemsService";

// Each number must be between 0 - 1
interface MatterportTagColor {
  r: number;
  g: number;
  b: number;
}

interface MatterportTagCoords {
  x: number;
  y: number;
  z: number;
}

interface MatterportTag {
  label: string;
  description: string;
  anchorPosition: MatterportTagCoords;
  stemVector: MatterportTagCoords;
  color: MatterportTagColor;
}

const MatterportService = (sdk: any) => {
  let intersectionCache: any;
  let poseCache: any;

  const get3DCoords = () => {
    return intersectionCache;
  };

  const getScreenCoords = async (iframeWidth: number, iframeHeight: number) => {
    var size = {
      w: iframeWidth,
      h: iframeHeight,
    };
    return await sdk.Conversion.worldToScreen(
      intersectionCache.position,
      poseCache,
      size
    );
  };

  const navigateToTag = (matterportId: string) => {
    sdk.Mattertag.navigateToTag(matterportId, sdk.Mattertag.Transition.FLY);
  };

  const createTags = (tags: MatterportTag[]) => {
    return sdk.Mattertag.add(tags).then((sids: string[]) => sids);
  };

  const editTag = (tagId: string, tag: MatterportTag): Promise<any> => {
    return sdk.Mattertag.editBillboard(tagId, {
      ...tag,
    }).then((res: any) => res);
  };

  const deleteTag = (id: string): Promise<any> => {
    return sdk.Mattertag.remove(id).then((res: any) => res);
  };

  const updateTag = (item: IItem): Promise<IItem> => {
    const tag = castToMatterportTag(
      item.name,
      item.description,
      item.position,
      item.normal,
      item.color
    );

    return editTag(item.matterportId, tag).then(() => item);
  };

  const addTags = (items: IItem[]): Promise<IItem[]> => {
    const tags = items.map((item: IItem) =>
      castToMatterportTag(
        item.name,
        item.description,
        item.position,
        item.normal,
        item.color
      )
    );

    return createTags(tags).then((matterportIds: string[]) => {
      return addMatterportIds(matterportIds, items);
    });
  };

  const addMatterportIds = (
    matterportIds: string[],
    items: IItem[]
  ): IItem[] => {
    return items.map((item: IItem, index: number) => ({
      ...item,
      matterportId: matterportIds[index],
    }));
  };

  const reduceStemVector = (stemVector: MatterportTagCoords) => {
    if (stemVector.x > 0.7) {
      stemVector.x = 0.3;
    } else if (stemVector.y > 0.7) {
      stemVector.y = 0.3;
    } else if (stemVector.z > 0.7) {
      stemVector.z = 0.3;
    }
    return stemVector;
  };

  const castToMatterportTag = (
    label: string,
    description: string,
    anchorPosition: MatterportTagCoords,
    stemVector: MatterportTagCoords,
    color: MatterportTagColor
  ) => {
    stemVector = reduceStemVector(stemVector);
    return {
      label,
      description,
      anchorPosition,
      stemVector,
      color,
    };
  };

  return {
    // MatterportIframe: TheIframe,
    get3DCoords,
    getScreenCoords,
    addTags,
    updateTag,
    deleteTag,
    navigateToTag,
    // sdk,
  };
};

export default MatterportService;
