import OpenAI from 'openai'

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
    console.error('❌ API Key não configurado!')
    console.error('Por favor, crie um arquivo .env com: OPENAI_API_KEY=sk-...')
    throw new Error(
      'API key não configurada. Adicione OPENAI_API_KEY ao arquivo .env'
    )
  }

  // Validar formato da chave OpenAI
  if (!apiKey.startsWith('sk-')) {
    console.error('⚠️ API Key parecer estar em formato incorreto!')
    console.error('Esperado: sk-xxxxxxx')
    console.error('Recebido:', apiKey.substring(0, 10) + '...')
  }

  console.log('✅ API Key OpenAI encontrada:', apiKey.substring(0, 20) + '...')

  const client = new OpenAI({
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
    const message = await client.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
    })

    const responseText = message.choices[0].message.content || ''

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
      console.error('Failed to parse OpenAI response:', responseText)
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
