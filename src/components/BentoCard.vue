<template>
  <div class="card" :class="size">
    <slot />
  </div>
</template>

<script setup>
defineProps({
  size: String
})
</script>

<style scoped>
.card {
  background: #111;
  border-radius: 18px;
  padding: 16px;
  min-height: 120px;
  overflow: hidden;
  transition: 0.25s;
}

.card:hover {
  transform: scale(1.02);
}

.small { grid-column: span 1; }
.large { grid-column: span 2; }
</style>