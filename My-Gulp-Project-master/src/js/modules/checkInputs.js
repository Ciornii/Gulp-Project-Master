const checkInputs = () => {

   const nameInputs = document.querySelectorAll('input[name="user_name"]'),
         emailInputs = document.querySelectorAll('input[name="user_email"]'),
         txtInputs = document.querySelectorAll('textarea[name="message"]'),
         phoneInputs = document.querySelectorAll('input[name="user_phone"]');


   nameInputs.forEach(input => {
      input.addEventListener('keypress', function(e) {
         if(e.key.match(/[^a-z ]/ig)) {
            e.preventDefault();
         }
      });
   });

   emailInputs.forEach(input => {
      input.addEventListener('keypress', function(e) {
         if(e.key.match(/[^a-z 0-9 @ \. \- \_ ]/ig)) {
            e.preventDefault();
         }
      });
   });

   txtInputs.forEach(input => {
      input.addEventListener('keypress', function(e) {
         if(e.key.match(/[^a-z 0-9 \, \. \- \" \' \( \) \/ \+ \= \$ \@ \& \* \% \! \? \# \; \:]/ig)) {
            e.preventDefault();
         }
      });
   });

   phoneInputs.forEach(input => {
      input.addEventListener('keypress', function(e) {
         if(e.key.match(/[^0-9 ]/ig)) {
            e.preventDefault();
         }
      });
   });
};

export default checkInputs;