import { test, expect } from '@playwright/test';

test('validate prefix products name', async ({ page, baseURL }) => {
  test.fail(true, 'example of a test that intentionally failed')
  await test.step('navigate to the login page', async () => {
    await page.goto('/')
    await expect(await page.title()).toBe('Swag Labs')
    await page.locator('[data-test="username"]').fill('standard_user')
    await page.locator('[data-test="password"]').fill('secret_sauce')
    await page.locator('[data-test="login-button"]').click()
    await expect(await page.url()).toBe(`${baseURL}/inventory.html`)
  })
  await test.step('product name validation', async () => {
    const titleListLocator = await page.locator('.inventory_item_name')
    const prefixedNames = await titleListLocator.allTextContents()

    for (const name of prefixedNames) {
      await expect(await name).toContain('Sauce Labs')
    } 

  })
})