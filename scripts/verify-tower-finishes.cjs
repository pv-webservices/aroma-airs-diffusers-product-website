// Run through playwright-cli run-code --filename=scripts/verify-tower-finishes.cjs
async (page) => {
  const check = (pass, message) => { if (!pass) throw new Error(message); };
  await page.goto('http://localhost:3000/products/tower-series');
  const silver = page.getByRole('button', { name: 'Simple Silver', exact: true });
  check(await silver.count() === 1, 'Tower Series needs an interactive Silver finish control');
  await silver.click();
  check(await silver.getAttribute('aria-pressed') === 'true', 'Silver selection must be announced');
  check((await page.locator('.pg-main img').getAttribute('src')).includes('tower-series-silver-1'), 'Silver must show its own main image');
  const thumbs = page.locator('.pg-thumbs button');
  check(await thumbs.count() === 6, 'Silver must retain its five views and the shared pair image');
  await thumbs.last().click();
  const black = page.getByRole('button', { name: 'Classic Black', exact: true });
  await black.focus();
  await page.keyboard.press('Enter');
  check(await black.getAttribute('aria-pressed') === 'true', 'Black selection must work from the keyboard');
  check((await page.locator('.pg-main img').getAttribute('src')).includes('s-tower-product'), 'Switching back must reset to the first Black image');
  check(await thumbs.count() === 6, 'Black must retain its four new views and the two original views');
  console.log('Tower finish controls, corresponding galleries and image reset passed.');
}
