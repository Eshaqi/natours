require("@babel/polyfill");
var $jdyyP$axios = require("axios");


function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}

/* eslint-disable */ const $1bd25b40574edc9e$export$4c5dd147b21b9176 = (locations)=>{
    var map = L.map('map', {
        zoomControl: false
    });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    const points = [];
    locations.forEach((loc)=>{
        points.push([
            loc.coordinates[1],
            loc.coordinates[0]
        ]);
        L.marker([
            loc.coordinates[1],
            loc.coordinates[0]
        ]).addTo(map).bindPopup(`<p>Day ${loc.day}: ${loc.description}</p>`, {
            autoClose: false
        }).openPopup();
    });
    const bounds = L.latLngBounds(points).pad(0.5);
    map.fitBounds(bounds);
    map.scrollWheelZoom.disable();
};


/* eslint-disable */ 
/* eslint-disable */ const $2d6b4fb367f7c074$export$516836c6a9dfc573 = ()=>{
    const el = document.querySelector('.alert');
    if (el) el.parentElement.removeChild(el);
};
const $2d6b4fb367f7c074$export$de026b00723010c1 = (type, msg, time = 7)=>{
    $2d6b4fb367f7c074$export$516836c6a9dfc573();
    const markup = `<div class="alert alert--${type}">${msg}</div>`;
    document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
    window.setTimeout($2d6b4fb367f7c074$export$516836c6a9dfc573, time * 1000);
};


const $775abdec7d40fe17$export$596d806903d1f59e = async (email, password)=>{
    try {
        const res = await (0, ($parcel$interopDefault($jdyyP$axios)))({
            method: 'POST',
            url: '/api/v1/users/login',
            data: {
                email: email,
                password: password
            }
        });
        if (res.data.status === 'success') {
            (0, $2d6b4fb367f7c074$export$de026b00723010c1)('success', 'Logged in successfully!');
            window.setTimeout(()=>{
                location.assign('/');
            }, 1500);
        }
    } catch (err) {
        (0, $2d6b4fb367f7c074$export$de026b00723010c1)('error', err.response.data.message);
    }
};
const $775abdec7d40fe17$export$a0973bcfe11b05c9 = async ()=>{
    try {
        const res = await (0, ($parcel$interopDefault($jdyyP$axios)))({
            method: 'GET',
            url: '/api/v1/users/logout'
        });
        res.data.status = 'success';
        location.reload(true);
        location.assign('/');
    } catch (err) {
        console.log(err.response);
        (0, $2d6b4fb367f7c074$export$de026b00723010c1)('error', 'Error logging out! Try again.');
    }
};


/* eslint-disable */ 

const $751a50af865a6d2c$export$f558026a994b6051 = async (data, type)=>{
    try {
        const url = type === 'password' ? '/api/v1/users/updateMyPassword' : '/api/v1/users/updateMe';
        const res = await (0, ($parcel$interopDefault($jdyyP$axios)))({
            method: 'PATCH',
            url: url,
            data: data
        });
        if (res.data.status === 'success') {
            (0, $2d6b4fb367f7c074$export$de026b00723010c1)('success', `${type.toUpperCase()} updated successfully!`);
            // location.reload();
            window.setTimeout(()=>{
                location.reload();
            }, 1000);
        }
    } catch (err) {
        (0, $2d6b4fb367f7c074$export$de026b00723010c1)('error', err.response.data.message);
    }
};


/* eslint-disable */ 

const $29abee557e7f55a9$var$stripe = Stripe('pk_test_51QwwdZKOtqWbbHoHPVZfXnTJqIdLIJmlLgNZpYTqojaI35jfazr7uxX5IT2kew4ROs6IT108oLYorcMAVS3JzVs700P5O36mK8');
const $29abee557e7f55a9$export$8d5bdbf26681c0c2 = async (tourId)=>{
    try {
        // 1) Get checkout session from API
        const session = await (0, ($parcel$interopDefault($jdyyP$axios)))(`/api/v1/bookings/checkout-session/${tourId}`);
        console.log(session);
        // 2) Create checkout form + chanre credit card
        await $29abee557e7f55a9$var$stripe.redirectToCheckout({
            sessionId: session.data.session.id
        });
    } catch (err) {
        console.log(err);
        (0, $2d6b4fb367f7c074$export$de026b00723010c1)('error', err);
    }
};



//DOM elements
const $37da9664eaa7cb92$var$mapBox = document.getElementById('map');
const $37da9664eaa7cb92$var$loginForm = document.querySelector('.form--login');
const $37da9664eaa7cb92$var$logOutBtn = document.querySelector('.nav__el--logout');
const $37da9664eaa7cb92$var$userDataForm = document.querySelector('.form-user-data');
const $37da9664eaa7cb92$var$userPasswordForm = document.querySelector('.form-user-password');
const $37da9664eaa7cb92$var$bookBtn = document.getElementById('book-tour');
//Delegation
if ($37da9664eaa7cb92$var$mapBox) {
    const locations = JSON.parse($37da9664eaa7cb92$var$mapBox.dataset.locations);
    (0, $1bd25b40574edc9e$export$4c5dd147b21b9176)(locations);
}
if ($37da9664eaa7cb92$var$loginForm) $37da9664eaa7cb92$var$loginForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    (0, $775abdec7d40fe17$export$596d806903d1f59e)(email, password);
});
if ($37da9664eaa7cb92$var$logOutBtn) $37da9664eaa7cb92$var$logOutBtn.addEventListener('click', (0, $775abdec7d40fe17$export$a0973bcfe11b05c9));
if ($37da9664eaa7cb92$var$userDataForm) $37da9664eaa7cb92$var$userDataForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);
    // const name = document.getElementById('name').value;
    // const email = document.getElementById('email').value;
    (0, $751a50af865a6d2c$export$f558026a994b6051)(form, 'data');
});
if ($37da9664eaa7cb92$var$userPasswordForm) $37da9664eaa7cb92$var$userPasswordForm.addEventListener('submit', async (e)=>{
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'Updating...';
    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await (0, $751a50af865a6d2c$export$f558026a994b6051)({
        passwordCurrent: passwordCurrent,
        password: password,
        passwordConfirm: passwordConfirm
    }, 'password');
    document.querySelector('.btn--save-password').textContent = 'Save password';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
});
if ($37da9664eaa7cb92$var$bookBtn) $37da9664eaa7cb92$var$bookBtn.addEventListener('click', (e)=>{
    e.target.textContent = 'Processing...';
    const { tourId: tourId } = e.target.dataset;
    (0, $29abee557e7f55a9$export$8d5bdbf26681c0c2)(tourId);
});
const $37da9664eaa7cb92$var$alertMessage = document.querySelector('body').dataset.alert;
if (alert) (0, $2d6b4fb367f7c074$export$de026b00723010c1)('Success', $37da9664eaa7cb92$var$alertMessage, 20);


//# sourceMappingURL=app.js.map
