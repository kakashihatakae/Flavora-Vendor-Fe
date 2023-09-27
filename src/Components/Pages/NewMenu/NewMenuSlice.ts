import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { BASE_URL } from "../../Shared/const";
import { getToken } from "../../Shared/AuthUtils";

interface Item {
  item_id: string;
  name: string;
  price: number;
  image: string;
  isSelected?: boolean;
}

export interface NewMenuState {
  orderDeadline?: Date;
  deliveryEstimate?: Date;
  archivedItems: Item[];
  isLoading?: boolean;
  title?: string;
}

// TODO: Remove initial state
const initialState: NewMenuState = {
  archivedItems: [],
};

export const getAllItems = createAsyncThunk(
  "NewMenuSlice/getAllItems",
  async () => {
    const token = getToken();
    try {
      const res = await fetch(`${BASE_URL}/menu/getallitems`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return await res.json();
    } catch (e) {
      // TODO
      console.log(e);
    }
  }
);

export const newMenuSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    selectItem: (state, action: PayloadAction<string>) => {
      state.archivedItems = state.archivedItems.map((item) =>
        item.item_id === action.payload ? { ...item, isSelected: true } : item
      );
    },
    removeSelectedItem: (state, action: PayloadAction<string>) => {
      state.archivedItems = state.archivedItems.map((item) =>
        item.item_id === action.payload ? { ...item, isSelected: false } : item
      );
    },
    setOrderDeadline: (state, action: PayloadAction<Date>) => {
      state.orderDeadline = action.payload;
    },
    setDeliveryEstimate: (state, action: PayloadAction<Date>) => {
      state.deliveryEstimate = action.payload;
    },
    addItem: (state, action: PayloadAction<Item>) => {
      state.archivedItems = [action.payload, ...state.archivedItems];
    },
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getAllItems.fulfilled,
      (state, action: PayloadAction<Item[]>) => {
        state.archivedItems = action.payload.reverse();
      }
    );
  },
});

export const {
  selectItem,
  removeSelectedItem,
  setOrderDeadline,
  setDeliveryEstimate,
  addItem,
  setTitle,
} = newMenuSlice.actions;

export default newMenuSlice.reducer;
