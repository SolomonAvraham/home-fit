import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"; // Jest matchers also work with Vitest
import HeroSection from "../../../src/components/sections/heroSection";

// Vitest uses `describe`, `it`, and `expect` just like Jest
describe("HeroSection Component", () => {
  it("renders the welcome message", () => {
    render(<HeroSection />);
    const welcomeMessage = screen.getByText("Welcome to HomeFit");
    expect(welcomeMessage).toBeInTheDocument();
  });

  it("renders the 'Start Working Out' link", () => {
    render(<HeroSection />);
    const startWorkingOutLink = screen.getByRole("link", {
      name: /Start Working Out/i,
    });
    expect(startWorkingOutLink).toBeInTheDocument();
    expect(startWorkingOutLink).toHaveAttribute("href", "/workouts");
  });

  it("renders all the feature cards", () => {
    render(<HeroSection />);
    const personalizedWorkouts = screen.getByText("Personalized Workouts");
    const cardioWorkouts = screen.getByText("Cardio Workouts");
    const strengthTraining = screen.getByText("Strength Training");

    expect(personalizedWorkouts).toBeInTheDocument();
    expect(cardioWorkouts).toBeInTheDocument();
    expect(strengthTraining).toBeInTheDocument();
  });

  it("renders the testimonials section", () => {
    render(<HeroSection />);
    const testimonial1 = screen.getByText(
      "HomeFit has completely changed my workout routine. I've never been fitter!"
    );
    const testimonial2 = screen.getByText(
      "The personalized workouts are amazing. It's like having a personal trainer at home!"
    );
    const testimonial3 = screen.getByText(
      "I love the community aspect. It keeps me motivated and accountable!"
    );

    expect(testimonial1).toBeInTheDocument();
    expect(testimonial2).toBeInTheDocument();
    expect(testimonial3).toBeInTheDocument();
  });

  it("renders the 'Sign Up Now' link", () => {
    render(<HeroSection />);
    const signUpLink = screen.getByRole("link", {
      name: /Sign Up Now/i,
    });
    expect(signUpLink).toBeInTheDocument();
    expect(signUpLink).toHaveAttribute("href", "/auth/register");
  });
});
