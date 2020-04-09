import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
	
	constructor(private readonly authService: AuthService){
		super();
	}

	async validate(
		username: string, 
		password: string,
	) {
		console.log("validate: LocalStrategy");
		const user = await this.authService.validateUser(username, password);
		if(!user) {
			throw new UnauthorizedException();
		}
		// console.log("User in local strategy: " + user);
		return user;
	}
}