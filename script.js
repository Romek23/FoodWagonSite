document.addEventListener('DOMContentLoaded',function(){
  var navToggle=document.querySelector('.nav-toggle');
  var primaryNav=document.getElementById('primary-nav');
  navToggle.addEventListener('click',function(){
    var open=primaryNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded',open?'true':'false');
  });

  var modal=document.getElementById('modal');
  var orderBtn=document.getElementById('orderBtn');
  var orderNow=document.getElementById('orderNow');
  var modalCloseElems=document.querySelectorAll('[data-close="true"]');

  function openModal(){
    modal.setAttribute('aria-hidden','false');
    document.body.style.overflow='hidden';
    var first=modal.querySelector('input,button,textarea');
    if(first) first.focus();
  }
  function closeModal(){
    modal.setAttribute('aria-hidden','true');
    document.body.style.overflow='';
  }
  if(orderBtn) orderBtn.addEventListener('click',openModal);
  if(orderNow) orderNow.addEventListener('click',openModal);
  modalCloseElems.forEach(function(el){el.addEventListener('click',closeModal)});
  modal.addEventListener('click',function(e){
    if(e.target.classList.contains('modal-overlay')) closeModal();
  });
  document.addEventListener('keydown',function(e){
    if(e.key==='Escape' && modal.getAttribute('aria-hidden')==='false') closeModal();
  });

  var productsList=document.getElementById('products');
  var products=[
    {id:1,name:'Бургер класичний',desc:'Соковитий яловичий бургер з сиром',price:'149 грн',img:'images/product-1.jpg'},
    {id:2,name:'Піца Маргарита',desc:'Тонка основа, соус помідор, моцарела',price:'199 грн',img:'images/product-2.jpg'},
    {id:3,name:'Сет з куркою',desc:'Набір з курячих крилець та соусів',price:'249 грн',img:'images/product-3.jpg'},
    {id:4,name:'Салат місцевий',desc:'Зелень, овочі та соус власного рецепту',price:'99 грн',img:'images/product-4.jpg'}
  ];
  function renderProducts(){
    productsList.innerHTML='';
    products.forEach(function(p){
      var item=document.createElement('article');
      item.className='product';
      item.setAttribute('role','listitem');
      item.innerHTML='<div class="product-media"><img src="'+p.img+'" alt="'+p.name+'" width="96" height="96"></div><div class="product-body"><h3>'+p.name+'</h3><p>'+p.desc+'</p><div class="product-meta"><span class="price">'+p.price+'</span><button class="btn btn-ghost" data-id="'+p.id+'">Додати</button></div></div>';
      productsList.appendChild(item);
    });
  }
  renderProducts();

  var galleryTrack=document.getElementById('galleryTrack');
  var prevBtn=document.querySelector('.gallery-btn.prev');
  var nextBtn=document.querySelector('.gallery-btn.next');
  if(prevBtn && nextBtn && galleryTrack){
    prevBtn.addEventListener('click',function(){galleryTrack.scrollBy({left:-360,behavior:'smooth'})});
    nextBtn.addEventListener('click',function(){galleryTrack.scrollBy({left:360,behavior:'smooth'})});
  }

  var contactForm=document.getElementById('contactForm');
  if(contactForm){
    contactForm.addEventListener('submit',function(e){
      e.preventDefault();
      var submitBtn=contactForm.querySelector('button[type="submit"]');
      submitBtn.textContent='Відправлено';
      setTimeout(function(){submitBtn.textContent='Надіслати'; contactForm.reset();},1500);
    });
  }

  var orderForm=document.getElementById('orderForm');
  if(orderForm){
    orderForm.addEventListener('submit',function(e){
      e.preventDefault();
      var btn=orderForm.querySelector('button[type="submit"]');
      btn.textContent='Дякуємо';
      setTimeout(function(){btn.textContent='Підтвердити'; orderForm.reset(); closeModal();},1400);
    });
  }
});
