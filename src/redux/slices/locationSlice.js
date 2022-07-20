import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getLocations = createAsyncThunk(
  "locations/getLocations",
  async () => {
    return fetch("https://rickandmortyapi.com/api/location").then((res) =>
      res.json()
    );
  }
);

const locationSlice = createSlice({
  name: "locations",
  initialState: {
    locations: [],
    loading: false,
  },
  extraReducers: {
    [getLocations.pending]: (state, action) => {
      state.loading = true;
    },
    [getLocations.fulfilled]: (state, action) => {
      state.loading = false;
      state.locations = action.payload;
    },
    [getLocations.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export default locationSlice.reducer;
