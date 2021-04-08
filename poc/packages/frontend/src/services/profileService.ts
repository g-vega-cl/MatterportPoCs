import BaseService from "./baseService";

export interface IProfile {
  id: number;
  name: string;
  email: string;
  role: string;
}

class ProfileService extends BaseService {
  private endpoint: string = "profile/";

  public getProfile(id: number): Promise<IProfile> {
    return this.doRequest({
      baseURL: this.baseURL,
      method: "GET",
      url: `${this.endpoint}${id}`,
    }).then((response: any) => response.data);
  }

}

const ProfileServiceInstance = new ProfileService();
export default ProfileServiceInstance;
