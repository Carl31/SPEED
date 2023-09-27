import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from '@/app/page';

describe('Home page', () => {
    it('Should render properly', () => {
        render(<HomePage />);

        const header = screen.getByRole('heading');
        const headerText = 'Hello World - from frontend.';

        expect(header).toHaveTextContent(headerText);
    })
})