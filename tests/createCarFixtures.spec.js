import { test } from "../src/customFixtures/customFixture.js";

test.describe("Create a car as a guest FIXTURES", async () => {

    test("Create a car as a Guest with session storage", async ({ guestGaragePage }) => {
        await guestGaragePage.createCarAsGuest();
    })
})