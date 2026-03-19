fetch('https://afrovibesafaris-api.onrender.com/api/articles')
  .then(res => res.json())
  .then(data => {
    console.log(`FOUND ${data.length} ARTICLES`);
    if(data.length > 0) {
      console.log('FIRST ARTICLE PUBLISHED STATE:', data[0].published);
      console.log('FIRST ARTICLE SLUG:', data[0].slug);
    }
  })
  .catch(console.error);
