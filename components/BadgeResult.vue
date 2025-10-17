<template>
  <span
    :class="[
      'px-3 py-1 rounded-full text-xs font-bold',
      value === true
        ? 'bg-red-100 text-red-800'
        : value === false
          ? 'bg-green-100 text-green-800'
          : 'bg-gray-100 text-gray-800',
    ]"
  >
    {{ value === true ? '✓ Sim' : value === false ? '✗ Não' : '?' }}
  </span>
</template>

<script setup lang="ts">
defineProps<{
  value: boolean | null
}>()</script>
