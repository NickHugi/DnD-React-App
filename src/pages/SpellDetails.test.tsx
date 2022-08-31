import React from 'react';
import { render, RenderResult, screen, within } from "@testing-library/react";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import { act } from 'react-test-renderer';

import SpellDetails from "./SpellDetails";


let spy: jest.SpyInstance;
let root: RenderResult;

async function mockRender() {
    root = render(
        <BrowserRouter>
            <SpellDetails />
        </BrowserRouter>
    );

    await act(async () => {
        expect(spy).toHaveBeenCalled();
    });
}

const mockSpellDetails = {
    level: 1,
    duration: "Instantaneous",
    casting_time: "1 action",
    attack_type: "ranged",
    ritual: true,
    school: "Conjuration",
    concentration: false,
    range: "10 feet",
    desc: "A shimmering green arrow streaks toward a target within range and bursts in a spray of acid. Make a ranged spell attack against the target. On a hit, the target takes 4d4 acid damage immediately and 2d4 acid damage at the end of its next turn. On a miss, the arrow splashes the target with acid for half as much of the initial damage and no damage at the end of its next turn.",
    higher_level: "When you cast this spell using a spell slot of 3rd level or higher, the damage (both initial and later) increases by 1d4 for each slot level above 2nd.",
    materials: "Powdered rhubarb leaf and an adder's stomach.",
    components: ["V", "S", "M"],
    classes: ["Wizard"],
    subclasses: ["Lore", "Land"]
}

test("Ritual displays correctly when true", async () => {
    spy = jest.spyOn(axios, "get");
    spy.mockReturnValue(Promise.resolve( {data: mockSpellDetails, ritual: true} ));
    await mockRender();

    let ritualContainer = screen.getByText("Ritual").closest("div")!;
    expect(within(ritualContainer).getByText("Yes")).toBeInTheDocument();
});

test("Ritual displays correctly when false", async () => {
    spy = jest.spyOn(axios, "get");
    spy.mockReturnValue(Promise.resolve( {data: {...mockSpellDetails, ritual: false}} ));
    await mockRender();

    let ritualContainer = screen.getByText("Ritual").closest("div")!;
    expect(within(ritualContainer).getByText("No")).toBeInTheDocument();
});

test("Concentration displays correctly when true", async () => {
    spy = jest.spyOn(axios, "get");
    spy.mockReturnValue(Promise.resolve( {data: {...mockSpellDetails, concentration: true}} ));
    await mockRender();

    let concentrationContainer = screen.getByText("Concentration").closest("div")!;
    expect(within(concentrationContainer).getByText("Yes")).toBeInTheDocument();
});

test("Concentration displays correctly when false", async () => {
    spy = jest.spyOn(axios, "get");
    spy.mockReturnValue(Promise.resolve( {data: {...mockSpellDetails, concentration: false}} ));
    await mockRender();

    let concentrationContainer = screen.getByText("Concentration").closest("div")!;
    expect(within(concentrationContainer).getByText("No")).toBeInTheDocument();
});

test("Attack type displayes correctly when no attack type specified", async () => {
    spy = jest.spyOn(axios, "get");
    spy.mockReturnValue(Promise.resolve( {data: {...mockSpellDetails, attack_type: undefined}} ));
    await mockRender();

    let attackTypeContainer = screen.getByText("Attack Type").closest("div")!;
    expect(within(attackTypeContainer).getByText("N/A")).toBeInTheDocument();
});

test("Attack type displayes correctly when no attack type specified", async () => {
    spy = jest.spyOn(axios, "get");
    spy.mockReturnValue(Promise.resolve( {data: {...mockSpellDetails, attack_type: "Ranged"}} ));
    await mockRender();

    let attackTypeContainer = screen.getByText("Attack Type").closest("div")!;
    expect(within(attackTypeContainer).getByText("Ranged")).toBeInTheDocument();
});