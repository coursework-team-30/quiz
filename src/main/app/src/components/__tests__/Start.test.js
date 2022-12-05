import {render, screen,fireEvent} from '@testing-library/react';
import Start from '../Start';
import {BrowserRouter as Router} from 'react-router-dom';
import userEvent from "@testing-library/user-event";

test('it should have heading', () => {
    render(
    <Router>
        <Start/>
    </Router>
    );

    const heading = screen.getByRole("heading", {name:"Quiz Masters"});
    expect(heading).toBeDefined();
})


test('it should have subHeading', () => {
    render(
        <Router>
            <Start/>
        </Router>
        );

    const subHeading = screen.getByRole("heading",{name:"let's test your knowledge"});
    expect(subHeading).toBeDefined();
})


test('it should throw an error if email is empty or invalid', async () => {
    const user = userEvent.setup();

    render(
        <Router>
            <Start/>
        </Router>
        );

    //To check if the input is empty
    const errorMsg = screen.findByRole("heading", {name:"* Please enter a valid mail Id to start"});
    await user.click(screen.getByRole('button', {name: /start/i}))
    expect((await errorMsg).className).toBe("errorMsgVisible");

    //To check if the input is valid
    user.type(screen.findByRole("textbox",{name:"emailInput"}),'tom11');
    user.click(screen.getByRole('button', {name: /start/i}))
    expect((await errorMsg).className).toBe("errorMsgVisible");
    
})

test('should pass if the input is valid', async () => {
    const user = userEvent.setup();

    render(
        <Router>
            <Start/>
        </Router>
        );

    //To check if email is valid
     const errorMsg = screen.findByRole("heading", {name:"* Please enter a valid mail Id to start"});
     user.type(screen.findByRole("textbox",{name:"emailInput"}),'tom11@gmail.com');
     user.click(screen.getByRole('button', {name: /start/i}))
     expect((await errorMsg).className).toBe("errorMsg");
})

