import { render, fireEvent, screen } from '@testing-library/react';
import { SubscribeButton } from './index';
import { useSession, signIn } from 'next-auth/react';
import { mocked } from 'jest-mock';
import { useRouter } from 'next/router';

jest.mock('next-auth/react');

jest.mock('next/router');

describe('SubscribeButton Component', () => {
	it('renders?', () => {
		const useSessionMocked = mocked(useSession);

		useSessionMocked.mockReturnValue({
			data: null,
			status: 'unauthenticated',
		});

		const { getByText } = render(<SubscribeButton />);

		expect(getByText('Subscribe Now')).toBeInTheDocument();
	});

	it('redirects?', () => {
		render(<SubscribeButton />);

		const signInMocked = mocked(signIn);

		const subscribeButton = screen.getByText('Subscribe Now');

		fireEvent.click(subscribeButton);

		expect(signInMocked).toHaveBeenCalled();
	});

	it('#subscribed redirects?', () => {
		const useSessionMocked = mocked(useSession);

		useSessionMocked.mockReturnValueOnce({
			data: {
				user: { name: 'John Doe', email: 'john@exemple.com' },
				expires: '',
				activeSubscription: 'fake-subscription-id',
			},

			status: 'authenticated',
		});

		const useRouterMocked = mocked(useRouter);

		const pushMock = jest.fn();

		useRouterMocked.mockReturnValueOnce({ push: pushMock } as any);
		render(<SubscribeButton />);
		const subscribeButton = screen.getByText('Subscribe Now');

		fireEvent.click(subscribeButton);

		expect(pushMock).toHaveBeenCalledWith('/posts');
	});
});
