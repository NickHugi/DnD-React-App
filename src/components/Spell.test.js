import { fireEvent, render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { BrowserRouter, Routes } from "react-router-dom";

import Spell from "./Spell";

describe("non-favourited spell", () => {
    let root;

    const onFavourite = jest.fn();
    const onUnfavourite = jest.fn();

    beforeEach(() => {
        root = render(
            <BrowserRouter>
                <Spell
                    key="acid-arrow"
                    index="acid-arrow"
                    spellName="Acid Arrow"
                    isFavourite={true}
                    onFavourite={onFavourite}
                    onUnfavourite={onUnfavourite}
                />
            </BrowserRouter>
        );
    });

    it("executes addFavouriteHandler on non-favourited spell", async () => {
        fireEvent.click(root.getByText("★"));
        expect(onUnfavourite).toBeCalled();
        expect(onFavourite).not.toBeCalled();
    });

    it("uses the correct class for the favourite button", async() => {
        expect(screen.getByText("★")).toHaveClass("isFavourite")
    });
});

describe("non-favourited spell", () => {
    let spell;

    const onFavourite = jest.fn();
    const onUnfavourite = jest.fn();

    beforeEach(() => {
        spell = render(
            <BrowserRouter>
                <Spell
                    key="acid-arrow"
                    index="acid-arrow"
                    spellName="Acid Arrow"
                    isFavourite={false}
                    onFavourite={onFavourite}
                    onUnfavourite={onUnfavourite}
                />
            </BrowserRouter>
        );
    });

    it("executes addFavouriteHandler on non-favourited spell", async () => {
        fireEvent.click(spell.getByText("★"));
        expect(onFavourite).toBeCalled();
        expect(onUnfavourite).not.toBeCalled();
    });

    it("uses the correct class for the favourite button", async() => {
        expect(screen.getByText("★")).toHaveClass("isNotFavourite")
    });
});