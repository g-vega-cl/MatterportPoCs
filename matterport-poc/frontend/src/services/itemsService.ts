import BaseService from "./baseService";

export interface IItem {
  id: number;
  matterportId: string;
  name: string;
  description: string;
  position: { x: number; y: number; z: number };
  normal: { x: number; y: number; z: number };
  media?: string;
  color: { r: number; g: number; b: number };
}

class ItemsService extends BaseService {
  private endpoint: string = "items/";

  private reduceNormalVector = (normal: {
    x: number;
    y: number;
    z: number;
  }) => {
    if (normal.x > 0.3) {
      normal.x = 0.3;
    } else if (normal.y > 0.3) {
      normal.y = 0.3;
    } else if (normal.z > 0.3) {
      normal.z = 0.3;
    }

    return normal;
  };

  public getItems(): Promise<IItem[]> {
    return this.doRequest({
      baseURL: this.baseURL,
      method: "GET",
      url: this.endpoint,
    }).then((response: any) => response.data);
  }

  public getItem(id: number): Promise<IItem> {
    return this.doRequest({
      baseURL: this.baseURL,
      method: "GET",
      url: `${this.endpoint}${id}`,
    }).then((response: any) => response.data);
  }

  public createItem({
    name,
    description,
    matterportId,
    position,
    normal,
    media,
    color,
  }: IItem): Promise<IItem> {
    return this.doRequest({
      baseURL: this.baseURL,
      method: "POST",
      data: {
        name,
        description,
        matterportId,
        position,
        normal,
        media,
        color,
      },
      url: this.endpoint,
    }).then((response: any) => response.data);
  }

  public updateItem({
    id,
    name,
    description,
    matterportId,
    position,
    normal,
    media,
    color,
  }: IItem): Promise<IItem> {
    return this.doRequest({
      baseURL: this.baseURL,
      method: "PUT",
      data: {
        name,
        description,
        matterportId,
        position,
        normal,
        media,
        color,
      },
      url: `${this.endpoint}${id}`,
    }).then((response: any) => response.data);
  }

  public deleteItem(id: number): Promise<any> {
    return this.doRequest({
      baseURL: this.baseURL,
      method: "DELETE",
      url: `${this.endpoint}${id}`,
    }).then((res) => res);
  }
}

const ItemsServiceInstance = new ItemsService();
export default ItemsServiceInstance;
