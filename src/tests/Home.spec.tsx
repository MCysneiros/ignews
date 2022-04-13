import { render, screen } from '@testing-library/react';
import { stripe } from '../services/stripe';
import Home, { getStaticProps } from '../pages/index';
import { mocked } from 'jest-mock';

jest.mock('next/router');
jest.mock('next-auth/react', () => {
	return {
		useSession() {
			return { data: null, status: 'unauthenticated' };
		},
	};
});

jest.mock('../services/stripe');

describe('Home Page', () => {
	it('renders?', () => {
		render(<Home product={{ priceId: 'fake product', amount: 'R$10,00' }} />);

		expect(screen.getByText('for R$10,00 month')).toBeInTheDocument();
	});

	it('it loads the data?', async () => {
		const stripedMocked = mocked(stripe.prices.retrieve);

		stripedMocked.mockResolvedValueOnce({
			id: 'fake product',
			unit_amount: 1000,
		} as any);
		const response = await getStaticProps({});

		expect(response).toEqual(
			expect.objectContaining({
				props: {
					product: {
						priceId: 'fake product',
						amount: '$10.00',
					},
				},
			})
		);
	});
});
