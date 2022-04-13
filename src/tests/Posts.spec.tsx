import { render, screen } from '@testing-library/react';
import { stripe } from '../services/stripe';
import Posts, { getStaticProps } from '../pages/posts';
import { mocked } from 'jest-mock';
import { getPrismicClient } from '../services/prismic';

const posts = [
	{ slug: 'foo', title: 'Foo', excerpt: 'buzz', updatedAt: 'Buzz' },
];

jest.mock('../services/prismic');

describe('Posts Page', () => {
	it('renders?', () => {
		render(<Posts posts={posts} />);

		expect(screen.getByText('Foo')).toBeInTheDocument();
	});

	it('it loads the data?', async () => {
		const getPrismicClientMocked = mocked(getPrismicClient);

		getPrismicClientMocked.mockReturnValueOnce({
			query: jest.fn().mockResolvedValue({
				results: [
					{
						uid: 'my-new-post',
						data: {
							title: [
								{
									type: 'heading1',
									text: 'My new post',
								},
							],
							content: [
								{
									type: 'paragraph',
									text: 'This is my new post',
								},
							],
						},
						last_publication_date: '04-01-2021',
					},
				],
			}),
		} as any);

		const response = await getStaticProps({});

		expect(response).toEqual(
			expect.objectContaining({
				props: {
					posts: [
						{
							slug: 'my-new-post',
							title: 'My new post',
							excerpt: 'This is my new post',
							updatedAt: '01 de abril de 2021',
						},
					],
				},
			})
		);
	});
});
