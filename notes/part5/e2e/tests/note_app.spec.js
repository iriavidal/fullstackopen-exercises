const { test, describe, expect, beforeEach } = require("@playwright/test");

describe("Note app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http:localhost:3001/api/testing/reset");
    await request.post("http://localhost:3001/api/users", {
      data: {
        name: "Iria Vidal",
        username: "iria",
        password: "1234",
      },
    });

    await page.goto("http://localhost:5173");
  });

  /* test("front page can be opened", async ({ page }) => {
    // await page.goto("http://localhost:5173");

    const locator = await page.getByText("Notes");
    await expect(locator).toBeVisible();
    await expect(
      page.getByText(
        "Note app, Department of Computer Science, University of Helsinki 2024"
      )
    ).toBeVisible();
  }); */

  test("login form can be opened", async ({ page }) => {
    // npm test -- -- --ui

    // await page.goto("http://localhost:5173");

    await page.getByRole("button", { name: "log in" }).click();
    // await page.getByRole("textbox").fill("mluukkai");

    /* await page.getByRole("textbox").first().fill("iria");
    await page.getByRole("textbox").last().fill("1234"); */

    const textboxes = await page.getByRole("textbox").all();
    await textboxes[0].fill("iria");
    await textboxes[1].fill("1234");

    /* Ambas versiones de la prueba funcionan. Sin embargo, ambas son problemáticas en la medida en que si el formulario de registro cambia, las pruebas pueden fallar, ya que dependen de que los campos estén en la página en un cierto orden. 
    
    
    Una mejor solución es definir atributos de id de prueba únicos para los campos, y buscarlos en las pruebas utilizando el método getByTestId.*/

    await page.getByTestId("username").fill("iria");
    await page.getByTestId("password").fill("1234");
    await page.getByRole("button", { name: "login" }).click();

    await expect(page.getByText("Iria Vidal logged in")).toBeVisible();
  });

  test.only("login fails with wrong password", async ({ page }) => {
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
      await page.getByRole("button", { name: "log in" }).click();
      await page.getByTestId("username").fill("iria");
      await page.getByTestId("password").fill("1234");
      await page.getByRole("button", { name: "login" }).click();
    });

    test("a new note can be created", async ({ page }) => {
      await page.getByRole("button", { name: "new note" }).click();
      await page.getByRole("textbox").fill("a note created by playwright");
      await page.getByRole("button", { name: "save" }).click();
      await expect(
        page.getByText("a note created by playwright")
      ).toBeVisible();
    });

    describe("and a note exists", () => {
      beforeEach(async ({ page }) => {
        await page.getByRole("button", { name: "new note" }).click();
        await page.getByRole("textbox").fill("another note by playwright");
        await page.getByRole("button", { name: "save" }).click();
      });

      test("importance can be changed", async ({ page }) => {
        await page.getByRole("button", { name: "make not important" }).click();
        await expect(page.getByText("make important")).toBeVisible();
      });
    });
  });
});
