// Run with playwright-cli -s=aroma-redesign run-code --filename=scripts/verify-redesign-browser.cjs
async (page) => {
  const result = {
    timestamp: new Date().toISOString(),
    responsive: [],
    interactions: [],
    errors: [],
  };
  page.on("pageerror", (e) => result.errors.push(e.message));
  page.on("console", (m) => {
    if (m.type() === "error") result.errors.push(m.text());
  });
  const check = (name, pass, details) => {
    result.interactions.push({ name, pass, details });
    if (!pass) throw new Error(name + ": " + JSON.stringify(details));
  };
  async function loadImages() {
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 650) {
        window.scrollTo({ top: y, behavior: "instant" });
        await new Promise((r) => setTimeout(r, 120));
      }
      window.scrollTo({ top: 0, behavior: "instant" });
    });
    await page.waitForFunction(
      () =>
        [...document.images]
          .filter(
            (i) =>
              i.getBoundingClientRect().width &&
              i.getBoundingClientRect().left < innerWidth &&
              i.getBoundingClientRect().right > 0,
          )
          .every((i) => i.complete && i.naturalWidth > 0),
      { timeout: 20000 },
    );
    await page.evaluate(() => document.fonts.ready);
  }
  await page.goto("http://localhost:3000");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  for (const width of [320, 375, 390, 430, 768, 1024, 1280, 1440, 1920]) {
    await page.setViewportSize({ width, height: 1000 });
    await loadImages();
    const data = await page.evaluate(() => ({
      width: innerWidth,
      documentWidth: document.documentElement.scrollWidth,
      brokenImages: [...document.images]
        .filter(
          (i) =>
            i.getBoundingClientRect().left < innerWidth &&
            i.getBoundingClientRect().right > 0 &&
            i.getBoundingClientRect().width &&
            (!i.complete || !i.naturalWidth),
        )
        .map((i) => i.src),
      header: document.querySelector("header").getBoundingClientRect().height,
      h1: document.querySelector("h1").getBoundingClientRect().toJSON(),
    }));
    result.responsive.push(data);
    check(
      "Homepage at " + width,
      data.documentWidth <= width && !data.brokenImages.length,
      data,
    );
    if (width === 390 || width === 1440)
      await page.screenshot({
        path: `output/playwright/redesign-home-${width}.png`,
        fullPage: true,
      });
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  const rail = page.getByRole("region", {
    name: "Explore our diffusers",
    exact: true,
  });
  await page
    .getByRole("button", { name: "Next: Explore our diffusers", exact: true })
    .click();
  await page.waitForTimeout(700);
  check(
    "Product carousel moves",
    (await rail.evaluate((e) => e.scrollLeft)) > 0,
  );
  const productChecks = await page
    .locator(".products-home .product-card")
    .evaluateAll((cards) =>
      cards.map((c) => ({
        name: c.querySelector("h3").textContent,
        call: c.querySelector('a[href^="tel:"]').getAttribute("href"),
        wa: c.querySelector('a[href^="https://wa.me"]').getAttribute("href"),
      })),
    );
  check(
    "All nine homepage products and contextual enquiries",
    productChecks.length === 9 &&
      productChecks.every(
        (p) =>
          p.call === "tel:+919015759321" &&
          decodeURIComponent(p.wa).includes(p.name),
      ),
    productChecks,
  );
  await page
    .getByRole("button", { name: "Product collections", exact: true })
    .click();
  check(
    "Desktop product menu",
    await page.locator("#product-menu").isVisible(),
  );
  await page.keyboard.press("Escape");
  check(
    "Desktop Escape closes menu",
    (await page.locator("#product-menu").count()) === 0,
  );
  await page.setViewportSize({ width: 390, height: 844 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.getByRole("button", { name: "Open menu", exact: true }).click();
  check("Mobile navigation", await page.locator("#mobile-nav").isVisible());
  check(
    "Background inert while menu open",
    await page.locator("main").evaluate((e) => e.inert),
  );
  await page.locator("#mobile-nav summary").click();
  check(
    "Mobile collections",
    await page
      .locator("#mobile-nav")
      .getByRole("link", { name: "HVAC Scenting", exact: true })
      .isVisible(),
  );
  await page.keyboard.press("Escape");
  check(
    "Mobile Escape restores focus",
    await page
      .getByRole("button", { name: "Open menu", exact: true })
      .evaluate((e) => e === document.activeElement),
  );
  const routes = [
    "/about",
    "/products",
    "/products/square-tower",
    "/products/hvac-power",
    "/products/cloudy",
    "/products/automatic-dispenser",
    "/fragrances",
    "/fragrances/jasmine",
    "/fragrances/aqua",
    "/applications",
    "/gallery",
    "/contact",
    "/privacy-policy",
    "/terms-and-conditions",
  ];
  for (const route of routes) {
    await page.goto("http://localhost:3000" + route);
    await loadImages();
    for (const width of [390, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      const data = await page.evaluate(() => ({
        width: innerWidth,
        documentWidth: document.documentElement.scrollWidth,
        title: document.title,
        h1: document.querySelectorAll("h1").length,
      }));
      check(
        route + " layout at " + width,
        data.documentWidth <= width && data.h1 === 1,
        data,
      );
    }
    await page.setViewportSize({ width: 390, height: 844 });
  }
  await page.goto("http://localhost:3000/products");
  await page
    .getByRole("button", { name: "HVAC Scenting", exact: true })
    .click();
  check(
    "HVAC filter",
    (await page.locator(".product-grid .product-card").count()) === 1 &&
      (await page.locator(".product-grid h3").textContent()) === "HVAC Power",
  );
  await page
    .getByRole("button", { name: "Automatic Dispensers", exact: true })
    .click();
  check(
    "Dispenser filter",
    (await page.locator(".product-grid h3").textContent()) ===
      "Automatic Dispenser",
  );
  await page
    .getByRole("button", { name: "Fragrance Oils", exact: true })
    .click();
  check(
    "Oil catalogue",
    (await page.locator(".oil-grid .fragrance-card").count()) === 16,
  );
  await page.goto("http://localhost:3000/products/automatic-dispenser");
  check(
    "Aerosol-specific refill guidance",
    (await page.locator("main").innerText()).includes("300 ml perfume can") &&
      (await page.locator(".signature-grid .fragrance-card").count()) === 0,
  );
  await page
    .getByRole("button", {
      name: "View Automatic Dispenser image 2",
      exact: true,
    })
    .click();
  check(
    "Product gallery changes",
    await page
      .locator(".product-main-photo img")
      .getAttribute("src")
      .then((s) => s.includes("latest-catalogue-5")),
  );
  await loadImages();
  await page.screenshot({
    path: "output/playwright/redesign-dispenser-mobile.png",
    fullPage: true,
  });
  await page.goto("http://localhost:3000/gallery");
  await page
    .getByRole("button", { name: "Open image: Square Tower", exact: true })
    .click();
  check(
    "Gallery lightbox",
    await page.locator("dialog").evaluate((e) => e.open),
  );
  await page.getByRole("button", { name: "Next image", exact: true }).click();
  check(
    "Gallery next image",
    (await page.locator(".lightbox-controls p").innerText()).includes(
      "HVAC Power",
    ),
  );
  await page.keyboard.press("Escape");
  check(
    "Lightbox Escape",
    await page.locator("dialog").evaluate((e) => !e.open),
  );
  await page.goto("http://localhost:3000/contact");
  await page
    .getByRole("button", { name: "Continue on WhatsApp", exact: true })
    .click();
  check(
    "Native form validation",
    await page.locator("input[name=name]").evaluate((e) => !e.validity.valid),
  );
  await page.locator("input[name=name]").fill("Synthetic QA");
  await page.locator("input[name=phone]").fill("9000000000");
  await page.locator("input[name=email]").fill("qa@example.com");
  await page.locator("input[name=company]").fill("QA Example");
  await page.locator("input[name=city]").fill("New Delhi");
  await page
    .locator("select[name=product]")
    .selectOption({ label: "HVAC Power" });
  await page
    .locator("select[name=spaceType]")
    .selectOption({ label: "Office / Workspace" });
  await page
    .locator("textarea")
    .fill("Synthetic test message for browser verification.");
  await page.locator("input[name=consent]").check();
  // Capture prepared URL without contacting WhatsApp or sending an enquiry.
  await page.evaluate(() => {
    window.__qaWhatsApp = "";
    window.open = (url) => {
      window.__qaWhatsApp = String(url);
      return null;
    };
  });
  await page
    .getByRole("button", { name: "Continue on WhatsApp", exact: true })
    .click();
  const prepared = await page.evaluate(() => window.__qaWhatsApp);
  check(
    "Form prepares contextual WhatsApp URL",
    prepared.startsWith("https://wa.me/919015759321") &&
      decodeURIComponent(prepared).includes("HVAC Power") &&
      decodeURIComponent(prepared).includes("Office / Workspace"),
  );
  check(
    "Form explains send requirement",
    (await page.getByRole("status").innerText()).includes("press Send"),
  );
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("http://localhost:3000/products");
  await loadImages();
  await page.screenshot({
    path: "output/playwright/redesign-products-desktop.png",
    fullPage: true,
  });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("http://localhost:3000");
  check(
    "Reduced motion",
    (await page
      .locator(".hero h1")
      .evaluate((e) => getComputedStyle(e).animationName)) === "none",
  );
  result.errors = [...new Set(result.errors)];
  check("No browser errors", result.errors.length === 0, result.errors);
  return result;
};
