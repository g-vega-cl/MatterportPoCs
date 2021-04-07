class TokenModel {
  public token: string = "";
  public refresh_token: {token: string, expires: number, expires_in: number} = { token : "", expires: 0, expires_in: 0};
  public tokenType: string = "";
}

export default TokenModel;
