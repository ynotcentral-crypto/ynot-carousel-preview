const variants = window.YNOT_SLIDES;

let activeVariant = 'user';
let activeSlide = 0;

const mainSlide = document.getElementById('mainSlide');
const counter = document.getElementById('counter');
const captionText = document.getElementById('captionText');
const dots = document.getElementById('dots');
const likes = document.getElementById('likes');

function render() {
  const variant = variants[activeVariant];
  const [src] = variant.slides[activeSlide];
  mainSlide.src = src;
  mainSlide.alt = `YNOT Shell carousel slide ${activeSlide + 1}`;
  counter.textContent = `${activeSlide + 1}/${variant.slides.length}`;
  captionText.textContent = variant.caption;
  likes.textContent = variant.likes;

  dots.innerHTML = '';
  variant.slides.forEach(([, tag], index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = index === activeSlide ? 'is-active' : '';
    dot.setAttribute('aria-label', `Go to slide ${index + 1}${tag ? `, ${tag}` : ''}`);
    dot.addEventListener('click', () => {
      activeSlide = index;
      render();
    });
    dots.appendChild(dot);
  });
}

document.querySelectorAll('.variant').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.variant').forEach((tab) => tab.classList.remove('is-active'));
    button.classList.add('is-active');
    activeVariant = button.dataset.variant;
    activeSlide = 0;
    render();
  });
});

document.querySelector('.nav--prev').addEventListener('click', () => {
  const slides = variants[activeVariant].slides;
  activeSlide = (activeSlide - 1 + slides.length) % slides.length;
  render();
});

document.querySelector('.nav--next').addEventListener('click', () => {
  const slides = variants[activeVariant].slides;
  activeSlide = (activeSlide + 1) % slides.length;
  render();
});

render();
