export const WORKOUT_DATA = [
  {
    type: 'hypertrophy',
    title: 'Workout 1',
    daysPerWeek: 5,
    workoutNumber: 1,
    id: 'hw1',
    week: 1,
    workouts: [
      {
        workout: [
          {
            day: 'Day 1',
            isComplete: false,
          },
          {
            name: 'Squat',
            sets: 1,
            rpe: 8,
            backdownSets: 4,
            reps: 10,
          },
          {
            name: 'Leg Press',
            sets: 4,
            reps: '10 - 12',
            weigth: 0,
          },
          {
            name: 'Leg Extensions',
            sets: 4,
            reps: '10 - 12',
            weight: 0,
          },
          {
            name: 'Leg Curls',
            sets: 4,
            reps: '10 - 12',
            weight: 0,
          },
          {
            name: 'RDL',
            sets: 4,
            reps: 10,
            weight: 0,
          },
        ],
      },
    ],
  },
  {
    type: 'strength',
    title: 'Workout 2',
    daysPerWeek: 5,
    workoutNumber: 1,
    id: 'sw1',
    week: 1,
    workout: [
      {
        dayOne: [
          {
            mainExercise: {
              name: 'Squat',
              sets: 1,
              rpe: 8,
              backdownSets: 4,
              reps: 6,
            },
            secondaryExercises: [
              {
                name: 'Leg Press',
                sets: 4,
                reps: '8-10',
                weigth: 0,
              },
              {
                name: 'Leg Extensions',
                sets: 4,
                reps: '8-10',
                weight: 0,
              },
              {
                name: 'Leg Curls',
                sets: 4,
                reps: '8-10',
                weight: 0,
              },
              {
                name: 'RDL',
                sets: 4,
                reps: 8,
                weight: 0,
              },
            ],
          },
        ],
      },
    ],
  },
];
