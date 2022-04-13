import { render, screen } from '@testing-library/react';
import Post, { getStaticProps } from '../pages/posts/preview/[slug]';
import { mocked } from 'jest-mock';
import { getSession } from 'next-auth/react';
import { getPrismicClient } from '../services/prismic';

const post = { slug: 'foo', title: 'Foo', content: 'buzz', updatedAt: 'Buzz' };
jest.mock('../services/prismic');
jest.mock('next-auth/react');
describe('Post Page', () => {
	it('renders?', () => {
		render(<Post post={post} />);

		expect(screen.getByText('Foo')).toBeInTheDocument();
	});

	it('redirects the user if no subscription is not found?', async () => {
		const getSessionMocked = mocked(getSession);

		getSessionMocked.mockResolvedValueOnce({
			activeSubscription: null,
		} as any);

		const response = await getServerSideProps({
			params: { slug: 'my-new-post' },
		} as any);

		expect(response).toEqual(
			expect.objectContaining({
				redirect: {
					destination: '/',
					permanent: false,
				},
			})
		);
	});

	it('loads the data ', async () => {
		const getSessionMocked = mocked(getSession);
		const getPrismicClientMocked = mocked(getPrismicClient);

		getSessionMocked.mockResolvedValueOnce({
			activeSubscription: 'fake-subs-key',
		} as any);

		getPrismicClientMocked.mockReturnValueOnce({
			getByUID: jest.fn().mockResolvedValueOnce({
				data: {
					title: [{ type: 'heading1', text: 'My new post' }],
					content: [{ type: 'paragraph', text: 'This is my new post' }],
				},
				last_publication_date: '04-01-2021',
			}),
		} as any);

		const response = await getServerSideProps({
			params: { slug: 'my-new-post' },
		} as any);

		expect(response).toEqual(
			expect.objectContaining({
				props: {
					post: {
						slug: 'my-new-post',
						title: 'My new post',
						content: '<p>This is my new post</p>',
						updatedAt: '01 de abril de 2021',
					},
				},
			})
		);
	});
});
