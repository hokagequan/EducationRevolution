import {Router} from 'express';
import {rspData} from '../models/rsp_data';
import ParamsCheck from '../components/params_check';
import {signIn, register} from '../models/user';
import {RandomMgr} from '../components/random';

let router = Router();
let paramsc = new ParamsCheck();

router.route('/signIn')
	.post((req, rsp) => {
		paramsc.check(req.body, ["account", "password"])
		.then(() => signIn(req.body.account, req.body.password))
		.then((rel) => {
			rsp.json(rel);
		})
		.catch((rel) => {
			rsp.json(rel);
		});
	});

router.route('/register')
	.post((req, rsp) => {
		console.log('Get request register');
		paramsc.check(req.body, ["account", "password"])
		.then(() => register(req.body.account, req.body.password))
		.then((rel) => rsp.json(rel))
		.catch((rel) => rsp.json(rel));
	});

export default router;