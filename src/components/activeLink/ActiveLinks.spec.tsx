import { render } from '@testing-library/react';
import { ActiveLink } from './index';

jest.mock('next/router', () => {
	return { useRouter: () => ({ asPath: '/' }) };
});

describe('ActiveLink Component', () => {
	it('renders?', () => {
		const { getByText } = render(
			<ActiveLink href='/' activeClassName='active'>
				<a>home</a>
			</ActiveLink>
		);

		expect(getByText('home')).toBeInTheDocument();
	});

	it('receives active class', () => {
		const { getByText } = render(
			<ActiveLink href='/' activeClassName='active'>
				<a>home</a>
			</ActiveLink>
		);

		expect(getByText('home')).toHaveClass('active');
	});
});
