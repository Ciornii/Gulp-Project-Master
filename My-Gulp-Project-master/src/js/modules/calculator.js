const calculator = () => {
    let persons = document.querySelectorAll('.counter-block-input')[0],
        restDays = document.querySelectorAll('.counter-block-input')[1],
        place = document.getElementById('select'),
        totalValue = document.getElementById('total'),
        personsSum = 0,
        daysSum = 0,
        total = 0;

    totalValue.innerHTML = 0;

    persons.addEventListener('change', function () {
        totalValue.innerHTML = 0;
        personsSum = +this.value;
        total = (daysSum + personsSum) * 4000;

        if (restDays.value == '' || place.value == '') {
            totalValue.innerHTML = 0;
        } else {
            let a = total;  // to avoid bug
            totalValue.innerHTML = a * place.value;
        }
    });

    restDays.addEventListener('change', function () {
        totalValue.innerHTML = 0;
        daysSum = +this.value;
        total = (daysSum + personsSum) * 4000;

        if (persons.value == '' || place.value == '') {
            totalValue.innerHTML = 0;
        } else {
            let a = total;
            totalValue.innerHTML = a * place.value;
        }
    });

    place.addEventListener('change', function () {
        if (restDays.value == '' || persons.value == '') {
            totalValue.innerHTML = 0;
        } else {
            let a = total;   
            totalValue.innerHTML = a * this.options[this.selectedIndex].value;
        }
    });

    setInterval(() => {
        if (restDays.value == '' || persons.value == '' || place.value == '') {
            totalValue.innerHTML = 0;
        }
    }, 0.1);
}

export default calculator;