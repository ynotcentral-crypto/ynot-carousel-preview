const variants = {
  user: {
    caption: 'A raw pass through the current YNOT Shell material: product, detail, motion, package and process cues. #industrialdesign #iphonecase',
    likes: '12,804 others',
    slides: [
      ['./assets/user/01.jpg', ''],
      ['./assets/user/02.jpg', ''],
      ['./assets/user/03.jpg', 'video'],
      ['./assets/user/04.jpg', ''],
      ['./assets/user/05.jpg', ''],
      ['./assets/user/06.jpg', ''],
      ['./assets/user/07.jpg', ''],
    ],
  },
  codex: {
    caption: 'YNOT Shell turns an iPhone case into a machined design object: stainless steel, exposed structure and a silhouette built for material-obsessed people. #productdesign #everydaycarry',
    likes: '18,421 others',
    slides: [
      ['./assets/codex/01.jpg', ''],
      ['./assets/codex/02.jpg', ''],
      ['./assets/codex/03.jpg', ''],
      ['./assets/codex/04.jpg', ''],
      ['./assets/codex/05.jpg', ''],
      ['./assets/codex/06.jpg', ''],
      ['./assets/codex/07.jpg', ''],
      ['./assets/codex/08.jpg', 'video'],
    ],
  },
  claude: {
    caption: 'A tighter editorial look at YNOT Shell: less accessory, more sculptural protective object for the iPhone. #designobject #stainlesssteel',
    likes: '16,093 others',
    slides: [
      ['./assets/claude/01.jpg', ''],
      ['./assets/claude/02.jpg', ''],
      ['./assets/claude/03.jpg', ''],
      ['./assets/claude/04.jpg', ''],
      ['./assets/claude/05.jpg', ''],
      ['./assets/claude/06.jpg', ''],
      ['./assets/claude/07.jpg', ''],
    ],
  },
};

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
