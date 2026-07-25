<template>
  <div class="card">
    <div class="l">
      <img :src="preview">
      <a class="title" href="#">{{title}}</a>
    </div>
    <div class="r">
      <a class="btn" :class="{ 'btn-disabled': isDisabled }" :href="isDisabled ? null : props.link" target="_blank" rel="noopener noreferrer">
        Voir sur Github
      </a>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  preview: String,
  title: String,
  link: String
})

</script>

<style scoped>
.card {
  background: #111;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: solid 1px #333;
  padding: 3px;
  border-radius: 20px;
  height: 100px;
  grid-column: 1 / -1;
}

.l, .r {
  display: flex;
  align-items: center;
  height: 100%;
}

img {
  margin: 5px;
  margin-right: 20px;
  width: min-content;
  height: calc(100% - 10px);
  border-radius: 12.5px;
  object-fit: cover;
  user-select: none;
  pointer-events: none;
}

.title {
  text-decoration: none;
  color: var(--w);
  font-size: 2rem;
  font-weight: 500;
  font-stretch: 117%;
}

.btn {
	background: #000;
	color: white;
	border: none;
	padding: 12px 15px;
	text-decoration: none;
	min-width: max-content;
	transition: 0.5s cubic-bezier(.15,.65,0,1);
	will-change: transform;
	transform: translateZ(0px);
  border-radius: 10px;
  user-select: none;
  margin: 20px;
}

.btn-disabled {
	opacity: 50%;
}

.btn:hover{
  scale: 1.03;
  transform: translateZ(0px);
}
</style>