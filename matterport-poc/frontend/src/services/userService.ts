import BaseService from "./baseService";

export interface IUser {
  id: number;
  name: string;
  email: string;
  role: string;
}

class UserService extends BaseService {
  private endpoint: string = "user/";

  public getUser(id: number): Promise<IUser> {
    return this.doRequest({
      baseURL: this.baseURL,
      method: "GET",
      url: `${this.endpoint}${id}`,
    }).then((response: any) => response.data);
  }

  public updateUser({ id, name, email, role }: IUser): Promise<IUser> {
    return this.doRequest({
      baseURL: this.baseURL,
      method: "PUT",
      data: {
        name,
        email,
        role,
      },
      url: `${this.endpoint}${id}`,
    }).then((response: any) => response.data);
  }

  public deleteUser(id: number): Promise<any> {
    return this.doRequest({
      baseURL: this.baseURL,
      method: "DELETE",
      url: `${this.endpoint}${id}`,
    }).then((res) => res);
  }
}

const UserServiceInstance = new UserService();
export default UserServiceInstance;
