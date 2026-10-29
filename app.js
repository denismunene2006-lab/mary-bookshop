// Shared cart, checkout, and store logic for Page & Palette
// Used by both index.html (homepage) and checkout.html (dedicated checkout page)

let revealObserver;
let activeFilter = 'all';
let cart = [];

function lucideRefresh() {
    if (window.lucide) window.lucide.createIcons();
}

function updateNavbarState() {
    const navbar = document.getElementById('navbar');
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 24);
    const progress = document.getElementById('scrollProgress');
    if (progress) {
        const h = document.documentElement.scrollHeight - window.innerHeight;
        progress.style.transform = 'scaleX(' + (h > 0 ? window.scrollY / h : 0) + ')';
    }
    const btt = document.getElementById('backToTop');
    if (btt) btt.classList.toggle('show', window.scrollY > 600);
}

function setupRevealAnimations() {
    const homeView = document.getElementById('home-view');
    if (!homeView) return;

    const revealGroups = [
        { selector: '#home-view .about-visual', step: 0 },
        { selector: '#home-view .about-content', step: 0 },
        { selector: '#home-view .section-head', step: 0 },
        { selector: '#home-view .info-card', step: 90 },
        { selector: '#home-view .category-card', step: 70 },
        { selector: '#home-view .product-toolbar', step: 0 },
        { selector: '#home-view .product-card', step: 70 },
        { selector: '#home-view .feature', step: 80 },
        { selector: '#home-view .testimonial-card', step: 80 },
        { selector: '#home-view .location-info', step: 0 },
        { selector: '#home-view .location-map', step: 0 },
        { selector: '#home-view .contact-band', step: 0 },
        { selector: '#home-view .faq-item', step: 60 },
        { selector: 'footer', step: 0 }
    ];

    revealGroups.forEach(function(group) {
        document.querySelectorAll(group.selector).forEach(function(element, index) {
            if (element.dataset.revealReady === 'true') return;
            element.dataset.revealReady = 'true';
            element.classList.add('reveal-target');
            element.style.setProperty('--reveal-delay', Math.min(index * group.step, 420) + 'ms');
        });
    });

    const revealTargets = document.querySelectorAll('.reveal-target:not([data-reveal-observed="true"])');

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
        revealTargets.forEach(function(el) { el.classList.add('is-visible'); });
        return;
    }

    if (!revealObserver) {
        revealObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    }

    revealTargets.forEach(function(el) {
        el.dataset.revealObserved = 'true';
        revealObserver.observe(el);
    });
}

function setupCountUp() {
    const counters = document.querySelectorAll('.count-up');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        counters.forEach(function(el) {
            el.textContent = el.dataset.target + (el.dataset.suffix || '');
        });
        return;
    }
    const observer = new IntersectionObserver(function(entries, obs) {
        entries.forEach(function(entry) {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const target = parseInt(el.dataset.target, 10);
            const suffix = el.dataset.suffix || '';
            const duration = 1600;
            const start = performance.now();
            function tick(now) {
                const p = Math.min((now - start) / duration, 1);
                const eased = 1 - Math.pow(1 - p, 3);
                el.textContent = Math.floor(eased * target).toLocaleString() + (p === 1 ? suffix : '');
                if (p < 1) requestAnimationFrame(tick);
                else el.textContent = target.toLocaleString() + suffix;
            }
            requestAnimationFrame(tick);
            obs.unobserve(el);
        });
    }, { threshold: 0.5 });
    counters.forEach(function(c) { observer.observe(c); });
}

function setupParallax() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const items = document.querySelectorAll('[data-parallax]');
    if (!items.length) return;
    window.addEventListener('scroll', function() {
        items.forEach(function(el) {
            const speed = parseFloat(el.dataset.parallax);
            el.style.transform = 'translateY(' + (window.scrollY * speed) + 'px)';
        });
    }, { passive: true });
}

function toggleMenu() {
    const navMenu = document.getElementById('navMenu');
    const hamburger = document.querySelector('.hamburger');
    if (navMenu) {
        const isOpen = navMenu.classList.toggle('open');
        if (hamburger) hamburger.setAttribute('aria-expanded', String(isOpen));
    }
}

function closeMenu() {
    const navMenu = document.getElementById('navMenu');
    const hamburger = document.querySelector('.hamburger');
    if (navMenu) navMenu.classList.remove('open');
    if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
}

/* ---------- Cart Logic ---------- */

function formatKES(n) {
    return 'KES ' + Number(n).toLocaleString();
}

function saveCart() {
    try { localStorage.setItem('pp_cart', JSON.stringify(cart)); } catch(e) {}
}

function loadCart() {
    try {
        const raw = localStorage.getItem('pp_cart');
        if (raw) cart = JSON.parse(raw);
    } catch(e) { cart = []; }
}

function addToCart(name, price) {
    const existing = cart.find(function(item) { return item.name === name; });
    if (existing) {
        existing.qty++;
    } else {
        cart.push({ name: name, price: price, qty: 1 });
    }
    saveCart();
    renderCart();
    updateCartBadge();
    showToast(name + ' added to cart');
    openCart();
}

function changeQty(name, delta) {
    const item = cart.find(function(i) { return i.name === name; });
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
        cart = cart.filter(function(i) { return i.name !== name; });
    }
    saveCart();
    renderCart();
    updateCartBadge();
    updateCheckout();
}

function removeItem(name) {
    cart = cart.filter(function(i) { return i.name !== name; });
    saveCart();
    renderCart();
    updateCartBadge();
    updateCheckout();
}

function clearCart() {
    cart = [];
    saveCart();
    renderCart();
    updateCartBadge();
    updateCheckout();
    showToast('Cart cleared');
}

function cartCount() {
    return cart.reduce(function(sum, i) { return sum + i.qty; }, 0);
}

function cartSubtotal() {
    return cart.reduce(function(sum, i) { return sum + (i.price * i.qty); }, 0);
}

function cartDeliveryFee() {
    const sub = cartSubtotal();
    if (sub === 0) return 0;
    if (sub >= 2000) return 0;
    return 200;
}

function cartTotal() {
    return cartSubtotal() + cartDeliveryFee();
}

function updateCartBadge() {
    const badge = document.getElementById('cartBadge');
    if (!badge) return;
    const count = cartCount();
    if (count > 0) {
        badge.textContent = count;
        badge.style.display = 'inline-flex';
    } else {
        badge.style.display = 'none';
    }
}

function renderCart() {
    const body = document.getElementById('cartItems');
    const empty = document.getElementById('cartEmpty');
    const footer = document.getElementById('cartFooter');
    if (!body || !empty || !footer) return;

    if (cart.length === 0) {
        body.innerHTML = '';
        empty.style.display = 'flex';
        footer.style.display = 'none';
        return;
    }

    empty.style.display = 'none';
    footer.style.display = 'flex';

    body.innerHTML = cart.map(function(item) {
        return '<div class="cart-item">' +
            '<div class="ci-info">' +
                '<strong>' + item.name + '</strong>' +
                '<span>' + formatKES(item.price) + ' each</span>' +
            '</div>' +
            '<div class="ci-controls">' +
                '<button class="qty-btn" onclick="changeQty(\'' + item.name.replace(/'/g, "\\'") + '\', -1)" aria-label="Decrease"><i data-lucide="minus"></i></button>' +
                '<span class="ci-qty">' + item.qty + '</span>' +
                '<button class="qty-btn" onclick="changeQty(\'' + item.name.replace(/'/g, "\\'") + '\', 1)" aria-label="Increase"><i data-lucide="plus"></i></button>' +
                '<button class="ci-remove" onclick="removeItem(\'' + item.name.replace(/'/g, "\\'") + '\')" aria-label="Remove"><i data-lucide="trash-2"></i></button>' +
            '</div>' +
            '<div class="ci-price">' + formatKES(item.price * item.qty) + '</div>' +
        '</div>';
    }).join('');

    const subEl = document.getElementById('cartSubtotal');
    const delEl = document.getElementById('cartDelivery');
    const totEl = document.getElementById('cartTotal');
    if (subEl) subEl.textContent = formatKES(cartSubtotal());
    if (delEl) delEl.textContent = cartDeliveryFee() === 0 ? 'Free' : formatKES(cartDeliveryFee());
    if (totEl) totEl.textContent = formatKES(cartTotal());

    lucideRefresh();
}

function openCart() {
    const drawer = document.getElementById('cartDrawer');
    const overlay = document.getElementById('cartOverlay');
    if (!drawer) return;
    drawer.classList.add('open');
    if (overlay) overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    renderCart();
}

function closeCart() {
    const drawer = document.getElementById('cartDrawer');
    const overlay = document.getElementById('cartOverlay');
    if (!drawer) return;
    drawer.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
    document.body.style.overflow = '';
}

/* ---------- Checkout ---------- */

function goToCheckout() {
    if (cart.length === 0) return;
    closeCart();
    window.location.href = '/checkout.html';
}

function showCheckout() {
    const homeView = document.getElementById('home-view');
    const checkoutEl = document.getElementById('checkout');
    if (!checkoutEl) return;
    if (homeView) homeView.style.display = 'none';
    checkoutEl.style.display = 'block';
    const success = document.getElementById('checkoutSuccess');
    if (success) success.style.display = 'none';
    const body = document.querySelector('.checkout-body');
    if (body) body.style.display = 'block';
    document.body.style.overflow = 'auto';
    lucideRefresh();
    updateCheckout();
    window.scrollTo({ top: 0, behavior: 'auto' });
}

function showCheckoutSuccess() {
    var summaryEl = document.getElementById('successSummary');
    if (summaryEl) {
        summaryEl.innerHTML = '<div class="cart-row"><span>Items</span><strong>' + cartCount() + '</strong></div>' +
            '<div class="cart-row"><span>Total</span><strong>' + formatKES(cartTotal()) + '</strong></div>';
    }
    const body = document.querySelector('.checkout-body');
    if (body) body.style.display = 'none';
    const success = document.getElementById('checkoutSuccess');
    if (success) success.style.display = 'flex';
    cart = [];
    saveCart();
    updateCartBadge();
    lucideRefresh();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateCheckout() {
    const itemsEl = document.getElementById('checkoutItems');
    if (!itemsEl) return;

    if (cart.length === 0) {
        itemsEl.innerHTML = '<p class="checkout-empty">Your cart is empty. <a href="/" onclick="backToShop(); return false;">Continue shopping</a></p>';
    } else {
        itemsEl.innerHTML = '<h3><i data-lucide="package"></i> Order Summary</h3>' +
            cart.map(function(item) {
                return '<div class="checkout-item">' +
                    '<div class="co-info"><strong>' + item.qty + 'x ' + item.name + '</strong><span>' + formatKES(item.price) + ' each</span></div>' +
                    '<div class="co-price">' + formatKES(item.price * item.qty) + '</div>' +
                '</div>';
            }).join('');
    }
    const subEl = document.getElementById('ckSubtotal');
    const delEl = document.getElementById('ckDelivery');
    const totEl = document.getElementById('ckTotal');
    if (subEl) subEl.textContent = formatKES(cartSubtotal());
    if (delEl) delEl.textContent = cartDeliveryFee() === 0 ? 'Free' : formatKES(cartDeliveryFee());
    if (totEl) totEl.textContent = formatKES(cartTotal());
    lucideRefresh();
}

function sendCheckoutOrder() {
    const name = document.getElementById('ckName');
    const phone = document.getElementById('ckPhone');
    const address = document.getElementById('ckAddress');
    const note = document.getElementById('ckNote');

    const nameErr = document.getElementById('ckNameError');
    const phoneErr = document.getElementById('ckPhoneError');
    const addrErr = document.getElementById('ckAddressError');
    if (nameErr) nameErr.style.display = 'none';
    if (phoneErr) phoneErr.style.display = 'none';
    if (addrErr) addrErr.style.display = 'none';

    let valid = true;
    if (!name.value.trim()) { if (nameErr) nameErr.style.display = 'block'; valid = false; }
    if (!phone.value.trim()) { if (phoneErr) phoneErr.style.display = 'block'; valid = false; }
    if (!address.value.trim()) { if (addrErr) addrErr.style.display = 'block'; valid = false; }
    if (!valid) return;

    let message = 'Hello Page & Palette! My name is ' + name.value.trim() + '.\n\nI would like to order:\n';
    cart.forEach(function(item) {
        message += '• ' + item.qty + 'x ' + item.name + ' — ' + formatKES(item.price * item.qty) + '\n';
    });
    message += '\nSubtotal: ' + formatKES(cartSubtotal());
    message += '\nDelivery: ' + (cartDeliveryFee() === 0 ? 'Free' : formatKES(cartDeliveryFee()));
    message += '\nTotal: ' + formatKES(cartTotal());
    message += '\n\nPhone: ' + phone.value.trim();
    message += '\nDelivery address: ' + address.value.trim();
    if (note.value.trim()) message += '\nNote: ' + note.value.trim();

    const url = 'https://wa.me/254710236087?text=' + encodeURIComponent(message);
    window.open(url, '_blank');
    showCheckoutSuccess();
}

function backToCart() {
    window.location.href = '/#cart';
}

function backToShop() {
    window.location.href = '/';
}

/* ---------- Navigation & Views ---------- */

function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function showToast(msg) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toastMsg');
    if (!toast || !toastMsg) return;
    toastMsg.textContent = msg;
    toast.classList.add('show');
    clearTimeout(window._toastTimer);
    window._toastTimer = setTimeout(function() { toast.classList.remove('show'); }, 2400);
}

function filterProducts() {
    const searchEl = document.getElementById('productSearch');
    if (!searchEl) return;
    const search = searchEl.value.trim().toLowerCase();
    const cards = document.querySelectorAll('#productGrid .product-card');
    let visible = 0;
    cards.forEach(function(card) {
        const name = card.dataset.name || '';
        const cat = card.dataset.cat || '';
        const matchFilter = activeFilter === 'all' || cat === activeFilter;
        const matchSearch = !search || name.indexOf(search) !== -1;
        const show = matchFilter && matchSearch;
        card.style.display = show ? '' : 'none';
        if (show) visible++;
    });
    const noRes = document.getElementById('noResults');
    if (noRes) noRes.style.display = visible === 0 ? 'block' : 'none';
}

function setActiveFilter(filter) {
    activeFilter = filter;
    document.querySelectorAll('#filterChips .chip').forEach(function(c) {
        c.classList.toggle('active', c.getAttribute('data-filter') === filter);
    });
    filterProducts();
}

/* ---------- Homepage init ---------- */

function initHomepage() {
    lucideRefresh();
    setupRevealAnimations();
    setupCountUp();
    setupParallax();
    updateNavbarState();

    window.addEventListener('scroll', updateNavbarState, { passive: true });
    window.addEventListener('resize', function() { if (window.innerWidth > 768) closeMenu(); });

    document.addEventListener('click', function(event) {
        const navMenu = document.getElementById('navMenu');
        if (navMenu && navMenu.classList.contains('open') && !navMenu.contains(event.target)) closeMenu();
    });

    document.body.addEventListener('click', function(e) {
        const navTrigger = e.target.closest('[data-nav]');
        if (navTrigger) {
            e.preventDefault();
            const scrollTarget = navTrigger.getAttribute('data-scroll');
            if (scrollTarget) {
                scrollToSection(scrollTarget);
            }
            closeMenu();
        }
        const addBtn = e.target.closest('.add-to-cart-btn');
        if (addBtn) {
            e.preventDefault();
            addToCart(addBtn.getAttribute('data-item'), parseInt(addBtn.getAttribute('data-price'), 10));
        }
        const catCard = e.target.closest('.category-card');
        if (catCard) {
            const filterCat = catCard.getAttribute('data-filter-cat');
            if (filterCat) {
                setActiveFilter(filterCat);
                scrollToSection('products');
                showToast('Showing ' + catCard.getAttribute('data-cat'));
            }
        }
    });

    const cartTrigger = document.getElementById('cartTrigger');
    if (cartTrigger) {
        cartTrigger.addEventListener('click', function(e) {
            e.preventDefault();
            openCart();
        });
    }

    const filterChips = document.getElementById('filterChips');
    if (filterChips) {
        filterChips.addEventListener('click', function(e) {
            const chip = e.target.closest('.chip');
            if (!chip) return;
            setActiveFilter(chip.getAttribute('data-filter'));
        });
    }

    const productSearch = document.getElementById('productSearch');
    if (productSearch) {
        productSearch.addEventListener('input', filterProducts);
    }

    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        backToTop.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeCart();
            closeMenu();
        }
    });

    // Handle #cart hash to re-open cart when returning from checkout
    if (window.location.hash === '#cart') {
        setTimeout(function() {
            openCart();
            history.replaceState(null, null, '/');
        }, 300);
    }
}

/* ---------- Checkout page init ---------- */

function initCheckoutPage() {
    lucideRefresh();
    updateCheckout();
    window.scrollTo({ top: 0, behavior: 'auto' });

    const backBtn = document.getElementById('backToShopBtn');
    if (backBtn) {
        backBtn.addEventListener('click', function(e) {
            e.preventDefault();
            backToShop();
        });
    }

    const editCartBtn = document.getElementById('editCartBtn');
    if (editCartBtn) {
        editCartBtn.addEventListener('click', function(e) {
            e.preventDefault();
            backToCart();
        });
    }

    const editCartBtn2 = document.getElementById('editCartBtn2');
    if (editCartBtn2) {
        editCartBtn2.addEventListener('click', function(e) {
            e.preventDefault();
            backToCart();
        });
    }

    const contShopBtn = document.getElementById('continueShoppingBtn');
    if (contShopBtn) {
        contShopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            backToShop();
        });
    }

    const successShopBtn = document.getElementById('successShopBtn');
    if (successShopBtn) {
        successShopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            backToShop();
        });
    }

    const sendBtn = document.getElementById('sendOrderBtn');
    if (sendBtn) {
        sendBtn.addEventListener('click', function(e) {
            e.preventDefault();
            sendCheckoutOrder();
        });
    }
}

/* ---------- Boot ---------- */

document.addEventListener('DOMContentLoaded', function() {
    loadCart();
    updateCartBadge();
    lucideRefresh();

    const isCheckoutPage = document.body && document.body.dataset.page === 'checkout';

    if (isCheckoutPage) {
        initCheckoutPage();
    } else {
        initHomepage();
    }
});
