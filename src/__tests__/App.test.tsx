import { Root } from "@/Root";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
describe("Renders main page correctly", async () => {
  beforeEach(() => {
    window.history.pushState({}, "", "/potter-app");
  });

  it("Should render the page correctly", async () => {
    render(<Root />);
    const h1 = await screen.queryByText("Potter App");

    expect(h1).not.toBeNull();
  });

  it("Should render the NotFound page correctly", async () => {
    render(<Root />);

    const link = await screen.getAllByRole("link").at(-1);
    await userEvent.click(link);

    const h1 = await screen.queryByText(
      "It seems you've wandered into the Forbidden Forest..."
    );
    expect(h1).not.toBeNull();
  });

  it("Should log in correctly", async () => {
    render(<Root />);

    const housesLink = await screen.getByRole("link", {
      name: "Sign In",
    });
    await userEvent.click(housesLink);

    const email = await screen.getByRole("textbox", { name: "Email" });
    const password = await screen.getByPlaceholderText("Password");
    const button = await screen.getByRole("button", { name: "Sign In" });

    await act(async () => {
      await userEvent.type(email, "msf91@alu.ua.es");
      await userEvent.type(password, "123456");
      await userEvent.click(button);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    const title = await screen.queryByText("Welcome to the Magic World");
    expect(title).not.toBeNull();
  });
});
