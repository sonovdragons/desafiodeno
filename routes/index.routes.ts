import {Router} from 'https://deno.land/x/oak/mod.ts'

import * as indexCtrl from '../controllers/index.controllers.ts'

const router = new Router()
router.get('/', ({response}) => {
    response.body = 'API con DENO'
})

router.get('/users', indexCtrl.getUsers)
router.post('/users', indexCtrl.createUser)
router.delete('/users/:id', indexCtrl.deleteUser)
router.put('/users/:id', indexCtrl.updateUser)

export default router;