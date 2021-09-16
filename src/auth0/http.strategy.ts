import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthenticationClient } from "auth0";
import { Strategy } from "passport-http-bearer";

@Injectable()
export class HttpStrategy extends PassportStrategy(Strategy) {
  private authenticationClient: AuthenticationClient;
  constructor() {
    super();
    this.authenticationClient = new AuthenticationClient({
      domain: process.env.AUTH0_ISSUER,
      clientId: process.env.AUTH0_CLIENT_ID,
    });
  }

  async validate(token: string) {
    const profile = await this.authenticationClient.getProfile(token);
    if (!profile) {
      throw new UnauthorizedException();
    }
    return profile;
  }
}
