import { isLineAroundCell } from "./line";

describe(`isLineAroundCell`, () => {
  it(`works`, () => {
    expect(
      isLineAroundCell(
        {
          from: { x: 1, y: 1 },
          direction: "right",
          owner: "bob",
        },
        { x: 1, y: 1 }
      )
    ).toBe(true);

    expect(
      isLineAroundCell(
        {
          from: { x: 1, y: 1 },
          direction: "down",
          owner: "bob",
        },
        { x: 1, y: 1 }
      )
    ).toBe(true);

    expect(
      isLineAroundCell(
        {
          from: { x: 2, y: 1 },
          direction: "down",
          owner: "bob",
        },
        { x: 1, y: 1 }
      )
    ).toBe(true);

    expect(
      isLineAroundCell(
        {
          from: { x: 2, y: 1 },
          direction: "right",
          owner: "bob",
        },
        { x: 1, y: 1 }
      )
    ).toBe(false);

    expect(
      isLineAroundCell(
        {
          from: { x: 1, y: 2 },
          direction: "down",
          owner: "bob",
        },
        { x: 1, y: 1 }
      )
    ).toBe(false);

    expect(
      isLineAroundCell(
        {
          from: { x: 1, y: 2 },
          direction: "right",
          owner: "bob",
        },
        { x: 1, y: 1 }
      )
    ).toBe(false);

    expect(
      isLineAroundCell(
        {
          from: { x: 2, y: 2 },
          direction: "right",
          owner: "bob",
        },
        { x: 1, y: 1 }
      )
    ).toBe(false);

    expect(
      isLineAroundCell(
        {
          from: { x: 0, y: 1 },
          direction: "right",
          owner: "bob",
        },
        { x: 1, y: 1 }
      )
    ).toBe(false);
  });
});
