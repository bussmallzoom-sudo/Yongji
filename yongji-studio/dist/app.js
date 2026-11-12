/**
 * 永吉床墊網站 - 前端互動腳本
 * 包含：毛玻璃導覽列滾動監聽、手機版導覽選單、LINE 諮詢彈窗、一鍵複製文字
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. 導覽列滾動毛玻璃效果
  const header = document.querySelector('#site-header');
  if (header) {
    const handleScroll = () => {
      if (window.scrollY > 25) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // 2. 手機版漢堡選單控制
  const toggle = document.querySelector('.menu-toggle');
  const panel = document.querySelector('#mobile-menu');
  if (toggle && panel) {
    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      const nextState = !isOpen;
      toggle.setAttribute('aria-expanded', String(nextState));
      toggle.textContent = nextState ? '關閉 ✕' : '選單 ☰';
      panel.classList.toggle('open', nextState);
      panel.inert = !nextState;
      document.body.style.overflow = nextState ? 'hidden' : '';
    });

    // ESC 鍵關閉手機選單
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && panel.classList.contains('open')) {
        toggle.click();
      }
    });

    // 點擊手機導覽項目後自動收起選單
    panel.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (panel.classList.contains('open')) {
          toggle.click();
        }
      });
    });
  }

  // 3. LINE 諮詢對話框 (Contact Dialog)
  const dialog = document.querySelector('#contact-dialog');
  if (dialog) {
    let returnFocusElement = null;

    // 綁定所有帶有 data-contact 屬性的按鈕
    document.querySelectorAll('[data-contact]').forEach(btn => {
      btn.addEventListener('click', () => {
        returnFocusElement = btn;
        const topic = btn.dataset.contact ? btn.dataset.contact.trim() : '';
        const textarea = dialog.querySelector('textarea');
        const statusEl = dialog.querySelector('.status');

        if (textarea) {
          if (topic) {
            textarea.value = `您好，我想諮詢永吉床墊的「${topic}」：\n\n1. 目前使用的床墊感受：\n2. 偏好的睡感（軟/適中/硬）：\n3. 需求尺寸（長寬/床架內徑）：\n4. 預計到店試躺時段：`;
          } else {
            textarea.value = `您好，我想請闆娘幫忙選床諮詢：\n\n1. 目前睡起來的困擾：\n2. 主要睡姿（仰睡/側睡/雙人）：\n3. 需求尺寸與預算考量：\n4. 方便前往永和中正店試躺的時間：`;
          }
        }

        if (statusEl) {
          statusEl.textContent = '';
        }

        dialog.showModal();
      });
    });

    // 關閉彈窗
    const closeBtn = dialog.querySelector('.dialog-close');
    const cancelBtn = dialog.querySelector('.dialog-cancel');
    const handleClose = () => dialog.close();

    if (closeBtn) closeBtn.addEventListener('click', handleClose);
    if (cancelBtn) cancelBtn.addEventListener('click', handleClose);

    // 點擊彈窗外部 backdrop 關閉
    dialog.addEventListener('click', (e) => {
      const rect = dialog.getBoundingClientRect();
      const isInDialog = (
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        dialog.close();
      }
    });

    dialog.addEventListener('close', () => {
      if (returnFocusElement) {
        returnFocusElement.focus();
      }
    });

    // 一鍵複製諮詢內容
    const copyBtn = dialog.querySelector('[data-copy]');
    if (copyBtn) {
      copyBtn.addEventListener('click', async () => {
        const textarea = dialog.querySelector('textarea');
        const statusEl = dialog.querySelector('.status');
        if (!textarea) return;

        try {
          await navigator.clipboard.writeText(textarea.value);
          if (statusEl) {
            statusEl.textContent = '✓ 已成功複製內容！您可直接開啟 LINE 貼上並傳送給闆娘。';
            statusEl.style.color = '#183326';
          }
        } catch (err) {
          textarea.select();
          if (statusEl) {
            statusEl.textContent = '請按鍵盤 Ctrl + C（或長按文字）完成複製。';
            statusEl.style.color = '#c59f60';
          }
        }
      });
    }
  }

  // 4. 建築感景深視差捲動與漸進浮現系統 (Architectural Parallax & Scroll Reveal)
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReducedMotion) {
    // 4a. 綁定漸進浮現元素 (Scroll Reveal)
    const revealGroups = [
      '.section-header-stack, .entrances-header, .cases-header, .faq-intro-col, .intro-headline',
      '.entrance-row-item',
      '.method-step',
      '.clean-product-card, .product-item-clean',
      '.case-quote-block',
      '.visit-point-item',
      '.faq-row',
      '.guide-card, .checklist-card, .journal-small-item, .article-paragraph'
    ];

    const revealElements = document.querySelectorAll(revealGroups.join(', '));
    revealElements.forEach((el) => {
      el.classList.add('reveal-item');
      // 同層級元素自動設定交錯延遲 (Staggered Delay)
      const parent = el.parentElement;
      if (parent) {
        const siblings = Array.from(parent.children).filter(c => c.classList.contains('reveal-item'));
        const idx = siblings.indexOf(el);
        if (idx > 0) {
          el.style.setProperty('--reveal-delay', `${Math.min(idx * 90, 270)}ms`);
        }
      }
    });

    if ('IntersectionObserver' in window) {
      const revealObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

      revealElements.forEach(el => revealObserver.observe(el));
    } else {
      revealElements.forEach(el => el.classList.add('is-visible'));
    }

    // 4b. 綁定雙欄高低差錯位視差目標 (Asymmetric Column Counter-Parallax)
    const colPairs = [
      ['.method-figure', -22],
      ['.method-copy', 18],
      ['.visit-details', -18],
      ['.visit-visual', 24],
      ['.cases-columns > .case-quote-block:nth-child(1)', -14],
      ['.cases-columns > .case-quote-block:nth-child(2)', 22],
      ['.products-cards > .clean-product-card:nth-child(2)', 24],
      ['.editorial-photo', -20],
      ['.editorial-text', 16],
      ['.product-hero-pic', -18],
      ['.product-hero-details', 16]
    ];

    const activeCols = [];
    colPairs.forEach(([selector, speed]) => {
      document.querySelectorAll(selector).forEach(el => {
        el.classList.add('parallax-col');
        activeCols.push({ el, speed });
      });
    });

    const heroSection = document.querySelector('.hero-clean');
    const heroImg = document.querySelector('.hero-image-wrap img');
    const heroText = document.querySelector('.hero-text');
    const parallaxImgs = Array.from(document.querySelectorAll('[data-parallax-img]'));

    let ticking = false;
    const updateParallax = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight || 800;
      const viewCenter = vh * 0.5;
      const isDesktop = window.innerWidth > 900;

      // 首屏全版大圖雙層景深視差
      if (heroSection && scrollY < vh * 1.4) {
        if (heroImg) {
          heroImg.style.setProperty('--hero-bg-y', `${(scrollY * 0.28).toFixed(1)}px`);
        }
        if (heroText && isDesktop) {
          heroText.style.setProperty('--hero-text-y', `${(scrollY * -0.14).toFixed(1)}px`);
        } else if (heroText) {
          heroText.style.setProperty('--hero-text-y', '0px');
        }
      }

      // 全站圖片視窗景深漫遊視差
      parallaxImgs.forEach(img => {
        const container = img.closest('.parallax-window') || img;
        const rect = container.getBoundingClientRect();
        if (rect.bottom < -100 || rect.top > vh + 100) return;
        const elemCenter = rect.top + rect.height * 0.5;
        const normalized = Math.max(-1, Math.min(1, (viewCenter - elemCenter) / (vh * 0.7)));
        const offset = (normalized * 30).toFixed(1);
        img.style.setProperty('--parallax-y', `${offset}px`);
      });

      // 桌面版雙欄高低差錯位視差
      if (isDesktop) {
        activeCols.forEach(({ el, speed }) => {
          const rect = el.getBoundingClientRect();
          if (rect.bottom < -120 || rect.top > vh + 120) return;
          const elemCenter = rect.top + rect.height * 0.5;
          const normalized = Math.max(-1, Math.min(1, (viewCenter - elemCenter) / (vh * 0.75)));
          const colOffset = (normalized * speed).toFixed(1);
          el.style.setProperty('--col-parallax-y', `${colOffset}px`);
        });
      }

      ticking = false;
    };

    const onScrollOrResize = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize, { passive: true });
    updateParallax();
  }
});
