const btnLogin = document.querySelector('.btn-login');
const NUMBER_CHILD_CARDS_BOARD = 2;
let tempPositionShowMore = 0;
let tempPositionEdit = 0;

class Modal {
    constructor(btnLogin) {
        this._modalViewLogin = document.querySelector('.login-container');
        this._modalViewCreateVisit = document.querySelector('.create-visit-container');
        this._btnClose = document.querySelectorAll('.btn-close');
        this._btnModalLogin = document.querySelector('.form-login__btn-confirm');
        this._inputEmail = document.querySelector('.form-login__input-login');
        this._inputPassword = document.querySelector('.form-login__input-password');
        this._errorText = document.querySelector('.form-login__text-error');
        this._selectDoctor = document.querySelector('.form-visit_types-doctor');
        this._cardiologistModalView = document.querySelector('.info-form__cardiologist-info');
        this._dentistModalView = document.querySelector('.info-form_dentist-info');
        this._therapistModalView = document.querySelector('.info-form_therapist-info');
        this._btnAddCard = document.querySelector('.form-visit__confirm-btn');
        this._token = '';
        this.btnLogin = btnLogin;
    }

    showModalView()  {
        if(this._token === '') {
            this._modalViewLogin.classList.add('login-container--active');
        } else {
            console.log('open +')
            this._modalViewCreateVisit.classList.add('create-visit-container--active');
        }
    }

    removeModalView() {
        if(this._token === '') {
            this._modalViewLogin.classList.remove('login-container--active');
            this._inputEmail.value = '';
            this._inputPassword.value = '';
        } else {
            this._modalViewCreateVisit.classList.remove('create-visit-container--active');
        }
    }

    modalLogin(){
        this._btnModalLogin.addEventListener('click', event => {
            if(this._inputEmail.value.trim() !== '' && this._inputPassword.value.trim() !== '') {
                this.getToken(this._inputEmail.value, this._inputPassword.value);
                this._errorText.classList.remove('form-login__text-error--active');
            } else if(this._inputEmail.value.trim() === '' && this._inputPassword.value.trim() === '') {
                this._errorText.innerText = 'Please enter your email and password';
                this._errorText.classList.add('form-login__text-error--active');
            } else if(this._inputEmail.value.trim() !== '' && this._inputPassword.value.trim() === '') {
                this._errorText.innerText = 'Please enter your email';
                this._errorText.classList.add('form-login__text-error--active');
            } else if(this._inputEmail.value.trim() === '' && this._inputPassword.value.trim() !== '') {
                this._errorText.innerText = 'Please enter your password';
                this._errorText.classList.add('form-login__text-error--active');
            }
        })
    }

    getToken(email, password) {
        fetch("https://ajax.test-danit.com/api/v2/cards/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, password: password })
        })
            .then(response => {
                if(response.ok) {
                    this.removeModalView()
                    this.btnLogin.innerText = 'Create a visit';
                    return response.text();
                } else if(response.status === 401) {
                    this._errorText.innerText = 'Incorrect username or password';
                    this._errorText.classList.add('form-login__text-error--active');
                }
            })
            .then(token =>  {
                this._token = token
                this.renderAllCard(token);
            })

    }

    switchDoctorsInfo() {
        let tempPosition = 0;
        this._selectDoctor.addEventListener('change', event => {
            switch (tempPosition) {
                case 0: {
                    this._cardiologistModalView.classList.remove('info-form__cardiologist-info--active')
                    break;
                }
                case 1: {
                    this._dentistModalView.classList.remove('info-form_dentist-info--active')
                    break;
                }
                case 2: {
                    this._therapistModalView.classList.remove('info-form_therapist-info--active')
                    break;
                }
            }

            switch (event.target.selectedIndex) {
                case 0: {
                    tempPosition = event.target.selectedIndex;
                    this._cardiologistModalView.classList.add('info-form__cardiologist-info--active')
                    break;
                }
                case 1: {
                    tempPosition = event.target.selectedIndex;
                    this._dentistModalView.classList.add('info-form_dentist-info--active')
                    break;
                }
                case 2: {
                    tempPosition = event.target.selectedIndex;
                    this._therapistModalView.classList.add('info-form_therapist-info--active')
                    break;
                }
            }
        })
    }

    createCard() {
        const fullName = document.querySelector('.main-info__full-name').value.trim();
        const visitPurpose = document.querySelector('.main-info__visit-purpose').value.trim();
        const shortDescription = document.querySelector('.main-info__visit-description').value.trim();
        const visitPriorityObject = document.querySelector('.chose-priority__visit-priority');
        const visitPriorityText = visitPriorityObject.options[visitPriorityObject.selectedIndex].text;
        const ageCardiologist = document.querySelector('.cardiologist-info__age').value.trim();
        const bodyMass = document.querySelector('.cardiologist-info__body-mass-index').value.trim();
        const normalPressure = document.querySelector('.cardiologist-info__normal-pressure').value.trim();
        const cardiovascularDiseases = document.querySelector('.cardiologist-info__past-diseases').value.trim();
        const dateLastVisit = document.querySelector('.dentist-info__date').value.trim();
        const ageTherapist = document.querySelector('.therapist-info__age').value.trim();
        switch (this._selectDoctor.selectedIndex) {
            case 0: {
                const cardiologistCard = new VisitCardiologist(fullName, visitPurpose, shortDescription, visitPriorityText, ageCardiologist, bodyMass, normalPressure, cardiovascularDiseases);
                cardiologistCard.createCardiologistCard(this._token);
                break;
            }
            case 1: {
                const dentistCard = new VisitDentist(fullName, visitPurpose, shortDescription, visitPriorityText, dateLastVisit);
                dentistCard.createDentistCard(this._token);
                break;
            }
            case 2: {
                const therapistCard = new VisitTherapist(fullName, visitPurpose, shortDescription, visitPriorityText, ageTherapist);
                therapistCard.createTherapistCard(this._token);
                break;
            }
        }
        this.removeModalView();
    }

    renderAllCard(token) {
        fetch("https://ajax.test-danit.com/api/v2/cards", {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        })
            .then(response => response.json())
            .then(response => {
                if(response.length !== 0) {
                    this.car
                    response.forEach(elem => {
                        switch (elem['doctor']) {
                            case 'Cardiologist': {
                                const cardiologistCard = new VisitCardiologist(elem['name'], elem['purpose'], elem['description'], elem['priority'], elem['age'], elem['weight'], elem['bp'], elem['diseases']);
                                cardiologistCard.render(this._token, elem['id'])
                                break;
                            }
                            case 'Dentist': {
                                const dentistCard = new VisitDentist(elem['name'], elem['purpose'], elem['description'], elem['priority'], elem['date']);
                                console.log(elem)
                                dentistCard.render(this._token, elem['id'])
                                break;
                            }
                            case 'Therapist': {
                                const therapistCard = new VisitTherapist(elem['name'], elem['purpose'], elem['description'], elem['priority'], elem['age']);
                                therapistCard.render(this._token, elem['id'])
                                break;
                            }
                        }
                    })
                    const btnSearch = document.querySelector('.btn-start-search');
                    const filter = new Filter();
                    btnSearch.addEventListener('click', event => {
                        fetch("https://ajax.test-danit.com/api/v2/cards", {
                            method: 'GET',
                            headers: {
                                'Authorization': `Bearer ${token}`
                            },
                        })
                            .then(response => response.json())
                            .then(response => {
                                filter.filterBySearch(token, response, filter);
                            })
                    })
                }
            });
    }

    createModalView() {
        this.btnLogin.addEventListener('click', event => {
            console.log('open')
            this.showModalView();
        })
        this._btnClose.forEach(elem => {
            elem.addEventListener('click', event => {
                this.removeModalView();
            })
        })
        this._btnAddCard.addEventListener('click', event => {
            this.createCard();
        })
        document.addEventListener('click', event => {
            console.log(event.target.className.split(' ')[0])
            switch (event.target.className.split(' ')[0]) {
                case 'create-visit-container': {
                    document.querySelector('.create-visit-container--active').classList.remove('create-visit-container--active');
                    break;
                }
                case 'create-edit-container': {
                    document.querySelector('.create-edit-container--active').classList.remove('create-edit-container--active');
                    break;
                }
                case 'create-show-more-container': {
                    document.querySelector('.create-show-more-container--active').classList.remove('create-show-more-container--active');
                    break;
                }
                case 'login-container': {
                    document.querySelector('.login-container--active').classList.remove('login-container--active'  );
                    break;
                }
            }
        })
        this.modalLogin();
        this.switchDoctorsInfo();
    }
}

let modal = new Modal(btnLogin);
modal.createModalView();

class Visit {

    constructor(fullName, visitPurpose, shortDescription, priority) {
        this.fullName = fullName;
        this.visitPurpose = visitPurpose;
        this.shortDescription = shortDescription;
        this.priority = priority;
        this.cardBoard = document.querySelector('.cards-container__box');
        this.textEmpty = document.querySelector('.text-empty');
        this.card = document.querySelector('.box__card').cloneNode(true);
        this.cardFullName = this.card.querySelector('.card__full-name');
        this.cardDoctor = this.card.querySelector('.card__doctor');
        this.cardClose = this.card.querySelector('.card-close');
        this.btnShowMore = this.card.querySelector('.card__btn-more');
        this.showMoreContainer = document.querySelector('.create-show-more-container');
        this.btnEdit = this.card.querySelector('.card__btn-edit');
        this.editContainer = document.querySelector('.create-edit-container');
        this.btnSaveEdit = document.querySelector('.form-edit__confirm-btn');

        this.fullNameInput = this.editContainer.querySelector('.main-info__full-name');
        this.visitPurposeInput = this.editContainer.querySelector('.main-info__visit-purpose');
        this.shortDescriptionTextArea = this.editContainer.querySelector('.main-info__visit-description');
        this.prioritySelect = this.editContainer.querySelector('.chose-priority__visit-priority');
    }

    render(token, id) {
        this.textEmpty.classList.remove('text-empty--active');
        this.cardBoard.classList.remove('cards-container__box--empty');
        this.card.classList.remove('box__card--original');
        this.cardFullName.innerHTML = this.cardFullName.innerHTML + this.fullName;
        this.cardClose.addEventListener('click', event => {
           this.delCard(token, id);
        })
        this.btnShowMore.addEventListener('click', event => {
            this.showMoreCard();
        })
        this.btnEdit.addEventListener('click', event => {
            this.editCard(token, id);
        })
    }

    delCard(token, id) {
        fetch(`https://ajax.test-danit.com/api/v2/cards/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        })
        const removeCard = document.getElementById(`${id}`);
        removeCard.remove();
        if(this.cardBoard.children.length === NUMBER_CHILD_CARDS_BOARD) {
            this.cardBoard.classList.add('cards-container__box--empty');
            this.textEmpty.classList.add('text-empty--active');
        }
    }

    showMoreCard() {
        const fullNameInput = this.showMoreContainer.querySelector('.main-info__full-name');
        const visitPurposeInput = this.showMoreContainer.querySelector('.main-info__visit-purpose');
        const shortDescriptionInput = this.showMoreContainer.querySelector('.main-info__visit-description');
        const prioritySelector = this.showMoreContainer.querySelector('.chose-priority__visit-priority');
        const btnClose = this.showMoreContainer.querySelector('.box__btn-show-more');

        const cardiologistModalView = this.showMoreContainer.querySelector('.info-form__cardiologist-info');
        const dentistModalView = this.showMoreContainer.querySelector('.info-form_dentist-info');
        const therapistModalView = this.showMoreContainer.querySelector('.info-form_therapist-info');

        fullNameInput.value = this.fullName;
        visitPurposeInput.value = this.visitPurpose;
        shortDescriptionInput.value = this.shortDescription;
        prioritySelector.value = this.priority;

        btnClose.addEventListener('click', event => {
            this.showMoreContainer.classList.remove('create-show-more-container--active');
        })

        this.showMoreContainer.classList.add('create-show-more-container--active');

        switch (tempPositionShowMore) {
            case 0: {
                cardiologistModalView.classList.remove('info-form__cardiologist-info--active')
                break;
            }
            case 1: {
                dentistModalView.classList.remove('info-form_dentist-info--active')
                break;
            }
            case 2: {
                therapistModalView.classList.remove('info-form_therapist-info--active')
                break;
            }
        }

        switch (this.cardDoctor.innerText.split(':')[1]) {
            case 'Cardiologist': {
                tempPositionShowMore = 0;
                cardiologistModalView.classList.add('info-form__cardiologist-info--active')
                break;
            }
            case 'Dentist': {
                tempPositionShowMore = 1;
                dentistModalView.classList.add('info-form_dentist-info--active')
                break;
            }
            case 'Therapist': {
                tempPositionShowMore = 2;
                therapistModalView.classList.add('info-form_therapist-info--active')
                break;
            }
        }
    }

    editCard(token, id) {
        const btnClose = this.editContainer.querySelector('.box__btn-edit');

        const cardiologistModalView = this.editContainer.querySelector('.info-form__cardiologist-info');
        const dentistModalView = this.editContainer.querySelector('.info-form_dentist-info');
        const therapistModalView = this.editContainer.querySelector('.info-form_therapist-info');

        this.fullNameInput.value = this.fullName;
        this.visitPurposeInput.value = this.visitPurpose;
        this.shortDescriptionTextArea.value = this.shortDescription;
        this.prioritySelect.value = this.priority;

        btnClose.addEventListener('click', event => {
            this.editContainer.classList.remove('create-edit-container--active');
        })

        this.editContainer.classList.add('create-edit-container--active');

        switch (tempPositionEdit) {
            case 0: {
                cardiologistModalView.classList.remove('info-form__cardiologist-info--active')
                break;
            }
            case 1: {
                dentistModalView.classList.remove('info-form_dentist-info--active')
                break;
            }
            case 2: {
                therapistModalView.classList.remove('info-form_therapist-info--active')
                break;
            }
        }

        switch (this.cardDoctor.innerText.split(':')[1]) {
            case 'Cardiologist': {
                tempPositionEdit = 0;
                cardiologistModalView.classList.add('info-form__cardiologist-info--active')
                break;
            }
            case 'Dentist': {
                tempPositionEdit = 1;
                dentistModalView.classList.add('info-form_dentist-info--active')
                break;
            }
            case 'Therapist': {
                tempPositionEdit = 2;
                therapistModalView.classList.add('info-form_therapist-info--active')
                break;
            }
        }
    }
}

class VisitCardiologist extends Visit {

    constructor(fullName, visitPurpose, shortDescription, priority, age, bodyMass, normalPressure, cardiovascularDiseases) {
        super(fullName, visitPurpose, shortDescription, priority);
        this._id;
        this.age = age;
        this.bodyMass = bodyMass;
        this.normalPressure = normalPressure;
        this.cardiovascularDiseases = cardiovascularDiseases;
    }

    createCardiologistCard(token) {
        fetch("https://ajax.test-danit.com/api/v2/cards", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name: this.fullName,
                purpose: this.visitPurpose,
                description: this.shortDescription,
                priority: this.priority,
                doctor: 'Cardiologist',
                age: this.age,
                weight: this.bodyMass,
                bp: this.normalPressure,
                diseases: this.cardiovascularDiseases
            })
        })
            .then(response => response.json())
            .then(response => {
                this._id = response['id'];
                this.render(token);
            })

    }


    render(token, id = this._id) {
        super.render(token, id);
        this.card.setAttribute('id', id);
        this.cardDoctor.innerHTML = this.cardDoctor.innerHTML + 'Cardiologist';
        this.cardBoard.append(this.card);
    }

    showMoreCard() {
        super.showMoreCard();
        const ageInput = this.showMoreContainer.querySelector('.cardiologist-info__age');
        const bodyMassInput = this.showMoreContainer.querySelector('.cardiologist-info__body-mass-index');
        const normalPressureInput = this.showMoreContainer.querySelector('.cardiologist-info__normal-pressure');
        const cardiovascularDiseasesInput = this.showMoreContainer.querySelector('.cardiologist-info__past-diseases');

        ageInput.value = this.age;
        bodyMassInput.value = this.bodyMass;
        normalPressureInput.value = this.normalPressure;
        cardiovascularDiseasesInput.value = this.cardiovascularDiseases;
    }

    editCard(token, id = this._id) {
        super.editCard(token, id);
        const ageInput = this.editContainer.querySelector('.cardiologist-info__age');
        const bodyMassInput = this.editContainer.querySelector('.cardiologist-info__body-mass-index');
        const normalPressureInput = this.editContainer.querySelector('.cardiologist-info__normal-pressure');
        const cardiovascularDiseasesTextArea = this.editContainer.querySelector('.cardiologist-info__past-diseases');

        ageInput.value = this.age;
        bodyMassInput.value = this.bodyMass;
        normalPressureInput.value = this.normalPressure;
        cardiovascularDiseasesTextArea.value = this.cardiovascularDiseases;

        this.btnSaveEdit.addEventListener('click', event => {
            fetch(`https://ajax.test-danit.com/api/v2/cards/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: this.fullNameInput.value,
                    purpose: this.visitPurposeInput.value,
                    description: this.shortDescriptionTextArea.value,
                    priority: this.prioritySelect.value,
                    doctor: 'Cardiologist',
                    age: ageInput.value,
                    weight: bodyMassInput.value,
                    bp: normalPressureInput.value,
                    diseases: cardiovascularDiseasesTextArea.value
                })
            })
                .then(response => response.json())
                .then(response => console.log(response))

            this.fullName = this.fullNameInput.value;
            this.visitPurpose = this.visitPurposeInput.value;
            this.shortDescription = this.shortDescriptionTextArea.value;
            this.priority = this.prioritySelect.value;
            this.age = ageInput.value;
            this.bodyMass = bodyMassInput.value;
            this.normalPressure = normalPressureInput.value;
            this.cardiovascularDiseases = cardiovascularDiseasesTextArea.value;

            this.cardFullName.innerHTML = `<span class="card__full-name-label">Full Name:</span>` + this.fullName;

            this.editContainer.classList.remove('create-edit-container--active');
        })
    }
}

class VisitDentist extends Visit {
    
    constructor(fullName, visitPurpose, shortDescription, priority, dateLastVisit) {
        super(fullName, visitPurpose, shortDescription, priority);
        this._id;
        this.dateLastVisit = dateLastVisit;
    }

    createDentistCard(token) {
        fetch("https://ajax.test-danit.com/api/v2/cards", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name: this.fullName,
                purpose: this.visitPurpose,
                description: this.shortDescription,
                priority: this.priority,
                doctor: 'Dentist',
                date: this.dateLastVisit
            })
        })
            .then(response => response.json())
            .then(response => {
                this._id = response['id'];
                this.render(token);
            })
    }

    render(token, id = this._id) {
        super.render(token, id);
        this.card.setAttribute('id', id);
        this.cardDoctor.innerHTML = this.cardDoctor.innerHTML + 'Dentist';
        this.cardBoard.append(this.card);
    }

    showMoreCard() {
        super.showMoreCard();
        const dateLastVisitInput = this.showMoreContainer.querySelector('.dentist-info__date');

        dateLastVisitInput.value = this.dateLastVisit;
    }

    editCard(token, id) {
        super.editCard(token, id);
        const dateLastVisitInput = this.editContainer.querySelector('.dentist-info__date');

        dateLastVisitInput.value = this.dateLastVisit;

        this.btnSaveEdit.addEventListener('click', event => {
            fetch(`https://ajax.test-danit.com/api/v2/cards/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: this.fullNameInput.value,
                    purpose: this.visitPurposeInput.value,
                    description: this.shortDescriptionTextArea.value,
                    priority: this.prioritySelect.value,
                    doctor: 'Dentist',
                    date: dateLastVisitInput.value
                })
            })
                .then(response => response.json())
                .then(response => console.log(response))

            this.fullName = this.fullNameInput.value;
            this.visitPurpose = this.visitPurposeInput.value;
            this.shortDescription = this.shortDescriptionTextArea.value;
            this.priority = this.prioritySelect.value;
            this.dateLastVisit = dateLastVisitInput.value;

            this.cardFullName.innerHTML = `<span class="card__full-name-label">Full Name:</span>` + this.fullName;

            this.editContainer.classList.remove('create-edit-container--active');
        })
    }
}

class VisitTherapist extends Visit {

    constructor(fullName, visitPurpose, shortDescription, priority, age) {
        super(fullName, visitPurpose, shortDescription, priority);
        this._id;
        this.age = age;
    }

    createTherapistCard(token) {
        fetch("https://ajax.test-danit.com/api/v2/cards", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name: this.fullName,
                purpose: this.visitPurpose,
                description: this.shortDescription,
                priority: this.priority,
                doctor: 'Therapist',
                age: this.age,
            })
        })
            .then(response => response.json())
            .then(response => {
                this._id = response['id'];
                this.render(token);
            })
    }

    render(token, id = this._id) {
        super.render(token, id);
        this.card.setAttribute('id', id);
        this.cardDoctor.innerHTML = this.cardDoctor.innerHTML + 'Therapist';
        this.cardBoard.append(this.card);
    }

    showMoreCard() {
        super.showMoreCard();
        const ageInput = this.showMoreContainer.querySelector('.therapist-info__age');

        ageInput.value = this.age;
    }

    editCard(token, id) {
        super.editCard(token, id);
        const ageInput = this.editContainer.querySelector('.therapist-info__age');

        ageInput.value = this.age;

        this.btnSaveEdit.addEventListener('click', event => {
            fetch(`https://ajax.test-danit.com/api/v2/cards/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: this.fullNameInput.value,
                    purpose: this.visitPurposeInput.value,
                    description: this.shortDescriptionTextArea.value,
                    priority: this.prioritySelect.value,
                    doctor: 'Therapist',
                    age: ageInput.value
                })
            })
                .then(response => response.json())
                .then(response => console.log(response))

            this.fullName = this.fullNameInput.value;
            this.visitPurpose = this.visitPurposeInput.value;
            this.shortDescription = this.shortDescriptionTextArea.value;
            this.priority = this.prioritySelect.value;
            this.age = ageInput.value;

            this.cardFullName.innerHTML = `<span class="card__full-name-label">Full Name:</span>` + this.fullName;

            this.editContainer.classList.remove('create-edit-container--active');
        })
    }
}

class Filter {

    constructor() {
        this.prioritySearch = document.querySelector('.filter-priority');
    }

    filterByPriority(token, response, allCards) {

        switch (this.prioritySearch.value) {
            case 'all': {
                allCards.forEach(elem => {
                    elem.classList.remove('box__card--hide');
                })
                break;
            }
            case 'high': {
                response.forEach(elem => {
                    allCards.forEach(elemItem =>{
                        if(+elemItem.id === +elem['id']){
                            if(elem['priority'] !== 'high'){
                                elemItem.classList.add('box__card--hide');
                            } else {
                                elemItem.classList.remove('box__card--hide');
                            }
                        }
                    })

                })
                break;
            }
            case 'normal': {
                response.forEach(elem => {
                    allCards.forEach(elemItem => {
                        if (+elemItem.id === +elem['id']) {
                            if (elem['priority'] !== 'normal') {
                                elemItem.classList.add('box__card--hide');
                            } else {
                                elemItem.classList.remove('box__card--hide');
                            }
                        }
                    })
                })
                break;
            }
            case 'low': {
                response.forEach(elem => {
                    allCards.forEach(elemItem => {
                        if (+elemItem.id === +elem['id']) {
                            if (elem['priority'] !== 'low') {
                                elemItem.classList.add('box__card--hide');
                            } else {
                                elemItem.classList.remove('box__card--hide');
                            }
                        }
                    })
                })
                break;
            }
        }
    }

    filterBySearch(token, response, filter) {
        const searchInput = document.querySelector('.search-input');
        const cardsList = [];

        response.forEach(elem => {
            console.log(elem)
            if(elem['purpose'].includes(searchInput.value.trim())) {
                document.getElementById(elem['id']).classList.remove('box__card--hide');
                cardsList.push(document.getElementById(elem['id']))
            } else if(elem['description'].includes(searchInput.value.trim())) {
                document.getElementById(elem['id']).classList.remove('box__card--hide');
                cardsList.push(document.getElementById(elem['id']))
            } else if(searchInput.value.trim() === '') {
                document.getElementById(elem['id']).classList.remove('box__card--hide');
                cardsList.push(document.getElementById(elem['id']))
            } else {
                document.getElementById(elem['id']).classList.add('box__card--hide');
            }
        })
        console.log(cardsList)
        filter.filterByPriority(token, response, cardsList);
    }

}