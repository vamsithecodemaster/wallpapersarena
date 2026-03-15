

// Initial Wallpaper Data
const wallpapers = [
  {
    id: 'wp-01',
    title: 'Void Architecture',
    res: '2048x2048',
    src: '/wallpapers/bw_architecture.png',
    type: 'tall'
  },
  {
    id: 'wp-02',
    title: 'Monochromia',
    res: '2048x2048',
    src: '/wallpapers/bw_geometry.png',
    type: 'normal'
  },
  {
    id: 'wp-03',
    title: 'Silent Peaks',
    res: '2048x2048',
    src: '/wallpapers/bw_nature.png',
    type: 'wide'
  },
  {
    id: 'wp-04',
    title: 'Dark Geometry',
    res: '2048x2048',
    src: '/wallpapers/bw_cyber.png',
    type: 'tall'
  }
];

document.addEventListener('DOMContentLoaded', () => {
  // Update stats
  document.getElementById('image-count').textContent = wallpapers.length.toString().padStart(2, '0');

  // Render Grid
  const grid = document.getElementById('wallpaper-grid');
  
  wallpapers.forEach((wp) => {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = `wallpaper-card ${wp.type || ''}`;
    card.dataset.id = wp.id;
    card.setAttribute('aria-label', `Open wallpaper: ${wp.title} (${wp.res})`);
    
    card.innerHTML = `
      <div class="img-wrapper">
        <img src="${wp.src}" alt="${wp.title}" loading="lazy">
      </div>
      <div class="card-overlay">
        <div>
          <div class="card-title">${wp.title}</div>
          <div class="card-meta mono-text">${wp.res}</div>
        </div>
        <i data-lucide="maximize-2"></i>
      </div>
    `;
    
    grid.appendChild(card);
    
    // Add click event for lightbox
    card.addEventListener('click', () => openLightbox(wp));
  });

  // Lightbox elements
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxRes = document.getElementById('lightbox-res');
  const lightboxDownload = document.getElementById('lightbox-download');
  const closeBtn = document.getElementById('lightbox-close');

  function openLightbox(wp) {
    lightboxTitle.textContent = wp.title;
    lightboxRes.textContent = wp.res;
    lightboxDownload.href = wp.src; // In a real app, might need to trigger actual download
    
    // Reset image
    lightboxImg.classList.remove('loaded');
    lightboxImg.src = '';
    
    // Show modal
    lightbox.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
    
    // Load image
    const img = new Image();
    img.onload = () => {
      lightboxImg.src = wp.src;
      lightboxImg.classList.add('loaded');
    };
    img.src = wp.src;
  }

  function closeLightbox() {
    lightbox.classList.add('hidden');
    document.body.style.overflow = '';
    // Optional: delay clear src to wait for transition
    setTimeout(() => {
      lightboxImg.src = '';
    }, 300);
  }

  closeBtn.addEventListener('click', closeLightbox);
  
  // Close on background click
  lightbox.addEventListener('click', (e) => {
    if (e.target.classList.contains('lightbox-overlay') || e.target.classList.contains('lightbox-image-container')) {
      closeLightbox();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !lightbox.classList.contains('hidden')) {
      closeLightbox();
    }
  });

  // Initialize Lucide icons
  if (window.lucide) {
    window.lucide.createIcons();
  }
});
