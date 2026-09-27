<template>
  <MarkdownViewer 
    title="RGPD" 
    :content="mdDoc" 
    :date="lastModifiedDate" 
  />
</template>

<script setup>
  import MarkdownViewer from '@/components/MarkdownRenderer.vue'
  import mdDoc, { lastModifiedDate } from './docs/rgpd.md'
</script>