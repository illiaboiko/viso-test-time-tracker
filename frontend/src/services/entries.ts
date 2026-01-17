import type { NewTimeEntry, TimeEntry } from '../types'

const API_URL = 'http://localhost:3001/api/entries'

export async function fetchEntries(): Promise<TimeEntry[]> {
  const res = await fetch(API_URL)
  if (!res.ok) throw new Error('Failed to fetch entries')
  return res.json()
}

export async function createEntry(entry: NewTimeEntry): Promise<TimeEntry> {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(entry),
  })
  if (!res.ok) {
    const data = await res.json()
    throw new Error(data.error || 'Failed to create entry')
  }
  return res.json()
}
