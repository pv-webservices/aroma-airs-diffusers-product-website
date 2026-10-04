async (page) => {
  const results = [];
  const axe = "node_modules/axe-core/axe.min.js";
  for (const route of [
    "/",
    "/products",
    "/products/automatic-dispenser",
    "/fragrances",
    "/contact",
    "/gallery",
  ]) {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("http://localhost:3000" + route);
    await page.waitForTimeout(1100);
    await page.addScriptTag({ path: axe });
    const audit = await page.evaluate(async () => {
      const r = await axe.run(document, {
        runOnly: {
          type: "tag",
          values: ["wcag2a", "wcag2aa", "wcag21aa", "best-practice"],
        },
      });
      return {
        violations: r.violations.map((v) => ({
          id: v.id,
          impact: v.impact,
          nodes: v.nodes.map((n) => ({
            target: n.target,
            summary: n.failureSummary,
          })),
        })),
        passes: r.passes.length,
      };
    });
    results.push({ route, ...audit });
  }
  return results;
};
