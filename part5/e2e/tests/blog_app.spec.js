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

  describe("When logged in", () => {
    beforeEach(async ({ page }) => {
      await page.getByTestId("username").fill("iria");
      await page.getByTestId("password").fill("1234");
      await page.getByRole("button", { name: "login" }).click();
    });

    test("a new blog can be created", async ({ page }) => {
      await page.getByRole("button", { name: "new blog" }).click();
      await expect(page.getByText("title")).toBeVisible();
      await expect(page.getByText("author")).toBeVisible();
      await expect(page.getByText("url")).toBeVisible();

      await page.getByTestId("title").fill("Blog Test");
      await page.getByTestId("author").fill("Iria Vidal");
      await page.getByTestId("url").fill("blog_test.com");
      await page.getByRole("button", { name: "create" }).click();

      const blogDiv = await page.locator(".blog-summary");
      await expect(blogDiv).toContainText("Blog Test");
    });

    test("a blog can be edited", async ({ page }) => {
      await page.getByRole("button", { name: "new blog" }).click();
      await page.getByTestId("title").fill("Blog Test");
      await page.getByTestId("author").fill("Iria Vidal");
      await page.getByTestId("url").fill("blog_test.com");
      await page.getByRole("button", { name: "create" }).click();

      const blogDiv = await page.locator(".blog-summary");
      await expect(blogDiv).toContainText("Blog Test");
      await page.getByRole("button", { name: "view" }).click();

      await page.getByRole("button", { name: "like" }).click();
      const blogLikes = await page.locator(".blog-likes");
      await expect(blogLikes).toContainText("likes 1");
    });

    test("a blog can be deleted", async ({ page }) => {
      await page.getByRole("button", { name: "new blog" }).click();
      await page.getByTestId("title").fill("Blog Test");
      await page.getByTestId("author").fill("Iria Vidal");
      await page.getByTestId("url").fill("blog_test.com");
      await page.getByRole("button", { name: "create" }).click();

      const blogDiv = page.locator(".blog-summary");
      await expect(blogDiv).toContainText("Blog Test");

      await page.getByRole("button", { name: "view" }).click();

      /* NOTE: In Playwright tests the "remove" button only becomes visible after the blog has been updated (e.g. liked). This seems to be because the blog is initially rendered without the populated user field, and the UI only shows "remove" once the blog refreshes with the correct user data. In a real browser this issue does not occur. */
      await page.getByRole("button", { name: "like" }).click();

      const removeButton = page.getByRole("button", { name: "remove" });
      await expect(removeButton).toBeVisible();

      /* NOTE: The "dialog" event must be registered before clicking "remove", otherwise Playwright might miss the confirm popup and the test will hang. */
      page.once("dialog", async (dialog) => {
        expect(dialog.type()).toBe("confirm");
        await dialog.accept();
      });

      await removeButton.click();

      await expect(page.locator(".blog-summary")).toHaveCount(0, {
        timeout: 10000,
      });
    });
  });
});
