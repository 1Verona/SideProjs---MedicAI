<template>
  <div class="space-y-8">
    <!-- Hero section -->
    <div class="text-center mb-12">
      <h2 class="text-4xl font-bold text-medical-900 mb-4">
        Análise Inteligente de Prontuários
      </h2>
      <p class="text-xl text-medical-600 max-w-2xl mx-auto">
        Utilize IA avançada para analisar prontuários médicos e identificar condições importantes como insuficiência cardíaca, problemas renais, uso de antidepressivos e câncer.
      </p>
    </div>

    <!-- Main form section -->
    <div class="grid md:grid-cols-3 gap-8">
      <!-- Form -->
      <div class="md:col-span-2">
        <div class="bg-white dark:bg-medical-900 rounded-xl shadow-lg p-8 border border-medical-200 dark:border-medical-800">
          <h3 class="text-2xl font-bold text-medical-900 dark:text-medical-100 mb-6">
            Enviar Prontuário
          </h3>

          <form @submit.prevent="analyzeRecord" class="space-y-6">
            <!-- Patient Name -->
            <div>
              <label class="block text-sm font-medium text-medical-900 dark:text-medical-100 mb-2">
                Nome do Paciente (opcional)
              </label>
              <input
                v-model="form.patientName"
                type="text"
                placeholder="Ex: João Silva"
                class="w-full px-4 py-2 bg-gray-50 dark:bg-slate-800 text-medical-900 dark:text-white border border-gray-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-medical-500 dark:focus:ring-medical-400 transition placeholder-gray-400 dark:placeholder-gray-500"
              />
            </div>

            <!-- Patient Age -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-medical-900 dark:text-medical-100 mb-2">
                  Idade (opcional)
                </label>
                <input
                  v-model.number="form.patientAge"
                  type="number"
                  placeholder="Ex: 65"
                  class="w-full px-4 py-2 bg-gray-50 dark:bg-slate-800 text-medical-900 dark:text-white border border-gray-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-medical-500 dark:focus:ring-medical-400 transition placeholder-gray-400 dark:placeholder-gray-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-medical-900 dark:text-medical-100 mb-2">
                  Gênero (opcional)
                </label>
                <select
                  v-model="form.patientGender"
                  class="w-full px-4 py-2 bg-gray-50 dark:bg-slate-800 text-medical-900 dark:text-white border border-gray-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-medical-500 dark:focus:ring-medical-400 transition"
                >
                  <option value="">Selecione</option>
                  <option value="M">Masculino</option>
                  <option value="F">Feminino</option>
                  <option value="O">Outro</option>
                </select>
              </div>
            </div>

            <!-- Medical Record -->
            <div>
              <label class="block text-sm font-medium text-medical-900 dark:text-medical-100 mb-2">
                Prontuário Médico *
              </label>
              <textarea
                v-model="form.medicalContent"
                placeholder="Cole aqui o prontuário médico do paciente. Inclua informações sobre histórico médico, medicamentos, diagnósticos anteriores, etc."
                rows="10"
                required
                class="w-full px-4 py-2 bg-gray-50 dark:bg-slate-800 text-medical-900 dark:text-white border border-gray-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-medical-500 dark:focus:ring-medical-400 transition font-mono text-sm placeholder-gray-400 dark:placeholder-gray-500"
              />
            </div>

            <!-- Submit button -->
            <button
              :disabled="loading"
              class="w-full bg-gradient-to-r from-medical-500 to-medical-700 text-white font-bold py-3 rounded-lg hover:from-medical-600 hover:to-medical-800 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <span v-if="loading" class="inline-block animate-spin">⏳</span>
              <span>{{ loading ? 'Analisando...' : 'Analisar Prontuário' }}</span>
            </button>

            <!-- Error message -->
            <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {{ error }}
            </div>
          </form>
        </div>
      </div>

      <!-- Info cards -->
      <div class="space-y-4">
        <div class="bg-blue-50 dark:bg-medical-900 border border-blue-200 dark:border-medical-800 rounded-lg p-4">
          <h4 class="font-bold text-blue-900 dark:text-blue-200 mb-2">ℹ️ Como funciona?</h4>
          <p class="text-sm text-blue-700 dark:text-blue-100">
            Cole o prontuário médico e nossa IA analisará automaticamente as informações, identificando condições importantes.
          </p>
        </div>

        <div class="bg-green-50 dark:bg-medical-900 border border-green-200 dark:border-medical-800 rounded-lg p-4">
          <h4 class="font-bold text-green-900 dark:text-green-200 mb-2">✓ Segurança</h4>
          <p class="text-sm text-green-700 dark:text-green-100">
            Seus dados são processados com segurança e nunca são armazenados em servidores terceirizados.
          </p>
        </div>

        <div class="bg-amber-50 dark:bg-medical-900 border border-amber-200 dark:border-medical-800 rounded-lg p-4">
          <h4 class="font-bold text-amber-900 dark:text-amber-200 mb-2">⚠️ Aviso</h4>
          <p class="text-sm text-amber-700 dark:text-amber-100">
            Esta ferramenta é apenas informativa. Sempre consulte profissionais médicos.
          </p>
        </div>
      </div>
    </div>

    <!-- Results section -->
    <div v-if="results" class="bg-white dark:bg-medical-900 rounded-xl shadow-lg p-8 border border-medical-200 dark:border-medical-800">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-2xl font-bold text-medical-900 dark:text-medical-100">Resultados da Análise</h3>
        <button
          @click="resetForm"
          class="text-medical-600 dark:text-medical-300 hover:text-medical-700 dark:hover:text-medical-200 text-sm font-medium transition"
        >
          Nova análise
        </button>
      </div>

      <div class="grid md:grid-cols-2 gap-6">
        <!-- Heart Failure -->
        <ResultCard
          :title="'Insuficiência Cardíaca Descompensada'"
          :result="results.hasHeartFailure"
          :score="results.heartFailureScore"
          :icon="'❤️'"
        />

        <!-- Kidney Problems -->
        <ResultCard
          :title="'Problemas Renais'"
          :result="results.hasKidneyProblems"
          :score="results.kidneyProblemsScore"
          :icon="'🫘'"
        />

        <!-- Antidepressants -->
        <ResultCard
          :title="'Uso de Antidepressivos'"
          :result="results.takesAntidepressants"
          :score="results.antidepressantScore"
          :icon="'💊'"
        />

        <!-- Cancer -->
        <ResultCard
          :title="'Câncer'"
          :result="results.hasCancer"
          :score="results.cancerScore"
          :icon="'⚠️'"
        />
      </div>

      <!-- Full analysis -->
      <div v-if="results.fullAnalysis" class="mt-8 p-4 bg-medical-50 dark:bg-medical-800 rounded-lg border border-medical-200 dark:border-medical-700">
        <h4 class="font-bold text-medical-900 dark:text-medical-100 mb-3">Análise Completa</h4>
        <p class="text-medical-700 dark:text-medical-200 whitespace-pre-wrap text-sm">{{ results.fullAnalysis }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MedicalRecord } from '@prisma/client'

interface AnalysisResult {
  hasHeartFailure: boolean | null
  hasKidneyProblems: boolean | null
  takesAntidepressants: boolean | null
  hasCancer: boolean | null
  heartFailureScore: number | null
  kidneyProblemsScore: number | null
  antidepressantScore: number | null
  cancerScore: number | null
  fullAnalysis: string | null
}

interface FormData {
  patientName: string
  patientAge: number | null
  patientGender: string
  medicalContent: string
}

const form = ref<FormData>({
  patientName: '',
  patientAge: null,
  patientGender: '',
  medicalContent: '',
})

const loading = ref(false)
const error = ref<string | null>(null)
const results = ref<AnalysisResult | null>(null)

async function analyzeRecord() {
  error.value = null
  loading.value = true

  try {
    const response = await $fetch('/api/analyze', {
      method: 'POST',
      body: {
        patientName: form.value.patientName || 'Paciente',
        patientAge: form.value.patientAge,
        patientGender: form.value.patientGender,
        medicalContent: form.value.medicalContent,
      },
    })

    results.value = response
  } catch (err: any) {
    error.value =
      err.data?.message || err.message || 'Erro ao analisar prontuário. Tente novamente.'
    console.error('Analysis error:', err)
  } finally {
    loading.value = false
  }
}

function resetForm() {
  form.value = {
    patientName: '',
    patientAge: null,
    patientGender: '',
    medicalContent: '',
  }
  results.value = null
  error.value = null
}
</script>
