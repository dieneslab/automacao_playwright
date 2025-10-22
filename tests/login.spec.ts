import { test, expect } from '@playwright/test';

test('the user login with success', async ({ page, baseURL }) => {
  await page.goto('/')
  await expect(await page.title()).toBe('Swag Labs')

  await page.locator('[data-test="username"]').fill('standard_user')
  await page.locator('[data-test="password"]').fill('secret_sauce')
  await page.locator('[data-test="login-button"]').click()
  await expect(await page.url()).toBe(`${baseURL}/inventory.html`)
  const productTitle = page.locator('[data-test="title"]')
  await expect(productTitle).toHaveText('Products')

})
