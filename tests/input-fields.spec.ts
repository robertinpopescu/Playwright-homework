import { test, expect } from "@playwright/test";
import { TIMEOUT } from "node:dns";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});
  
  test("Pet types", async ({ page }) => {
    await expect(page.locator(".title")).toHaveText("Welcome to Petclinic")

    // 1. Select the PET TYPES menu item in the navigation bar
    await page.getByRole("link", { name: "Pet Types" }).click()

    // 2. Add assertion of the "Pet Types" text displayed above the table with the list of pet types
    await expect(page.getByRole("heading", { name: "Pet Types", exact: true })).toBeVisible()

    // 3. Click on "Edit" button for the "cat" pet type
    await page.locator("#pettypes tbody tr").first().getByRole("button", { name: "Edit" }).click()

    // 4. Add assertion of the "Edit Pet Type" text displayed
    await expect(page.getByRole("heading", { name: "Edit Pet Type", exact: true })).toBeVisible()

    // 5. Change the pet type name from "cat" to "rabbit" and click "Update" button
    await expect(page.getByRole("textbox")).toHaveValue("cat") 
    await page.getByRole("textbox").fill("rabbit")
    await page.getByRole("button", { name: "Update" }).click()

    // 6. Add the assertion that the first pet type in the list of types has a value "rabbit" 
    await expect(page.locator('input[id="0"]')).toHaveValue("rabbit")

    // 7. Click on "Edit" button for the same "rabbit" pet type
    await page.locator("#pettypes tbody tr").first().getByRole("button", { name: "Edit" }).click()

    // 8. Change the pet type name back from "rabbit" to "cat" and click "Update" button
    await expect(page.getByRole("textbox")).toHaveValue("rabbit") 
    await page.getByRole("textbox").fill("cat")
    await page.getByRole("button", { name: "Update" }).click()

    // 9. Add the assertion that the first pet type in the list of names has a value "cat" 
    await expect(page.locator('input[id="0"]')).toHaveValue("cat")
    
    await page.close()
  });
