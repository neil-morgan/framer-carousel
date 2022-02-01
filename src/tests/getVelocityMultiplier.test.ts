import {getVelocityMultiplier} from "utils";

const velocityMaxMultiplier = 0.35;
const velocityMaxWidth = 1200;
const velocityMinMultiplier = 0.65;
const velocityMinWidth = 600;

describe("getVelocityMultiplier", () => {
    it("should return 0.35 if passed 1200", () => {
        expect(
            getVelocityMultiplier(
                velocityMaxMultiplier,
                velocityMaxWidth,
                velocityMinMultiplier,
                velocityMinWidth,
                1200
            )
        ).toBe(0.35);
    });

    it("should return 0.35 if passed 1201", () => {
        expect(
            getVelocityMultiplier(
                velocityMaxMultiplier,
                velocityMaxWidth,
                velocityMinMultiplier,
                velocityMinWidth,
                1201
            )
        ).toBe(0.35);
    });

    it("should return 0.5 if passed 900", () => {
        expect(
            getVelocityMultiplier(
                velocityMaxMultiplier,
                velocityMaxWidth,
                velocityMinMultiplier,
                velocityMinWidth,
                900
            )
        ).toBe(0.5);
    });

    it("should return 0.65 if passed 600", () => {
        expect(
            getVelocityMultiplier(
                velocityMaxMultiplier,
                velocityMaxWidth,
                velocityMinMultiplier,
                velocityMinWidth,
                600
            )
        ).toBe(0.65);
    });

    it("should return 0.65 if passed 599", () => {
        expect(
            getVelocityMultiplier(
                velocityMaxMultiplier,
                velocityMaxWidth,
                velocityMinMultiplier,
                velocityMinWidth,
                599
            )
        ).toBe(0.65);
    });
});
