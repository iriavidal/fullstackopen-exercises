const { test, describe, expect, beforeEach } = require("@playwright/test");

describe("Note app", () => {
  beforeEach(async ({ page }) => {
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
  });

  /* Dado que hemos evitado que las pruebas se ejecuten en paralelo, Playwright ejecuta las pruebas en el orden en que aparecen en el código de prueba. Es decir, primero se realiza la prueba user can log in, donde el usuario inicia sesión en la aplicación. Después de esto se ejecuta la prueba a new note can be created, que también realiza un inicio de sesión, en el bloque beforeEach. ¿Por qué se hace esto, no está ya el usuario conectado gracias a la prueba anterior? No, porque la ejecución de cada prueba comienza desde el "estado cero" del navegador, todos los cambios realizados en el estado del navegador por las pruebas anteriores se resetean. */
});
