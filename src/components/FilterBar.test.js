import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import FilterBar from './FilterBar';

const onChangeSpellFilter = jest.fn();
const onHideNonFavourites = jest.fn();
const onShowNonFavourites = jest.fn();


test("Button press will toggle to show all when hideNonFavourites is true", () => {
    render(
        <FilterBar 
            onChangeSpellFilter={onChangeSpellFilter}
            onHideNonFavourites={onHideNonFavourites}
            onShowNonFavourites={onShowNonFavourites}
            hideNonFavourites={true}
        />
    );

    fireEvent.click(screen.getByRole("button"));
    expect(onShowNonFavourites).toBeCalled();
});

test("Button press will toggle to hide non-favourites when hideNonFavourites is false", () => {
    render(
        <FilterBar 
            onChangeSpellFilter={onChangeSpellFilter}
            onHideNonFavourites={onHideNonFavourites}
            onShowNonFavourites={onShowNonFavourites}
            hideNonFavourites={false}
        />
    );

    fireEvent.click(screen.getByRole("button"));
    expect(onHideNonFavourites).toBeCalled();
});

test("Editing the filter text input will cause prop callback to execute", async () => {
    render(
        <FilterBar 
            onChangeSpellFilter={onChangeSpellFilter}
            onHideNonFavourites={onHideNonFavourites}
            onShowNonFavourites={onShowNonFavourites}
            hideNonFavourites={false}
        />
    );

    fireEvent.change(screen.getByRole("textbox"), { target: { value:"abc" } });

    await waitFor(() => {
        expect(onChangeSpellFilter).toBeCalled();
    });
});