import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Token } from '../../App';

interface TokenState {
  sellToken: Token | null;
  sellValue:number ;
  receiveToken: Token | null;
  receiveValue:number;
}

const initialState: TokenState = {
  sellToken: null,
  sellValue:0,
  receiveToken: null,
  receiveValue:0
};

const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setSellToken: (state, action: PayloadAction<Token>) => {
      state.sellToken = action.payload;
    },
    setReceiveToken: (state, action: PayloadAction<Token>) => {
      state.receiveToken = action.payload;
    },
    

  },
});

export const { setSellToken, setReceiveToken} = tokenSlice.actions;
export default tokenSlice.reducer;