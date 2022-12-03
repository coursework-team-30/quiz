import { prettyDOM, render, screen } from "@testing-library/react";
import Header from "../Header";
import {logRoles} from '@testing-library/dom';


test('page should have a title', () => {
    render(<Header/>);
    const headTitle = screen.getByRole("heading", {name: "Quiz Masters"});
    expect(headTitle.innerHTML).toBe("Quiz Masters");

})

test('page should have a subheading', () => {
    render(<Header/>);
    const subTitle = screen.getByRole("heading", {name: "lets's test your knowledge"});
    expect(subTitle.innerHTML).toBe("lets's test your knowledge");
})
