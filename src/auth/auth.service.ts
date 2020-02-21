import { Injectable } from '@nestjs/common';
import { MembersTService } from 'src/members-t/members-t.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(
		private readonly membersTService: MembersTService,
		private readonly jwtService: JwtService
	) {}

	async validateUser(username: string, password: string): Promise<any> {
		const user = await this.membersTService.findOne(username);
		if(user && user.password === password) {
			const { password, ...result } = user;
			return result;
		}
		return null;
	}

	async login(user: any){
		const payload = {
			username: user.username, 
			participantFlag: user.participantFlag,
		};
		return {
			access_token: this.jwtService.sign(payload),
		};
	}
}