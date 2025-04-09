import { render, screen } from '@testing-library/react';
import Home from './home';

describe('Home Component', () => {
    const mockImages = [
        { img: '/image1.jpg', title: 'Image 1' },
        { img: '/image2.jpg', title: 'Image 2' },
        { img: '/image3.jpg', title: 'Image 3' },
    ];

    it('renders the correct number of images', () => {
        render(<Home images={mockImages} />);
        const images = screen.getAllByRole('img');
        expect(images).toHaveLength(mockImages.length);
    });

    it('renders the correct alt text for each image', () => {
        render(<Home images={mockImages} />);
        mockImages.forEach((image) => {
            expect(screen.getByAltText(image.title)).toBeInTheDocument();
        });
    });

    it('renders the text content correctly', () => {
        render(<Home images={mockImages} />);
        expect(screen.getByText('Mantra')).toBeInTheDocument();
        expect(screen.getByText('The Honest Store')).toBeInTheDocument();
        expect(
            screen.getByText(
                /If you cannot find what you are looking for here, it is likely not a thing!/i
            )
        ).toBeInTheDocument();
        expect(
            screen.getByText(
                /If you find it elsewhere at a lesser price, we will match the price for you!!/i
            )
        ).toBeInTheDocument();
    });
});