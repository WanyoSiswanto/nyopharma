import { expect, test } from '@playwright/test';

test.describe('I18n', () => {
  test.describe('Language Switching', () => {
    test('switch language between Indonesian and English using dropdown', async ({ page }) => {
      await page.goto('/');

      await expect(
        page.getByRole('heading', {
          level: 1,
        }),
      ).toBeVisible();

      await page.getByRole('combobox').selectOption('en');

      await expect(page).toHaveURL(/\/en/u);

      await expect(
        page.getByRole('heading', {
          level: 1,
        }),
      ).toBeVisible();
    });

    test('switch language using URL path', async ({ page }) => {
      await page.goto('/en');

      await expect(
        page.getByRole('heading', {
          level: 1,
        }),
      ).toBeVisible();

      await page.goto('/');

      await expect(
        page.getByRole('heading', {
          level: 1,
        }),
      ).toBeVisible();
    });
  });
});
