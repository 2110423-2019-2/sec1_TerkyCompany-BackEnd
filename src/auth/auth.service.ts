import { Injectable, UnauthorizedException } from '@nestjs/common';
import { MembersTService } from 'src/members-t/members-t.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
	constructor(
		private readonly membersTService: MembersTService,
		private readonly jwtService: JwtService
	) {}

	async validateUser(username: string, password: string): Promise<any> {
		const user = await this.membersTService.findByUsername(username);

		if(user == undefined){
			console.log("user not found...");
			throw new UnauthorizedException();
		}

		// console.log("User is " + user.username);
		// console.log("User's type is " + typeof user);
		console.log("Input password is " + password);
		console.log("DB password is " + user.password);
		if(user) {
			console.log("User found!");

			// BCRYPT
			/*
			AuthService.compare(password, user.password, (err, match) => {

				if(match){
					console.log("Password correct!");
					const { password, ...result } = user;
					return result;
				}
				else{
					console.log("Password not correct..");
				}
			})
			*/
			if(password === user.password){
				const { password, ...result } = user;
				return result;
			}
		}
		return null;
	}

	public static hashPassword(password: string, rounds: number, callback: (err: boolean, hash: string) => void) : void {
		
        bcrypt.hash(password, rounds, (error, hash) => {
            callback(error, hash);
		});
		/*
		var hash = bcrypt.hashSync('myPassword', 10);
		callback(hash);
		*/
	}

	public static compare(password: string, dbHash: string, callback: (error: string | null, match: boolean | null) => void) {
		console.log("Comparing password: [" + password + "] to dbHash: [" + dbHash + "]");
		
		bcrypt.compare(password, dbHash, (err: Error, match: boolean) => {
			// console.log("Error: " + err);
			if(match) {
				// passwords match
				console.log("OHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH"); // The code never reached this place, my disappointment is immeasureable and my day is ruined
				callback(null, true);
			} else {
				// passwords do not match
				callback('Invalid password match', false);
			}
		});
		/*
		if(bcrypt.compareSync(password, dbHash)) {
			// Passwords match
			console.log("Matched!")
			callback(null, true);
		   } else {
			// Passwords don't match
			console.log("Not match..");
			callback('Invalid password match', false);
		}*/
	}

	async login(user: any){
		const payload = {
			username: user.username, 
			userType: user.userType,
		};
		return {
			access_token: this.jwtService.sign(payload),
		};
	}
}
