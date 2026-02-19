// Baseline screenshot capture for Storybook v7
import { chromium } from '@playwright/test';

const STORYBOOK_URL = 'http://localhost:6009';
const SCREENSHOT_DIR = 'specs/002-storybook-upgrade/screenshots/baseline';

async function captureBaseline() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Wait for Storybook to load
  await page.goto(STORYBOOK_URL);
  await page.waitForTimeout(3000); // Wait for stories to load

  // 1. Storybook UI
  await page.screenshot({ path: `${SCREENSHOT_DIR}/baseline-storybook-ui.png`, fullPage: true });
  console.log('✓ Captured: baseline-storybook-ui.png');

  // 2. Atom story (AddButton)
  await page.click('text=AddButton');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: `${SCREENSHOT_DIR}/baseline-atom-story.png` });
  console.log('✓ Captured: baseline-atom-story.png');

  // 3. Organism story (JobTargetCard)
  await page.click('text=JobTargetCard');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: `${SCREENSHOT_DIR}/baseline-organism-story.png` });
  console.log('✓ Captured: baseline-organism-story.png');

  // 4. Page story (KanbanBoardPage)
  await page.click('text=KanbanBoardPage');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: `${SCREENSHOT_DIR}/baseline-page-story.png` });
  console.log('✓ Captured: baseline-page-story.png');

  // 5. a11y addon
  await page.click('button[role="tab"]:has-text("Accessibility")');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: `${SCREENSHOT_DIR}/baseline-a11y-addon.png` });
  console.log('✓ Captured: baseline-a11y-addon.png');

  await browser.close();
  console.log('\n✅ All baseline screenshots captured successfully!');
}

captureBaseline().catch(console.error);
