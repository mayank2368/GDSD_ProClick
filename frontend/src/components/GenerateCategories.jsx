/*
 * Contributor: Abdullah Khalid and Tarmah Bin Iqbal
 */

import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { PRODUCT_CATEGORY } from "../utils";

const CATEGORIES = PRODUCT_CATEGORY;

export default function GenerateCategories({
  Category,
  SetSubCategory,
  SetCategory,
  SubCategory,
}) {
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "80%",
      }}
    >
      <FormControl sx={{ mb: 1, mt: 1, minWidth: 120 }}>
        <InputLabel id="demo-controlled-open-select-label">Category</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open1}
          onClose={() => setOpen1(false)}
          onOpen={() => setOpen1(true)}
          value={Category}
          label="Category"
          onChange={(event) => {
            SetCategory(event.target.value);
          }}
        >
          {Object.keys(CATEGORIES).map((item) => (
            <MenuItem value={item} key={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ mb: 1, mt: 1, minWidth: 120 }}>
        <InputLabel id="demo-controlled-open-select-label">
          SubCategory
        </InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open2}
          onClose={() => setOpen2(false)}
          onOpen={() => setOpen2(true)}
          value={SubCategory}
          label="sub-Category"
          onChange={(event) => SetSubCategory(event.target.value)}
        >
          {CATEGORIES[Category]?.map((item) => (
            <MenuItem value={item} key={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
