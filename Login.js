// Call all the dependencies
const { Keyboard } = require('puppeteer');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
// Call password && email
const { password } = require('./password')

puppeteer.use(StealthPlugin());

// Set your credentials
const googleUsername = "email";
const googlePassword = password;

// options
(async () => {
   const browser = await puppeteer.launch({
      headless: false,
      args: [
         '--no-sandbox',
         '--disable-gpu',
         '--enable-webgl',
         '--window-size=800,800'
      ]
   });

   // URL in this case login with google in youtube
   const loginUrl = "https://accounts.google.com/v3/signin/identifier?dsh=S1442880744%3A1686479746740908&continue=https%3A%2F%2Fwww.youtube.com%2Fsignin%3Faction_handle_signin%3Dtrue%26app%3Ddesktop%26hl%3Des%26next%3Dhttps%253A%252F%252Fwww.youtube.com%252F%253FthemeRefresh%253D1&ec=65620&ffgf=1&hl=es&ifkv=Af_xneEdmi5D8_8QGR7w3-ZbqN6OiFsoDWOuF0XzyVOUsJ0MCv3jRpEaczlnobpseqDNj7vXklwhFw&passive=true&service=youtube&uilel=3&flowName=GlifWebSignIn&flowEntry=ServiceLogin";
   // ua (User Agent) It represents the browser's identity and helps websites determine how to render content based on the browser. The provided user agent string corresponds to Chrome on Windows 10.
   const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.91 Mobile Safari/537.36';
   // Open a new page
   const page = await browser.newPage();

   // Tell the new page to use the specified user Agent
   await page.setUserAgent(userAgent);
   // Go to the link
   await page.goto(loginUrl, { waitUntil: 'networkidle2' });
   // Instructions
   await page.type('input[type="email"]', googleUsername);
   await page.keyboard.press('Enter');
   await page.waitForTimeout(6000);
   await page.type('input[type="password"]', googlePassword);
   await page.keyboard.press('Enter');
})();