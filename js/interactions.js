// interactions.js - 互動功能模組

/**
 * 顯示 Toast 通知
 */
function showToast(message, duration = 2000) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, duration);
}

/**
 * 複製到剪貼簿
 */
function copyToClipboard(text) {
  // 使用現代 Clipboard API
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text)
      .then(() => {
        showToast('✓ 已複製到剪貼簿');
      })
      .catch(err => {
        console.error('複製失敗:', err);
        // 降級到傳統方法
        fallbackCopyToClipboard(text);
      });
  } else {
    // 降級到傳統方法
    fallbackCopyToClipboard(text);
  }
}

/**
 * 降級複製方法（支援舊瀏覽器）
 */
function fallbackCopyToClipboard(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-9999px';
  document.body.appendChild(textArea);
  textArea.select();

  try {
    const successful = document.execCommand('copy');
    if (successful) {
      showToast('✓ 已複製到剪貼簿');
    } else {
      showToast('✗ 複製失敗，請手動複製');
    }
  } catch (err) {
    console.error('降級複製失敗:', err);
    showToast('✗ 複製失敗，請手動複製');
  }

  document.body.removeChild(textArea);
}

/**
 * 初始化複製按鈕
 */
function initCopyButtons() {
  const copyButtons = document.querySelectorAll('.copy-btn');

  copyButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = button.getAttribute('data-copy');
      if (textToCopy) {
        copyToClipboard(textToCopy);
      }
    });
  });
}

/**
 * 初始化「卡住了」按鈕
 */
function initStuckButtons() {
  const stuckButtons = document.querySelectorAll('.stuck-btn');

  stuckButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const target = button.getAttribute('data-target');

      if (target) {
        const targetSection = document.getElementById(target);
        if (targetSection) {
          const navHeight = document.querySelector('nav').offsetHeight;
          const targetPosition = targetSection.offsetTop - navHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });

          showToast('💡 看看 FAQ 是否有幫助');
        }
      }
    });
  });
}

/**
 * 初始化 Accordion
 */
function initAccordion() {
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const accordionItem = header.parentElement;
      const content = accordionItem.querySelector('.accordion-content');
      const icon = header.querySelector('.accordion-icon');

      // 切換當前項目
      const isActive = accordionItem.classList.contains('active');

      if (isActive) {
        accordionItem.classList.remove('active');
        content.style.maxHeight = null;
        icon.textContent = '+';
      } else {
        accordionItem.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
        icon.textContent = '−';
      }
    });
  });
}

// 初始化所有互動功能
function initInteractions() {
  initCopyButtons();
  initStuckButtons();
  initAccordion();
}

// 導出初始化函數
window.initInteractions = initInteractions;
