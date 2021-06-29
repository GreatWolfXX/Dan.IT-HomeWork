window.onload = () => {
    activeServicesMenu()
    activeAmazingWorkMenu();
    setContentForAmazingWorkSection(objectForAmazingWorkContent, 12);
    loadAllImagesForAmazingWorkSection();
}

/* Services Menu */
const activeServicesMenu = () => {
    const servicesMenu = document.querySelector('.services-menu');

    servicesMenu.onclick = function(event) {
        const menuServicesItem = event.target;
        if(menuServicesItem.classList.toString() !== "services-menu-item") {
            const infoElements = document.querySelectorAll('.content-item-services');
            const infoElement = document.querySelector(menuServicesItem.dataset.section);
            for (let i = 0; i < this.children.length; i++) {
                this.children[i].children[0].classList.remove('active');
                infoElements[i].classList.add('inactive');
            }
            menuServicesItem.classList.add('active');
            infoElement.classList.remove('inactive');
        }
    }
}

/* Amazing Menu */
let typeCurrentMenu = 'all';
const amazingWorkMenu = document.querySelector('.amazing-menu');
const btnLoadImages = document.querySelector('#load-work-btn');
const objectForAmazingWorkContent = [
    {
        image: 'images/graphic design/graphic-design1.jpg',
        filter_type: 'Graphic Design',
    },
    {
        image: 'images/graphic design/graphic-design2.jpg',
        filter_type: 'Graphic Design',
    },
    {
        image: 'images/graphic design/graphic-design3.jpg',
        filter_type: 'Graphic Design',
    },
    {
        image: 'images/graphic design/graphic-design4.jpg',
        filter_type: 'Graphic Design',
    },
    {
        image: 'images/graphic design/graphic-design5.jpg',
        filter_type: 'Graphic Design',
    },
    {
        image: 'images/graphic design/graphic-design6.jpg',
        filter_type: 'Graphic Design',
    },
    {
        image: 'images/graphic design/graphic-design7.jpg',
        filter_type: 'Graphic Design',
    },
    {
        image: 'images/graphic design/graphic-design8.jpg',
        filter_type: 'Graphic Design',
    },
    {
        image: 'images/graphic design/graphic-design9.jpg',
        filter_type: 'Graphic Design',
    },
    {
        image: 'images/graphic design/graphic-design10.jpg',
        filter_type: 'Graphic Design',
    },
    {
        image: 'images/graphic design/graphic-design11.jpg',
        filter_type: 'Graphic Design',
    },
    {
        image: 'images/graphic design/graphic-design12.jpg',
        filter_type: 'Graphic Design',
    },
    {
        image: 'images/web design/web-design1.jpg',
        filter_type: 'Web Design',
    },
    {
        image: 'images/web design/web-design2.jpg',
        filter_type: 'Web Design',
    },
    {
        image: 'images/web design/web-design3.jpg',
        filter_type: 'Web Design',
    },
    {
        image: 'images/web design/web-design4.jpg',
        filter_type: 'Web Design',
    },
    {
        image: 'images/web design/web-design5.jpg',
        filter_type: 'Web Design',
    },
    {
        image: 'images/web design/web-design6.jpg',
        filter_type: 'Web Design',
    },
    {
        image: 'images/web design/web-design7.jpg',
        filter_type: 'Web Design',
    },
    {
        image: 'images/landing page/landing-page1.jpg',
        filter_type: 'Landing Pages',
    },
    {
        image: 'images/landing page/landing-page2.jpg',
        filter_type: 'Landing Pages',
    },
    {
        image: 'images/landing page/landing-page3.jpg',
        filter_type: 'Landing Pages',
    },
    {
        image: 'images/landing page/landing-page4.jpg',
        filter_type: 'Landing Pages',
    },
    {
        image: 'images/landing page/landing-page5.jpg',
        filter_type: 'Landing Pages',
    },
    {
        image: 'images/landing page/landing-page6.jpg',
        filter_type: 'Landing Pages',
    },
    {
        image: 'images/landing page/landing-page7.jpg',
        filter_type: 'Landing Pages',
    },
    {
        image: 'images/wordpress/wordpress1.jpg',
        filter_type: 'Wordpress',
    },
    {
        image: 'images/wordpress/wordpress2.jpg',
        filter_type: 'Wordpress',
    },
    {
        image: 'images/wordpress/wordpress3.jpg',
        filter_type: 'Wordpress',
    },
    {
        image: 'images/wordpress/wordpress4.jpg',
        filter_type: 'Wordpress',
    },
    {
        image: 'images/wordpress/wordpress5.jpg',
        filter_type: 'Wordpress',
    },
    {
        image: 'images/wordpress/wordpress6.jpg',
        filter_type: 'Wordpress',
    },
    {
        image: 'images/wordpress/wordpress7.jpg',
        filter_type: 'Wordpress',
    },
    {
        image: 'images/wordpress/wordpress8.jpg',
        filter_type: 'Wordpress',
    },
    {
        image: 'images/wordpress/wordpress9.jpg',
        filter_type: 'Wordpress',
    },
    {
        image: 'images/wordpress/wordpress10.jpg',
        filter_type: 'Wordpress',
    },
]

const activeAmazingWorkMenu = () => {
    amazingWorkMenu.onclick = function(event) {
        const menuServicesItem = event.target;

        typeCurrentMenu = event.target.innerText.toLowerCase();

        for(const elem of this.children) {
            elem.children[0].classList.remove('active');
        }
        menuServicesItem.classList.add('active');

        if(typeCurrentMenu !== 'all') {
            setFilterContentForAmazingWorkSection(typeCurrentMenu, 12)
        } else {
            setContentForAmazingWorkSection(objectForAmazingWorkContent, 12)
        }
        btnLoadImages.classList.remove('inactive');

    }
}

const setContentForAmazingWorkSection = (array, maxPreloadImages) => {
    removeContentForAmazingWorkSection()

    const contentItemAmazing = document.querySelector('.content-image-amazing');
    const fragmentItemAmazing = document.createDocumentFragment();

    for(let i = 0; i < maxPreloadImages; i++) {
        const divItemAmazing = document.createElement('div',);
        divItemAmazing.setAttribute('class', 'image-work-container');
        const itemAmazing = document.createElement('img',);
        const hoverItemAmazing = document.querySelector('.hover-work-container').cloneNode(true);
        const hoverSubTextAmazing = hoverItemAmazing.children[0].children[2];

        if(array[i] !== undefined) {
            itemAmazing.setAttribute('src',  array[i].image);
            itemAmazing.setAttribute('class', 'image-amazing-work');
            hoverSubTextAmazing.innerText = array[i].filter_type;
            divItemAmazing.append(itemAmazing)
            divItemAmazing.append(hoverItemAmazing)
            fragmentItemAmazing.append(divItemAmazing);
        }
    }

    contentItemAmazing.append(fragmentItemAmazing);
}

const loadAllImagesForAmazingWorkSection = () => {
    btnLoadImages.addEventListener('click', () => {
        if(typeCurrentMenu !== 'all') {
            setFilterContentForAmazingWorkSection(typeCurrentMenu, objectForAmazingWorkContent.length)
        } else {
            setContentForAmazingWorkSection(objectForAmazingWorkContent, objectForAmazingWorkContent.length)
        }
        btnLoadImages.classList.add('inactive');
    })
}

const setFilterContentForAmazingWorkSection = (nameFilter, maxPreloadImages) => {
    const array = objectForAmazingWorkContent.filter(elem => elem.filter_type.toLowerCase() === nameFilter);
    if(array.length < 12) {
        btnLoadImages.classList.add('inactive');
    }
    setContentForAmazingWorkSection(array, maxPreloadImages)
}

const removeContentForAmazingWorkSection = () => {
    const itemAmazing = document.querySelectorAll('.image-amazing-work')
    itemAmazing.forEach(function(elem){
        elem.parentNode.removeChild(elem);
    });
}


/* Swiper */
const swiper = new Swiper('.swiper1', {
    // Optional parameters
    direction: 'horizontal',
    slidesPerView: 3,
    centeredSlides: true,
    spaceBetween: 30,
    loop: true,

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    }
});

const swiper2 = new Swiper('.swiper2', {
    // Optional parameters
    direction: 'horizontal',
    slidesPerView: 1,
    centeredSlides: true,
    spaceBetween: 30,
    loop: true,

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    }
});
/* Masonry */
var msnry = new Masonry( ".grid", {
    itemSelector: ".grid-item",
    horizontalOrder: true,
    gutter: 12
});