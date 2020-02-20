import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MembersTModule } from 'src/members-t/members-t.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';

@Module({
	imports: [MembersTModule, PassportModule],
	providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
