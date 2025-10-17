<template>
  <div
    :class="[
      'rounded-lg p-4 border',
      value === true
        ? 'bg-red-50 border-red-200'
        : value === false
          ? 'bg-green-50 border-green-200'
          : 'bg-gray-50 border-gray-200',
    ]"
  >
    <div class="flex justify-between items-start mb-2">
      <h5 class="font-semibold text-gray-900">{{ title }}</h5>
      <span
        :class="[
          'px-2 py-1 rounded text-xs font-bold',
          value === true
            ? 'bg-red-200 text-red-800'
            : value === false
              ? 'bg-green-200 text-green-800'
              : 'bg-gray-200 text-gray-800',
        ]"
      >
        {{ value === true ? 'Sim' : value === false ? 'Não' : 'Indefinido' }}
      </span>
    </div>

    <div v-if="score !== null" class="mt-3">
      <div class="flex justify-between mb-1">
        <span class="text-xs text-gray-600">Confiança</span>
        <span class="text-xs font-bold text-gray-800">{{ Math.round(score * 100) }}%</span>
      </div>
      <div class="w-full bg-gray-300 rounded-full h-1.5">
        <div
          :style="{ width: `${score * 100}%` }"
          :class="[
            'h-1.5 rounded-full',
            value === true ? 'bg-red-500' : value === false ? 'bg-green-500' : 'bg-gray-500',
          ]"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  value: boolean | null
  score: number | null
}>()</script>
