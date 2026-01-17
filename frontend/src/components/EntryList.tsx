import type { TimeEntry } from '../types'
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material'

// Utility to group entries by date (YYYY-MM-DD)
function groupByDate(entries: TimeEntry[]) {
  return entries.reduce((acc: Record<string, TimeEntry[]>, entry) => {
    const date = entry.date.split('T')[0]
    if (!acc[date]) acc[date] = []
    acc[date].push(entry)
    return acc
  }, {})
}

interface Props {
  entries: TimeEntry[]
}

export default function EntryList({ entries }: Props) {
  const grouped = groupByDate(entries)

  const grandTotal = entries.reduce((sum, e) => sum + e.hours, 0)

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Entry History
      </Typography>

      {Object.keys(grouped).length === 0 && (
        <Typography>No entries yet. Start adding new ones</Typography>
      )}

      {Object.entries(grouped).map(([date, dailyEntries]) => {
        const dailyTotal = dailyEntries.reduce((sum, e) => sum + e.hours, 0)
        return (
          <Paper key={date} sx={{ mb: 3, p: 2 }}>
            <Box display={'flex'} justifyContent={'space-between'} mb={'0.5rem'} p={'0.5em'} borderRadius={'10px 10px 0 0'} bgcolor={'#7bbef5'} > 
              <Typography variant='h5'>{date}</Typography>
              <Typography variant='h6'>Total: {dailyTotal}h</Typography>
            </Box>
            <Table size="small" aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Project</TableCell>
                  <TableCell>Hours</TableCell>
                  <TableCell>Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dailyEntries.map((e) => (
                  <TableRow key={e.id}>
                    <TableCell>{e.project}</TableCell>
                    <TableCell>{e.hours}</TableCell>
                    <TableCell>{e.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        )
      })}

      {Object.keys(grouped).length > 0 && (
        <Typography variant="h6">Grand total: {grandTotal}h</Typography>
      )}
    </Box>
  )
}
