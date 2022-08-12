import { createSlice, configureStore } from '@reduxjs/toolkit';

const initialState = { favourites: JSON.parse(localStorage.getItem("favourites")) || [] }

const spellsSlice = createSlice({
    name: 'spells',
    initialState,
    reducers: {
        add(state, action) {
            // add new spell to favourites if it does not already exist
            if (!state.favourites.includes(action.payload))
            {
                state.favourites.push(action.payload);
                localStorage.setItem("favourites", JSON.stringify(state.favourites));
            }
        },
        remove(state, action) {
            // remove spell from favourites
            state.favourites = state.favourites.filter(fav => fav != action.payload)
            localStorage.setItem("favourites", JSON.stringify(state.favourites));
        },
        clear(state) {
            // clear all spells from favourites
            state.favourites = [];
            localStorage.setItem("favourites", JSON.stringify(state.favourites));
        }
    }
})

const store = configureStore({
    reducer: spellsSlice.reducer
});

export const spellsActions = spellsSlice.actions;

export default store;