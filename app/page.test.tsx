/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import Page from "./page";
import StoreProvider from "./StoreProvider";

it("App Router: Works with Server Components", () => {
  render(
      <StoreProvider>
        <Page />
      </StoreProvider>
  );
  expect(screen.getByRole("heading")).toHaveTextContent("App Router");
});
