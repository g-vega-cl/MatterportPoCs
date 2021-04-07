import axios from "axios";

import TokenService from "./tokenService";

class BaseService {
  public baseURL: string = "http://localhost:8888/api/v1/";

  public async doRequest(opts: any): Promise<any> {
    const token = await TokenService.getAccessToken();
    let headers = {
      ...opts.headers,
    };
    if (token !== null) {
      // Only add token if it is valid
      headers = {
        Authorization: `Bearer ${token}`,
        ...headers,
      };
    }

    const options = {
      ...opts,
      headers,
    };

    return axios(options).catch((error) => {
      console.log("err", error.response);
      if (error.response) {
        // The request was made and the server responded with a status code that falls
        // out of the range of 2xx
        if (error.response.status === 401) {
          return TokenService.refreshToken()
            .then((response) => {
              return this.doRequest(opts);
            })
            .catch((e) => {
              TokenService.logOut();
              window.location.reload();
            });
        }

        throw error;
      } else if (error.request) {
        // The request was made but no response was received `error.request` is an
        // instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        throw error;
      } else {
        // Something happened in setting up the request that triggered an Error
        throw new Error("Error" + error.message);
      }
    });
  }
}

export default BaseService;
