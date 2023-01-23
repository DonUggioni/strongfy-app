export const WORKOUT_DATA_MODEL = [
  {
    powerlifting: {
      hypertrophy: {
        '5days': [
          {
            style: 'powerlifting',
            type: 'hypertrophy',
            title: 'Hypertrophy 1',
            daysPerWeek: 5,
            workoutNumber: 1,
            id: 'phw15d',
            week: 1,
            workouts: [
              {
                week: 1,
                id: 'phw1',
                relatesTo: 'phw15d',
                workout: [
                  {
                    day: 'Day 1',
                    isComplete: false,
                    id: 'phw1d1',
                    data: [
                      {
                        exercise: 'squat',
                        title: 'High Bar Squat',
                        sets: 1,
                        rpe: 8,
                        weight: '',
                        backdownSets: 2,
                        backdownWeight: '',
                        reps: 10,
                      },
                      {
                        exercise: 'front squat',
                        title: 'Front Squat',
                        sets: 2,
                        reps: 10,
                        weight: '',
                      },
                      {
                        exercise: 'split squat',
                        title: 'Split Squat',
                        sets: 2,
                        reps: 10,
                        weight: '',
                      },
                      {
                        exercise: 'back raises',
                        title: 'Back Raises',
                        sets: 3,
                        reps: 10,
                        weight: '',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    },
  },
];
