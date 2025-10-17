import Anthropic from '@anthropic-ai/sdk'

interface AnalysisResult {
  hasHeartFailure: boolean
  hasKidneyProblems: boolean
  takesAntidepressants: boolean
  hasCancer: boolean
  heartFailureScore: number
  kidneyProblemsScore: number
  antidepressantScore: number
  cancerScore: number
  fullAnalysis: string
}

export async function analyzeMedicalRecord(
  medicalContent: string,
  patientName?: string,
  patientAge?: number,
  patientGender?: string,
): Promise<AnalysisResult> {
  const config = useRuntimeConfig()
  const apiKey = config.openaiApiKey || process.env.OPENAI_API_KEY

  if (!apiKey) {
    throw new Error('OpenAI API key not configured')
  }

  const client = new Anthropic({
    apiKey,
  })

  const prompt = `You are a medical AI assistant. Analyze the following medical record and provide a structured analysis.

Medical Record:
${medicalContent}

Patient Information:
- Name: ${patientName || 'Not provided'}
- Age: ${patientAge || 'Not provided'}
- Gender: ${patientGender || 'Not provided'}

Please analyze this medical record and respond in the following JSON format:
{
  "hasHeartFailure": boolean (true if patient has signs of decompensated heart failure),
  "hasKidneyProblems": boolean (true if patient has kidney problems or renal issues),
  "takesAntidepressants": boolean (true if patient is taking antidepressant medications),
  "hasCancer": boolean (true if patient has cancer diagnosis or related conditions),
  "heartFailureScore": number (0-1, confidence level for heart failure assessment),
  "kidneyProblemsScore": number (0-1, confidence level for kidney problems assessment),
  "antidepressantScore": number (0-1, confidence level for antidepressant use assessment),
  "cancerScore": number (0-1, confidence level for cancer assessment),
  "summary": "Brief summary of the analysis in Portuguese"
}

Important: 
- Always respond with valid JSON only, no additional text
- Scores should reflect your confidence in the assessment (0 = no confidence, 1 = very confident)
- Base your analysis on explicitly mentioned conditions, medications, and medical history
- If information is not clear, use a lower score`

  try {
    const message = await client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    })

    const responseText =
      message.content[0].type === 'text' ? message.content[0].text : ''

    // Parse the JSON response
    let analysisData
    try {
      // Try to extract JSON from the response
      const jsonMatch = responseText.match(/\{[\s\S]*\}/)
      if (!jsonMatch) {
        throw new Error('No JSON found in response')
      }
      analysisData = JSON.parse(jsonMatch[0])
    } catch (e) {
      console.error('Failed to parse Claude response:', responseText)
      throw new Error('Failed to parse AI analysis response')
    }

    return {
      hasHeartFailure: analysisData.hasHeartFailure || false,
      hasKidneyProblems: analysisData.hasKidneyProblems || false,
      takesAntidepressants: analysisData.takesAntidepressants || false,
      hasCancer: analysisData.hasCancer || false,
      heartFailureScore: Math.max(0, Math.min(1, analysisData.heartFailureScore || 0)),
      kidneyProblemsScore: Math.max(0, Math.min(1, analysisData.kidneyProblemsScore || 0)),
      antidepressantScore: Math.max(0, Math.min(1, analysisData.antidepressantScore || 0)),
      cancerScore: Math.max(0, Math.min(1, analysisData.cancerScore || 0)),
      fullAnalysis: analysisData.summary || 'Analysis completed',
    }
  } catch (error) {
    console.error('Error analyzing medical record:', error)
    throw error
  }
}
