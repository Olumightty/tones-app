import { createSlice } from '@reduxjs/toolkit'
import { active } from '../../assets/active'

const initialState = {
    isPlaying: false,
    searchTerm: '',
    activeSong:{
        index: undefined,
        activeSongTitle: undefined,
        activeSongArtist: undefined,
        activeSongAudio: undefined,
        activeSongId: undefined,
        activeArtistId: undefined,
        imageUrl: undefined,
        
    },
    queue: [],
    expanded: false,
    windowWidth: undefined,

}
    

const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        playPause: (state, action) =>{
            state.isPlaying = action.payload
        },
        search: (state, action) =>{
            state.searchTerm = action.payload
        },
        expand: (state, action) =>{
            state.expanded = action.payload
        },
        setActiveSong: (state, action) => {
            state.activeSong.index = action.payload.index
            state.activeSong.activeSongTitle = action.payload.title
            state.activeSong.activeSongArtist = action.payload.artist
            state.activeSong.activeSongAudio = action.payload.audio
            state.activeSong.activeSongId = action.payload.id
            state.activeSong.activeArtistId = action.payload.artistId
            state.activeSong.imageUrl = action.payload.imageUrl || active  // if no image, use default one
        },
        updateWindowWidth: (state, action) => {
            state.windowWidth = action.payload
        },
        setQueue: (state, action) => {
            state.queue = action.payload
        }
    },
})

export default playerSlice.reducer
export const {
    playPause, 
    search, 
    setActiveSong, 
    expand,
    updateWindowWidth,
    setQueue,
} = playerSlice.actions