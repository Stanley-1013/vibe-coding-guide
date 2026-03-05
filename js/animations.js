// animations.js - 動畫效果模組

/**
 * Intersection Observer 配置
 */
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

/**
 * 初始化滾動動畫
 */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');

  if (!animatedElements.length) return;

  // 創建 Intersection Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // 可選：觀察一次後停止觀察（提升性能）
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // 觀察所有需要動畫的元素
  animatedElements.forEach(element => {
    observer.observe(element);
  });
}

/**
 * 初始化交錯動畫（Stagger）
 */
function initStaggerAnimations() {
  const staggerItems = document.querySelectorAll('.stagger-item');

  if (!staggerItems.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // 為每個元素添加延遲
  staggerItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(item);
  });
}

/**
 * 初始化視差滾動效果（可選）
 */
function initParallaxEffect() {
  const parallaxElements = document.querySelectorAll('.parallax');

  if (!parallaxElements.length) return;

  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;

    parallaxElements.forEach(element => {
      const speed = element.getAttribute('data-speed') || 0.5;
      const yPos = -(scrolled * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
  });
}

/**
 * 初始化淡入效果
 */
function initFadeIn() {
  const fadeElements = document.querySelectorAll('.fade-in');

  if (!fadeElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  fadeElements.forEach(element => {
    observer.observe(element);
  });
}

/**
 * 初始化滑入效果
 */
function initSlideIn() {
  const slideElements = document.querySelectorAll('.slide-in');

  if (!slideElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  slideElements.forEach(element => {
    observer.observe(element);
  });
}

/**
 * 回到頂部按鈕（可選）
 */
function initScrollToTop() {
  // 檢查是否有回到頂部按鈕
  const scrollTopBtn = document.getElementById('scroll-top');

  if (!scrollTopBtn) return;

  // 滾動時顯示/隱藏按鈕
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });

  // 點擊回到頂部
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// 初始化所有動畫效果
function initAnimations() {
  initScrollAnimations();
  initStaggerAnimations();
  initParallaxEffect();
  initFadeIn();
  initSlideIn();
  initScrollToTop();
}

// 導出初始化函數
window.initAnimations = initAnimations;
