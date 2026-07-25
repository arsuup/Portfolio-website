<template>
  <div class="card" :class="size">
    <div class="media">
      <p>{{title}}</p>
      <img :src="link">
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  size: Int16Array,
  title: String,
  link: String
})

</script>

<style scoped>
.card {
  background: #111;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border: solid 1px #333;
  padding: 3px;
  border-radius: 20px;
  height: 300px;
}

p{
  position: absolute;
  margin: 10px;
  text-shadow: 2px 2px 6px #000000;
}

.x1{
  grid-column: span 1;
  aspect-ratio: 1;
}

.x2{
  grid-column: span 2;
}

.x3{
  grid-column: span 3;
}

.media {
  width: 100%;
  background: black;
  border-radius: 17px;
  height: 300px;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 17px;
  user-select: none;
  pointer-events: none;
}
</style>