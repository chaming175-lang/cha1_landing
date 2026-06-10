document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. 헤더 스크롤 이벤트
  // ==========================================
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // ==========================================
  // 2. 모바일 메뉴 토글
  // ==========================================
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // 메뉴 링크 클릭 시 모바일 메뉴 닫기
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  // ==========================================
  // 3. 부드러운 스크롤 & 해시 링크 오프셋
  // ==========================================
  const headerHeight = document.querySelector('.header').offsetHeight;

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      e.preventDefault();
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const offsetPosition = targetElement.offsetTop - headerHeight;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ==========================================
  // 4. 스크롤에 따른 네비게이션 활성화 (Intersection Observer)
  // ==========================================
  const sections = document.querySelectorAll('section[id]');
  
  const observerOptions = {
    root: null,
    rootMargin: `-${headerHeight + 20}px 0px -40% 0px`,
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));

  // ==========================================
  // 5. FAQ 아코디언 기능
  // ==========================================
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const headerBtn = item.querySelector('.faq-header');
    const body = item.querySelector('.faq-body');

    headerBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // 이미 열려있는 모든 FAQ 닫기
      faqItems.forEach(innerItem => {
        innerItem.classList.remove('active');
        innerItem.querySelector('.faq-body').style.maxHeight = null;
      });

      // 클릭한 FAQ 토글
      if (!isActive) {
        item.classList.add('active');
        body.style.maxHeight = body.scrollHeight + 'px';
      } else {
        item.classList.remove('active');
        body.style.maxHeight = null;
      }
    });
  });

  // Window 리사이즈 시 열려있는 아코디언 높이 재계산
  window.addEventListener('resize', () => {
    faqItems.forEach(item => {
      if (item.classList.contains('active')) {
        const body = item.querySelector('.faq-body');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });

  // ==========================================
  // 6. 후기(Testimonial) 탭 전환 및 필터링 기능
  // ==========================================
  const tabButtons = document.querySelectorAll('.review-tab-btn');
  const reviewCards = document.querySelectorAll('.review-card');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // 액티브 클래스 이동
      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filter = button.getAttribute('data-filter');

      reviewCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.opacity = '1';
          }, 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ==========================================
  // 7. 스크롤 페이드인(Fade-in) 애니메이션
  // ==========================================
  const fadeSections = document.querySelectorAll('.fade-in-section');
  
  const fadeObserverOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const fadeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, fadeObserverOptions);

  fadeSections.forEach(section => {
    fadeObserver.observe(section);
  });

  // ==========================================
  // 8. 히어로 섹션 카피 타이핑 애니메이션
  // ==========================================
  const typingTextContainer = document.getElementById('typing-text');
  const fullText = "스마트폰부터 AI까지, 중장년 눈높이에 맞춰 쉽게 알려드립니다";
  let charIndex = 0;
  const typingSpeed = 100; // 타이핑 속도 (ms 단위)

  function typeText() {
    if (charIndex < fullText.length) {
      typingTextContainer.textContent += fullText.charAt(charIndex);
      charIndex++;
      setTimeout(typeText, typingSpeed);
    } else {
      // 타이핑이 모두 완료된 후 5초 뒤에 커서를 투명하게 만들어 깜빡임을 멈춥니다.
      setTimeout(() => {
        const cursor = document.querySelector('.typing-cursor');
        if (cursor) {
          cursor.style.display = 'none';
        }
      }, 5000);
    }
  }

  // 랜딩페이지 로드 직후 바로 작동
  if (typingTextContainer) {
    typeText();
  }
});
