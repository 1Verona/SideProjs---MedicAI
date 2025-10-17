<template>
  <div
    :class="[
      'rounded-lg p-6 border-2 transition',
      result
        ? 'bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-800'
        : result === false
          ? 'bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-800'
          : 'bg-gray-50 dark:bg-slate-700 border-gray-300 dark:border-slate-600',
    ]"
  >
    <div class="flex items-start justify-between mb-4">
      <div class="text-4xl">{{ icon }}</div>
      <div
        v-if="result !== null"
        :class="[
          'px-3 py-1 rounded-full text-sm font-bold',
          result
            ? 'bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200'
            : 'bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200',
        ]"
      >
        {{ result ? 'Positivo' : 'Negativo' }}
      </div>
      <div v-else class="px-3 py-1 rounded-full text-sm font-bold bg-gray-200 dark:bg-slate-600 text-gray-800 dark:text-slate-200">
        Indefinido
      </div>
    </div>

    <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-2">{{ title }}</h4>

    <div v-if="score !== null" class="mt-4">
      <div class="flex justify-between items-center mb-2">
        <span class="text-sm text-gray-600 dark:text-slate-300">Confiança</span>
        <span class="text-sm font-bold text-gray-900 dark:text-white">{{ Math.round(score * 100) }}%</span>
      </div>
      <div class="w-full bg-gray-200 dark:bg-slate-600 rounded-full h-2">
        <div
          :style="{ width: `${score * 100}%` }"
          :class="[
            'h-2 rounded-full transition-all',
            result
              ? 'bg-gradient-to-r from-red-400 to-red-600'
              : 'bg-gradient-to-r from-green-400 to-green-600',
          ]"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  result: boolean | null
  score: number | null
  icon: string
}>()</script>
