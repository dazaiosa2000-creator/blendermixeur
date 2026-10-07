(() => {
  'use strict';

  // ---------- Config ----------
  const PRICE = 3000;
  const HOME_EXTRA = 350;
  const MAX_QTY = 50;
  const WA_NUM = '213556011290';
  // After the first order, FormSubmit emails an activation link and a random alias.
  // Swap the address below for that alias to keep the inbox out of the page source.
  const ENDPOINT = 'https://formsubmit.co/ajax/dazaiosa2000@gmail.com';
  const SUBJECT = 'New Order - Portable USB Blender';
  const STICKY_DESKTOP = false;      // sticky CTA only below 900px when false
  const SHOW_WA_SECONDARY = true;    // "أو اطلب عبر واتساب" under the submit button

  // [code, arabic, french, Stop Desk price | null = unconfirmed]
  const RAW = [
    [1, 'أدرار', 'Adrar', 1100], [2, 'الشلف', 'Chlef', 450], [3, 'الأغواط', 'Laghouat', 700], [4, 'أم البواقي', 'Oum El Bouaghi', 500],
    [5, 'باتنة', 'Batna', 500], [6, 'بجاية', 'Béjaïa', 500], [7, 'بسكرة', 'Biskra', 600], [8, 'بشار', 'Béchar', 1100],
    [9, 'البليدة', 'Blida', 450], [10, 'البويرة', 'Bouira', 450], [11, 'تمنراست', 'Tamanrasset', 1400], [12, 'تبسة', 'Tébessa', 600],
    [13, 'تلمسان', 'Tlemcen', 500], [14, 'تيارت', 'Tiaret', 500], [15, 'تيزي وزو', 'Tizi Ouzou', 450], [16, 'الجزائر', 'Alger', 450],
    [17, 'الجلفة', 'Djelfa', 600], [18, 'جيجل', 'Jijel', 500], [19, 'سطيف', 'Sétif', 400], [20, 'سعيدة', 'Saïda', 600],
    [21, 'سكيكدة', 'Skikda', 500], [22, 'سيدي بلعباس', 'Sidi Bel Abbès', 500], [23, 'عنابة', 'Annaba', 500], [24, 'قالمة', 'Guelma', 600],
    [25, 'قسنطينة', 'Constantine', 450], [26, 'المدية', 'Médéa', 450], [27, 'مستغانم', 'Mostaganem', 500], [28, 'المسيلة', "M'Sila", 500],
    [29, 'معسكر', 'Mascara', 600], [30, 'ورقلة', 'Ouargla', 800], [31, 'وهران', 'Oran', 450], [32, 'البيض', 'El Bayadh', 800],
    [33, 'إليزي', 'Illizi', 1700], [34, 'برج بوعريريج', 'Bordj Bou Arréridj', 450], [35, 'بومرداس', 'Boumerdès', 450], [36, 'الطارف', 'El Tarf', 600],
    [37, 'تندوف', 'Tindouf', 1400], [38, 'تيسمسيلت', 'Tissemsilt', 500], [39, 'الوادي', 'El Oued', 800], [40, 'خنشلة', 'Khenchela', 600],
    [41, 'سوق أهراس', 'Souk Ahras', 600], [42, 'تيبازة', 'Tipaza', 450], [43, 'ميلة', 'Mila', 500], [44, 'عين الدفلى', 'Aïn Defla', 450],
    [45, 'النعامة', 'Naâma', 800], [46, 'عين تموشنت', 'Aïn Témouchent', null], [47, 'غرداية', 'Ghardaïa', 800], [48, 'غليزان', 'Relizane', 500],
    [49, 'تيميمون', 'Timimoun', 1100], [50, 'برج باجي مختار', 'Bordj Badji Mokhtar', 1700], [51, 'أولاد جلال', 'Ouled Djellal', 700], [52, 'بني عباس', 'Béni Abbès', 1100],
    [53, 'عين صالح', 'In Salah', 1100], [54, 'عين قزام', 'In Guezzam', 1700], [55, 'تقرت', 'Touggourt', 800], [56, 'جانت', 'Djanet', 1700],
    [57, 'المغير', "El M'Ghair", 800], [58, 'المنيعة', 'El Meniaa', 1000],
    [59, 'آفلو', 'Aflou', null], [60, 'بريكة', 'Barika', null], [61, 'القنطرة', 'El Kantara', null], [62, 'بئر العاتر', 'Bir El Ater', null],
    [63, 'العريشة', 'El Aricha', null], [64, 'قصر الشلالة', 'Ksar Chellala', null], [65, 'عين وسارة', 'Aïn Oussera', null], [66, 'مسعد', 'Messaad', null],
    [67, 'قصر البخاري', 'Ksar El Boukhari', null], [68, 'بوسعادة', 'Bou Saâda', null], [69, 'الأبيض سيدي الشيخ', 'El Abiodh Sidi Cheikh', null],
  ];

  const IMGS = [
    { src: 'images/blender-sage.avif', alt: 'نافذة شفافة لرؤية المكونات' },
    { src: 'images/blender-colors.avif', alt: 'تصميم عصري وأنيق' },
    { src: 'images/blender-usb.avif', alt: 'شاشة التحكم وشحن USB' },
  ];

  // ---------- Helpers ----------
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const toLatinDigits = (s) => String(s)
    .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x0660))
    .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 0x06F0));

  const norm = (s) => toLatinDigits(s)
    .replace(/[أإآٱ]/g, 'ا').replace(/ة/g, 'ه').replace(/ى/g, 'ي')
    .normalize('NFD').replace(/[̀-ًͯ-ٟ]/g, '')
    .toLowerCase().replace(/[\s’'`-]/g, '');

  const fmt = (n) => `${Number(n).toLocaleString('en-US')} دج`;

  const normPhone = (p) => {
    let s = toLatinDigits(p).replace(/[^\d+]/g, '');
    if (s.startsWith('+213')) s = '0' + s.slice(4);
    else if (s.startsWith('00213')) s = '0' + s.slice(5);
    else if (s.startsWith('213') && s.length === 12) s = '0' + s.slice(3);
    return s;
  };
  // Mobile 05/06/07 + 8 digits, or landline 02/03/04 + 7 digits
  const phoneOk = (p) => /^0[567]\d{8}$/.test(p) || /^0[234]\d{7}$/.test(p);

  const methodLabel = (m) => (m === 'home' ? 'التوصيل إلى المنزل' : m === 'desk' ? 'Stop Desk' : '');

  const WILAYAS = RAW.map(([code, ar, fr, desk]) => {
    const num = String(code).padStart(2, '0');
    return { code, ar, fr, desk, num, label: `${num} - ${ar} (${fr})`, key: norm(`${num}${code}${ar}${fr}`) };
  });
  const BY_CODE = Object.fromEntries(WILAYAS.map((w) => [w.code, w]));

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const scrollToEl = (el, offset = 12) => {
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - offset - 64;
    window.scrollTo({ top, behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  // ---------- Elements ----------
  const form = $('#order-form');
  const orderSection = $('#order');
  const f = {
    name: $('#f-name'), phone: $('#f-phone'), code: $('#f-code'), commune: $('#f-commune'),
    address: $('#f-address'), desk: $('#f-desk'), qty: $('#f-qty'), honey: form.elements._honey,
  };
  const comboList = $('.combo__list');
  const listbox = $('#wilaya-list');
  const comboEmpty = $('.combo__empty');
  const methodGroup = $('#f-method');
  const methodInputs = $$('input[name="method"]', form);
  const qtyButtons = $$('[data-qty]');

  // ---------- State ----------
  const state = {
    code: null,          // selected wilaya code
    method: null,        // 'desk' | 'home'
    qtyMode: '1',        // '1' | '2' | '3' | '4' (4 = custom 4+)
    open: false,         // wilaya list open
    active: -1,          // keyboard-highlighted index within visible options
    errors: {},
    status: 'idle',      // idle | loading | error | success
  };

  const getQty = () => {
    if (state.qtyMode !== '4') return Number(state.qtyMode);
    const n = parseInt(toLatinDigits(f.qty.value), 10);
    return Number.isFinite(n) ? Math.min(MAX_QTY, Math.max(4, n)) : 4;
  };

  const calc = () => {
    const w = state.code ? BY_CODE[state.code] : null;
    const confirmed = !!w && w.desk != null;
    const deskFee = confirmed ? w.desk : null;
    const homeFee = confirmed ? w.desk + HOME_EXTRA : null;
    const delivery = confirmed && state.method ? (state.method === 'home' ? homeFee : deskFee) : null;
    const qty = getQty();
    const subtotal = PRICE * qty;
    const total = delivery != null ? subtotal + delivery : null;
    return { w, confirmed, unconfirmed: !!w && !confirmed, deskFee, homeFee, delivery, qty, subtotal, total };
  };

  // ---------- Validation ----------
  const FIELD_ORDER = ['name', 'phone', 'code', 'commune', 'method', 'address', 'qty'];
  const FIELD_EL = { name: 'f-name', phone: 'f-phone', code: 'f-code', commune: 'f-commune', method: 'f-method', address: 'f-address', qty: 'f-qty' };

  const validate = () => {
    const e = {};
    if (f.name.value.trim().length < 3) e.name = 'يرجى إدخال الاسم واللقب';
    const p = normPhone(f.phone.value);
    if (!p) e.phone = 'يرجى إدخال رقم الهاتف';
    else if (!phoneOk(p)) e.phone = 'رقم الهاتف غير صحيح — مثال: 0555 12 34 56';
    if (!state.code) e.code = 'يرجى اختيار الولاية من القائمة';
    if (f.commune.value.trim().length < 2) e.commune = 'يرجى إدخال البلدية';
    if (!state.method) e.method = 'يرجى اختيار طريقة التوصيل';
    if (state.method === 'home' && f.address.value.trim().length < 5) e.address = 'يرجى كتابة العنوان بالتفصيل';
    if (state.qtyMode === '4') {
      const n = parseInt(toLatinDigits(f.qty.value), 10);
      if (!Number.isFinite(n) || n < 4 || n > MAX_QTY) e.qty = `الكمية يجب أن تكون بين 4 و ${MAX_QTY}`;
    }
    return e;
  };

  const clearError = (k) => {
    if (state.errors[k]) { state.errors[k] = ''; }
    if (state.status === 'error') state.status = 'idle';
  };

  // ---------- WhatsApp ----------
  const buildWa = (c) => {
    const lines = [
      'السلام عليكم، أريد طلب الخلاط المحمول USB.',
      '',
      `الاسم: ${f.name.value.trim()}`,
      `الهاتف: ${normPhone(f.phone.value) || f.phone.value.trim()}`,
      `الولاية: ${c.w ? c.w.label : ''}`,
      `البلدية: ${f.commune.value.trim()}`,
      `طريقة التوصيل: ${methodLabel(state.method)}`,
      `العنوان: ${state.method === 'desk' ? `Stop Desk${f.desk.value.trim() ? ' - ' + f.desk.value.trim() : ''}` : f.address.value.trim()}`,
      `الكمية: ${c.qty}`,
    ];
    if (c.unconfirmed) lines.push('', 'سعر التوصيل: يرجى تأكيده لولايتي.');
    else if (c.total != null) lines.push('', `سعر المنتج: ${fmt(c.subtotal)}`, `التوصيل: ${fmt(c.delivery)}`, `الإجمالي: ${fmt(c.total)}`);
    return `https://wa.me/${WA_NUM}?text=${encodeURIComponent(lines.join('\n'))}`;
  };

  // ---------- Wilaya combobox ----------
  const optionEls = WILAYAS.map((w) => {
    const li = document.createElement('li');
    li.className = 'combo__opt';
    li.id = `w-opt-${w.code}`;
    li.setAttribute('role', 'option');
    li.setAttribute('aria-selected', 'false');
    li.dataset.code = String(w.code);

    const main = document.createElement('span');
    main.className = 'combo__main';
    const num = document.createElement('span'); num.className = 'combo__num'; num.textContent = w.num;
    const ar = document.createElement('span'); ar.className = 'combo__ar'; ar.textContent = w.ar;
    const fr = document.createElement('span'); fr.className = 'combo__fr'; fr.dir = 'ltr'; fr.textContent = w.fr;
    main.append(num, ar, fr);

    const price = document.createElement('span');
    price.className = 'combo__price' + (w.desk == null ? ' is-pending' : '');
    price.textContent = w.desk != null ? `من ${fmt(w.desk)}` : 'يُؤكَّد عبر واتساب';

    li.append(main, price);
    li.addEventListener('mousedown', (e) => { e.preventDefault(); pickWilaya(w); });
    listbox.appendChild(li);
    return li;
  });

  const filtered = () => {
    const q = norm(f.code.value);
    return !state.code && q ? WILAYAS.filter((w) => w.key.includes(q)) : WILAYAS;
  };

  const renderList = () => {
    comboList.hidden = !state.open;
    f.code.setAttribute('aria-expanded', String(state.open));
    if (!state.open) { f.code.removeAttribute('aria-activedescendant'); return; }
    const visible = new Set(filtered().map((w) => w.code));
    let idx = 0;
    let activeEl = null;
    optionEls.forEach((li, i) => {
      const w = WILAYAS[i];
      const show = visible.has(w.code);
      li.hidden = !show;
      li.setAttribute('aria-selected', String(w.code === state.code));
      const isActive = show && idx === state.active;
      li.classList.toggle('is-active', isActive);
      if (isActive) activeEl = li;
      if (show) idx++;
    });
    comboEmpty.hidden = visible.size > 0;
    if (activeEl) {
      f.code.setAttribute('aria-activedescendant', activeEl.id);
      activeEl.scrollIntoView({ block: 'nearest' });
    } else {
      f.code.removeAttribute('aria-activedescendant');
    }
  };

  const openList = () => {
    state.open = true;
    renderList();
    if (state.code && state.active < 0) {
      const sel = $(`#w-opt-${state.code}`);
      if (sel) comboList.scrollTop = sel.offsetTop - 8;
    }
  };

  const pickWilaya = (w) => {
    clearTimeout(blurTimer);
    state.code = w.code;
    state.open = false;
    state.active = -1;
    f.code.value = w.label;
    clearError('code');
    render();
  };

  let blurTimer;
  f.code.addEventListener('input', () => {
    state.code = null;
    state.open = true;
    state.active = -1;
    clearError('code');
    render();
  });
  f.code.addEventListener('focus', () => {
    clearTimeout(blurTimer);
    if (state.code) f.code.select();
    openList();
  });
  f.code.addEventListener('click', () => { if (!state.open) openList(); });
  f.code.addEventListener('blur', () => {
    blurTimer = setTimeout(() => {
      const l = filtered();
      if (!state.code && f.code.value.trim() && l.length === 1) { pickWilaya(l[0]); return; }
      state.open = false;
      state.active = -1;
      renderList();
    }, 150);
  });
  f.code.addEventListener('keydown', (e) => {
    const l = filtered();
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (!state.open) { state.open = true; state.active = -1; }
      if (!l.length) { renderList(); return; }
      const step = e.key === 'ArrowDown' ? 1 : -1;
      state.active = state.active < 0 ? (step > 0 ? 0 : l.length - 1) : (state.active + step + l.length) % l.length;
      renderList();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (state.open && state.active >= 0 && l[state.active]) pickWilaya(l[state.active]);
      else if (state.open && !state.code && l.length) pickWilaya(l[0]);
      else { state.open = false; renderList(); }
    } else if (e.key === 'Escape') {
      state.open = false; state.active = -1; renderList();
    }
  });

  // ---------- Method / quantity / fields ----------
  methodInputs.forEach((input) => input.addEventListener('change', () => {
    state.method = input.value;
    clearError('method');
    if (state.method === 'desk') clearError('address');
    render();
  }));

  qtyButtons.forEach((btn) => btn.addEventListener('click', () => {
    state.qtyMode = btn.dataset.qty;
    clearError('qty');
    render();
  }));
  const setCustomQty = (n) => { f.qty.value = String(n); clearError('qty'); render(); };
  $('#qty-dec').addEventListener('click', () => setCustomQty(Math.max(4, getQty() - 1)));
  $('#qty-inc').addEventListener('click', () => setCustomQty(Math.min(MAX_QTY, getQty() + 1)));
  f.qty.addEventListener('input', () => { clearError('qty'); render(); });
  f.qty.addEventListener('blur', () => setCustomQty(getQty()));

  [['name', f.name], ['phone', f.phone], ['commune', f.commune], ['address', f.address], ['desk', f.desk]].forEach(([k, el]) => {
    el.addEventListener('input', () => { clearError(k); render(); });
  });

  // ---------- Render ----------
  const setErr = (k) => {
    const msg = state.errors[k] || '';
    const span = $(`#e-${k}`);
    if (span) { span.textContent = msg; span.hidden = !msg; }
    const el = k === 'method' ? null : $(`#${FIELD_EL[k]}`);
    if (el) el.setAttribute('aria-invalid', String(!!msg));
  };

  const render = () => {
    const c = calc();
    const hasW = !!c.w;

    // Errors
    FIELD_ORDER.forEach(setErr);
    methodGroup.classList.toggle('is-invalid', !!state.errors.method && !state.method);
    $('#form-errors').hidden = !Object.values(state.errors).some(Boolean);

    // Wilaya
    $('#unconfirmed-notice').hidden = !c.unconfirmed;
    renderList();

    // Delivery options
    const priceFor = (fee) => (!hasW ? 'اختر الولاية أولاً' : c.unconfirmed ? 'سيتم تأكيده' : fmt(fee));
    $('#desk-price').textContent = priceFor(c.deskFee);
    $('#home-price').textContent = priceFor(c.homeFee);
    $('#address-field').hidden = state.method !== 'home';
    $('#desk-field').hidden = state.method !== 'desk';

    // Quantity
    qtyButtons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.qty === state.qtyMode)));
    $('#qty-custom').hidden = state.qtyMode !== '4';

    // Summary
    $('#sum-qty').textContent = String(c.qty);
    $('#sum-subtotal').textContent = fmt(c.subtotal);
    $('#sum-method').textContent = state.method && hasW && !c.unconfirmed ? `(${methodLabel(state.method)})` : '';
    let deliveryText;
    if (!hasW) deliveryText = 'اختر الولاية';
    else if (c.unconfirmed) deliveryText = 'سعر التوصيل سيتم تأكيده';
    else if (!state.method) deliveryText = 'اختر طريقة التوصيل';
    else deliveryText = fmt(c.delivery);
    $('#sum-delivery').textContent = deliveryText;
    $('#sum-total').textContent = c.total != null ? fmt(c.total) : '—';
    const note = $('#sum-note');
    note.hidden = c.total != null;
    note.textContent = c.unconfirmed
      ? 'سيتم تأكيد سعر التوصيل والمجموع عبر واتساب.'
      : 'يظهر المجموع النهائي بعد اختيار الولاية وطريقة التوصيل.';

    // Checkout vs WhatsApp-only
    $('#checkout').hidden = c.unconfirmed;
    $('#wa-primary').hidden = !c.unconfirmed;
    const loading = state.status === 'loading';
    const submit = $('#submit-btn');
    submit.disabled = loading;
    submit.setAttribute('aria-busy', String(loading));
    $('.spinner', submit).hidden = !loading;
    $('#submit-label').textContent = loading ? 'جاري إرسال الطلب…' : 'تأكيد الطلب';
    $('#submit-error').hidden = state.status !== 'error';
    $('#wa-secondary').hidden = !(SHOW_WA_SECONDARY || state.status === 'error');
    const wa = buildWa(c);
    $$('[data-wa]').forEach((a) => { a.href = wa; });
  };

  // ---------- Submit ----------
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (state.status === 'loading') return;

    state.errors = validate();
    const first = FIELD_ORDER.find((k) => state.errors[k]);
    if (first) {
      render();
      const el = document.getElementById(FIELD_EL[first]);
      if (el) {
        scrollToEl(el, 90);
        const target = first === 'method' ? methodInputs[0] : el;
        setTimeout(() => target.focus({ preventScroll: true }), 350);
      }
      return;
    }

    const c = calc();
    if (!c.confirmed || c.total == null) return; // unconfirmed wilayas go through WhatsApp only

    state.status = 'loading';
    render();

    const payload = {
      _subject: SUBJECT,
      _template: 'table',
      _captcha: 'false',
      _honey: f.honey.value,
      'Product': 'الخلاط المحمول USB 3 في 1 — Portable USB Blender',
      'Quantity': String(c.qty),
      'Customer name': f.name.value.trim(),
      'Phone': normPhone(f.phone.value),
      'Wilaya': `${c.w.num} - ${c.w.fr} / ${c.w.ar}`,
      'Commune': f.commune.value.trim(),
      'Delivery method': state.method === 'home' ? 'Home Delivery (التوصيل إلى المنزل)' : 'Stop Desk',
      'Address': state.method === 'home' ? f.address.value.trim() : '-',
      'Stop Desk location': state.method === 'desk' ? (f.desk.value.trim() || 'Not specified — confirm by phone') : '-',
      'Product subtotal': `${c.subtotal} DA (${PRICE} x ${c.qty})`,
      'Delivery fee': `${c.delivery} DA`,
      'Total price': `${c.total} DA`,
    };

    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 20000);
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
        signal: ctrl.signal,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || String(data.success) !== 'true') throw new Error(data.message || `HTTP ${res.status}`);

      state.status = 'success';
      $('#done-name').textContent = payload['Customer name'];
      $('#done-qty').textContent = String(c.qty);
      $('#done-method').textContent = methodLabel(state.method);
      $('#done-total').textContent = fmt(c.total);
      form.hidden = true;
      const success = $('#order-success');
      success.hidden = false;
      scrollToEl(orderSection, 0);
      success.focus({ preventScroll: true });
    } catch (err) {
      console.warn('Order submit failed:', err && err.message);
      state.status = 'error';
    } finally {
      clearTimeout(timer);
      render();
    }
  });

  $('#new-order').addEventListener('click', () => {
    form.reset();
    f.qty.value = '4';
    Object.assign(state, { code: null, method: null, qtyMode: '1', open: false, active: -1, errors: {}, status: 'idle' });
    $('#order-success').hidden = true;
    form.hidden = false;
    render();
    scrollToEl(orderSection, 0);
  });

  // ---------- CTAs & sticky bar ----------
  document.addEventListener('click', (e) => {
    const a = e.target.closest('[data-go-order]');
    if (!a) return;
    e.preventDefault();
    scrollToEl(orderSection, 0);
  });

  const sticky = $('#sticky-cta');
  const heroActions = $('#hero-actions');
  const updateSticky = () => {
    let show = false;
    if (STICKY_DESKTOP || window.innerWidth < 900) {
      const pastHero = heroActions.getBoundingClientRect().bottom < 0;
      const r = orderSection.getBoundingClientRect();
      const orderVisible = r.top < window.innerHeight && r.bottom > 0;
      show = pastHero && !orderVisible;
    }
    if (sticky.hidden === show) sticky.hidden = !show;
  };
  window.addEventListener('scroll', updateSticky, { passive: true });
  window.addEventListener('resize', updateSticky);

  // ---------- Lightbox ----------
  const lb = $('#lightbox');
  const lbImg = $('#lb-img');
  let lbIndex = null;
  let lbReturnFocus = null;

  const showLb = (i) => {
    lbIndex = (i + IMGS.length) % IMGS.length;
    lbImg.src = IMGS[lbIndex].src;
    lbImg.alt = IMGS[lbIndex].alt;
    $('#lb-caption').textContent = IMGS[lbIndex].alt;
  };
  const openLb = (i) => {
    lbReturnFocus = document.activeElement;
    showLb(i);
    lb.hidden = false;
    document.body.style.overflow = 'hidden';
    $('#lb-close').focus();
  };
  const closeLb = () => {
    lb.hidden = true;
    lbIndex = null;
    document.body.style.overflow = '';
    if (lbReturnFocus) lbReturnFocus.focus();
  };

  $$('[data-lightbox]').forEach((btn) => btn.addEventListener('click', () => openLb(Number(btn.dataset.lightbox))));
  lb.addEventListener('click', (e) => { if (e.target === lb) closeLb(); });
  lbImg.addEventListener('click', (e) => e.stopPropagation());
  $('#lb-close').addEventListener('click', closeLb);
  $('#lb-prev').addEventListener('click', () => showLb(lbIndex - 1));
  $('#lb-next').addEventListener('click', () => showLb(lbIndex + 1));
  document.addEventListener('keydown', (e) => {
    if (lbIndex == null) return;
    if (e.key === 'Escape') closeLb();
    else if (e.key === 'ArrowLeft') showLb(lbIndex + 1);
    else if (e.key === 'ArrowRight') showLb(lbIndex - 1);
    else if (e.key === 'Tab') {
      // keep focus inside the dialog
      const items = $$('button', lb);
      const i = items.indexOf(document.activeElement);
      const next = e.shiftKey ? (i <= 0 ? items.length - 1 : i - 1) : (i + 1) % items.length;
      e.preventDefault();
      items[next].focus();
    }
  });

  // ---------- Init ----------
  render();
  updateSticky();
})();
