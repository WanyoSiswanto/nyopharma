import { expect, takeSnapshot, test } from '@chromatic-com/playwright';

test.describe('Visual testing', () => {
  test.describe('Static pages', () => {
    test('take screenshot of homepage', async ({ page }, testInfo) => {
      await page.goto('/');

      await expect(
        page.getByRole('heading', {
          level: 1,
        }),
      ).toBeVisible();

      await takeSnapshot(page, testInfo);
    });

    test('take screenshot of English homepage', async ({ page }, testInfo) => {
      await page.goto('/en');

      await expect(
        page.getByRole('heading', {
          level: 1,
        }),
      ).toBeVisible();

      await takeSnapshot(page, testInfo);
    });

    test('take screenshot of about page', async ({ page }, testInfo) => {
      await page.goto('/about');

      await expect(page.locator('main')).toBeVisible();

      await takeSnapshot(page, testInfo);
    });
  });
});
