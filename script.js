// ======== outline debug ========
document.body.addEventListener('keyup', e => {
  if (e.key === 'a') {
    document.body.classList.toggle('debug');
  }
});

// ======== hover debug ========
window.addEventListener('mousemove', e => {
  // console.log(e.target);
});

// ======== active dropdown ========
let dropdownOpen = false;
const dropdown = document.querySelector('.navbar__dropdown');
const dropdownHeader = dropdown.querySelector('.navbar__dropdown-header');
const dropdownElements = ['navbar__dropdown-menu', 'navbar__dropdown-item', 'navbar__dropdown-link', 'navbar__link-wrapper'];

// fungsi eventHandler saat meng-klik dan meng-hover
function dropdownOnClickAndOnHoverEventHandler() {
  if (dropdownOpen === false) {
    dropdown.classList.add('open');
    dropdownOpen = true;
  } else {
    dropdown.classList.remove('open');
    dropdownOpen = false;
  }
}

// fungsi eventHandler ketika tidak menghover elemen dropdown
function dropdownMouseLeaveEventHandler(e) {
  if (!dropdownElements.includes(e.target.classList.value)) {
    dropdownOpen = false;
    dropdown.classList.remove('open');
    window.removeEventListener('mousemove', dropdownMouseLeaveEventHandler);
  }
}

// dropdownHeader saat diklik
dropdownHeader.addEventListener('click', function () {
  dropdownOnClickAndOnHoverEventHandler();
});

// dropdownHeader saat dihover
dropdownHeader.addEventListener('mouseenter', function () {
  dropdownOnClickAndOnHoverEventHandler();
});

// dropdownHeader saat tidak dihover
dropdownHeader.addEventListener('mouseleave', () => {
  if (dropdownOpen) {
    window.addEventListener('mousemove', dropdownMouseLeaveEventHandler);
  }
});

// navbar toggle
const navbar = document.querySelector('.navbar');
const navbarToggle = document.querySelector('.navbar__toggle');
navbarToggle.addEventListener('click', () => {
  navbar.classList.toggle('active');
});

// ======== partners scroller ========
const scroller = document.querySelector('.scroller');
const scrollerInner = scroller.querySelector('.scroller__inner');

if (window.innerWidth < 992) {
  scroller.setAttribute('data-animated', true);

  const scrollerContent = Array.from(scrollerInner.children);
  scrollerContent.forEach(item => {
    const duplicatedItem = item.cloneNode(true);
    scrollerInner.appendChild(duplicatedItem);
  });
}

// ======== body padding ========

// document.body.style.paddingTop = navbar.clientHeight + 'px';
// console.log(navbar.clientHeight);

// ======== desktop testimonial control ========
const nextButton = document.querySelector('button.next');
const previousButton = document.querySelector('button.previous');
const sectionTestimonial = document.querySelector('section.section--testimonial');
const testimonialWrapper = document.querySelector('.testimonial__wrapper');
const testimonialWrapperInner = document.querySelector('.testimonial__wrapper-inner');

nextButton.addEventListener('click', () => {
  resetButtonClass();
  sectionTestimonial.classList.add('next');
  testimonialWrapper.scrollLeft = 10000;
});

previousButton.addEventListener('click', () => {
  resetButtonClass();
  sectionTestimonial.classList.add('previous');

  testimonialWrapper.scrollLeft = 0;
});

function resetButtonClass() {
  setTimeout(() => {
    sectionTestimonial.classList.remove('next');
    sectionTestimonial.classList.remove('previous');
  }, 1000);

  sectionTestimonial.classList.remove('next');
  sectionTestimonial.classList.remove('previous');
}

// ======== mobile testimonial control ========
const arrowsControl = Array.from(document.querySelectorAll('.card .card__control'));
arrowsControl.forEach(arrow => {
  arrow.addEventListener('click', e => {
    if (e.target.classList.contains('left')) {
      if (!e.target.classList.contains('ignore')) {
        console.dir(e.target.parentNode.parentNode.offsetWidth);
        testimonialWrapper.scrollLeft -= e.target.parentNode.parentNode.offsetWidth;
      }
    } else if (e.target.classList.contains('right')) {
      if (!e.target.classList.contains('ignore')) {
        console.dir(e.target.parentNode.parentNode.offsetWidth);
        testimonialWrapper.scrollLeft += e.target.parentNode.parentNode.offsetWidth;
      }
    }
  });
});
