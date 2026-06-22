import { test, expect } from '@playwright/test'

test.describe('AquaOS Web', () => {
  test('loads the dashboard page', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('text=AquaOS')).toBeVisible()
    await expect(page.locator('text=Dashboard')).toBeVisible()
  })

  test('navigates to Levels page', async ({ page }) => {
    await page.goto('/')
    await page.click('button:has-text("Levels")')
    await expect(page.locator('h2:has-text("Training Levels")')).toBeVisible()
  })

  test('navigates to Planner page', async ({ page }) => {
    await page.goto('/')
    await page.click('button:has-text("Planner")')
    await expect(page.locator('text=Planner')).toBeVisible()
  })
})
