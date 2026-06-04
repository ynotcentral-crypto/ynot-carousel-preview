const variants = {
  user: {
    label: 'Твой порядок',
    caption: 'YNOT Shell in the original folder order: product, detail, video moment, packaging/process and final material shots.',
    slides: [
      ['../figma-export-small/user/01.jpg', ''],
      ['../figma-export-small/user/02.jpg', ''],
      ['../figma-export-small/user/03.jpg', 'video'],
      ['../figma-export-small/user/04.jpg', ''],
      ['../figma-export-small/user/05.jpg', ''],
      ['../figma-export-small/user/06.jpg', ''],
      ['../figma-export-small/user/07.jpg', ''],
    ],
  },
  codex: {
    label: 'Codex cut',
    caption: 'YNOT Shell turns an iPhone case into a machined design object: stainless steel, exposed structure, and a look that feels closer to industrial design than accessory.',
    slides: [
      ['../figma-export-small/codex/01.jpg', ''],
      ['../figma-export-small/codex/02.jpg', ''],
      ['../figma-export-small/codex/03.jpg', ''],
      ['../figma-export-small/codex/04.jpg', ''],
      ['../figma-export-small/codex/05.jpg', ''],
      ['../figma-export-small/codex/06.jpg', ''],
      ['../figma-export-small/codex/07.jpg', ''],
      ['../figma-export-small/codex/08.jpg', 'video'],
    ],
  },
  claude: {
    label: 'Claude cut',
    caption: 'A tighter editorial sequence for cold audiences: fewer production cues, more premium object language and material close-ups.',
    slides: [
      ['../figma-export-small/claude/01.jpg', ''],
      ['../figma-export-small/claude/02.jpg', ''],
      ['../figma-export-small/claude/03.jpg', ''],
      ['../figma-export-small/claude/04.jpg', ''],
      ['../figma-export-small/claude/05.jpg', ''],
      ['../figma-export-small/claude/06.jpg', ''],
      ['../figma-export-small/claude/07.jpg', ''],
    ],
  },
};

let activeVariant = 'user';
let activeSlide = 0;

const mainSlide = document.getElementById('mainSlide');
const counter = document.getElementById('counter');
const captionText = document.getElementById('captionText');
const thumbs = document.getElementById('thumbs');

function render() {
  const variant = variants[activeVariant];
  const [src] = variant.slides[activeSlide];
  mainSlide.src = src;
  mainSlide.alt = `${variant.label}, кадр ${activeSlide + 1}`;
  counter.textContent = `${activeSlide + 1} / ${variant.slides.length}`;
  captionText.textContent = variant.caption;

  thumbs.innerHTML = '';
  variant.slides.forEach(([thumbSrc, tag], index) => {
    const button = document.createElement('button');
    button.className = `thumb${index === activeSlide ? ' is-active' : ''}`;
    button.type = 'button';
    button.setAttribute('aria-label', `Открыть кадр ${index + 1}`);
    button.addEventListener('click', () => {
      activeSlide = index;
      render();
    });

    const img = document.createElement('img');
    img.src = thumbSrc;
    img.alt = '';
    button.appendChild(img);

    if (tag) {
      const span = document.createElement('span');
      span.textContent = tag;
      button.appendChild(span);
    }

    thumbs.appendChild(button);
  });
}

document.querySelectorAll('.tab').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach((tab) => tab.classList.remove('is-active'));
    button.classList.add('is-active');
    activeVariant = button.dataset.variant;
    activeSlide = 0;
    render();
  });
});

document.querySelector('.arrow--left').addEventListener('click', () => {
  const slides = variants[activeVariant].slides;
  activeSlide = (activeSlide - 1 + slides.length) % slides.length;
  render();
});

document.querySelector('.arrow--right').addEventListener('click', () => {
  const slides = variants[activeVariant].slides;
  activeSlide = (activeSlide + 1) % slides.length;
  render();
});

render();
