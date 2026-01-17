import express from 'express'
import { createEntry, getAllEntries } from '../services/entriesService'

const router = express.Router()

router.get('/', async (_req, res) => {
  try {
    const entries = await getAllEntries()
    res.json(entries)
  } catch (err: any) {
    res.status(500).json({ error: err.message })
  }
})

router.post('/', async (req, res) => {
  try {
    const entry = await createEntry(req.body)
    res.status(201).json(entry)
  } catch (err: any) {
    res.status(400).json({ error: err.message })
  }
})

export default router
