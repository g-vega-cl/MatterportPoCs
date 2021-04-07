import BaseService from "./baseService";
import TokenService from "./tokenService";
import UserService from "./userService";

class AuthenticationService extends BaseService {
  private endpoint: string = "auth";

  public logIn(email: string = "", password: string = ""): Promise<any> {
    return this.doRequest({
      baseURL: this.baseURL,
      method: "POST",
      data: {
        email,
        password,
      },
      url: `${this.endpoint}/login`,
    }).then((response: any) => {
      return TokenService.setToken(response.data).then(
        (res: any) => response.data.user
      );
    });
  }

  public logOut(): Promise<any> {
    return this.doRequest({
      baseURL: this.baseURL,
      method: "POST",
      url: `${this.endpoint}/logout`,
    }).then((response: any) => {
      return TokenService.logOut().then((res: any) => response.data);
    });
  }

  public reloadUserIfLoggedIn(): Promise<any> {
    return TokenService.getAccessToken().then((token) => {
      if (token !== null) {
        const decodedToken = TokenService.decodeToken(token);
        const user = TokenService.castTokenToUserInfo(decodedToken);
        return UserService.getUser(user.id).then((user) => user);
      } else {
        return Promise.reject(null);
      }
    });
  }
}

const AuthenticationServiceInstance = new AuthenticationService();
export default AuthenticationServiceInstance;
