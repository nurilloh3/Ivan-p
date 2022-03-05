window.addEventListener('DOMContentLoaded', function() {
    //tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
            tabsContent = document.querySelectorAll('.tabcontent'),
            tabsParent = document.querySelector('.tabheader__items')


    function hideTabContent() {
        tabsContent.forEach(item => {
            item.style.display = 'none';
        })

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        })
    }

    function showTabContnet(i = 0) {
        tabsContent[i].style.display = 'block';
        tabs[i].classList.add('tabheader__item_active')
    }

    hideTabContent();
    showTabContnet();


    tabsParent.addEventListener('click', (event) => {
        const target = event.target;
        if(target && target.classList.contains('tabheader__item')){
            tabs.forEach((item, i)=>{
                if(target == item){
                    hideTabContent();
                    showTabContnet(i);
                }
            })
        }
    })


    //Timer


    const deadline = '02-20-2022';
    function getTime(endtime){
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / (1000*60*60*24)),
            hours = Math.floor((t / (1000 * 60 * 60)) % 24),
            minutes = Math.floor((t / (1000 * 60)) % 60),
            seconds = Math.floor((t/ 1000) % 60);
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        }
    }

    function getZero(num){
        if(num >= 0 && num < 10){
            return `0${num}`
        }else{
            return num
        }
    }

    function setTime (selector, endtime){
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds');
        
        let id = setInterval(updateClock, 1000)
        updateClock()

        function updateClock () {

            const t = getTime(endtime);
            if(t.total <= 0) {
                clearInterval(id)
                days.innerHTML = getZero(0);
                hours.innerHTML = getZero(0);
                minutes.innerHTML = getZero(0);
                seconds.innerHTML = getZero(0);
            }else{
                days.innerHTML = getZero(t.days);
                hours.innerHTML = getZero(t.hours);
                minutes.innerHTML = getZero(t.minutes);
                seconds.innerHTML = getZero(t.seconds);
            }

        }
    }

    setTime('.timer', deadline);

    // Modal

    const modal = document.querySelector('.modal');
    const modalTrigger = document.querySelectorAll('[data-modal]');
    const modalClose = document.querySelector('[data-close]');


    modalTrigger.forEach(e => {
        e.addEventListener('click', modalShow)
    })
    modalClose.addEventListener('click', modalHide)

    modal.addEventListener('click', e => {
        const target = e.target;
        if(target === modal) {
            modalHide()
        }
    })

    document.addEventListener('keydown', e => {
        if(e.code === 'Escape' && modal.style.display === 'block') {
            modalHide()
            console.log('Escape')
        }
    })

    const modalTimerId = setTimeout(modalShow, 3000)
    function modalShow() {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'
        clearInterval(modalTimerId)
    }
    function modalHide(){
        modal.style.display = 'none';
        document.body.style.overflow = ''
    }
    function showModalByScroll() {
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            modalShow()
            window.removeEventListener('scroll', showModalByScroll)
        }
    }
    window.addEventListener('scroll', showModalByScroll)

    //menu

    class MenuItem{
        constructor(img, alt, title, descr, price, parrentSelector, ...itemClass){
            this.img = img;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parrent = document.querySelector(parrentSelector);
            this.itemClass = itemClass;

        }
        render(){
            const item = document.createElement('div');
            item.innerHTML = `
                <img src=${this.img} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `
            if(this.itemClass.length === 0){
                this.itemClass = 'menu__item';
                item.classList.add(this.itemClass)
            }else{
                this.itemClass.forEach(className => this.itemClass.classList.add(className))
            }
            this.parrent.append(item);
        }
    }

    new MenuItem(
        'img/tabs/vegy.jpg',
        'vegy',
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        229,
        '.menu__field .container'
    )
        .render()

    new MenuItem(
        'img/tabs/elite.jpg',
        'elite',
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        550,
        '.menu__field .container'
    )
        .render()
    
    new MenuItem(
        'img/tabs/post.jpg',
        'post',
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        430,
        '.menu__field .container'
    )
        .render()
    

})