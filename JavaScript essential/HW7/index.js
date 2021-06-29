const list = ["hello", "world", "Kiev", "Kharkiv", "Odessa", "Lviv"];

const createList = (list, element = document.body) => {
    const ulList = document.createElement('ul');

    const listWithLi = list.map(elem => `<li>${elem}</li>`).join('')

    ulList.innerHTML = listWithLi

    element.append(ulList);
}

createList(list);