// Lyric Info
const songList = {
  1: "Yesterday, All my troubles seemed so far away, Now it looks as though they're here to stay, Oh I believe in yesterday, Suddenly, I'm not half the man I used to be, There's a shadow hanging over me, Oh yesterday came suddenly".split(
    ", "
  ),
  2: "When I find myself in times of trouble, Mother Mary comes to me, Speaking words of wisdom, let it be, And in my hour of darkness, she is standing right in front of me, Speaking words of wisdom, let it be, Let it be, let it be, let it be, let it be, Whisper words of wisdom, let it be".split(
    ", "
  )
};

// Initial Redux State
const initialState = {
  currentSongId: null,
  songsById: {
    1: {
      title: "Yesterday",
      artist: "The Beatles",
      songId: 1,
      songArray: songList[1],
      arrayPosition: 0
    },
    2: {
      title: "Let it be",
      artist: "The Beatles",
      songId: 2,
      songArray: songList[2],
      arrayPosition: 0
    }
  }
};
console.log(initialState);

// REDUX REDUCER
const lyricChangeReducer = (state = initialState.songsById, action) => {
  let newArrayPosition;
  let newSongsByIdEntry;
  let newSongsByIdStateSlice;
  switch (action.type) {
    case "NEXT_LYRIC":
      // Locates the arrayPosition of the song whose ID was provided
      // in the action's payload, and increments it by one:
      newArrayPosition = state[action.currentSongId].arrayPosition + 1;

      // Creates a copy of that song's entry in the songsById state slice,
      // and adds the updated newArrayPosition value we just calculated as its arrayPosition:
      newSongsByIdEntry = Object.assign({}, state[action.currentSongId], {
        arrayPosition: newArrayPosition
      });

      // Creates a copy of the entire songsById state slice, and adds the
      // updated newSongsById state entry we just created to this new copy:
      newSongsByIdStateSlice = Object.assign({}, state, {
        [action.currentSongId]: newSongsByIdEntry
      });
      return newSongsByIdStateSlice;
    case "RESTART_SONG":
      // Creates a copy of the song entry in songsById state slice whose ID matches
      // the currentSongId included with the action, sets the copy's arrayPosition value
      // to 0:
      newSongsByIdEntry = Object.assign({}, state[action.currentSongId], {
        arrayPosition: 0
      });

      // Creates a copy of the entire songsById state slice, and adds the
      // updated newSongsByIdEntry we just created to this copy:
      newSongsByIdStateSlice = Object.assign({}, state, {
        [action.currentSongId]: newSongsByIdEntry
      });

      // Returns the entire newSongsByIdStateSlice we just constructed, which will
      // update the songsById state slice in our Redux store to match the new slice returned:
      return newSongsByIdStateSlice;

    // If action is neither 'NEXT_LYRIC' nor 'RESTART_STATE' type, return existing state:
    default:
      return state;
  }
};

const songChangeReducer = (state = initialState.currentSongId, action) => {
  switch (action.type) {
    case "CHANGE_SONG":
      return action.newSelectedSongId;
    default:
      return state;
  }
};

// JEST TESTS + SETUP
const { expect } = window;

expect(lyricChangeReducer(initialState.songsById, { type: null })).toEqual(
  initialState.songsById
);

expect(
  lyricChangeReducer(initialState.songsById, {
    type: "NEXT_LYRIC",
    currentSongId: 2
  })
).toEqual({
  1: {
    title: "Yesterday",
    artist: "The Beatles",
    songId: 1,
    songArray: songList[1],
    arrayPosition: 0
  },
  2: {
    title: "Let it be",
    artist: "The Beatles",
    songId: 2,
    songArray: songList[2],
    arrayPosition: 1
  }
});

expect(
  lyricChangeReducer(initialState.songsById, {
    type: "RESTART_SONG",
    currentSongId: 1
  })
).toEqual({
  1: {
    title: "Yesterday",
    artist: "The Beatles",
    songId: 1,
    songArray: songList[1],
    arrayPosition: 0
  },
  2: {
    title: "Let it be",
    artist: "The Beatles",
    songId: 2,
    songArray: songList[2],
    arrayPosition: 0
  }
});
expect(songChangeReducer(initialState, { type: null })).toEqual(initialState);
expect(
  songChangeReducer(initialState.currentSongId, {
    type: "CHANGE_SONG",
    newSelectedSongId: 1
  })
).toEqual(1);

// REDUX STORE
const { createStore } = Redux;
const store = createStore(lyricChangeReducer);
console.log(store.getState());

// // RENDERING STATE IN DOM
// const renderLyrics = () => {
//   const lyricsDisplay = document.getElementById("lyrics");
//   while (lyricsDisplay.firstChild) {
//     lyricsDisplay.removeChild(lyricsDisplay.firstChild);
//   }
//   const currentLine = store.getState().songLyricsArray[
//     store.getState().arrayPosition
//   ];
//   const renderedLine = document.createTextNode(currentLine);
//   document.getElementById("lyrics").appendChild(renderedLine);
// };

// window.onload = function() {
//   renderLyrics();
// };

// // CLICK LISTENER
// const userClick = () => {
//   if (
//     store.getState().arrayPosition ===
//     store.getState().songLyricsArray.length - 1
//   ) {
//     store.dispatch({ type: "RESTART_SONG" });
//   } else {
//     store.dispatch({ type: "NEXT_LYRIC" });
//   }
// };

// store.subscribe(renderLyrics);
