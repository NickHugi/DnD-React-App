import { fireEvent, render, screen, waitForElementToBeRemoved, within } from '@testing-library/react';
import axios from 'axios';
import preview from 'jest-preview';
import { Provider } from 'react-redux';
import { act } from 'react-test-renderer';

import App from './App';
import store from './store';

let spy;

beforeAll(() => {
    spy = jest.spyOn(axios, "get");
});

afterEach(() => {    
    jest.clearAllMocks();
});

test("Go to and open a spell from the list", async () => {
    spy.mockImplementation(axios);

    await act(async () => {
        render(
            <Provider store={store}>
                <App />
            </Provider>
        );
    });

    // Open spells page
    fireEvent.click(screen.getByText("Spells"));
    await waitForElementToBeRemoved(screen.getByAltText("Loading..."));

    // Confirm the list of spells is loaded up
    expect(screen.getByText("Acid Arrow")).toBeInTheDocument();
    expect(screen.getByText("Acid Splash")).toBeInTheDocument();
    expect(screen.getByText("Aid")).toBeInTheDocument();
    
    await new Promise((r) => setTimeout(r, 10));

    // Open acid arrow spell page
    let acidArrow = screen.getByText("Acid Arrow")
    fireEvent.click(acidArrow);
    await waitForElementToBeRemoved(screen.getByAltText("Loading..."));
    
    // Confirm page loaded correctly by scanning for the appropriate description
    const acidArrowDesc = "A shimmering green arrow streaks toward a target within range and bursts in a spray of acid. Make a ranged spell attack against the target. On a hit, the target takes 4d4 acid damage immediately and 2d4 acid damage at the end of its next turn. On a miss, the arrow splashes the target with acid for half as much of the initial damage and no damage at the end of its next turn."
    expect(screen.getByText(acidArrowDesc)).toBeInTheDocument()
});

test("Add a favourite and verify it through the filter", async () => {
    spy.mockImplementation(axios);
    
    await act(async () => {
        render(
            <Provider store={store}>
                <App />
            </Provider>
        );
    });

    // Open Spells page
    fireEvent.click(screen.getByText("Spells"));
    await waitForElementToBeRemoved(screen.getByAltText("Loading..."));

    // Click to add Acid Arrow to our favourites
    let acidArrowContainer = screen.getByText("Acid Arrow").closest("li");
    await act(async () => {
        fireEvent.click(within(acidArrowContainer).getByText("★"));
    });

    // Check that the star symbol is now in the isFavourite state
    expect(within(acidArrowContainer).getByText("★")).toHaveClass("isFavourite");

    // Click to filter non-favourited spells
    fireEvent.click(screen.getByText("Show Favourites Only"));
    await new Promise((r) => setTimeout(r, 10));

    // Verify Acid Arrow is visible but others are not
    expect(screen.getByText("Acid Arrow")).toBeInTheDocument();
    expect(screen.queryByText("Acid Splash")).not.toBeInTheDocument();
})