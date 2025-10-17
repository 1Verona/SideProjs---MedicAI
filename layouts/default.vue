<template>
  <div class="flex flex-col min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white transition-colors">
    <!-- Header -->
    <header class="bg-white dark:bg-slate-900 border-b border-medical-200 dark:border-slate-800 shadow-sm sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex justify-between items-center">
          <NuxtLink to="/" class="flex items-center gap-2">
            <div class="w-10 h-10 bg-gradient-to-br from-medical-500 to-medical-700 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-lg">M</span>
            </div>
            <div>
              <h1 class="text-2xl font-bold text-medical-700">MedicAI</h1>
              <p class="text-xs text-medical-500">Medical Analysis System</p>
            </div>
          </NuxtLink>
          <div class="flex gap-6 items-center">
            <nav class="flex gap-4">
              <NuxtLink to="/" class="text-medical-600 dark:text-medical-300 hover:text-medical-700 dark:hover:text-medical-200 font-medium transition">
                Análise
              </NuxtLink>
              <NuxtLink to="/histórico" class="text-medical-600 dark:text-medical-300 hover:text-medical-700 dark:hover:text-medical-200 font-medium transition">
                Histórico
              </NuxtLink>
            </nav>
            <!-- Dark mode toggle -->
            <button
              @click="toggleDarkMode"
              class="p-2 rounded-lg bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 transition"
              :title="isDark ? 'Modo claro' : 'Modo escuro'"
            >
              <svg v-if="isDark" class="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l-2.12-2.12a1 1 0 00-1.414 1.414l2.12 2.12a1 1 0 001.414-1.414zM2.05 6.464a1 1 0 00-1.414 1.414l2.12 2.12a1 1 0 101.414-1.414L2.05 6.464zm9.9 0a1 1 0 10-1.414-1.414l-2.12 2.12a1 1 0 101.414 1.414l2.12-2.12zM17.95 13.536a1 1 0 001.414-1.414l-2.12-2.12a1 1 0 00-1.414 1.414l2.12 2.12z" clip-rule="evenodd" />
              </svg>
              <svg v-else class="w-5 h-5 text-slate-700" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main content -->
    <main class="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-medical-900 dark:bg-slate-900 text-white mt-12 border-t border-medical-800 dark:border-slate-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 class="font-bold mb-2">MedicAI</h3>
            <p class="text-medical-300 dark:text-slate-400 text-sm">Sistema de análise médica alimentado por IA</p>
          </div>
          <div>
            <h3 class="font-bold mb-2">Recursos</h3>
            <ul class="text-medical-300 dark:text-slate-400 text-sm space-y-1">
              <li><NuxtLink to="/" class="hover:text-white transition">Análise de Prontuário</NuxtLink></li>
              <li><NuxtLink to="/histórico" class="hover:text-white transition">Histórico</NuxtLink></li>
            </ul>
          </div>
          <div>
            <h3 class="font-bold mb-2">Aviso Legal</h3>
            <p class="text-medical-300 dark:text-slate-400 text-xs">Esta ferramenta é apenas para fins informativos e não substitui diagnóstico profissional.</p>
          </div>
        </div>
        <div class="border-t border-medical-700 dark:border-slate-700 mt-8 pt-8 text-center text-medical-300 dark:text-slate-400 text-sm">
          <p>&copy; 2025 MedicAI. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const isDark = ref(false)

onMounted(() => {
  // Check if dark mode preference exists in localStorage
  const saved = localStorage.getItem('medicai-dark-mode')
  if (saved !== null) {
    isDark.value = saved === 'true'
  } else {
    // Check system preference
    isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  }
  applyTheme()
})

function toggleDarkMode() {
  isDark.value = !isDark.value
  localStorage.setItem('medicai-dark-mode', isDark.value.toString())
  applyTheme()
}

function applyTheme() {
  if (isDark.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}
</script>
