import { EXPERTISE_ITEMS } from "./constants";
import { ExpertiseItem } from "@/types";

describe("EXPERTISE_ITEMS", () => {
  it("should have 6 expertise items", () => {
    expect(EXPERTISE_ITEMS).toHaveLength(6);
  });

  it("should have all required fields for each item", () => {
    EXPERTISE_ITEMS.forEach((item: ExpertiseItem) => {
      expect(item).toHaveProperty("id");
      expect(item).toHaveProperty("title");
      expect(item).toHaveProperty("description");
      expect(item).toHaveProperty("icon");
      expect(item).toHaveProperty("features");
      expect(item.features).toBeInstanceOf(Array);
      expect(item.features.length).toBeGreaterThan(0);
    });
  });

  it("should include all 6 required services", () => {
    const expectedIds = [
      "audio-systems",
      "lighting-design",
      "led-screens",
      "stage-construction",
      "truss-rigging",
      "av-contractor",
    ];

    const actualIds = EXPERTISE_ITEMS.map((item) => item.id);
    expect(actualIds).toEqual(expectedIds);
  });

  it("should have valid icon paths", () => {
    EXPERTISE_ITEMS.forEach((item) => {
      expect(item.icon).toMatch(/^\/icons\/.*\.svg$/);
    });
  });

  it("should have valid image URLs", () => {
    EXPERTISE_ITEMS.forEach((item) => {
      expect(item.imageUrl).toMatch(/^\/images\/expertise\/.*\.jpg$/);
    });
  });

  it("should have non-empty descriptions", () => {
    EXPERTISE_ITEMS.forEach((item) => {
      expect(item.description.length).toBeGreaterThan(50);
    });
  });

  it("should have at least 4 features per item", () => {
    EXPERTISE_ITEMS.forEach((item) => {
      expect(item.features.length).toBeGreaterThanOrEqual(4);
    });
  });
});
