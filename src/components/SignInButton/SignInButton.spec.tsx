import { render } from '@testing-library/react';
import { SignInButton } from './index';
import { useSession } from 'next-auth/react';
import { mocked } from 'jest-mock';

jest.mock('next-auth/react');

describe('Header Component', () => {
	it('#not authenticated?', () => {
		const useSessionMocked = mocked(useSession);

		useSessionMocked.mockReturnValueOnce({
			data: null,
			status: 'unauthenticated',
		});

		const { getByText } = render(<SignInButton />);

		expect(getByText('Sign In with GitHub')).toBeInTheDocument();
	});

	it('#authenticated?', () => {
		const useSessionMocked = mocked(useSession);

		useSessionMocked.mockReturnValueOnce({
			data: {
				user: { name: 'John Doe', email: 'john@exemple.com' },
				expires: '',
			},

			status: 'authenticated',
		});

		const { getByText } = render(<SignInButton />);

		expect(getByText('John Doe')).toBeInTheDocument();
	});
});
