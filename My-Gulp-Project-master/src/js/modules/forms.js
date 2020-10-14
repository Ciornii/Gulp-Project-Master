const forms = () => {
    const form = document.querySelectorAll('form'),
        phoneInputs = document.querySelector('input[name="user_phone"]');

    const message = {
        loading: 'Please wait ...',
        success: 'Thank you for contacting us – we will get back to you soon!',
        failure: 'Something went wrong. Please try again later.',
        spinner: 'assets/icons/spinner.gif',
        ok: 'assets/icons/ok.png',
        fail: 'assets/icons/fail.png'
    }

    const postData = async (url, data) => {
        let res = await fetch(url, {
            method: 'POST',
            body: data
        });

        return await res.text();
    };

    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.parentNode.appendChild(statusMessage);

            item.classList.add('fade');
            item.style.display = 'none';

            let statusImg = document.createElement('img');
            statusImg.setAttribute('src', message.spinner);
            statusImg.classList.add('fade');
            statusMessage.appendChild(statusImg);

            let textMessage = document.createElement('div');
            textMessage.textContent = message.loading;
            statusMessage.appendChild(textMessage);

            setTimeout(() => {
                const formData = new FormData(item);

                postData('assets/server.php', formData)
                    .then(res => {
                        statusImg.setAttribute('src', message.ok);
                        textMessage.textContent = message.success;
                    })
                    .catch(() => {
                        statusImg.setAttribute('src', message.fail);
                        textMessage.textContent = message.failure;
                    });
            }, 500);
        });
    });
};

export default forms;