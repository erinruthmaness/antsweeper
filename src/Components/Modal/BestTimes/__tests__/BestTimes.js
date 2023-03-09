import React from "react";
import { cleanup, render } from "@testing-library/react";
import BestTimes from "../BestTimes";

import { LEVELS } from "utils/strings";

const levelsList = Object.values(LEVELS);
const levelsCount = levelsList.length;

afterEach(cleanup);

test("renders a heading and an unordered list for each level", () => {
  const { getAllByRole } = render(<BestTimes />);
  const sectionTitles = getAllByRole("heading");
  const sectionContents = getAllByRole("list");
  expect(sectionTitles).toHaveLength(levelsCount);
  expect(sectionContents).toHaveLength(levelsCount);

  const labelIds = levelsList.map((lvl) => `${lvl}-label`);

  const sectionTitleIds = sectionTitles.map((sectionTitle) => sectionTitle.getAttribute("id"));
  expect(sectionTitleIds).toEqual(labelIds);

  const sectionContentsLabels = sectionContents.map((sectionTitle) =>
    sectionTitle.getAttribute("aria-labelledby")
  );
  expect(sectionContentsLabels).toEqual(sectionTitleIds);
});
