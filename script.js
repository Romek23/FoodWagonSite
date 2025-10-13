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
    {id:1,name:'Бургер класичний',desc:'Соковитий яловичий бургер з сиром',price:'149 грн',img:'images/burger.jpg'},
    {id:2,name:'Піца Маргарита',desc:'Тонка основа, соус помідор, моцарела',price:'199 грн',img:'images/pizza-margarita.jpg'},
    {id:3,name:'Сет з куркою',desc:'Набір з курячих крилець та соусів',price:'249 грн',img:'images/chicken-set.jpg'},
    {id:4,name:'Салат місцевий',desc:'Зелень, курка, овочі та соус власного рецепту',price:'99 грн',img:'images/salad.jpg'}
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

var galleryTrack = document.getElementById('galleryTrack');
var galleryProgress = document.getElementById('galleryProgress');
var prevBtn = document.querySelector('.gallery-btn.prev');
var nextBtn = document.querySelector('.gallery-btn.next');

if (galleryTrack && galleryProgress) {
    var images = galleryTrack.querySelectorAll('img');
    var scrollAmount = 300;
    
   
    images.forEach((_, index) => {
        var dot = document.createElement('div');
        dot.className = 'progress-dot' + (index === 0 ? ' active' : '');
        dot.setAttribute('data-index', index);
        dot.addEventListener('click', function() {
            var index = parseInt(this.getAttribute('data-index'));
            scrollToImage(index);
        });
        galleryProgress.appendChild(dot);
    });

    function scrollToImage(index) {
        var image = images[index];
        galleryTrack.scrollTo({
            left: image.offsetLeft - galleryTrack.offsetLeft,
            behavior: 'smooth'
        });
        updateProgress(index);
    }

    function updateProgress(activeIndex) {
        var dots = galleryProgress.querySelectorAll('.progress-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === activeIndex);
        });
    }

    function getVisibleImageIndex() {
        var trackRect = galleryTrack.getBoundingClientRect();
        var center = trackRect.left + trackRect.width / 2;
        
        for (var i = 0; i < images.length; i++) {
            var imgRect = images[i].getBoundingClientRect();
            if (imgRect.left <= center && imgRect.right >= center) {
                return i;
            }
        }
        return 0;
    }

    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            var currentIndex = getVisibleImageIndex();
            var newIndex = Math.max(0, currentIndex - 1);
            scrollToImage(newIndex);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            var currentIndex = getVisibleImageIndex();
            var newIndex = Math.min(images.length - 1, currentIndex + 1);
            scrollToImage(newIndex);
        });
    }

   
    galleryTrack.addEventListener('scroll', function() {
        var activeIndex = getVisibleImageIndex();
        updateProgress(activeIndex);
    });

    
    var autoScroll = setInterval(function() {
        var currentIndex = getVisibleImageIndex();
        var nextIndex = (currentIndex + 1) % images.length;
        scrollToImage(nextIndex);
    }, 5000);

    
    galleryTrack.addEventListener('mouseenter', function() {
        clearInterval(autoScroll);
    });

    galleryTrack.addEventListener('mouseleave', function() {
        autoScroll = setInterval(function() {
            var currentIndex = getVisibleImageIndex();
            var nextIndex = (currentIndex + 1) % images.length;
            scrollToImage(nextIndex);
        }, 5000);
    });
}

var detectLocationBtn = document.getElementById('detectLocation');
var locationResult = document.getElementById('locationResult');
var locationStatus = document.getElementById('locationStatus');
var quickOrderForm = document.getElementById('quickOrderForm');
var confirmedAddress = document.getElementById('confirmedAddress');
var confirmOrderBtn = document.getElementById('confirmOrder');
var map;

if (detectLocationBtn) {
    detectLocationBtn.addEventListener('click', function() {
        getLocation();
    });
}

if (confirmOrderBtn) {
    confirmOrderBtn.addEventListener('click', function() {
        placeQuickOrder();
    });
}

function getLocation() {
    detectLocationBtn.disabled = true;
    detectLocationBtn.innerHTML = '🔄 Визначення місця...';
    
    locationResult.innerHTML = '';
    locationResult.className = 'location-result';
    
    if (!navigator.geolocation) {
        showLocationError('Геолокація не підтримується вашим браузером');
        return;
    }
    
    navigator.geolocation.getCurrentPosition(
        function(position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
            getAddressFromCoordinates(latitude, longitude);
        },
        function(error) {
            var errorMessage = 'Не вдалося визначити місцезнаходження. ';
            
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    errorMessage += 'Дозвіл на геолокацію відхилено.';
                    break;
                case error.POSITION_UNAVAILABLE:
                    errorMessage += 'Інформація про місцезнаходження недоступна.';
                    break;
                case error.TIMEOUT:
                    errorMessage += 'Час очікування геолокації вийшов.';
                    break;
                default:
                    errorMessage += 'Сталася невідома помилка.';
                    break;
            }
            
            showLocationError(errorMessage);
        }
    );
}

function getAddressFromCoordinates(lat, lng) {
    var geocoder = new google.maps.Geocoder();
    var latlng = {lat: lat, lng: lng};
    
    geocoder.geocode({'location': latlng}, function(results, status) {
        if (status === 'OK') {
            if (results[0]) {
                var address = results[0].formatted_address;
                showLocationSuccess(address, lat, lng);
            } else {
                showLocationError('Адресу не знайдено');
            }
        } else {
            showLocationError('Помилка геокодінга: ' + status);
        }
    });
}

function showLocationSuccess(address, lat, lng) {
    locationResult.innerHTML = '✅ Місцезнаходження успішно визначено!';
    locationResult.className = 'location-result success';
    
    locationStatus.innerHTML = `
        <div class="status-icon">✅</div>
        <div class="status-text">
            <strong>Адреса визначена:</strong><br>
            ${address}
        </div>
    `;
    
    confirmedAddress.textContent = address;
    confirmedAddress.setAttribute('data-lat', lat);
    confirmedAddress.setAttribute('data-lng', lng);
    quickOrderForm.style.display = 'block';
    detectLocationBtn.style.display = 'none';
}

function showLocationError(message) {
    locationResult.innerHTML = '❌ ' + message;
    locationResult.className = 'location-result error';
    
    detectLocationBtn.disabled = false;
    detectLocationBtn.innerHTML = '📍 Спробувати знову';
}

function placeQuickOrder() {
    var address = confirmedAddress.textContent;
    var lat = confirmedAddress.getAttribute('data-lat');
    var lng = confirmedAddress.getAttribute('data-lng');
    
    confirmOrderBtn.disabled = true;
    confirmOrderBtn.textContent = '🔄 Замовлення створюється...';
    
    setTimeout(function() {
        confirmOrderBtn.textContent = '✅ Замовлення прийнято!';
        locationStatus.innerHTML = `
            <div class="status-icon">🎉</div>
            <div class="status-text">
                <strong>Замовлення прийнято!</strong><br>
                Доставляємо за адресою:<br>
                <strong>${address}</strong><br>
                Очікуйте дзвінка кур'єра
            </div>
        `;
        
        setTimeout(function() {
            openModal();
            confirmOrderBtn.textContent = 'Замовити за цією адресою';
            confirmOrderBtn.disabled = false;
        }, 2000);
    }, 2000);
}
});
