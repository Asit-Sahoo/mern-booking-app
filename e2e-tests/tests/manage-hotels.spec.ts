import { test, expect } from "@playwright/test";
import path from "path";

const UI_URL = "http://localhost:5173/";

test.beforeEach(async ({ page }) => {
  await page.goto(UI_URL);

  // get the sign in button
  await page.getByRole("link", { name: "Sign In" }).click();

  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  await page.locator("[name=email]").fill("asitsahoo3921@gmail.com");
  await page.locator("[name=password]").fill("123456");

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("Sign in Successful!")).toBeVisible();
});

// test("should allow user to add a hotel", async ({ page }) => {
//     await page.goto(`${UI_URL}add-hotel`);
  
//     await page.locator('[name="name"]').fill("Test Hotel");
//     await page.locator('[name="city"]').fill("Test City");
//     await page.locator('[name="country"]').fill("Test Country");
//     await page
//       .locator('[name="description"]')
//       .fill("This is a description for the Test Hotel");
//     await page.locator('[name="pricePerNight"]').fill("100");
//     await page.selectOption('select[name="starRating"]', "3");
  
//     await page.getByText("Budget").click();
  
//     await page.getByLabel("Free Wifi").check();
//     await page.getByLabel("Parking").check();
  
//     await page.locator('[name="adultCount"]').fill("2");
//     await page.locator('[name="childCount"]').fill("4");
  
//     await page.setInputFiles('[name="imageFiles"]', [
//       path.join(__dirname, "files", "1.jpg"),
//       path.join(__dirname, "files", "2.jpg"),
//     ]);
//     await page.getByRole("button", { name: "Save" }).click();
//     await expect(page.getByText("Hotel Saved!", { timeout: 10000 })).toBeVisible();
// });

test("should allow user to add a hotel", async ({ page }) => {
    await page.goto(`${UI_URL}add-hotel`);

    await page.locator('[name="name"]').fill("Test Hotel");
    await page.locator('[name="city"]').fill("Test City");
    await page.locator('[name="country"]').fill("Test Country");
    await page.locator('[name="description"]').fill("This is a description for the Test Hotel");
    await page.locator('[name="pricePerNight"]').fill("100");
    await page.selectOption('select[name="starRating"]', "3");
  
    await page.getByText("Budget").click();
  
    await page.getByLabel("Free Wifi").check();
    await page.getByLabel("Parking").check();
  
    await page.locator('[name="adultCount"]').fill("2");
    await page.locator('[name="childCount"]').fill("4");
  
    await page.setInputFiles('[name="imageFiles"]', [
      path.join(__dirname, "files", "1.jpg"),
      path.join(__dirname, "files", "2.jpg"),
    ]);
    await page.getByRole("button", { name: "Save" }).click();

    // Wait for the success message, with a timeout
    await Promise.race([
        page.waitForSelector('text="Hotel Saved!"', { timeout: 10000 }),
        page.waitForSelector('text="Some other element indicating error"', { timeout: 10000 })
    ]);

    // Check if the success message appeared
    const successMessage = await page.$('text="Hotel Saved!"');
    if (!successMessage) {
        throw new Error("Hotel saving timed out or failed.");
    }
});


// import { test, expect } from "@playwright/test";
// import path from "path";

// const UI_URL = "http://localhost:5173/";

// test.beforeEach(async ({ page }) => {
//   await page.goto(UI_URL);

//   // Sign in
//   await page.getByRole("link", { name: "Sign In" }).click();
//   await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();
//   await page.locator("[name=email]").fill("asitsahoo3921@gmail.com");
//   await page.locator("[name=password]").fill("123456");
//   await page.getByRole("button", { name: "Login" }).click();
//   await expect(page.getByText("Sign in Successful!")).toBeVisible();
// });

// test("should allow user to add a hotel", async ({ page }) => {
//   await page.goto(`${UI_URL}add-hotel`);

//   // Fill out the form
//   await page.locator('[name="name"]').fill("Test Hotel");
//   await page.locator('[name="city"]').fill("Test City");
//   await page.locator('[name="country"]').fill("Test Country");
//   await page.locator('[name="description"]').fill("This is a description for the Test Hotel");
//   await page.locator('[name="pricePerNight"]').fill("100");
//   await page.selectOption('select[name="starRating"]', "3");
//   await page.getByText("Budget").click();
//   await page.getByLabel("Free Wifi").check();
//   await page.getByLabel("Parking").check();
//   await page.locator('[name="adultCount"]').fill("2");
//   await page.locator('[name="childCount"]').fill("4");

//   // Upload image files
//   await page.setInputFiles('[name="imageFiles"]', [
//     path.join(__dirname, "files", "1.jpg"),
//     path.join(__dirname, "files", "2.jpg"),
//   ]);

//   // Submit the form
//   await page.getByRole("button", { name: "Save" }).click();

//   // Wait for navigation to complete
//   //await page.waitForNavigation();

//   // Assert the final outcome
//   await expect(page.getByText("Hotel Saved!")).toBeVisible();
// });
