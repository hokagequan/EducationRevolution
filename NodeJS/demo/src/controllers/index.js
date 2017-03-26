import {Router} from 'express'
import user from './user'

let router = Router();

router.use('/user', user);

export default router;