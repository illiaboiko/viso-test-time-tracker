import { useState, useEffect } from 'react'
import TimeEntryForm from './components/TimeEntryForm'
import { fetchEntries } from './services/entries'
import type { TimeEntry } from './types'
import EntryList from './components/EntryList'

import { useSnackbar } from 'notistack'
import type { VariantType } from 'notistack'

function App() {
  const [entries, setEntries] = useState<TimeEntry[]>([])

  const { enqueueSnackbar } = useSnackbar()

  const handleNotificationVariant = (message: string, variant: VariantType) => () => {
    enqueueSnackbar(message, { variant })
  }

  const loadEntries = async () => {
    const data = await fetchEntries()
    setEntries(data)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        await loadEntries()
      } catch (err) {
        console.log(err)
      }
    }

    fetchData()
  }, [])

  return (
    <>
      <h1 className="app-title">Mini Time Tracker</h1>
      <div className="main">
        <div className="time-tracker">
          <TimeEntryForm onSuccessNotify={handleNotificationVariant('new entry added!', 'success')}  onEntryCreated={loadEntries} />
        </div>
        <EntryList entries={entries} />
      </div>
    </>
  )
}

export default App
