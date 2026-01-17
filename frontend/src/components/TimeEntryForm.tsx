import { useState } from 'react'
import {
  TextField,
  Typography,
  Button,
  MenuItem,
  Box,
  Alert,
} from '@mui/material'
import type { NewTimeEntry } from '../types'
import { createEntry } from '../services/entries'

const projects = [
  'Viso Internal',
  'Client A',
  'Client B',
  'Personal Development',
]

interface Props {
  onEntryCreated: () => void // callback to refresh entry list
}

export default function TimeEntryForm({ onEntryCreated }: Props) {
  const [entry, setEntry] = useState<NewTimeEntry>({
    date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
    project: '',
    hours: 0,
    description: '',
  })

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (field: keyof NewTimeEntry, value: any) => {
    setEntry((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async () => {
    setError('')

    // Frontend validation
    if (!entry.date || !entry.project || !entry.hours || !entry.description) {
      setError('All fields are required')
      return
    }
    if (entry.hours <= 0) {
      setError('Hours must be greater than 0')
      return
    }

    setLoading(true)
    try {
      await createEntry(entry)
      setEntry({
        date: new Date().toISOString().split('T')[0],
        project: '',
        hours: 0,
        description: '',
      })
      onEntryCreated()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box display="flex" flexDirection="column" gap={2} width={400}>
      <Typography variant="h5" gutterBottom>
        New Entry
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <TextField
        label="Date"
        type="date"
        value={entry.date}
        onChange={(e) => handleChange('date', e.target.value)}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        select
        label="Project"
        value={entry.project}
        onChange={(e) => handleChange('project', e.target.value)}
      >
        {projects.map((p) => (
          <MenuItem key={p} value={p}>
            {p}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Hours"
        type="number"
        inputProps={{ min: 0, step: 0.5 }}
        value={entry.hours}
        onChange={(e) => handleChange('hours', parseFloat(e.target.value))}
      />
      <TextField
        label="Description"
        multiline
        minRows={2}
        value={entry.description}
        onChange={(e) => handleChange('description', e.target.value)}
      />
      <Button variant="contained" onClick={handleSubmit} disabled={loading}>
        {loading ? 'Saving...' : 'Save'}
      </Button>
    </Box>
  )
}
