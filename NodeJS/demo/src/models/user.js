import mongoose from 'mongoose';
import {rspData} from '../models/rsp_data';
import {RandomMgr} from '../components/random';

let UserSchema = new mongoose.Schema({
	account: String,
	password: String,
	userId: String,
	sessionId: String
});

let randomMgr = new RandomMgr();
let User = mongoose.model('User', UserSchema);

export function signIn (account, password) {
	function doSignIn() {
		return new Promise((resolve, reject) => {
			let idMgr = new RandomMgr();
			let sessionId = idMgr.udid();
			User.findOneAndUpdate({$and: [{"account": account}, {"password": password}]}, {"sessionId": sessionId}, (err, result) => {
				if (result.id == null) {
					let data = new rspData(-1000, "用户未注册", null);
					reject(data);
				}
				else {
					let data = new rspData(0, "", {"account": account, "sessionId": sessionId});
					resolve(data);
				}
			});
		}); 
	}

	return doSignIn();
}

export function register (account, password) {
	function findUser () {
		console.log('Start Register');
		return new Promise((resolve, reject) => {
			console.log('Start find user');
			User.findOne({"account": account}, (err, result) => {
				if (result.id == null) {
					console.log(`Find null: ${result.id}`);
					resolve();
				}
				else {
					console.log(`Find one: ${result.id}`);
					let data = new rspData(-1000, "用户已存在", null);
					reject(data);
				}
			});
		});
	}

	function registerUser () {
		console.log('Do start register');
		return new Promise((resolve, regject) => {
			let userId = randomMgr.udid();
			let cUser = new User({"account": account, "password": password, "userId": userId});
			cUser.save((err) => {
				if (err) {
					let data = new rspData(-1000, "创建用户失败", null);
					reject(data);
				}
				else {
					let data = new rspData(0, "", {"account": account, "userId": userId});
					resolve(data);
				}
			});
		});
	}

	return findUser()
			.then(registerUser)
			.catch((rel) => rel);
}

export default User;