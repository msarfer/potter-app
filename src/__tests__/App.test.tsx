import { Root } from "@/Root";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

describe("Renders main page correctly", async () => {
  beforeEach(() => {
    window.history.pushState({}, "", "/potter-app/");
  });

  it("Should render the page correctly", async () => {
    render(<Root />);
    const h1 = await screen.queryByText("Potter App");

    expect(h1).not.toBeNull();
  });
});
