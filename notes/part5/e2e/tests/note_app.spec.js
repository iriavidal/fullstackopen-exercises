const { test, describe, expect, beforeEach } = require("@playwright/test");
const { loginWith, createNote } = require("./helper");

describe("Note app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("/api/testing/reset");
    await request.post("/api/users", {
      data: {
        name: "Iria Vidal",
        username: "iria",
        password: "1234",
      },
    });

    await page.goto("/");
  });

  test("user can log in", async ({ page }) => {
    await loginWith(page, "iria", "1234");
    await expect(page.getByText("Iria Vidal logged in")).toBeVisible();
  });

  test("login fails with wrong password", async ({ page }) => {
    // si no tuviera el only: npm test -- -- -g "login fails with wrong password"
    await page.getByRole("button", { name: "log in" }).click();
    await page.getByTestId("username").fill("mluukkai");
    await page.getByTestId("password").fill("wrong");
    await page.getByRole("button", { name: "login" }).click();

    //await expect(page.getByText("wrong credentials")).toBeVisible();
    const errorDiv = await page.locator(".error");
    await expect(errorDiv).toContainText("wrong credentials");
    await expect(errorDiv).toHaveCSS("border-style", "solid");
    await expect(errorDiv).toHaveCSS("color", "rgb(255, 0, 0)");

    await expect(
      page.getByText("Matti Luukkainen logged in")
    ).not.toBeVisible();
  });

  describe("when logged in", () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, "iria", "1234");
    });

    test("a new note can be created", async ({ page }) => {
      await createNote(page, "a note created by playwright", true);
      await expect(
        page.getByText("a note created by playwright")
      ).toBeVisible();
    });

    describe("and a note exists", () => {
      beforeEach(async ({ page }) => {
        await createNote(page, "first note", true);
        await createNote(page, "second note", true);
        await createNote(page, "third note", true);
      });

      test("importance can be changed", async ({ page }) => {
        const otherNoteText = await page.getByText("second note");
        const otherdNoteElement = await otherNoteText.locator("..");

        await otherdNoteElement
          .getByRole("button", { name: "make not important" })
          .click();
        await expect(
          otherdNoteElement.getByText("make important")
        ).toBeVisible();
      });
    });

    describe("and several notes exists", () => {
      beforeEach(async ({ page }) => {
        await createNote(page, "first note", true);
        await createNote(page, "second note", true);
      });

      test("one of those can be made nonimportant", async ({ page }) => {
        // npm test -- -- -g 'importance can be changed' --debug
        await page.pause();
        const secondNoteElement = await page
          .getByText("second note")
          .locator("..");
        await secondNoteElement
          .getByRole("button", { name: "make not important" })
          .click();
        await expect(
          secondNoteElement.getByText("make important")
        ).toBeVisible();
      });
    });
  });
});
