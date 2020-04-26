import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MembersTModule } from '../members-t/members-t.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { MembersTService } from '../members-t/members-t.service';

// import { LocalAuthGuard } from './local-auth.guard';

@Module({
	imports: [
		MembersTModule, 
		PassportModule.register({
			defaultStrategy: 'jwt'
		}),
		JwtModule.register({
			secret: jwtConstants.secret,
			signOptions: { expiresIn: '1800s'},
		}),
	],
	providers: [AuthService, LocalStrategy, JwtStrategy,],
	exports: [AuthService, JwtModule],
})
export class AuthModule {}
