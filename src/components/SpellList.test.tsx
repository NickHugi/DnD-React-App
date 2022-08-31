import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import SpellList from "./SpellList";


describe("SpellList component", () => {
    const mockSpells = [
        {
            "index": "acid-arrow",
            "name": "Acid Arrow"
        },
        {
            "index": "acid-splash",
            "name": "Acid Splash"
        }
    ];

    const mockFavourites = [
        "acid-arrow"
    ];

    it("renders both favourites and non-favourites when non-favourites are visible", () => {
        render(
            <BrowserRouter>
                <SpellList
                    spells={mockSpells}
                    favourites={mockFavourites}
                    filterName=""
                    hideNonFavourites={false}
                    onFavourite={() => {}}
                    onUnfavourite={() => {}}
                />
            </BrowserRouter>
        );

        expect(screen.getByText("Acid Arrow")).toBeInTheDocument();
        expect(screen.getByText("Acid Splash")).toBeInTheDocument();
    });

    it("renders only favourites when non-favourites are hidden", () => {
        render(
            <BrowserRouter>
                <SpellList
                    spells={mockSpells}
                    favourites={mockFavourites}
                    filterName=""
                    hideNonFavourites={true}
                    onFavourite={() => {}}
                    onUnfavourite={() => {}}
                />
            </BrowserRouter>
        );

        expect(screen.getByText("Acid Arrow")).toBeInTheDocument();
        expect(screen.queryByText("Acid Splash")).not.toBeInTheDocument();
    });

    it("renders only acid splash when filter is set to 'splash' and non-favourites are visibile", () => {
        render(
            <BrowserRouter>
                <SpellList
                    spells={mockSpells}
                    favourites={mockFavourites}
                    filterName="splash"
                    hideNonFavourites={false}
                    onFavourite={() => {}}
                    onUnfavourite={() => {}}
                />
            </BrowserRouter>
        );

        // Note: Filtering should not be case sensitive,
        // so 'splash' will mean 'Acid Splash' renders.

        expect(screen.queryByText("Acid Arrow")).not.toBeInTheDocument();
        expect(screen.getByText("Acid Splash")).toBeInTheDocument();
    });
});