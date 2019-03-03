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

// RENDERING STATE IN DOM
const renderLyrics = () => {
  const lyricsDisplay = document.getElementById("lyrics");
  while (lyricsDisplay.firstChild) {
    lyricsDisplay.removeChild(lyricsDisplay.firstChild);
  }
  if (store.getState().currentSongId) {
    const currentLine = document.createTextNode(
      store.getState().songsById[store.getState().currentSongId].songArray[
        store.getState().songsById[store.getState().currentSongId].arrayPosition
      ]
    );
    document.getElementById("lyrics").appendChild(currentLine);
  } else {
    const selectSongMessage = document.createTextNode(
      "Select a song from the menu above to sing along!"
    );
    document.getElementById("lyrics").appendChild(selectSongMessage);
  }
};
window.onload = function() {
  renderSongs();
  renderLyrics();
};

// CLICK LISTENER
const userClick = () => {
  if (
    store.getState().arrayPosition ===
    store.getState().songLyricsArray.length - 1
  ) {
    store.dispatch({ type: "RESTART_SONG" });
  } else {
    store.dispatch({ type: "NEXT_LYRIC" });
  }
};

store.subscribe(renderLyrics);

const renderSongs = () => {
  console.log("renderSongs method successfully fired!");
  console.log(store.getState());
  // Retrieves songsById state slice from store:
  const songsById = store.getState().songsById;

  // Cycles through each key in songsById:
  for (const songKey in songsById) {
    // Locates song corresponding with each key, saves as 'song' constant:
    const song = songsById[songkey];

    // Creates <li>, <h3>, and <em> HTML elements to render this song's information in the DOM:
    const li = document.createElement("li");
    const h3 = document.createElement("h3");
    const em = document.createElement("em");

    // Creates text node containing each song's title:
    const songTitle = document.createTextNode(song.title);

    // Creates text node containing each song's artist:
    const songArtist = document.createTextNode(" by " + song.artist);

    // Adds songTitle text node to the <em> element we created 3 lines up:
    em.appendChild(songTitle);
    // Adds <em> element that now contains song title to <h3> element created
    // 5 lines up:
    h3.appendChild(em);
    // Also adds songArtist text node created 2 lines up to <h3> element created
    // 6 lines up:
    h3.appendChild(songArtist);
    // Adds click event listener to same  <h3> element, when this <h3> is clicked,
    // an event handler called selectSong() will run, using song's ID as argument:
    h3.addEventListener("click", function() {
      selectSong(song.songId);
    });
    // Adds entire <h3> element to the <li> element created 11 lines above:
    li.appendChild(h3);
    // Appends this <li> element to the <ul> in index.html with a 'songs' ID:
    document.getElementById("songs").appendChild(li);
  }
};
