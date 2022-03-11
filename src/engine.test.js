import { expect } from "chai";
import { next, parse } from "./engine";
const _ = false;
const o = true;
describe("next", () => {
  it("should return all dead cells given all dead cells", () => {
    expect(
      next([
        [_, _, _],
        [_, _, _],
        [_, _, _],
      ])
    ).to.deep.equal([
      [_, _, _],
      [_, _, _],
      [_, _, _],
    ]);
  });

  it("should be dead if there is no neighbours", () => {
    const result = next([
      [_, _, _],
      [_, o, _],
      [_, _, _],
    ]);
    expect(result[1][1]).to.equal(false);
  });

  it("should be dead if there is no neighbours for more than one active cells", () => {
    const result = next([
      [_, _, _, _],
      [_, o, _, o],
      [_, _, _, _],
    ]);
    expect(result[1][1]).to.equal(false);
    expect(result[1][3]).to.equal(false);
  });

  it("should revive if there is 3 neighbours", () => {
    const result = next([
      [_, _, _, _],
      [_, o, _, o],
      [_, _, o, _],
    ]);
    expect(result[1][1]).to.equal(false);
    expect(result[1][3]).to.equal(false);
    expect(result[1][2]).to.equal(true);
  });
});

describe("parse", () => {
  it("should return [] given ''", () => {
    expect(parse("")).to.deep.equal([]);
  });
  it("should parse O as true and . as false", () => {
    expect(parse("...\n.O.\n...\n")).to.deep.equal([
      [_, _, _],
      [_, o, _],
      [_, _, _],
    ]);
  });
});
