// Minimal interactions: update cart badge and focus styles
document.addEventListener('DOMContentLoaded', function(){
	const cartBadge = document.querySelector('.cart-badge');
	const cartBtn = document.querySelector('.cart-btn');
	const searchInput = document.getElementById('site-search');

	// Example starting count (matches markup)
	let count = parseInt(cartBadge?.textContent || '0', 10);

	function updateBadge(){
		if(!cartBadge) return;
		cartBadge.textContent = count > 99 ? '99+' : String(count);
		cartBadge.style.display = count > 0 ? 'inline-flex' : 'none';
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
