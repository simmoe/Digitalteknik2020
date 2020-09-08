export const script = [
    {
        'id': 0,
        'title':'Intro',
        'subtitle':'Click me to watch the intro',
        'clip': './assets/1.mov',
        'question': "Do you take a right or a left?",
        'answers':[
            {
                'title': "Click here to go to the first scenario",
                'destination': 1
            },
            {
                'title': "Click here to go to the second scenario",
                'destination': 2
            }
        ]
    },
    {
        'id': 1,
        'title':'The first scenario',
        'subtitle':'You chose the first scenario - press play',
        'clip': './assets/a.mov',
        'question': "Do you take a right or a left?",
        'answers':[
            {
                'title': "I want to go left",
                'destination': 3
            },
            {
                'title': "I want to go right",
                'destination': 2
            }
        ]
    },
    {
        'id': 2,
        'title':'The second scenario',
        'subtitle':'You chose the second scenario',
        'clip': './assets/b.mov',
        'question': "Where do you go now?",
        'answers':[
            {
                'title': "I want to go left",
                'destination': 3
            },
            {
                'title': "I want to go back to the beginning",
                'destination': 0
            }
        ]

    },
    {
        'id': 3,
        'title':'The END',
        'subtitle':'You chose the wrong scenario',
        'action': {
            'title':'Take me back to the beginnning',
            'destination': 0,
        },
        'clip': './assets/b.mov',
        'question': "Where do you go now?",
        'answers':[
            {
                'title': "I want to go back to the beginning",
                'destination': 0
            },
        ]

    },
]