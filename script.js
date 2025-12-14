// Minimal interactions: update cart badge and focus styles
document.addEventListener('DOMContentLoaded', function(){
	const cartBadge = document.querySelector('.cart-badge');
	const cartBtn = document.querySelector('.cart-btn');
	const searchInput = document.getElementById('site-search');

	// Initialize cart count to 0 on page load
	let count = 0;

	function updateBadge(){
		if(!cartBadge) return;
		cartBadge.textContent = count > 99 ? '99+' : String(count);
		// Always show badge; user request: show 0 by default
		cartBadge.style.display = 'inline-flex';
	}

	// Click cart to demo increment (remove in production)
	if(cartBtn){
		cartBtn.addEventListener('click', function(e){
			e.preventDefault();
			count = Math.min(999, count + 1);
			updateBadge();
			cartBtn.animate([{transform:'scale(1)'},{transform:'scale(1.06)'},{transform:'scale(1)'}],{duration:220});
		});
	}

	if(searchInput){
		searchInput.addEventListener('focus', ()=>{
			searchInput.parentElement.style.boxShadow = '0 6px 18px rgba(82,72,120,0.08)';
		});
		searchInput.addEventListener('blur', ()=>{
			searchInput.parentElement.style.boxShadow = '0 2px 6px rgba(34,34,40,0.03)';
		});
	}

	// Animated nav underline
	const nav = document.querySelector('.main-nav');
	const navLinks = Array.from(document.querySelectorAll('.main-nav a'));
	const underline = document.querySelector('.nav-underline');

	function placeUnderline(el){
		if(!el || !underline || !nav) return;
		const navRect = nav.getBoundingClientRect();
		const rect = el.getBoundingClientRect();
		const left = rect.left - navRect.left;
		underline.style.left = Math.round(left) + 'px';
		underline.style.width = Math.round(rect.width) + 'px';
		underline.style.opacity = '1';
	}

	// initialize
	const initial = document.querySelector('.main-nav a.active') || navLinks[0];
	placeUnderline(initial);

	// click/focus handlers
	navLinks.forEach(link=>{
		link.addEventListener('click', (e)=>{
			// allow normal navigation; update active class for demo
			navLinks.forEach(l=>l.classList.remove('active'));
			link.classList.add('active');
			placeUnderline(link);
		});
		link.addEventListener('focus', ()=>placeUnderline(link));
	});

	// Dropdown toggle click behaviour for touch/devices
	const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

	dropdownToggles.forEach(toggle => {
		const menu = toggle.parentElement.querySelector('.dropdown-menu');
		if(!menu) return;
		// open/close on click (useful for touch)
		toggle.addEventListener('click', (e) => {
			e.preventDefault();
			const isOpen = menu.classList.contains('show');
			// close other dropdowns
			document.querySelectorAll('.dropdown-menu.show').forEach(m => { if(m !== menu) m.classList.remove('show'); });
			menu.classList.toggle('show', !isOpen);
			toggle.setAttribute('aria-expanded', String(!isOpen));
		});

		// keyboard support
		toggle.addEventListener('keydown', (e) => {
			if(e.key === 'Enter' || e.key === ' '){
				e.preventDefault();
				toggle.click();
			}
			if(e.key === 'ArrowDown'){
				e.preventDefault();
				const first = menu.querySelector('.dropdown-item');
				first && first.focus();
			}
		});

		// close on Escape from menu
		menu.addEventListener('keydown', (e) => {
			if(e.key === 'Escape'){
				menu.classList.remove('show');
				toggle.setAttribute('aria-expanded','false');
				toggle.focus();
			}
		});
	});

	// close dropdowns on outside click
	document.addEventListener('click', (e) => {
		dropdownToggles.forEach(toggle => {
			const menu = toggle.parentElement.querySelector('.dropdown-menu');
			if(!menu) return;
			if(!toggle.parentElement.contains(e.target)){
				menu.classList.remove('show');
				toggle.setAttribute('aria-expanded','false');
			}
		});
	});

	// reposition on resize (debounced)
	let rto;
	window.addEventListener('resize', ()=>{
		clearTimeout(rto);
		rto = setTimeout(()=>{
			const active = document.querySelector('.main-nav a.active') || navLinks[0];
			placeUnderline(active);
		}, 120);
	});

	updateBadge();
});
