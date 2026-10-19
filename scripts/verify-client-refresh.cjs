// Run with playwright-cli -s=aroma-refresh run-code --filename=scripts/verify-client-refresh.cjs
async (page) => {
  const result = { timestamp: new Date().toISOString(), checks: [], errors: [], responsive: [], accessibility: [] };
  page.on('pageerror', error => result.errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') result.errors.push(message.text()); });
  const check = (name, pass) => {
    result.checks.push({ name, pass });
    if (!pass) throw new Error(name);
  };
  await page.emulateMedia({ reducedMotion: 'reduce' });
  async function imagesLoaded() {
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 800) {
        window.scrollTo({ top: y, behavior: 'instant' });
        await new Promise(resolve => setTimeout(resolve, 60));
      }
      window.scrollTo({ top: 0, behavior: 'instant' });
      await document.fonts.ready;
      // Load off-screen sections explicitly; hidden story slides remain lazy.
      for (const image of document.images) {
        const rect = image.getBoundingClientRect();
        if (image.checkVisibility({ opacityProperty: true, visibilityProperty: true }) && rect.right > 0 && rect.left < innerWidth) image.loading = 'eager';
      }
    });
    await page.waitForFunction(() => [...document.images].filter(image => {
      const rect = image.getBoundingClientRect();
      return image.checkVisibility({ opacityProperty: true, visibilityProperty: true }) && rect.width && rect.right > 0 && rect.left < innerWidth;
    }).every(image => image.complete && image.naturalWidth > 0), null, { timeout: 60000 });
  }
  async function responsive(route, width) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto('http://localhost:3000' + route);
    await imagesLoaded();
    const size = await page.evaluate(() => ({ viewport: innerWidth, content: document.documentElement.scrollWidth }));
    result.responsive.push({ route, width, ...size });
    check(`${route} fits ${width}px and loads visible images`, size.content <= size.viewport);
  }
  for (const width of [320, 390, 768, 1024, 1440]) {
    await responsive('/', width);
    check(`10 client logos at ${width}px`, await page.locator('.client-logos img').count() === 10);
    check(`8 device cards at ${width}px`, await page.locator('.showcase .p-card').count() === 8);
    check(`No Cloudy product at ${width}px`, await page.locator('a[href="/products/cloudy"]').count() === 0);
    if ([390, 1440].includes(width)) {
      await page.locator('.clients-section').screenshot({ path: `output/refresh/clients-${width}.png` });
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
      await page.waitForTimeout(500);
      await page.screenshot({ path: `output/refresh/home-${width}.png` });
    }
  }
  const products = [
    ['compact', 'Compact Black', 0, true],
    ['compact-white', 'Compact White', 3, false],
    ['wall-pro-black', 'Wall Pro Black', 5, false],
    ['wall-pro-white', 'Wall Pro White', 8, false],
    ['tower-series', 'Tower Series', 6, true],
    ['square-tower', 'Square Tower', 3, false],
    ['automatic-dispenser', 'Automatic Dispenser', 3, false],
    ['hvac-power', 'HVAC Power', 3, false],
  ];
  for (const [slug, name, count, finish] of products) {
    for (const width of [390, 1440]) {
      await responsive('/products/' + slug, width);
      check(`${name} title`, await page.locator('h1').innerText() === name);
      check(`${name} thumbnail count ${count}`, await page.locator('.pg-thumbs button').count() === count);
      check(`${name} finish visibility`, (await page.locator('.pd-finish').count() > 0) === finish);
    }
  }
  await page.goto('http://localhost:3000/products/tower-series');
  await page.getByRole('button', { name: 'Simple Silver', exact: true }).click();
  check('Silver image correspondence', (await page.locator('.pg-main img').getAttribute('src')).includes('tower-series-silver-1'));
  await page.locator('.pg-thumbs button').last().click();
  await page.getByRole('button', { name: 'Classic Black', exact: true }).focus();
  await page.keyboard.press('Enter');
  check('Black image reset from keyboard', (await page.locator('.pg-main img').getAttribute('src')).includes('s-tower-product'));
  await page.getByRole('button', { name: 'Simple Silver', exact: true }).click();
  await imagesLoaded();
  check('Silver enquiry includes finish', (await page.locator('.pd-info a[href*="wa.me"]').getAttribute('href')).includes('Simple%20Silver'));
  await page.screenshot({ path: 'output/refresh/tower-silver-desktop.png' });
  check('Removed Cloudy route returns 404', (await page.request.get('http://localhost:3000/products/cloudy')).status() === 404);
  for (const width of [390, 1440]) await responsive('/fragrances', width);
  check('29 fragrance cards', await page.locator('.oil-grid .f-card').count() === 29);
  const fragranceUrls = await page.locator('.oil-grid .f-card-link').evaluateAll(links => links.map(link => link.getAttribute('href')));
  await page.getByRole('button', { name: 'Fruity', exact: true }).click();
  check('Three new fruity fragrances filter correctly', await page.locator('.oil-grid .f-card').count() === 3);
  for (const url of fragranceUrls) {
    await page.goto('http://localhost:3000' + url);
    await page.locator('.pg-main img').waitFor();
    check(`${url} supplied product image`, (await page.locator('.pg-main img').getAttribute('src')).includes('fragrance-'));
    check(`${url} no old gallery images`, await page.locator('.pg-thumbs').count() === 0);
  }
  for (const width of [390, 1440]) await responsive('/gallery', width);
  check('19 supplied gallery photos', await page.locator('.gallery-tile').count() === 19);
  await page.getByRole('button', { name: 'Workspaces', exact: true }).click();
  check('Workspaces gallery filter', await page.locator('.gallery-tile').count() === 2);
  await page.getByRole('button', { name: 'All', exact: true }).click();
  await page.locator('.gallery-tile').first().click();
  check('Gallery lightbox opens', await page.locator('dialog').evaluate(dialog => dialog.open));
  await page.keyboard.press('ArrowRight');
  check('Gallery lightbox advances', (await page.locator('.lightbox-photo img').getAttribute('src')).includes('gallery-image-2'));
  await page.keyboard.press('Escape');
  check('Gallery Escape closes', !(await page.locator('dialog').evaluate(dialog => dialog.open)));
  check('Lightbox restores opener focus', await page.locator('.gallery-tile').first().evaluate(element => document.activeElement === element));
  for (const route of ['/', '/products/tower-series', '/products/wall-pro-white', '/fragrances', '/fragrances/green-apple', '/gallery']) {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('http://localhost:3000' + route);
    await imagesLoaded();
    await page.addScriptTag({ path: 'node_modules/axe-core/axe.min.js' });
    const violations = await page.evaluate(async () => (await axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'best-practice'] } })).violations.map(v => ({ id: v.id, impact: v.impact, targets: v.nodes.map(n => n.target) })));
    result.accessibility.push({ route, violations });
    check(`Accessibility ${route}: ${JSON.stringify(violations)}`, violations.length === 0);
  }
  check('No browser runtime or console errors', result.errors.length === 0);
  return result;
}
