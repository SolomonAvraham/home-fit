import { expect } from "chai";
import formatMinutesToHours from "../../../src/utils/formatMinutesToHours"; // Adjust the path as necessary

describe("formatMinutesToHours", () => {
  it("should return '0' when minutes is 0", () => {
    const result = formatMinutesToHours(0);
    expect(result).to.equal("0");
  });

  it("should return '{minutes} minutes' when minutes is less than 10", () => {
    const result = formatMinutesToHours(5);
    expect(result).to.equal("5 minutes");
  });

  it("should return '{minutes} minutes' when minutes is less than 60", () => {
    const result = formatMinutesToHours(45);
    expect(result).to.equal("45 minutes");
  });

  it("should return '01:00 hours' when minutes is exactly 60", () => {
    const result = formatMinutesToHours(60);
    expect(result).to.equal("01:00 hours");
  });

  it("should return '{hours}:{remainingMinutes} hours' when minutes is more than 60", () => {
    const result = formatMinutesToHours(125);
    expect(result).to.equal("02:05 hours");
  });

  it("should return '{hours}:00 hours' when minutes is a multiple of 60", () => {
    const result = formatMinutesToHours(120);
    expect(result).to.equal("02:00 hours");
  });

  it("should handle large values correctly", () => {
    const result = formatMinutesToHours(1439); // 23 hours, 59 minutes
    expect(result).to.equal("23:59 hours");
  });
});
