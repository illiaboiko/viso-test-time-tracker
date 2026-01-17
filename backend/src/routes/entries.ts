import express from 'express'
import { prisma } from '../prisma'

const router = express.Router()

router.get('/', async (_req, res) => {
  const entries = await prisma.timeEntry.findMany()
  res.json(entries);
})

export default router
