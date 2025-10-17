<template>
  <div class="space-y-8">
    <!-- Header -->
    <div>
      <h2 class="text-3xl font-bold text-medical-900 dark:text-white mb-2">Histórico de Análises</h2>
      <p class="text-medical-600 dark:text-slate-300">
        Visualize todas as análises realizadas anteriormente
      </p>
    </div>

    <!-- Loading state -->
    <div v-if="loading" class="text-center py-12">
      <div class="inline-block">
        <div class="text-4xl mb-4 animate-spin">⏳</div>
        <p class="text-medical-600 dark:text-slate-300">Carregando histórico...</p>
      </div>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-200 px-4 py-3 rounded-lg">
      {{ error }}
    </div>

    <!-- Empty state -->
    <div v-else-if="records.length === 0" class="text-center py-12">
      <div class="text-6xl mb-4">📋</div>
      <h3 class="text-xl font-bold text-medical-900 dark:text-white mb-2">Nenhuma análise encontrada</h3>
      <p class="text-medical-600 dark:text-slate-300 mb-4">Comece analisando um prontuário</p>
      <NuxtLink
        to="/"
        class="inline-block bg-gradient-to-r from-medical-500 to-medical-700 text-white font-bold py-2 px-6 rounded-lg hover:from-medical-600 hover:to-medical-800 transition"
      >
        Ir para Análise
      </NuxtLink>
    </div>

    <!-- Records table -->
    <div v-else class="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-medical-50 dark:bg-slate-700 border-b border-medical-200 dark:border-slate-600">
            <tr>
              <th class="px-6 py-3 text-left text-sm font-semibold text-medical-900 dark:text-white">
                Paciente
              </th>
              <th class="px-6 py-3 text-left text-sm font-semibold text-medical-900 dark:text-white">
                Data
              </th>
              <th class="px-6 py-3 text-center text-sm font-semibold text-medical-900 dark:text-white">
                Insuf. Cardíaca
              </th>
              <th class="px-6 py-3 text-center text-sm font-semibold text-medical-900 dark:text-white">
                Problemas Renais
              </th>
              <th class="px-6 py-3 text-center text-sm font-semibold text-medical-900 dark:text-white">
                Antidepressivos
              </th>
              <th class="px-6 py-3 text-center text-sm font-semibold text-medical-900 dark:text-white">
                Câncer
              </th>
              <th class="px-6 py-3 text-center text-sm font-semibold text-medical-900 dark:text-white">
                Ações
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-medical-200 dark:divide-slate-600">
            <tr v-for="record in records" :key="record.id" class="hover:bg-medical-50 dark:hover:bg-slate-700 transition">
              <td class="px-6 py-4">
                <div>
                  <p class="font-medium text-medical-900 dark:text-white">{{ record.patientName }}</p>
                  <p class="text-sm text-medical-500 dark:text-slate-400">
                    {{ record.patientAge ? `${record.patientAge} anos` : 'Idade não informada' }}
                  </p>
                </div>
              </td>
              <td class="px-6 py-4 text-sm text-medical-700 dark:text-slate-300">
                {{ formatDate(record.createdAt) }}
              </td>
              <td class="px-6 py-4 text-center">
                <BadgeResult :value="record.hasHeartFailure" />
              </td>
              <td class="px-6 py-4 text-center">
                <BadgeResult :value="record.hasKidneyProblems" />
              </td>
              <td class="px-6 py-4 text-center">
                <BadgeResult :value="record.takesAntidepressants" />
              </td>
              <td class="px-6 py-4 text-center">
                <BadgeResult :value="record.hasCancer" />
              </td>
              <td class="px-6 py-4 text-center">
                <button
                  @click="viewDetails(record.id)"
                  class="text-medical-600 dark:text-medical-300 hover:text-medical-700 dark:hover:text-medical-200 font-medium text-sm underline transition"
                >
                  Ver
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Details modal -->
    <div
      v-if="selectedRecord"
      @click="selectedRecord = null"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <div
        @click.stop
        class="bg-white dark:bg-slate-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div class="sticky top-0 bg-medical-50 dark:bg-slate-700 border-b border-medical-200 dark:border-slate-600 px-6 py-4 flex justify-between items-center">
          <h3 class="text-2xl font-bold text-medical-900 dark:text-white">
            Detalhes da Análise
          </h3>
          <button
            @click="selectedRecord = null"
            class="text-medical-600 dark:text-slate-300 hover:text-medical-700 dark:hover:text-white text-2xl transition"
          >
            ×
          </button>
        </div>

        <div class="p-6 space-y-6">
          <!-- Patient info -->
          <div>
            <h4 class="font-bold text-medical-900 dark:text-white mb-3">Informações do Paciente</h4>
            <div class="grid grid-cols-3 gap-4">
              <div class="bg-medical-50 dark:bg-slate-700 p-3 rounded-lg">
                <p class="text-sm text-medical-600 dark:text-slate-300 mb-1">Nome</p>
                <p class="font-semibold text-medical-900 dark:text-white">{{ selectedRecord.patientName }}</p>
              </div>
              <div class="bg-medical-50 dark:bg-slate-700 p-3 rounded-lg">
                <p class="text-sm text-medical-600 dark:text-slate-300 mb-1">Idade</p>
                <p class="font-semibold text-medical-900 dark:text-white">
                  {{ selectedRecord.patientAge || '-' }}
                </p>
              </div>
              <div class="bg-medical-50 dark:bg-slate-700 p-3 rounded-lg">
                <p class="text-sm text-medical-600 dark:text-slate-300 mb-1">Gênero</p>
                <p class="font-semibold text-medical-900 dark:text-white">
                  {{ selectedRecord.patientGender === 'M' ? 'Masculino' : selectedRecord.patientGender === 'F' ? 'Feminino' : '-' }}
                </p>
              </div>
            </div>
          </div>

          <!-- Results -->
          <div>
            <h4 class="font-bold text-medical-900 dark:text-white mb-3">Resultados</h4>
            <div class="grid grid-cols-2 gap-4">
              <DetailResultCard
                title="Insuficiência Cardíaca"
                :value="selectedRecord.hasHeartFailure"
                :score="selectedRecord.heartFailureScore"
              />
              <DetailResultCard
                title="Problemas Renais"
                :value="selectedRecord.hasKidneyProblems"
                :score="selectedRecord.kidneyProblemsScore"
              />
              <DetailResultCard
                title="Antidepressivos"
                :value="selectedRecord.takesAntidepressants"
                :score="selectedRecord.antidepressantScore"
              />
              <DetailResultCard
                title="Câncer"
                :value="selectedRecord.hasCancer"
                :score="selectedRecord.cancerScore"
              />
            </div>
          </div>

          <!-- Full analysis -->
          <div v-if="selectedRecord.fullAnalysis">
            <h4 class="font-bold text-medical-900 dark:text-white mb-3">Análise Completa</h4>
            <div class="bg-medical-50 dark:bg-slate-700 p-4 rounded-lg border border-medical-200 dark:border-slate-600">
              <p class="text-medical-700 dark:text-slate-200 whitespace-pre-wrap text-sm">
                {{ selectedRecord.fullAnalysis }}
              </p>
            </div>
          </div>

          <!-- Medical content -->
          <div>
            <h4 class="font-bold text-medical-900 dark:text-white mb-3">Prontuário Original</h4>
            <div class="bg-gray-50 dark:bg-slate-700 p-4 rounded-lg border border-gray-200 dark:border-slate-600 max-h-64 overflow-y-auto">
              <p class="text-gray-700 dark:text-slate-300 whitespace-pre-wrap text-sm font-mono">
                {{ selectedRecord.medicalContent }}
              </p>
            </div>
          </div>

          <!-- Footer info -->
          <div class="text-sm text-medical-500 dark:text-slate-400 border-t border-medical-200 dark:border-slate-600 pt-4">
            <p>Criado em: {{ formatDateTime(selectedRecord.createdAt) }}</p>
            <p>Modelo: {{ selectedRecord.model }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MedicalRecord } from '@prisma/client'

const records = ref<MedicalRecord[]>([])
const selectedRecord = ref<MedicalRecord | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    const data = await $fetch('/api/records')
    records.value = data
  } catch (err: any) {
    error.value = err.data?.message || 'Erro ao carregar histórico'
    console.error('Error loading records:', err)
  } finally {
    loading.value = false
  }
})

function formatDate(date: Date | string): string {
  const d = new Date(date)
  return d.toLocaleDateString('pt-BR')
}

function formatDateTime(date: Date | string): string {
  const d = new Date(date)
  return d.toLocaleString('pt-BR')
}

function viewDetails(id: string) {
  const record = records.value.find(r => r.id === id)
  if (record) {
    selectedRecord.value = record
  }
}
</script>
