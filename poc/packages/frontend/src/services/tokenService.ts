import axios from "axios";
import jwt_decode from "jwt-decode";

import TokenModel from "../models/token.model";

interface TokenData {
  aud: string;
  email: string;
  exp: number;
  iat: number;
  id: number;
  jti: string;
  role: string;
  sub: string;
}

class TokenService {
  private baseURL: string = "http://localhost:8888/api/v1/items";

  public setToken(token: TokenModel) {
    const promises = [
      localStorage.removeItem("accessToken"),
      localStorage.removeItem("refreshToken"),
      localStorage.setItem("accessToken", token.token),
      localStorage.setItem("refreshToken", token.refresh_token.token),
    ];
    return Promise.all(promises).then((data) => true);
  }

  public getAccessToken(): Promise<string | null> {
    try {
      return Promise.resolve(localStorage.getItem("accessToken"));
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public getRefreshToken(): Promise<string | null> {
    try {
      return Promise.resolve(localStorage.getItem("refreshToken"));
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public refreshToken() {
    return this.getRefreshToken().then((refreshToken) => {
      return axios({
        baseURL: this.baseURL,
        method: "get",
        url: "/auth/refresh",
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      }).then((res: any) => this.setToken(res.data));
    });
  }

  public decodeToken(token: string): TokenData {
    return jwt_decode(token);
  }

  public logOut() {
    return new Promise((resolve, reject) => {
      try {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  public castTokenToUserInfo(
    tokenData: TokenData
  ): {
    id: number;
    name: string;
    email: string;
    role: string;
  } {
    const user: {
      id: number;
      name: string;
      email: string;
      role: string;
    } = {
      id: tokenData.id,
      name: tokenData.aud,
      email: tokenData.email,
      role: tokenData.role,
    };
    return user;
  }
}

const TokenServiceInstance = new TokenService();
export default TokenServiceInstance;
