import { Root } from "@/Root";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
describe("Navigate and renders pages correctly", async () => {
  beforeEach(async () => {
    window.history.pushState({}, "", "/potter-app");
  });

  it("Should render houses page", async () => {
    render(<Root />);

    const loginLink = await screen.getByRole("link", {
      name: "Sign In",
    });
    await userEvent.click(loginLink);

    const email = await screen.getByRole("textbox", { name: "Email" });
    const password = await screen.getByPlaceholderText("Password");
    const button = await screen.getByRole("button", { name: "Sign In" });

    await act(async () => {
      await userEvent.type(email, "msf91@alu.ua.es");
      await userEvent.type(password, "123456");
      await userEvent.click(button);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    const link = await screen.getByRole("link", {
      name: "Spells",
    });

    await act(async () => {
      await userEvent.click(link);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    const title = await screen.findByText("Accio");
    expect(title).not.toBeNull();
  });
});
