const moduleTest = (testSelector) => {
   //alert('hello');

   try {
      document.getElementById(testSelector).innerHTML = 'TEST';
   } catch (error) {}
}

export default moduleTest;