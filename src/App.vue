<script setup>
import { CDN_URL } from '@/utils/constants'
import { ref, onUnmounted } from 'vue';

const isFrameVisible = ref(false);
let hideTimeout = null;

const showFrame = () => {
  clearTimeout(hideTimeout);
  isFrameVisible.value = true;
};

const scheduleHide = () => {
  clearTimeout(hideTimeout);
  hideTimeout = setTimeout(() => {
    isFrameVisible.value = false;
  }, 300);
};

onUnmounted(() => {
  clearTimeout(hideTimeout);
});

const buildDate = new Date(__BUILD_DATE__).toLocaleString('fr-FR', {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
})
</script>

<template>
  <header>
    <div class="content-area">
      <div class="header-left">
        <router-link to="/" class="brand">
          <img class="brand-logo" :src="`${CDN_URL}/i/pfp.jpg`" alt=" ">
        </router-link>
        <nav>
          <router-link to="/">Montage Vidéo</router-link>
        </nav>
      </div>
      <div class="header-right">
      </div>
    </div>
  </header>

  <main>
    <router-view />
  </main>

  <footer>
    <div class="content-area">
      <div class="footer-left">
        <p>© 2026 arsuup.fr</p>
        <a class="github" href="https://github.com/arsuup/Portfolio-website" target="_blank" rel="noopener noreferrer" :title="'Dernier build le ' + buildDate">Github</a>
      </div>
      <div class="footer-right">
        <div class="politics-wrapper" @mouseenter="showFrame" @mouseleave="scheduleHide">
          <button id="politics" class="footer-politics">
            Conditions générales et politiques
          </button>
          <div id="politics-frame" class="footer-politics-frame" :class="{ visible: isFrameVisible }">
            <router-link class="footer-politics-frame-button" to="/policies/legal">Mentions légales</router-link>
            <router-link class="footer-politics-frame-button" to="/policies/rgpd">Politique de confidentialité</router-link>
            <router-link class="footer-politics-frame-button disabled" to="/">Préférences en matière de cookies</router-link>
          </div>
        </div>
      </div>
    </div> 
  </footer>
</template>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Archivo:ital,wdth,wght@0,62..125,100..900;1,62..125,100..900&display=swap');
  :root{
    --primary: #e5db20;
    --surface: #111;
    --border: #ffffff10;
    --border2: #333;
    --b: #141517;
    --w: #F0F1F8;
    --textSecondary: #a1a1aa;
    --usercontent: 1300px;
  }
  *{
    font-family: "Archivo", sans-serif;
  }
  ::selection {
    background: var(--w);
    color: var(--b);
    text-shadow: none;
  }
  ::-moz-selection {
    background: var(--w);
    color: var(--b);
    text-shadow: none;
  }
  
  html, body {
    height: 100%;
    background: var(--b);
    color: var(--w);
    margin: 0;
  }

  #app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .content-area{
    max-width: var(--usercontent);
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
  }
</style>

<style scoped>
  main{
    flex: 1;
    display: flex;
    margin-top: 65px;
    flex-direction: column;
    align-items: center;
  }

  header{
    height: 65px;
    width: 100%;
    background: var(--b);
    color: var(--text);
    display: flex;
    justify-content: center;
    border-bottom: solid 1px var(--border);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
  }
  .header-left, .header-right{
    display: flex;
    align-items: center;
  }

  .brand{
    height: 60%;
    display: flex;
    align-items: center;
    margin-right: 2rem;
  }
  .brand-logo{
    height: 100%;
    user-select: none;
    border-radius: 10px;
    background: black;
    aspect-ratio: 1 / 1;
  }

  nav{
    display: flex;
    width: max-content;
    font-size: .9rem;
    gap: .5rem;
  }
  nav a{
    padding: .5rem .8rem;
    color: var(--textSecondary);
    border-radius: 8px;
    border: solid 1px transparent;
    transition: background .1s ease-out, color .1s ease-out;
    text-decoration: none;
  }
  nav a:hover{
    color: var(--text);
    background: var(--surface);
  }
  nav .router-link-active{
    border: solid 1px var(--border);
  }


  footer{
    background: var(--background);
    border-top: solid 1px var(--border);
    color: var(--text);
    display: flex;
    justify-content: center;
    padding: 1.8rem 0;
  }

  .footer-left{
    display: flex;
    gap: 2rem;
    align-items: center;
  }

  p{
    margin: 0;
  }

  .github {
    color: var(--w);
    opacity: 0.7;
    text-decoration: none;
    padding: 10px 14px;
    background: #0c0d0e;
    width: max-content;
    transition: 0.1s;
  }
  .github:hover {
    opacity: 1;
  }

  .footer-right{
    position: relative;
    display: flex;
    align-items: center;
  }

  .footer-politics{
    border: 0;
    background: 0;
    color: var(--text);
    opacity: 60%;
    font-size: 1rem;
    cursor: pointer;
  }

  .footer-politics-frame{
      background: var(--b);
      /* border: solid 1px var(--border); */
      box-shadow: 0 0 10px 0 #00000050;
      position: absolute;
      bottom: 100%;
      margin-bottom: 2rem;
      padding: 8px;
      border-radius: 13px;
      display: flex;
      flex-direction: column;
      gap: 2px;
      opacity: 0;
      visibility: hidden;
      transform: translateY(4px);
      transition: opacity 0.15s ease, transform 0.15s ease, visibility 0.15s;
      pointer-events: none;
  }
  .footer-politics-frame.visible{
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
      pointer-events: auto;
  }
  .footer-politics-frame-button{
      border: 0;
      background: 0;
      text-align: left;
      font-size: 1rem;
      color: var(--text);
      padding: 8px 10px;
      border-radius: 8px;
      cursor: pointer;
      transition: background 0.15s ease, color 0.15s ease;
      user-select: none;
      text-decoration: none;
  }
  .footer-politics-frame-button.disabled{
      background-image: repeating-linear-gradient(-45deg, rgba(0, 0, 0, 0),rgba(0, 0, 0, 0) 5px, rgba(0, 0, 0, 1) 5px, rgba(0, 0, 0, 1) 6px);
      background-size: 8px 8px, 8px 8px;
      color: #000;
      margin-top: 2px;
      margin-bottom: 2px;
  }
  .footer-politics-frame-button:hover{
      background-color: var(--w);
      color: var(--b);
  }
</style>