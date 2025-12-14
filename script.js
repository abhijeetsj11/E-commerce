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

	updateBadge();
});
