const poll = async () => {
  for (let i = 0; i < 15; i++) {
    try {
      const res = await fetch('https://afrovibesafaris-api.onrender.com/api/seed');
      const text = await res.text();
      console.log(`[${new Date().toISOString()}] Attempt ${i+1}:`, text);
      if (text.includes('Seeded')) {
        console.log('SUCCESS!');
        break;
      }
    } catch (e) {
      console.error('Error:', e);
    }
    await new Promise(r => setTimeout(r, 10000));
  }
};
poll();
