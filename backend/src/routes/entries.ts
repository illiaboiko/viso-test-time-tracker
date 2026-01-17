import express from 'express'

const router = express.Router()

router.get('/', (_req, res) => {
  res.send('entries successfully accessed')
})

export default router;