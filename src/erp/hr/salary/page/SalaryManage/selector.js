import { createSelector } from "reselect";

// input selector //

const selectHR = state => state.hr;

// output selector //

export const selectSalaryList = createSelector(
  [selectHR],
  salaryListInselector => salaryListInselector.salary.salaryList,
);

export const selectedErrorCD = createSelector(
  [selectHR],
  selectedErrorCD => selectedErrorCD.salary.flag,
);
