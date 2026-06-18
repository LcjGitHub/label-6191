<template>
  <div class="app-layout">
    <header class="app-header">
      <router-link to="/" class="app-title">皮影戏角色图鉴</router-link>
      <span class="app-subtitle">生 · 旦 · 净 · 丑</span>
    </header>
    <main class="app-main">
      <router-view />
    </main>
    <footer class="app-footer">
      纯静态 Mock 数据 · 仅供浏览
    </footer>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, #fdf6ec 0%, #f5e6d3 100%);
}

.app-header {
  padding: 20px 24px;
  background: #8b4513;
  color: #ffd700;
  display: flex;
  align-items: baseline;
  gap: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.app-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffd700;
  text-decoration: none;
  letter-spacing: 2px;
}

.app-title:hover {
  color: #fff;
}

.app-subtitle {
  font-size: 0.9rem;
  opacity: 0.85;
}

.app-main {
  flex: 1;
  padding: 24px;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
}

.app-footer {
  padding: 12px;
  text-align: center;
  font-size: 0.8rem;
  color: #8b7355;
  border-top: 1px solid #e8d5c4;
}
</style>
