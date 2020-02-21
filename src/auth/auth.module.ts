import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MembersTModule } from 'src/members-t/members-t.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';

// import { LocalAuthGuard } from './local-auth.guard';

@Module({
	imports: [
		MembersTModule, 
		PassportModule,
		JwtModule.register({
			secret: jwtConstants.secret,
			signOptions: { expiresIn: '60s'},
		}),
	],
	providers: [AuthService, LocalStrategy, JwtStrategy],
	exports: [AuthService],
})
export class AuthModule {}