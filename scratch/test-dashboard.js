const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));
  
  await page.goto('http://localhost:3000/dashboard', { waitUntil: 'networkidle2' });
  
  // Try to find the Next.js error overlay
  const errorOverlay = await page.$('nextjs-portal');
  if (errorOverlay) {
    const errorText = await page.evaluate(el => el.textContent, errorOverlay);
    console.log('NEXT.JS ERROR OVERLAY TEXT:', errorText);
  } else {
    console.log('No error overlay found.');
  }

  // Also check if the generic Error Boundary is shown
  const bodyText = await page.evaluate(() => document.body.innerText);
  if (bodyText.includes('Something went wrong')) {
    console.log('Global Error Boundary triggered.');
  }

  await browser.close();
})();
