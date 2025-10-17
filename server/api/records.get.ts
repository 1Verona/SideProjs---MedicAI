import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    const records = await prisma.medicalRecord.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })

    return records
  } catch (error: any) {
    console.error('Error fetching records:', error)

    throw createError({
      statusCode: 500,
      statusMessage: error.message || 'Failed to fetch records',
    })
  }
})
