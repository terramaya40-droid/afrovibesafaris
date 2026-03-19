fetch('https://afrovibesafaris-api.onrender.com/api/packages')
  .then(res => res.json())
  .then(data => {
    console.log(`FOUND ${data.length} PACKAGES`);
    if(data.length > 0) {
      console.log('FIRST PACKAGE:', data[0].title);
    }
  })
  .catch(console.error);
