export const mockUsers = [
  {
    id: '1',
    username: 'demo_user',
    likedSongs: ['1', '2']
  }
];

export const mockProgressions = [
  {
    id: '1',
    progression: ['I', 'IV', 'V', 'I'],
    parent: null
  },
  {
    id: '2',
    progression: ['ii', 'V', 'I'],
    parent: null
  },
  {
    id: '3',
    progression: ['I', 'vi', 'IV', 'V'],
    parent: null
  }
];

export const mockSongs = [
  {
    id: '1',
    title: 'Let It Be',
    artist: 'The Beatles',
    album: 'Let It Be',
    genres: ['Rock', 'Pop'],
    year: 1970,
    parts: [
      {
        part: 'Verse',
        progressions: [
          {
            progression: '1',
            key: 'C'
          }
        ],
        chords: [
          { chord: 'C', position: 1 },
          { chord: 'G', position: 2 },
          { chord: 'Am', position: 3 },
          { chord: 'F', position: 4 }
        ],
        lyrics: 'When I find myself in times of trouble, Mother Mary comes to me'
      },
      {
        part: 'Chorus',
        progressions: [
          {
            progression: '2',
            key: 'C'
          }
        ],
        chords: [
          { chord: 'Am', position: 1 },
          { chord: 'G', position: 2 },
          { chord: 'F', position: 3 },
          { chord: 'C', position: 4 }
        ],
        lyrics: 'Let it be, let it be, let it be, let it be'
      }
    ],
    uploader: '1',
    likesAmount: 150
  },
  {
    id: '2',
    title: 'Imagine',
    artist: 'John Lennon',
    album: 'Imagine',
    genres: ['Rock', 'Pop'],
    year: 1971,
    parts: [
      {
        part: 'Verse',
        progressions: [
          {
            progression: '3',
            key: 'C'
          }
        ],
        chords: [
          { chord: 'C', position: 1 },
          { chord: 'F', position: 2 },
          { chord: 'C', position: 3 },
          { chord: 'F', position: 4 }
        ],
        lyrics: 'Imagine theres no heaven, its easy if you try'
      }
    ],
    uploader: '1',
    likesAmount: 200
  }
];