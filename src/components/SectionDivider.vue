<script setup>
defineProps({
  title: String
})
</script>

<template>
  <div class="divider">
    <span>{{ title }}</span>
  </div>
</template>

<style scoped>
.divider {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 20px 0;
  color: var(--w);
  opacity: 66%;
}

.divider::before,
.divider::after {
  content: "";
  flex: 1;
  height: 1px;
  background: var(--border2);
}

.divider span {
  white-space: nowrap;
  opacity: 0.8;
  font-stretch: 125%;
}
</style>