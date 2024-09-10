import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom"; // Custom matchers for the DOM
 import useAlertStore from "@/store/alertStore";
import { act } from "react-dom/test-utils";
import Alert from "@/components/ui/alert/alert";

describe("Alert Component", () => {
  beforeEach(() => {
    useAlertStore.setState({ alert: null, isError: false }); // Reset Zustand store before each test
  });

  it("renders nothing when there is no alert", () => {
    render(<Alert />);
    const alertElement = screen.queryByText("Test alert message"); // Query any text
    expect(alertElement).not.toBeInTheDocument();
  });

  it("renders an alert when alert is set", () => {
    // Update Zustand store state directly
    act(() => {
      useAlertStore.setState({ alert: "Test alert message", isError: false });
    });

    render(<Alert />);
    const alertElement = screen.getByText("Test alert message");
    expect(alertElement).toBeInTheDocument();
    expect(alertElement).toHaveClass("bg-slate-700"); // Check for the correct class
  });

  it("applies the error class when isError is true", () => {
    // Update Zustand store state directly
    act(() => {
      useAlertStore.setState({ alert: "Error alert message", isError: true });
    });

    render(<Alert />);
    const alertElement = screen.getByText("Error alert message");
    expect(alertElement).toBeInTheDocument();
    expect(alertElement).toHaveClass("bg-red-500"); // Check for error class
  });

  it("hides the alert after 2500ms", async () => {
    const setAlertMock = vi.fn();
    useAlertStore.setState({
      alert: "Test alert message",
      setAlert: setAlertMock,
      isError: false,
    });

    render(<Alert />);
    const alertElement = screen.getByText("Test alert message");
    expect(alertElement).toBeInTheDocument();

    // Wait for the alert to disappear after 2500ms
    await waitFor(
      () => {
        expect(setAlertMock).toHaveBeenCalledWith(null);
      },
      { timeout: 2600 }
    );
  });
});
