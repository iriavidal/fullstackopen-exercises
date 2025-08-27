const { test, expect, beforeEach, describe } = require("@playwright/test");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3001/api/testing/reset");
    await request.post("http://localhost:3001/api/users", {
      data: {
        name: "Iria Vidal",
        username: "iria",
        password: "1234",
      },
    });

    await page.goto("http://localhost:5173");
  });

  test("Login form is shown", async ({ page }) => {
    await expect(page.getByText("log in to application")).toBeVisible();
    await expect(page.getByText("username")).toBeVisible();
    await expect(page.getByText("password")).toBeVisible();
    await page.getByRole("button", { name: "login" }).click();
  });

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await page.getByTestId("username").fill("iria");
      await page.getByTestId("password").fill("1234");
      await page.getByRole("button", { name: "login" }).click();

      await expect(page.getByText("Iria Vidal logged in")).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await page.getByTestId("username").fill("iria");
      await page.getByTestId("password").fill("wrong");
      await page.getByRole("button", { name: "login" }).click();

      const errorDiv = await page.locator(".error");
      await expect(errorDiv).toContainText("Wrong credentials");

      await expect(page.getByText("Iria Vidal logged in")).not.toBeVisible();
    });
  });
});
