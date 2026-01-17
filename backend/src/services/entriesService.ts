import {prisma} from '../prisma'

interface EntryInput {
  date: string  // ISO string, e.g., "2026-01-17"
  project: string
  hours: number
  description: string
}

export async function getAllEntries() {
  return prisma.timeEntry.findMany({
    orderBy: { date: 'desc' },
  })
}

export async function createEntry(input: EntryInput) {
  // 1. Check required fields
  if (!input.date || !input.project || input.hours === undefined || !input.description) {
    throw new Error('All fields are required')
  }

  // 2. Check positive hours
  if (input.hours <= 0) {
    throw new Error('Hours must be greater than 0')
  }

  // 3. Check max 24h per date
  const totalHours = await prisma.timeEntry.aggregate({
    where: { date: new Date(input.date) },
    _sum: { hours: true },
  })

  const currentTotal = totalHours._sum.hours ?? 0
  if (currentTotal + input.hours > 24) {
    throw new Error('Total hours per day cannot exceed 24')
  }

  // 4. Insert entry
  return prisma.timeEntry.create({
    data: {
      date: new Date(input.date),
      project: input.project,
      hours: input.hours,
      description: input.description,
    },
  })
}
