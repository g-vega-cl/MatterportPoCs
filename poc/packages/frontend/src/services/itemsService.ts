import BaseService from "./baseService";

export interface IItem {
  id: number;
  matterportId: string;
  name: string;
  description: string;
  position: { x: number; y: number; z: number };
  normal: { x: number; y: number; z: number };
  value: number;
  isPowered: boolean;
  media?: string;
  color: { r: number; g: number; b: number };
  type?: string;
}

class ItemsService extends BaseService {
  private endpoint: string = "items/";

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

  public updateItem({
    id,
    name,
    description,
    matterportId,
    position,
    normal,
    value,
    isPowered,
    media,
    color,
    type,
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
        value,
        isPowered,
        media,
        color,
        type,
      },
      url: `${this.endpoint}${id}`,
    }).then((response: any) => response.data);
  }

  public createItem({
    name,
    description,
    matterportId,
    position,
    normal,
    value,
    isPowered,
    media,
    color,
    type,
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
        value,
        isPowered,
        media,
        color,
        type,
      },
      url: this.endpoint,
    }).then((response: any) => response.data);
  }

  

  // public updateItem({
  //   id,
  //   name,
  //   description,
  //   matterportId,
  //   position,
  //   normal,
  //   media,
  //   color,
  // }: IItem): Promise<IItem> {
  //   return this.doRequest({
  //     baseURL: this.baseURL,
  //     method: "PUT",
  //     data: {
  //       name,
  //       description,
  //       matterportId,
  //       position,
  //       normal,
  //       media,
  //       color,
  //     },
  //     url: `${this.endpoint}${id}`,
  //   }).then((response: any) => response.data);
  // }

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
