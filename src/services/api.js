import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'https://ilfar-be-express1-64ec25f98e30.herokuapp.com/api';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        jobList: builder.query({
            query: (params) => {
                const { page, description, location, fullTime } = params;
                let url = '/jobs?';
                if (page) url += `page=${page}`;
                if (description) url += `&description=${description}`;
                if (location) url += `&location=${location}`;
                if (fullTime) url += `&full_time=${fullTime}`;
                return url;
            }
        }),
        jobDetail: builder.query({
            query: (jobId) => `/jobs/${jobId}`,
        }),
        searchJob: builder.query({
            query: (params) => {
                const { page, description, location, fullTime } = params;
                let url = '/jobs?';
                if (page) url += `page=${page}`;
                if (description) url += `&description=${description}`;
                if (location) url += `&location=${location}`;
                if (fullTime) url += `&full_time=${fullTime}`;
                return url;
            }
        })
    }),
});

export const { useLoginMutation, useJobListQuery, useJobDetailQuery, useSearchJobQuery } = api;