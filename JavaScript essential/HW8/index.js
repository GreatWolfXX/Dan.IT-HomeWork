const priceInput  = () => {
    const div = document.querySelector('.info-box')
    const input = document.querySelector('.price-input');
    const delBtn = document.querySelector('.delete-span');
    document.addEventListener('click', event => {
        if(input !== document.activeElement) {

            const fragment = document.createDocumentFragment();

            const pText = document.createElement('p');
            pText.innerText = `Текущая цена: ${input.value}`;
            pText.className = 'text-with-price'
            fragment.append(pText);

            const delBtn = document.createElement('span');
            delBtn.innerText = '⮾';
            delBtn.className = 'delete-span';
            fragment.append(delBtn);

            div.prepend(fragment);
        }
    });
    delBtn.addEventListener('click', (event) => {
        delBtn.remove()
    })
}
priceInput()