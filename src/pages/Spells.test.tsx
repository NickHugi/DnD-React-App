import React from 'react';
import { fireEvent, render, RenderResult, screen, within } from "@testing-library/react";
import axios from "axios";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { act } from "react-test-renderer";

import store from "../store";
import Spells from "./Spells";


let spy: jest.SpyInstance;
let root: RenderResult;

const mockSpellsResponse = {
    count: 2,
    results: [
    {
        "index": "acid-arrow",
        "name": "Acid Arrow"
    },
    {
        "index": "acid-splash",
        "name": "Acid Splash"
    }]
};

beforeEach(async () => {
    spy = jest.spyOn(axios, "get");
    spy.mockReturnValue(Promise.resolve( {data: mockSpellsResponse} ));

    await act(async () => {
        root = render(
            <BrowserRouter>
                <Provider store={store}>
                    <Spells />
                </Provider>
            </BrowserRouter>
        );
    });
});

afterEach(() => {
    jest.resetAllMocks();
});


test("Editing filter text will hide unrelated items", async () => {
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "Splash" } });
    expect(screen.getByText("Acid Splash")).toBeInTheDocument();
    expect(screen.queryByText("Acid Arrow")).not.toBeInTheDocument();
});

test("Add favourite and then remove favourited spell", async () => {
    let acidArrowContainer = screen.getByText("Acid Arrow").closest("li")!;

    // Test setting acid-arrow as favourite
    await act(async () => {
        fireEvent.click(within(acidArrowContainer).getByText("★"));
    });
    expect(within(acidArrowContainer).getByText("★")).toHaveClass("isFavourite");

    // Test reverting acid-arrow back not favourited
    await act(async () => {
        fireEvent.click(within(acidArrowContainer).getByText("★"));
    });
    expect(within(acidArrowContainer).getByText("★")).toHaveClass("isNotFavourite");
});

test("Filter out non-favourite spells", async () => {
    // Set acid-arrow as favourite
    let acidArrowContainer = screen.getByText("Acid Arrow").closest("li")!;
    await act(async () => {
        fireEvent.click(within(acidArrowContainer).getByText("★"));
    });
    expect(within(acidArrowContainer).getByText("★")).toHaveClass("isFavourite");

    // Set non-favourite spells to be filtered out
    await act(async () => {
        fireEvent.click(screen.getByText("Show Favourites Only"));
    });

    const list = screen.getByRole("list");
    expect(within(list).getAllByRole("listitem").length).toBe(1);
});
