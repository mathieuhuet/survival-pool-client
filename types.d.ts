type ScoreSheet = {
  leagues: [
    {
      id: string,
      uid: string,
      name: string,
      abbreviation: string,
      slug: string,
      season: {
        year: number,
        startDate: string,
        endDate: string,
        displayName: string,
        type: {
          id: string,
          type: number,
          name: string,
          abbreviation: string
        }
      },
      logos: {
        href: string,
        width: number,
        height: number,
        alt: string,
        rel: string[],
        lastUpdated: string,
      }[],
      calendar: Array
    }
  ],
  events: [
    {
      id: string,
      uid: string,
      date: string,
      name: string,
      shortName: string,
      season: {
        year: number,
        type: number,
        slug: string,
      },
      week: {
        number: number
      },
      competitions: {
        id: string,
        uid: string,
        date: string,
        attendance: number,
        type: {
          id: string,
          abbreviation: string,
        },
        timeValid: boolean,
        neutralSite: boolean,
        conferenceCompetition: boolean,
        playByPlayAvailable: boolean,
        recent: boolean,
        venue: {
          id: string,
          fullName: string,
          address: {
            city: string,
            state: string,
          },
          capacity: number,
          indoor: boolean
        },
        competitors: {
          id: string,
          uid: string,
          type: string,
          order: number,
          homeAway: string,
          winner: boolean,
          team: {
            id: string,
            uid: string,
            location: string,
            name: string,
            abbreviation: string,
            displayName: string,
            shortDisplayName: string,
            color: string,
            alternateColor: string,
            isActive: boolean,
            venue: {
              id: string,
            },
            links: {
              rel: string[],
              href: string,
              text: string,
              isExternal: boolean,
              isPremium: boolean
            }[],
            logo: string,
          },
          score: string,
          linescores: {
            value: number
          }[],
          statistics: Array,
          records: {
            name: string,
            abbreviation?: string,
            type: string,
            summary: string,
          }[],
        }[],
        notes: Array,
        status: {
          clock: number,
          displayClock: string,
          period: number,
          type: {
            id: string,
            name: string,
            state: string,
            completed: boolean,
            description: string,
            detail: string,
            shortDetail: string,
          }
        },
        broadcasts: {
          market: string,
          names: string[],
        }[],
        leaders: {
          name: string,
          displayName: string,
          shortDisplayName: string,
          abbreviation: string,
          leaders: {
            displayValue: string,
            value: number,
            athlete: {
              id: string,
              fullName: string,
              displayName: string,
              shortName: string,
              links: {
                rel: string[],
                href: string
              }[],
              headshot: string,
              jersey: string,
              position: {
                abbreviation: string
              },
              team: {
                id: string,
              },
              active: boolean
            },
            team: {
              id: string
            }
          }[],
          format: {
            regulation: {
              periods: number
            }
          },
          startDate: string,
          geoBroadcasts: {
            type: {
              id: string,
              shortName: string
            },
            market: {
              id: string,
              type: string,
            },
            lang: string,
            region: string
          }[],
          headlines: {
            description: string,
            type: string,
            shortLinkText: string
          }
        }[],
      }[],
      links: {
        language: string,
        rel: string[],
        href: string,
        text: string,
        shortText: string,
        isExternal: boolean,
        isPremium: boolean
      }[],
      status: {
        clock: number,
        displayClock: string,
        period: number,
        type: {
          id: string,
          name: string,
          state: string,
          completed: boolean,
          description: string,
          detail: string,
          shortDetail: string
        }
      }
    }
  ]
}

