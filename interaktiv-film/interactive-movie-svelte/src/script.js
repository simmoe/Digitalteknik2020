export const script = [
    {
        'id': 0,
        'title':'Intro',
        'subtitle':'<p>You are a student at the FBI where a row of coincidential events led you to participate in a dificult murder investigation. Your first subject is the lifetime incarcerated mass murderer X. He is notorious for being both touchy and lying - be wise, and try to get as much out of him as you can...</p>',
        'clip': './assets/1.mov',
        'question': "Show credentials?",
        'answers':[
            {
                'title': "agree and show your identity card even though it shows you are still a student at the FBI",
                'destination': 1
            },
            {
                'title': "ask him something friendly about his life in the cell",
                'destination': 2
            }
        ]
    },
    {
        'id': 1,
        'title':'Show identity card',
        'clip': './assets/a.mov',
        'question': "Walk away?",
        'answers':[
            {
                'title': "Well.. seems you got caught there - get your stuff and come back some other time...",
                'destination': 3
            },
            {
                'title': "Maybe he won\'t take it so badly - why not try to admit and proceed...",
                'destination': 4
            }
        ]
    },
    {
        'id': 2,
        'title':'Don\'t show credentials',
        'clip': './assets/b.mov',
        'question': "Present questionaire?",
        'answers':[
            {
                'title': "Ask him to fill out the questionaire you were sent with",
                'destination': 3
            },
            {
                'title': "Na, let\'s try to ask something else",
                'destination': 0
            }
        ]

    },
    {
        'id': 3,
        'title': 'Questionaire..',
        'clip': './assets/c.mov',
        'question': "Where do you go now?",
        'answers':[
            {
                'title': "I want to go back to the beginning",
                'destination': 0
            },
        ]

    },
    {
        'id':4,
        'clip':'./assets/admit.mov',
        'title':'Admit',
        'question': "Sit down?",
        'answers':[
            {
                'title': "Go on with the interview...",
                'destination': 3
            },
            {
            'title': "Somethings not right. Get out before he looses all confidence..",
                'destination': 0
            }
        ]
    },
]