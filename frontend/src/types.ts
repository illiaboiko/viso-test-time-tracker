export interface TimeEntry {
  id: number
  date: string // ISO string
  project: string
  hours: number
  description: string
  createdAt: string
}

export interface NewTimeEntry {
  date: string
  project: string
  hours: number
  description: string
}
