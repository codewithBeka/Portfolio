import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const categoryApi = createApi({
    reducerPath: 'categoryApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api/categories', credentials: 'include' }),
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => '/',
        }),

    }),
});

export const {
    useGetCategoriesQuery,
} = categoryApi;