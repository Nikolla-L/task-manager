import { UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import property from "src/configuration/property";

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: property.JWT_SECRET
        })
    }

    async validate(payload: any) {
		if (!payload?.exp) {
			throw new UnauthorizedException('invalid token');
		}
        return payload;
    }
}