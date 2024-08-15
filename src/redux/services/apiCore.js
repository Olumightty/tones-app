import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiCore = createApi({
  reducerPath: 'apiCore',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://shazam.p.rapidapi.com/',
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', '281d5d4c91mshebc3cfe6f7f9310p1f7c42jsna573f47de0da');

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getSearch: builder.query({ query: (searchTerm) => `search?term=${searchTerm}&locale=en-US&offset=0&limit=15`}),
    getArtist: builder.query({ query: (artistId) => `artists/get-details?id=${artistId}&l=en-US`}),
    getSong: builder.query({ query: (songId) => `songs/v2/get-details?id=${songId}&l=en-US`}),
    getAlbum: builder.query({ query: (albumId) => `albums/get-details?id=${albumId}&l=en-US`}),
    getTopSongs: builder.query({ query: (artistId) => `artists/get-top-songs?id=${artistId}&l=en-US`}),
    getLatestRelease: builder.query({ query: (artistId) => `artists/get-latest-release?id=${artistId}&l=en-US`}),
    getSummary: builder.query({ query: (artistId) => `artists/get-summary?id=${artistId}&l=en-US`}),
  }),
});

export const {
  useGetSearchQuery,
  useGetArtistQuery,
  useGetSongQuery,
  useGetAlbumQuery,
  useGetTopSongsQuery,
  useGetLatestReleaseQuery,
  useGetSummaryQuery,
} = apiCore;