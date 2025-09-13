/* Configuration: ganti nomor WA di sini (tanpa leading 0)
   Contoh: 081234567890 -> '81234567890' */
const waToko = '6281389709411';

/* ========== DATA PRODUK ==========
 * Ganti properti `img` menjadi path ke gambarmu:
 * - lokal: "images/produk1.jpg"
 * - atau URL: "https://example.com/produk1.jpg"
 * Tambahkan/ubah produk sebanyak yang mau.
 */
const produkBuket = [
  { id:'bkt1', name:'Buket Mawar Pink', price:'Rp300.000', img:'images/bkt1.jpg', rating:5, desc:'Mawar pink manis, 12 batang.' },
  { id:'bkt2', name:'Buket Campuran Elegan', price:'Rp350.000', img:'images/bkt2.jpg', rating:4, desc:'Mix seasonal flowers.' },
  { id:'bkt3', name:'Buket Premium', price:'Rp450.000', img:'images/bkt3.jpg', rating:5, desc:'Bunga premium dengan kemasan elegan.' },
  { id:'bkt4', name:'Buket Tulip Romantis', price:'Rp380.000', img:'images/bkt4.jpg', rating:4, desc:'Tulip warna lembut, 15 batang.' },
  { id:'bkt5', name:'Buket Anniversary', price:'Rp520.000', img:'images/bkt5.jpg', rating:5, desc:'Special design untuk anniversary.' }
];

const produkStanding = [
  { id:'std1', name:'Standing Elegan L', price:'Rp850.000', img:'images/std1.jpg', rating:5, desc:'Standing besar untuk acara resmi.' },
  { id:'std2', name:'Standing Medium', price:'Rp650.000', img:'images/std2.jpg', rating:4, desc:'Pilihan standing seremonial.' }
];

const produkPapan = [
  { id:'ppn1', name:'Papan Turut berduka cita', price:'Rp500.000', img:'images/ppntbc-dc1.jpg', rating:4, desc:'Papan lebar, custom teks.' },
  { id:'ppn2', name:'Papan Pernikahan', price:'Rp500.000', img:'images/ppntbc-dc2.jpg', rating:5, desc:'Desain elegan untuk pernikahan.' }
];

const semuaProduk = [...produkBuket, ...produkStanding, ...produkPapan];

/* ========== UTIL & RENDERING ========= */
const grid = document.getElementById('grid');
const tabs = document.querySelectorAll('.tab');
const orderSelect = document.getElementById('order-product');
const previewImg = document.getElementById('preview-img');
const previewName = document.getElementById('preview-name');
const previewPrice = document.getElementById('preview-price');
const previewDesc = document.getElementById('preview-desc');
const previewRating = document.getElementById('preview-rating');
const addToForm = document.getElementById('addToForm');

function createCard(product){
  const el = document.createElement('article');
  el.className = 'card';
  el.dataset.id = product.id;
  el.dataset.category = getCategory(product.id);
  el.innerHTML = `
    <img src="${product.img}" alt="${product.name}">
    <div class="meta">
      <div>
        <h3>${product.name}</h3>
        <p class="muted">${product.desc || ''}</p>
      </div>
      <div class="bottom">
        <div class="price">${product.price}</div>
        <button class="btn secondary" data-id="${product.id}">Lihat</button>
      </div>
    </div>
  `;
  // clickable image and button
  el.querySelector('img').addEventListener('click', ()=> openModal(product));
  el.querySelector('button').addEventListener('click', ()=> openModal(product));
  return el;
}

function getCategory(id){
  if(id.startsWith('b')) return 'buket';
  if(id.startsWith('s')) return 'standing';
  if(id.startsWith('p')) return 'papan';
  return 'other';
}
function renderGrid(products){
  grid.innerHTML = '';
  products.forEach(p => {
    const el = document.createElement('article');
    el.className = 'card fade-in';
    el.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <div class="meta">
        <h3>${p.name}</h3>
        <p class="muted">${p.desc}</p>
        <div class="bottom">
          <div class="price">${p.price}</div>
          <button class="btn secondary">Lihat Detail</button>
        </div>
      </div>`;
    
    // ✅ Klik gambar buka modal
    el.querySelector('img').addEventListener('click', ()=> openModal(p));
    // ✅ Klik tombol "Lihat Detail" buka modal
    el.querySelector('button').addEventListener('click', ()=> openModal(p));
    
    grid.appendChild(el);
  });
  observeFadeIn();
}

// Tambahkan class fade-in ke produk saat dirender
function renderGridfade(products){
  grid.innerHTML = '';
  products.forEach(p => {
    const el = document.createElement('article');
    el.className = 'card fade-in';
    el.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <div class="meta">
        <h3>${p.name}</h3>
        <p class="muted">${p.desc}</p>
        <div class="bottom"><div class="price">${p.price}</div></div>
      </div>`;
    grid.appendChild(el);
  });
  observeFadeIn();
}

// Observer untuk animasi fade-in
function observeFadeIn(){
  const faders = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  faders.forEach(el => observer.observe(el));
}

// Jalankan pertama kali
observeFadeIn();

// Observer untuk animasi fade-up
function observeFadeUp(){
  const faders = document.querySelectorAll('.fade-up');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  faders.forEach(el => observer.observe(el));
}

// Jalankan observer
observeFadeUp();

/* initial render: semua produk */
renderGrid(semuaProduk);

/* filter tabs */
tabs.forEach(t => t.addEventListener('click', function(){
  tabs.forEach(b=>b.classList.remove('active'));
  this.classList.add('active');
  const filter = this.dataset.filter;
  if(filter === 'all') renderGrid(semuaProduk);
  else renderGrid(semuaProduk.filter(x => getCategory(x.id) === filter));
}));
/* ========== SEARCH FILTER ========== */
const searchInput = document.getElementById("searchInput");
if (searchInput) {
  searchInput.addEventListener("input", () => {
    const keyword = searchInput.value.toLowerCase();
    const hasil = semuaProduk.filter(p =>
      p.name.toLowerCase().includes(keyword) ||
      p.price.toLowerCase().includes(keyword)
    );
    renderGrid(hasil);
  });
}

/* Populate order select */
function populateSelect(){
  orderSelect.innerHTML = '<option value="">— Pilih produk —</option>';
  semuaProduk.forEach(p => {
    const opt = document.createElement('option');
    opt.value = p.id;
    opt.textContent = `${p.name} — ${p.price}`;
    orderSelect.appendChild(opt);
  });
}
populateSelect();

/* preview when select changes */
orderSelect.addEventListener('change', () => {
  const pid = orderSelect.value;
  const p = semuaProduk.find(x => x.id === pid);
  setPreview(p);
});

function setPreview(p){
  if(!p){
    previewImg.style.display = 'none';
    previewName.textContent = 'Pilih produk untuk melihat preview';
    previewPrice.textContent = '';
    previewDesc.textContent = '';
    previewRating.textContent = '';
    addToForm.disabled = true;
    return;
  }
  previewImg.src = p.img;
  previewImg.style.display = 'block';
  previewName.textContent = p.name;
  previewPrice.textContent = p.price;
  previewDesc.textContent = p.desc || '';
  previewRating.textContent = '★'.repeat(p.rating || 0);
  addToForm.disabled = false;
}

/* add preview product to form button */
addToForm.addEventListener('click', () => {
  // product already selected via select; nothing extra needed,
  // but we ensure UI focus to step 2:
  document.querySelector('[data-step="2"]').scrollIntoView({behavior:'smooth', block:'center'});
});

/* ========== MODAL (product detail) ========== */
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const modalName = document.getElementById('modal-name');
const modalDesc = document.getElementById('modal-desc');
const modalPrice = document.getElementById('modal-price');
const modalRating = document.getElementById('modal-rating');
const modalQty = document.getElementById('modal-qty');
const modalOrderBtn = document.getElementById('modal-order');
const modalAddBtn = document.getElementById('modal-add');

let modalCurrent = null;

function openModal(product){
  modalCurrent = product;
  modalImg.src = product.img;
  modalName.textContent = product.name;
  modalDesc.textContent = product.desc || '';
  modalPrice.textContent = product.price;
  modalRating.textContent = '★'.repeat(product.rating || 0);
  modalQty.value = 1;
  modal.style.display = 'flex';
  modal.setAttribute('aria-hidden', 'false');
}
function closeModal(){
  modal.style.display = 'none';
  modal.setAttribute('aria-hidden', 'true');
  modalCurrent = null;
}
document.querySelectorAll('[data-close]').forEach(b => b.addEventListener('click', closeModal));
document.querySelector('.modal-close').addEventListener('click', closeModal);
document.addEventListener('keydown', e => { if(e.key === 'Escape') closeModal(); });

modalOrderBtn.addEventListener('click', () => {
  if(!modalCurrent) return;
  const qty = Number(modalQty.value) || 1;
  const pesan = [
    "Halo 👋 saya ingin pesan:",
    `Produk: *${modalCurrent.name}*`,
    `Jumlah: ${qty}`,
    `Harga: ${modalCurrent.price}`
  ].join("\n");

  const encoded = encodeURIComponent(pesan);
  window.open(`https://wa.me/${waToko}?text=${encoded}`, "_blank");
  closeModal();
});


modalAddBtn.addEventListener('click', () => {
  if(!modalCurrent) return;
  orderSelect.value = modalCurrent.id;
  setPreview(modalCurrent);
  closeModal();
  document.getElementById('order').scrollIntoView({behavior:'smooth', block:'center'});
});

/* ========== ORDER FORM (multi-step) ========== */
const steps = document.querySelectorAll('.steps .step');
let stepIndex = 0;
function showStep(index){
  steps.forEach(s => s.classList.remove('active'));
  const s = Array.from(steps).find(x => Number(x.dataset.step) === index+1);
  if(s) s.classList.add('active');
}
showStep(stepIndex);

/* next / prev buttons */
document.querySelectorAll('[data-next]').forEach(b => b.addEventListener('click', ()=> {
  if(stepIndex < steps.length - 1){
    stepIndex++;
    showStep(stepIndex);
  }
}));
document.querySelectorAll('[data-prev]').forEach(b => b.addEventListener('click', ()=> {
  if(stepIndex > 0){
    stepIndex--;
    showStep(stepIndex);
  }
}));

/* assemble confirmation */
function buildConfirmation(){
  const name = document.getElementById('order-name').value.trim();
  const waReceiver = document.getElementById('order-wa').value.trim();
  const address = document.getElementById('order-address').value.trim();
  const date = document.getElementById('order-date').value;
  const pid = orderSelect.value;
  const qty = Number(document.getElementById('order-qty').value) || 1;
  const card = document.getElementById('order-card').value.trim();
  const note = document.getElementById('order-note').value.trim();
  const product = semuaProduk.find(p => p.id === pid);

  const confirmBox = document.getElementById('confirm-box');
  if(!product){
    confirmBox.innerHTML = '<div class="muted">Produk belum dipilih.</div>';
    return;
  }

  confirmBox.innerHTML = `
    <div><strong>Produk:</strong> ${product.name} — ${product.price}</div>
    <div><strong>Jumlah:</strong> ${qty}</div>
    <div><strong>Pemesan:</strong> ${name || '-'}</div>
    <div><strong>No WA penerima:</strong> ${waReceiver || '-'}</div>
    <div><strong>Alamat:</strong> ${address || '-'}</div>
    <div><strong>Tanggal kirim:</strong> ${date || '-'}</div>
    <div><strong>Kartu ucapan:</strong> ${card || '-'}</div>
    <div><strong>Catatan:</strong> ${note || '-'}</div>
  `;
}

/* when entering step 3, build confirmation */
document.querySelectorAll('[data-next]').forEach(b => b.addEventListener('click', () => {
  if(stepIndex === 2) buildConfirmation();
}));

/* submit form -> open WA with formatted message */
// Submit form ke WhatsApp
const orderForm = document.getElementById("orderForm");
if (orderForm) {
  orderForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const penerima = document.getElementById("order-name").value.trim();
    const waReceiver = document.getElementById("order-wa").value.trim();
    const address = document.getElementById("order-address").value.trim();
    const date = document.getElementById("order-date").value.trim();
    const produkId = document.getElementById("order-product").value;
    const qty = Number(document.getElementById("order-qty").value) || 1;
    const card = document.getElementById("order-card").value.trim();
    const namaPengirim = document.getElementById("order-nama").value.trim();
    const note = document.getElementById("order-note").value.trim();

    const product = semuaProduk.find(p => p.id === produkId);
    if (!product) {
      alert("⚠️ Pilih produk terlebih dahulu.");
      return;
    }

    const pesan = [
      "Halo 👋, saya ingin memesan:",
      `Produk: *${product.name}*`,
      `Jumlah: ${qty}`,
      `Harga: ${product.price}`,
      `Nama penerima: ${penerima}`,
      `No. WA penerima: ${waReceiver}`,
      `Alamat: ${address}`,
      `Tanggal kirim: ${date}`,
      card ? `Ucapan kartu: ${card}` : "",
      `Nama pengirim: ${namaPengirim}`,
      note ? `Catatan: ${note}` : ""
    ].filter(Boolean).join("\n");

    const encoded = encodeURIComponent(pesan);
    const url = `https://wa.me/${waToko}?text=${encoded}`;
    window.open(url, "_blank");
  });
}


  
/* floating WA & header actions */
// Floating WA
const floatingBtn = document.getElementById("floatingWA");
if (floatingBtn) {
  floatingBtn.addEventListener("click", () => {
    const pesan = "Halo 👋 saya mau tanya tentang produk & pemesanan.";
    window.open(`https://wa.me/${waToko}?text=${encodeURIComponent(pesan)}`, "_blank");
  });
}

document.getElementById('contact-wa').textContent = '0' + waToko.slice(2);
document.getElementById('contact-wa').href = `https://wa.me/${waToko}`;

document.getElementById('scrollToProduk').addEventListener('click', ()=> {
  document.getElementById('produk').scrollIntoView({behavior:'smooth'});
});

/* contact WA display */
document.getElementById('contact-wa').textContent = '0' + waToko;
document.getElementById('contact-wa').href = `https://wa.me/62${waToko}`;



/* set year */
document.getElementById('year').textContent = new Date().getFullYear();

/* initial: no preview */
setPreview(null);
// Efek fade-up saat discroll
function observeFadeUp(){
  const faders = document.querySelectorAll('.fade-up');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  faders.forEach(el => observer.observe(el));
}

// Jalankan observer
observeFadeUp();

// FAQ toggle
document.querySelectorAll(".faq-question").forEach(btn => {
  btn.addEventListener("click", () => {
    const item = btn.parentElement;
    const allItems = document.querySelectorAll(".faq-item");

    allItems.forEach(i => {
      if (i !== item) i.classList.remove("active");
    });

    item.classList.toggle("active");
  });
});


// Toggle Live Chat
function toggleChat() {
  const chatBody = document.getElementById("chat-body");
  chatBody.style.display = chatBody.style.display === "block" ? "none" : "block";
}
// === Galeri Modal ===
function openGallery(el) {
  const modal = document.getElementById("galleryModal");
  const modalImg = document.getElementById("galleryImg");
  const caption = document.getElementById("galleryCaption");

  modalImg.src = el.src;
  caption.textContent = el.alt;
  modal.style.display = "flex";
  modal.setAttribute("aria-hidden", "false");
}

function closeGallery() {
  const modal = document.getElementById("galleryModal");
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
}
