import {render, screen} from '@testing-library/react';
import Header from '../Header';


test('it should have heading', () => {
    render(
        <Header/>
    );

    const heading = screen.getByRole("heading", {name:"Quiz Masters"});
    expect(heading).toBeDefined();
})


test('it should have subHeading', () => {
    render(
            <Header/>
        );

    const subHeading = screen.getByRole("heading",{name:"let's test your knowledge"});
    expect(subHeading).toBeDefined();
})

