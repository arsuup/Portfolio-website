<script setup>
  defineProps({
    title: {
      type: String,
      required: true
    },
    content: {
      type: Object,
      required: true
    },
    date: {
      type: String,
      default: ''
    }
  })
</script>

<template>
  <div class="content-area">
    <div class="center">
      <article>
        <div class="infos">
          <h1>{{ title }}</h1>
          <p v-if="date">Dernière révision : {{ date }}</p>
        </div>
        <component :is="content.default || content" />
      </article>
    </div>
  </div>
</template>

<style scoped>
  .center{
    width: 100%;
    display: flex;
    justify-content: center;
  }
  article{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .infos{
    width: calc(80% + 4rem);
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
    margin-bottom: 2rem;
    margin-top: 3rem;
  }
  .infos h1{
    font-size: 1.5rem;
    color: var(--text);
    margin: 0;
  }
  .infos p{
    font-size: 0.9rem;
    margin: 0;
  }

  .markdown-body{
    background: var(--surface);
    border: solid 1px var(--border);
    color: var(--text);
    width: 80%;
    padding: 1rem 2rem;
    border-radius: 10px;
    margin-top: 1rem;
    margin-bottom: 4rem;
  }
  :deep(a){
    color: var(--primary);
    text-decoration: none;
  }
  :deep(h1){
    font-size: 1.3rem;
    font-stretch: 125%;
  }
  :deep(p){
    color: var(--textSecondary);
  }
  :deep(li){
    color: var(--textSecondary)
  }
  :deep(table){
    border-radius: 12px;
    overflow: hidden;
    border-collapse: separate;
    border-spacing: 0;
    border: solid 1px var(--border);
  }
  :deep(th), :deep(td){
    padding: .4rem .6rem;
    background: var(--surface);
    border-bottom: solid 1px var(--border);
    border-right: solid 1px var(--border);
  }

  :deep(th):last-child, :deep(td):last-child {
    border-right: none;
  }

  :deep(tr):last-child td {
    border-bottom: none;
  }
</style>