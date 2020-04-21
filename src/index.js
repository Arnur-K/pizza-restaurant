(() => {
  const removeActiveClass = (targets) => {
    Object.values(targets).forEach((target) => {
      target.classList.remove('active');
    });
  };

  const observeAllSections = () => {
    const allMainSections = document.querySelectorAll('section');
    const allNavLinks = document.querySelectorAll('.header__nav-link');
    const allMobileNavLinks = document.querySelectorAll(
      '.header__nav-link-mobile',
    );
    const sectionOptions = {
      rootMargin: '0% 0% -35% 0%',
    };

    allMainSections.forEach((section) => {
      const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            switch (entry.target.id) {
              case 'home':
                removeActiveClass(allNavLinks);
                removeActiveClass(allMobileNavLinks);
                allNavLinks[0].classList.add('active');
                allMobileNavLinks[0].classList.add('active');
                break;
              case 'about':
                removeActiveClass(allNavLinks);
                removeActiveClass(allMobileNavLinks);
                allNavLinks[1].classList.add('active');
                allMobileNavLinks[1].classList.add('active');
                break;
              case 'services':
                removeActiveClass(allNavLinks);
                removeActiveClass(allMobileNavLinks);
                allNavLinks[2].classList.add('active');
                allMobileNavLinks[2].classList.add('active');
                break;
              case 'menu':
                removeActiveClass(allNavLinks);
                removeActiveClass(allMobileNavLinks);
                allNavLinks[3].classList.add('active');
                allMobileNavLinks[3].classList.add('active');
                break;
              case 'blog':
                removeActiveClass(allNavLinks);
                removeActiveClass(allMobileNavLinks);
                allNavLinks[4].classList.add('active');
                allMobileNavLinks[4].classList.add('active');
                break;
              case 'contact':
                removeActiveClass(allNavLinks);
                removeActiveClass(allMobileNavLinks);
                allNavLinks[5].classList.add('active');
                allMobileNavLinks[5].classList.add('active');
                break;
              default:
                throw new Error('Should not get there');
            }
          }
        });
      }, sectionOptions);
      sectionObserver.observe(section);
    });
  };

  const hamburgerBtnClickHandler = (navMobile) => {
    const btn = document.querySelector('.hamburger');

    btn.onclick = () => {
      btn.classList.toggle('is-active');
      navMobile.classList.toggle('header__nav-mobile--show');
    };
  };

  const onElementsFocusHandler = (allMenuButtons) => {
    allMenuButtons.forEach((menuBtn) => {
      menuBtn.onfocus = () => {
        menuBtn.parentNode.parentNode.childNodes.forEach((child) => {
          child.classList !== undefined && child.classList.add('show');
        });
      };
    });
  };

  const onElementsBluerHandler = (allMenuButtons) => {
    allMenuButtons.forEach((menuBtn) => {
      menuBtn.onblur = () => {
        menuBtn.parentNode.parentNode.childNodes.forEach((child) => {
          child.classList !== undefined && child.classList.remove('show');
        });
      };
    });
  };

  const setAOSAttributes = () => {
    const allMenuGalItems = document.querySelectorAll('.menu__gal-item');
    const allMenuPricingItems = document.querySelectorAll(
      '.menu__pricing-item',
    );
    const AOSAttributes = {
      'data-aos': 'fadeIn',
      'data-aos-easing': 'ease-in-out',
      'data-aos-delay': 0,
    };
    const milliseconds = 50;

    allMenuGalItems.forEach((menuGalItem) => {
      AOSAttributes['data-aos-delay'] += milliseconds;
      for (let key in AOSAttributes) {
        menuGalItem.setAttribute(key, AOSAttributes[key]);
      }
    });

    allMenuPricingItems.forEach((menuPricingItem) => {
      AOSAttributes['data-aos-delay'] += milliseconds;
      for (let key in AOSAttributes) {
        menuPricingItem.setAttribute(key, AOSAttributes[key]);
      }
    });
  };

  const initSwiper = () => {
    const homeSwiper = new Swiper('.swiper-container', {
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      loop: true,
      speed: 1500,
      effect: 'fade',
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
  };

  const obeserveHomeSection = (navMobile) => {
    const sectionHome = document.querySelector('.home');
    const header = document.querySelector('.header');
    const sectionHomeOptions = {
      rootMargin: '-90% 0% 0% 0%',
    };
    const sectionHomeObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          header.classList.add('header--scrolled');
        } else {
          header.classList.remove('header--scrolled');
        }
      });
    }, sectionHomeOptions);
    sectionHomeObserver.observe(sectionHome);
  };

  const openFoodMenu = (event, foodName, allMenuSecnBtns) => {
    const allFoodMenu = document.querySelectorAll('.menu__secn-items');

    allFoodMenu.forEach((foodName) => {
      foodName.style.display = 'none';
    });

    allMenuSecnBtns.forEach((btn) => {
      btn.classList.replace('btn--secondary__active', 'btn--secondary');
    });

    document.getElementById(foodName).style.display = 'block';
    event.currentTarget.classList.add('btn--secondary__active');
  };

  const menuSecnAddClickListeners = () => {
    const allMenuSecnBtns = document.querySelectorAll('.menu__secn-btn');
    allMenuSecnBtns.forEach((btn) => {
      btn.addEventListener('click', (event) =>
        openFoodMenu(event, event.target.innerText, allMenuSecnBtns),
      );
    });
  };

  const initCounters = () => {
    const allCounters = document.querySelectorAll('.counters__number');
    const speed = 50;

    allCounters.forEach((counter) => {
      const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const inc = target / speed;

        if (count < target) {
          counter.innerText = Math.floor(count + inc);
          setTimeout(updateCount, 20);
        } else {
          counter.innerText = target;
        }
      };

      updateCount();
    });
  };

  const sectionCountersObserverFunc = () => {
    const sectionCounters = document.querySelector('.counters');
    const sectionCountersOptions = {
      rootMargin: '0px 0px -170px 0px',
    };

    const sectionCountersObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          initCounters();
          sectionCountersObserver.unobserve(sectionCounters);
        }
      });
    }, sectionCountersOptions);
    sectionCountersObserver.observe(sectionCounters);
  };

  window.onload = () => {
    document.querySelector('.spinner').style.display = 'none';
    document.getElementById('root').style.display = 'block';

    const allMenuButtons = document.querySelectorAll('.menu__btn');
    const navMobile = document.querySelector('.header__nav-mobile');

    observeAllSections();
    hamburgerBtnClickHandler(navMobile);
    onElementsFocusHandler(allMenuButtons);
    onElementsBluerHandler(allMenuButtons);
    setAOSAttributes();
    initSwiper();
    obeserveHomeSection(navMobile);
    AOS.init();
    menuSecnAddClickListeners();
    sectionCountersObserverFunc();
  };
})();
