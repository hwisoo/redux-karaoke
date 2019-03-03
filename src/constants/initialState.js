const songList = {
  1: "Yesterday, All my troubles seemed so far away, Now it looks as though they're here to stay, Oh I believe in yesterday, Suddenly, I'm not half the man I used to be, There's a shadow hanging over me, Oh yesterday came suddenly".split(
    ", "
  ),
  2: "When I find myself in times of trouble, Mother Mary comes to me, Speaking words of wisdom, let it be, And in my hour of darkness, she is standing right in front of me, Speaking words of wisdom, let it be, Let it be, let it be, let it be, let it be, Whisper words of wisdom, let it be".split(
    ", "
  )
};

export const initialState = {
  currentSongId: 1,
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
