<template>
  <div class="main">
    <div class="panel">
      <div class="top">

        <h1>404</h1>
        <p>Cette page n'existe pas.</p>
      </div>
      <div class="bottom">
        <router-link to="/">Retour à l'accueil</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main {
  flex: 1;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.panel {
  background: var(--surface);
  padding: 2rem;
  border: solid 1px var(--border2);
  height: 10rem;
  width: 20rem;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
}
.bottom{
  justify-content: end;
  display: flex;
}

h1 {
  margin: 0;
  font-size: 4rem;
  font-weight: 900;
  font-stretch: 120%;
}
p {
  color: var(--textSecondary);
  margin: 0;
  font-size: 1.2rem;
}
a {
  background: black;
  color: var(--w);
  padding: 0.6rem 1.2rem;
  font-size: 1.1rem;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.1s ease-out;
  text-decoration: none;
}
a:hover {
  scale: 1.05;
}
</style>