import { render } from '@testing-library/react';
import { Header } from './index';

jest.mock('next/router', () => {
	return { useRouter: () => ({ asPath: '/' }) };
});

jest.mock('next-auth/react', () => {
	return {
		useSession: () => {
			return [null, false];
		},
	};
});

describe('Header Component', () => {
	it('renders?', () => {
		const { getByText } = render(<Header />);

		expect(getByText('Home')).toBeInTheDocument();
		expect(getByText('Posts')).toBeInTheDocument();
	});
});
