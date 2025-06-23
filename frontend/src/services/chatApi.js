import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ['Channels', 'Messages'],
  endpoints: builder => ({
    getChannels: builder.query({
      query: () => '/channels',
      providesTags: (result = []) =>
        result.length
          ? [
              ...result.map(({ id }) => ({ type: 'Channels', id })),
              { type: 'Channels', id: 'LIST' },
            ]
          : [{ type: 'Channels', id: 'LIST' }],
    }),

    addChannel: builder.mutation({
      query: channel => ({
        url: '/channels',
        method: 'POST',
        body: channel,
      }),
      invalidatesTags: [{ type: 'Channels', id: 'LIST' }],
    }),

    renameChannel: builder.mutation({
      query: ({ id, name }) => ({
        url: `/channels/${id}`,
        method: 'PATCH',
        body: { name },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Channels', id }],
    }),

    removeChannel: builder.mutation({
      query: id => ({
        url: `/channels/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Channels', id },
        { type: 'Messages', id: 'LIST' },
      ],
    }),

    getMessages: builder.query({
      query: () => '/messages',
      providesTags: (result = []) =>
        result.length
          ? [
              ...result.map(({ id }) => ({ type: 'Messages', id })),
              { type: 'Messages', id: 'LIST' },
            ]
          : [{ type: 'Messages', id: 'LIST' }],
    }),

    sendMessage: builder.mutation({
      query: message => ({
        url: '/messages',
        method: 'POST',
        body: message,
      }),
      invalidatesTags: [{ type: 'Messages', id: 'LIST' }],
    }),

    login: builder.mutation({
      query: credentials => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
    }),

    signup: builder.mutation({
      query: userData => ({
        url: '/signup',
        method: 'POST',
        body: userData,
      }),
    }),
  }),
})

export const {
  useGetChannelsQuery,
  useAddChannelMutation,
  useRemoveChannelMutation,
  useRenameChannelMutation,
  useGetMessagesQuery,
  useSendMessageMutation,
  useLoginMutation,
  useSignupMutation,
} = chatApi
