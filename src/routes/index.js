import express from 'express'

const router = express.Router()

import eepost from './eepost'
router.use('/eepost', eepost)

// import comment from './eepost/comment'
// router.use('/comment', comment)

// import user from './user'
// router.use('/user', user)

export default router