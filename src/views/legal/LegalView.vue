<template>
  <MarkdownViewer 
    title="Mentions légales" 
    :content="mdDoc" 
    :date="lastModifiedDate" 
  />
</template>

<script setup>
  import MarkdownViewer from '@/components/MarkdownRenderer.vue'
  import mdDoc, { lastModifiedDate } from './docs/legal.md'
</script>