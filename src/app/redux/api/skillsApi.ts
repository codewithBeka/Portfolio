// frontend/src/features/skillsApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const skillsApi = createApi({
    reducerPath: 'skillsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000/api/skills',
        credentials: 'include',
    }),
    endpoints: (builder) => ({
        getAllSkills: builder.query({
            query: () => '/',
        }),
    }),
});

export const { useGetAllSkillsQuery } = skillsApi;