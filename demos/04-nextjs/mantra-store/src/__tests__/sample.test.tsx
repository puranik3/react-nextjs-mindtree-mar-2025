// __tests__/sample.test.tsx
import { render, screen } from '@testing-library/react';

const HelloWorld = () => <h1>Hello, World!</h1>;

test('renders Hello, World!', () => {
    render(<HelloWorld />);
    expect(screen.getByText('Hello, World!')).toBeInTheDocument();
});