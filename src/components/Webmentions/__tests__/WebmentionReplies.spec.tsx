import { cleanup, render, waitFor } from '@testing-library/react';
import { ThemeProvider } from 'emotion-theming';
import React from 'react';
import { WebmentionReplies } from '../WebmentionReplies';
import theme from '../../../theme';

beforeEach(() => {
  global.fetch = jest.fn().mockImplementation(() => {
    const p = new Promise((resolve, reject) => {
      resolve({
        links: [
          {
            source:
              'https://brid-gy.appspot.com/repost/twitter/MaximeHeckel/1244993113669742593/1245014714028978176',
            verified: true,
            verified_date: '2020-04-21T05:02:10+00:00',
            id: 785123,
            private: false,
            data: {
              author: {
                name: 'eli 🤠',
                url: 'https://twitter.com/_seemethere',
                photo:
                  'https://webmention.io/avatar/pbs.twimg.com/adc02883d6e8c838df8f2f2fc1ddc56f701b28bf91a7b152c82c21439371f3a9.jpg',
              },
              url: 'https://twitter.com/_seemethere/status/1245014714028978176',
              name: null,
              content:
                'Good morning friends! 👋 I just published "How to fix NPM link duplicate dependencies issues"\n\nblog.maximeheckel.com/posts/duplicat…',
              published: '2020-03-31T15:46:53+00:00',
              published_ts: 1585669613,
            },
            activity: {
              type: 'repost',
              sentence:
                'eli 🤠 retweeted a tweet https://blog.maximeheckel.com/posts/duplicate-dependencies-npm-link/',
              sentence_html:
                '<a href="https://twitter.com/_seemethere">eli 🤠</a> retweeted a tweet <a href="https://blog.maximeheckel.com/posts/duplicate-dependencies-npm-link/">https://blog.maximeheckel.com/posts/duplicate-dependencies-npm-link/</a>',
            },
            target:
              'https://blog.maximeheckel.com/posts/duplicate-dependencies-npm-link/',
          },
        ],
      });
    });

    return p;
  });
});

afterEach(() => {
  cleanup();
});

describe('Webmention', () => {
  it('renders the webmention replies', async () => {
    const { container, getByTestId, debug } = render(
      <ThemeProvider theme={theme.light}>
        <WebmentionReplies url="foo.com" title="Foo Bar" />
      </ThemeProvider>
    );

    await waitFor(() => {
      // console.log(debug());
      expect(getByTestId('main-text')).toBeDefined();
      expect(getByTestId('share-text')).toBeDefined();
      expect(getByTestId('main-text')).toHaveTextContent(
        'Already one awesome person liked, shared or talked about this article:'
      );
      expect(getByTestId('785123')).toBeDefined();
      expect(
        container.querySelector(
          "[data-tip='eli 🤠 retweeted a tweet https://blog.maximeheckel.com/posts/duplicate-dependencies-npm-link/']"
        )
      ).toBeDefined();
    });
  });
});
