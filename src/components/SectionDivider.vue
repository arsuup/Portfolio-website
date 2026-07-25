<template>
  <div class="divider">
    <span>{{ title }}</span>
  </div>
</template>

<script setup>
defineProps({
  title: String
})
</script>

<style scoped>
.divider {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 20px 0;
  color: #aaa;
}

.divider::before,
.divider::after {
  content: "";
  flex: 1;
  height: 1px;
  background: #222;
}

.divider span {
  white-space: nowrap;
  opacity: 0.8;
  font-stretch: 125%;
}
</style>