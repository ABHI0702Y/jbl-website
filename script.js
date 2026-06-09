// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// Countdown Timer — target: 41d 14h 24m 57s from page load
const target = new Date();
target.setDate(target.getDate() + 41);
target.setHours(target.getHours() + 14);
target.setMinutes(target.getMinutes() + 24);
target.setSeconds(target.getSeconds() + 57);

const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');

function pad(n) { return String(n).padStart(2, '0'); }

function tick() {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) {
    [daysEl, hoursEl, minutesEl, secondsEl].forEach(el => { if (el) el.textContent = '00'; });
    return;
  }
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  if (daysEl) daysEl.textContent = pad(d);
  if (hoursEl) hoursEl.textContent = pad(h);
  if (minutesEl) minutesEl.textContent = pad(m);
  if (secondsEl) secondsEl.textContent = pad(s);
}

tick();
setInterval(tick, 1000);

// Review dots (visual only)
document.querySelectorAll('.dot').forEach((dot, i, dots) => {
  dot.addEventListener('click', () => {
    dots.forEach(d => d.classList.remove('active'));
    dot.classList.add('active');
  });
});

// ===== NAVBAR ICONS =====

let cartData = [
  { id: 1, name: 'JBL Club Pro+ TWS', variant: 'Black', price: 9999, qty: 1,
    img: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=80&q=80' },
  { id: 2, name: 'JBL Tune 770NC', variant: 'Midnight Blue', price: 5999, qty: 1,
    img: 'https://images.unsplash.com/photo-1613212609413-f7e1d70ac46c?auto=format&fit=crop&w=80&q=80' },
  { id: 3, name: 'JBL Flip 6', variant: 'Squad / Red', price: 11999, qty: 1,
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=80&q=80' },
];

function renderCart() {
  const container = document.getElementById('cartItems');
  if (!container) return;

  if (cartData.length === 0) {
    container.innerHTML = '<div class="wishlist-empty"><p style="color:rgba(255,255,255,.35)">Your cart is empty</p><a href="product.html" class="btn btn-primary" style="font-size:.8rem;padding:10px 24px;margin-top:8px">SHOP NOW</a></div>';
  } else {
    container.innerHTML = cartData.map(item => `
      <div class="cart-item" data-id="${item.id}">
        <img src="${item.img}" alt="${item.name}" />
        <div class="ci-info">
          <p class="ci-name">${item.name}</p>
          <p class="ci-variant">${item.variant}</p>
          <p class="ci-price">&#8377; ${item.price.toLocaleString('en-IN')}</p>
          <div class="ci-qty">
            <button class="ci-qty-btn" onclick="changeQty(${item.id},-1)">&#8722;</button>
            <span class="ci-qty-num">${item.qty}</span>
            <button class="ci-qty-btn" onclick="changeQty(${item.id},1)">+</button>
          </div>
        </div>
        <button class="ci-remove" onclick="removeCartItem(${item.id})" title="Remove">&#10005;</button>
      </div>
    `).join('');
  }

  const total = cartData.reduce((s, i) => s + i.price * i.qty, 0);
  const el = document.getElementById('cartTotal');
  if (el) el.textContent = '₹ ' + total.toLocaleString('en-IN');

  const count = cartData.reduce((s, i) => s + i.qty, 0);
  document.querySelectorAll('.cart-count').forEach(e => e.textContent = count);
  const pc = document.querySelector('.cart-panel-count');
  if (pc) pc.textContent = '(' + count + ')';
}

function changeQty(id, delta) {
  const item = cartData.find(i => i.id === id);
  if (item) { item.qty = Math.max(1, item.qty + delta); renderCart(); }
}

function removeCartItem(id) {
  cartData = cartData.filter(i => i.id !== id);
  renderCart();
}

function openPanel(id) {
  document.getElementById(id)?.classList.add('active');
  document.getElementById('panelOverlay')?.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closePanel(id) {
  document.getElementById(id)?.classList.remove('active');
  if (!document.querySelector('.side-panel.active')) {
    document.getElementById('panelOverlay')?.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Search overlay
const searchOverlay = document.getElementById('searchOverlay');
const searchInput   = document.getElementById('searchInput');

document.getElementById('btn-search')?.addEventListener('click', () => {
  searchOverlay?.classList.add('active');
  document.body.style.overflow = 'hidden';
  setTimeout(() => searchInput?.focus(), 80);
});
document.getElementById('searchClose')?.addEventListener('click', () => {
  searchOverlay?.classList.remove('active');
  document.body.style.overflow = '';
});
document.getElementById('searchSubmit')?.addEventListener('click', () => {
  if (searchInput?.value.trim()) window.location.href = 'product.html';
});
searchInput?.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    if (searchInput.value.trim()) window.location.href = 'product.html';
    else { searchOverlay?.classList.remove('active'); document.body.style.overflow = ''; }
  }
  if (e.key === 'Escape') { searchOverlay?.classList.remove('active'); document.body.style.overflow = ''; }
});

// Account dropdown
const accountBtn      = document.getElementById('btn-account');
const accountDropdown = document.getElementById('accountDropdown');

accountBtn?.addEventListener('click', e => {
  e.stopPropagation();
  const open = accountDropdown?.classList.toggle('active');
  if (open) {
    const r = accountBtn.getBoundingClientRect();
    accountDropdown.style.top  = (r.bottom + 8) + 'px';
    accountDropdown.style.left = Math.max(4, r.right - 210) + 'px';
  }
});
document.addEventListener('click', () => accountDropdown?.classList.remove('active'));
accountDropdown?.addEventListener('click', e => e.stopPropagation());

document.getElementById('acctWishlistLink')?.addEventListener('click', e => {
  e.preventDefault();
  accountDropdown?.classList.remove('active');
  openPanel('wishlistPanel');
});
document.getElementById('acctLoginLink')?.addEventListener('click', e => {
  accountDropdown?.classList.remove('active');
});

// Wishlist button
document.getElementById('btn-wishlist')?.addEventListener('click', () => openPanel('wishlistPanel'));

// Cart button
document.getElementById('btn-cart')?.addEventListener('click', () => {
  renderCart();
  openPanel('cartPanel');
});

// Backdrop closes panels
document.getElementById('panelOverlay')?.addEventListener('click', () => {
  document.querySelectorAll('.side-panel.active').forEach(p => p.classList.remove('active'));
  document.getElementById('panelOverlay')?.classList.remove('active');
  document.body.style.overflow = '';
});

renderCart();
