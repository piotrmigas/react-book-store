import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  tagTypes: ['Books', 'SearchResults', 'Orders'],
  baseQuery: fetchBaseQuery({ baseUrl: 'https://react-book-store-nodejs.vercel.app/api' }),
  endpoints: (builder) => ({
    getBooks: builder.query<ResBooks, number | void>({
      query: (page) => `/book?page=${page}`,
      providesTags: (result) =>
        result
          ? [...result.data.map(({ id }) => ({ type: 'Books' as const, id })), { type: 'Books', id: 'PARTIAL-LIST' }]
          : [{ type: 'Books', id: 'PARTIAL-LIST' }],
    }),
    getBook: builder.query<ResBook, number>({
      query: (bookId) => `/book/${bookId}`,
      providesTags: (_, bookId) => [{ type: 'Books', bookId }],
    }),
    createOrder: builder.mutation<Order, OrderBody>({
      query: (body) => ({
        url: '/order',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Orders'],
    }),
    searchBook: builder.query<ResBooks, { page: number; query: string; searchBy: string }>({
      query: ({ page, query, searchBy }) => `book?page=${page}&search%5B${searchBy}%5D=${query}`,
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: 'SearchResults' as const, id })),
              { type: 'SearchResults', id: 'PARTIAL-LIST' },
            ]
          : [{ type: 'SearchResults', id: 'PARTIAL-LIST' }],
    }),
  }),
});

export const { useGetBooksQuery, useGetBookQuery, useCreateOrderMutation, useSearchBookQuery } = api;
