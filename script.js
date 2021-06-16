const images = [
    {
        "previewImage": "https://images.unsplash.com/photo-1561948955-570b270e7c36?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        "title": "cat.jpeg"
    },
    {
        "previewImage": "https://images.unsplash.com/photo-1606787620819-8bdf0c44c293?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        "title": "cooking couple shoot portofilio(1).jpg"
    },
    {
        "previewImage": "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        "title": "bali-kelingking-beach-plastic-removal-drive.key"
    },
    {
        "previewImage": "https://images.unsplash.com/photo-1623206837956-07dab21608f6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        "title": "NextByk Investor Pitch 2021.ppt"
    },
    {
        "previewImage": "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
        "title": "interns-performance-report-june-2021.key"
    }
];


const menu = document.querySelector('.menu');
const previewImage = document.querySelector('.preview-image');
const caption = document.querySelector('.caption');

const createMenu = (images) => {
    images.forEach((image) => {
        let menuItem = document.createElement('div');
        menu.append(menuItem);
        menuItem.classList.add('menuItem');
        menuItem.innerHTML = `
        <img class="menu-photo" src="${image.previewImage}" name="${image.title}">
        <span class="title">${image.title}</span>`;
    });  
    checkTitleOverflow();
}

const checkTitleOverflow = () => {
    let titles = document.querySelectorAll('.title');
    titles.forEach(title => {
        if(title.clientWidth < title.scrollWidth) fitContent(title);
    });
}

const fitContent = (title) =>{
    let content = title.textContent;
    let l=0, r=content.length;
    let halfLength = Math.floor(content.length/2);
    
    while(l<=r){
        let mid = Math.floor((l+r)/2);
        let removeLeft = Math.floor(mid/2);
        let removeRight = mid - removeLeft;
        let left = content.slice(0,halfLength-removeLeft);
        let right = content.slice(halfLength+removeRight,);
        title.textContent = left + '...' + right;

        if(r==l) break;
        (title.clientWidth < title.scrollWidth)? (l=mid+1) : (r=mid);
    }
}

const createInitialPreview = (image) => {
    previewImage.setAttribute('src', image.previewImage);
    caption.innerHTML = image.title;
}

const handleKeydown = (event,menuItems) => {
    if(event.key !== 'ArrowUp' && event.key !== 'ArrowDown') return;
    event.preventDefault();
    const length = menuItems.length;
    (event.key === 'ArrowUp')? (index=(length+index-1)%length) : (index=(index+1)%length);
    handleClick(menuItems[index]);
}

const handleClick = (item) => {
    if (seleted) seleted.classList.remove('selected');
    item.classList.add('selected');
    seleted = item;
    let children = item.children;
    previewImage.setAttribute('src', children[0].getAttribute('src'));
    caption.innerHTML = children[0].getAttribute('name');
}

createMenu(images);

const menuItems = document.querySelectorAll('.menuItem');
let index = 0;
let seleted = menuItems[index];
menuItems[index].classList.add('selected');
createInitialPreview(images[index]);

menuItems.forEach((item, itemIndex) => {
    item.addEventListener('click', () => {
        index = itemIndex;
        handleClick(item);
    }
    );
});

document.addEventListener('keydown', (event) => handleKeydown(event,menuItems));