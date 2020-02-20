import { Injectable } from '@nestjs/common';
import { MembersTService } from 'src/members-t/members-t.service';

@Injectable()
export class AuthService {
	constructor(private readonly membersTService: MembersTService) {}

	async validateUser(username: string, password: string): Promise<any> {
		const user = await this.membersTService.findOne(username);
		if(user && user.password === password) {
			const { password, ...result } = user;
			return result;
		}
		return null;
	}
}
