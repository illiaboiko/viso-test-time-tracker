import { useState, useEffect } from 'react'
import TimeEntryForm from './components/TimeEntryForm'
import { fetchEntries } from './services/entries'
import type { TimeEntry } from './types'
import EntryList from './components/EntryList'

function App() {
  const [entries, setEntries] = useState<TimeEntry[]>([])

  const loadEntries = async () => {
    const data = await fetchEntries()
    setEntries(data)
  }

  useEffect(() => {
    loadEntries()
  }, [])

  return (
    <>
      <h1 className='app-title'>Time Tracker</h1>
      <div className="main">
        <div className="time-tracker">
          <TimeEntryForm onEntryCreated={loadEntries} />
        </div>
        <EntryList entries={entries} />
      </div>
    </>
  )
}

export default App
