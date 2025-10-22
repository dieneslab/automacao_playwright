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

test('the user inserts wrong credentials', async ({ page, baseURL }) => {
  await page.goto('/')

  await page.locator('[data-test="username"]').fill('standard_user')
  await page.locator('[data-test="password"]').fill('wrong_pass')
  await page.locator('[data-test="login-button"]').click()

  const loginError = await page.getByText('Epic sadface: Username and password do not match any user in this service')
  await expect(loginError).toBeVisible()  

})