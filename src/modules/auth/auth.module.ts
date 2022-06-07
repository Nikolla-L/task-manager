import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';
import property from 'src/configuration/property';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
			secret: property.JWT_SECRET,
			signOptions: {expiresIn: property.ACCESS_TOKEN_DURATION}
		})
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy, 
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    }
  ]
})
export class AuthModule {}
