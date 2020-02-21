import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { PassportModule } from '@nestjs/passport';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
	constructor(private readonly authService: AuthService) {}
	/*
	@Get()
	getHello(): string {
		return this.appService.getHello();
	}
	*/
	@UseGuards(LocalAuthGuard)
	@Post('auth/login')
	async login(@Request() req){
		return this.authService.login(req.user);
	}

	@UseGuards(JwtAuthGuard)
	@Get('profile')
	getProfile(@Request() req){
		return req.user;
	}
}
