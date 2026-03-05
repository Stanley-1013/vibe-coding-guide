// app.js - 主應用程式入口

/**
 * 頁面載入完成後初始化所有功能
 */
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 AI 開發教學網站已載入');

  // 初始化導航功能
  if (typeof window.initNavigation === 'function') {
    window.initNavigation();
    console.log('✓ 導航功能已初始化');
  }

  // 初始化互動功能
  if (typeof window.initInteractions === 'function') {
    window.initInteractions();
    console.log('✓ 互動功能已初始化');
  }

  // 初始化動畫效果
  if (typeof window.initAnimations === 'function') {
    window.initAnimations();
    console.log('✓ 動畫效果已初始化');
  }

  console.log('✅ 所有功能初始化完成');
});

/**
 * 錯誤處理
 */
window.addEventListener('error', (event) => {
  console.error('發生錯誤:', event.error);
});

/**
 * 未捕獲的 Promise 拒絕處理
 */
window.addEventListener('unhandledrejection', (event) => {
  console.error('未處理的 Promise 拒絕:', event.reason);
});

/**
 * 開發環境專用：性能監控
 */
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
  window.addEventListener('load', () => {
    if (window.performance && window.performance.timing) {
      const perfData = window.performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      console.log(`📊 頁面載入時間: ${pageLoadTime}ms`);
    }
  });
}
