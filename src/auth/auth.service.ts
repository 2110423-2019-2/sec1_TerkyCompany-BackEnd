import { Injectable, UnauthorizedException } from '@nestjs/common';
import { MembersTService } from '../members-t/members-t.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { MemberTEntity } from '../members-t/member-t.entity';
import { Repository, EntityRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';



@Injectable()
export class AuthService {
	constructor(
		private readonly membersTService: MembersTService,
		private readonly jwtService: JwtService,
		
	) { }

	async validateUser(username: string, password: string): Promise<any> {
		console.log("validateUser: AuthService");
		const user = await this.membersTService.findByUsername(username);

		if(user == undefined){
			// console.log("user not found...");
			throw new UnauthorizedException();
		}

		// console.log("User is " + user.username);
		// console.log("User's type is " + typeof user);
		// console.log("Input password is " + password);
		// console.log("DB password is " + user.password);
		if(user) {
			// console.log("User found!");
			var match = AuthService.compareSync(password, user.password);
			// console.log(match);
			if(match){
				const { password, ...result } = user;
				return result;
			}
			else {
				return null
			}
		}
		console.log("YOU SHOULD NOT REACH HERE");		
	}

	// HASH ASYNCHRONOUS
	/*
	public static hashPassword(password: string, rounds: number, callback: (err: boolean, hash: string) => void) : void {
        bcrypt.hash(password, rounds, (error, hash) => {
            callback(error, hash);
		});
	}
	*/

	// HASH SYNCHRONOUS
	public static hashPasswordSync(password, rounds){
		console.log("hashPasswordSync: AuthService");
		return  bcrypt.hashSync(password, rounds);
	}

	// COMPARE ASYNCHRONOUS
	/*
	public static compare(password: string, dbHash: string, callback: (error: string | null, match: boolean | null) => void) {
		// console.log("Comparing password: [" + password + "] to dbHash: [" + dbHash + "]");
		bcrypt.compare(password, dbHash, (err: Error, match: boolean) => {
			// console.log("Error: " + err);
			if(match) {
				// passwords match
				// console.log("OHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH"); // The code never reached this place, my disappointment is immeasureable and my day is ruined
				callback(null, true);
			} else {
				// passwords do not match
				callback('Invalid password match', false);
			}
		});
	}
	*/

	// COMPARE SYNCHRONOUS
	public static compareSync(password, dbHash){
		console.log("compareSync: AuthService");
		if(bcrypt.compareSync(password, dbHash)) {
			// Passwords match
			// console.log("Matched!")
			return true;
		   } else {
			// Passwords don't match
			// console.log("Not match..");
			return false;
		}
	}

	async login(user: any){
		console.log("login: AuthService");
		const payload = {
			username: user.username, 
			userType: user.userType,
		};
		//console.log("logged in",user.username)
		const status = await this.membersTService.findByUsername(user.username);
		console.log(`username : ${status.username} , isSuspended : ${status.isSuspended}`)
		
		// console.log(payload);
		return {
			access_token: this.jwtService.sign(payload),
			isSuspended: status.isSuspended
		};
	}
}
