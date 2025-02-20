import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "@/App.tsx";

describe("Renders main page correctly", async () => {
  it("Should render the page correctly", async () => {
   
    render(<App />);
    const h1 = await screen.queryByText("Vite + React");
   
    expect(h1).not.toBeNull();
  });
});
