import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    // Validate input
    if (!body.medicalContent) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Medical content is required',
      })
    }

    // Analyze the medical record using OpenAI
    const analysis = await analyzeMedicalRecord(
      body.medicalContent,
      body.patientName,
      body.patientAge,
      body.patientGender,
    )

    // Save to database
    const record = await prisma.medicalRecord.create({
      data: {
        patientName: body.patientName || 'Paciente',
        patientAge: body.patientAge || null,
        patientGender: body.patientGender || null,
        medicalContent: body.medicalContent,
        hasHeartFailure: analysis.hasHeartFailure,
        hasKidneyProblems: analysis.hasKidneyProblems,
        takesAntidepressants: analysis.takesAntidepressants,
        hasCancer: analysis.hasCancer,
        heartFailureScore: analysis.heartFailureScore,
        kidneyProblemsScore: analysis.kidneyProblemsScore,
        antidepressantScore: analysis.antidepressantScore,
        cancerScore: analysis.cancerScore,
        fullAnalysis: analysis.fullAnalysis,
        model: 'claude-3-5-sonnet-20241022',
      },
    })

    // Return only the analysis results, not the stored record
    return {
      hasHeartFailure: analysis.hasHeartFailure,
      hasKidneyProblems: analysis.hasKidneyProblems,
      takesAntidepressants: analysis.takesAntidepressants,
      hasCancer: analysis.hasCancer,
      heartFailureScore: analysis.heartFailureScore,
      kidneyProblemsScore: analysis.kidneyProblemsScore,
      antidepressantScore: analysis.antidepressantScore,
      cancerScore: analysis.cancerScore,
      fullAnalysis: analysis.fullAnalysis,
      recordId: record.id,
    }
  } catch (error: any) {
    console.error('Analysis error:', error)

    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: error.message || 'Failed to analyze medical record',
    })
  }
})
