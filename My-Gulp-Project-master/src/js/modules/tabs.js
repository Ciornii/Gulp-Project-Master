const tabs = () => {
    let tablink = document.querySelectorAll('.tablink'),
        tablinksWrapper = document.querySelector('.tablinks-wrapper'),
        tabContent = document.querySelectorAll('.tabcontent');

    function hideTabContent(a) {
        for (let i = a; i < tablink.length; i++) {
            tablink[i].classList.remove('tablink--active');
        }
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }
    hideTabContent(1);

    function showTabContent(b) {
        tablink[b].classList.add('tablink--active');
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    tablinksWrapper.addEventListener('click', function (event) {
        let target = event.target;
        if (target && target.classList.contains('tablink')) {
            for (let i = 0; i < tablink.length; i++) {
                if (target == tablink[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });
}

export default tabs;


