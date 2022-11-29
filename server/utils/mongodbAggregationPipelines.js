function getActualProgressions() {
  return {
    $lookup: {
      from: "progressions",
      localField: "parts.progressions.progression",
      foreignField: "_id",
      as: "progressionsData"
    }
  }
}

function getActualUser() {
  return {
    $lookup: {
      from: "users",
      localField: "uploader",
      foreignField: "_id",
      as: "uploaderData"
    }
  }
}

export function getAllSongsPipeline() {
  return [
    getActualProgressions(),
    getActualUser(),
    {
      $project: { title: 1, artist: 1, uploader: 1, progressionsData: 1, "parts.part": 1, "parts.progressions.progression": 1, likesAmount: 1, uploaderData: 1 }
    }
  ]
}

export function getSongsByTitlePipeline({ title }) {
  return [
    { $match: { title } },
    getActualProgressions(),
    {
      $project: { title: 1, artist: 1, uploader: 1, progressionsData: 1, "parts.part": 1, "parts.progressions.progression": 1 }
    }
  ]
}

export function getSongsPostedByUserPipeline({ userId }) {
  return [
    { $match: { uploader: userId } },
    getActualProgressions(),
    {
      $project: { title: 1, artist: 1, uploader: 1, progressionsData: 1, "parts.part": 1, "parts.progressions.progression": 1 }
    }
  ]
}

export function getSongsFavoredByUserPipeline({ userId }) {
  return [
    {
      $match: { _id: userId }
    },
    {
      $lookup: {
        from: "songs",
        localField: "likedSongs",
        foreignField: "_id",
        as: "favoredSongs"
      }
    },
    {
      $project: { "favoredSongs.title": 1, "favoredSongs.artist": 1, "favoredSongs.uploader": 1, "favoredSongs.parts.part": 1, "favoredSongs.parts.progressions.progression": 1 }
    }
  ]
}


export function getSongsByDataPipeline({ artist, genres, year, progressions }) {
  return [
    {
      $set: {
        matchCond: {
          $map: {
            input: "$parts",
            as: "parts",
            in: {
              progs: {
                $map: {
                  input: "$$parts.progressions",
                  in: {
                    $mergeObjects: [
                      "$$this",
                      { input: { progressions: [] } },
                      {
                        input: {
                          $first: {
                            $filter: {
                              input: progressions,
                              as: "inputPart",
                              cond: { $eq: ["$$inputPart.part", "$$parts.part"] }
                            }
                          }
                        }
                      }
                    ]
                  }
                }
              }
            }
          }
        }
      }
    },
    {
      $set: {
        matchCond: {
          $reduce: {
            input: "$matchCond",
            initialValue: 0,
            in: {
              $add: [
                "$$value",
                {
                  $size: {
                    $filter: {
                      input: "$$this.progs",
                      as: "part",
                      cond: { $in: ["$$part.progression", "$$part.input.progressions"] }
                    }
                  }
                }
              ]
            }
          }
        }
      }
    },
    { $match: { matchCond: { $eq: progressions.length }, genres: { $in: genres }, artist: { $in: artist }, year: { $in: year.map(Number) } } },
    getActualProgressions(),
    { $project: { title: 1, artist: 1, uploader: 1, progressionsData: 1, "parts.part": 1, "parts.progressions.progression": 1 } }
  ]
}

export function getSongDataPipeline(songId) {
  return [
    {
      $match: { _id: songId }
    }
  ]
}