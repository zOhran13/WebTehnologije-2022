
let div = document.getElementById("divSadrzaj");
//instanciranje

    
let prisustvo = TabelaPrisustvo(div, {
    "studenti": [{
    "ime": "Zlata Ohran",
    "index": 12345
    },
    {
    "ime": "Ahmed Ohran",
    "index": 12346
    },
    {
        "ime": "Besim Ohran",
        "index": 12347
    },
    {
        "ime": "Safa Ohran",
        "index": 12348
    }


    ],
    "prisustva": [{

    "sedmica": 1,
    "predavanja": 0,
    "vjezbe": 1,
    "index": 12345
    },
    {
    "sedmica": 1,
    "predavanja": 2,
    "vjezbe": 2,
    "index": 12346
    },
    {
        "sedmica": 1,
        "predavanja": 1,
        "vjezbe": 2,
        "index": 12347
        },
        {
            "sedmica": 1,
            "predavanja": 1,
            "vjezbe": 2,
            "index": 12348
            },

    
    {
    "sedmica": 2,
    "predavanja": 0,
    "vjezbe": 2,
    "index": 12345
    },
    

   
    {
        "sedmica": 2,
        "predavanja": 0,
        "vjezbe": 0,
        "index": 12347
        },
    {
        "sedmica": 3,
        "predavanja": 1,
        "vjezbe": 1,
        "index": 12345
        },
        {
            "sedmica": 3,
            "predavanja": 1,
            "vjezbe": 0,
            "index": 12346
            },
            {
                "sedmica": 3,
                "predavanja": 1,
                "vjezbe": 0,
                "index": 12348
                },
                {
                    "sedmica": 4,
                    "predavanja": 1,
                    "vjezbe": 1,
                    "index": 12345
                    },
                    {
                        "sedmica": 4,
                        "predavanja": 1,
                        "vjezbe": 0,
                        "index": 12347
                        },
                        {
                            "sedmica": 4,
                            "predavanja": 1,
                            "vjezbe": 1,
                            "index": 12348
                            },
            

        
       

    ],
    "predmet": "Razvoj mobilnih aplikacija",
    "brojPredavanjaSedmicno": 2,
    "brojVjezbiSedmicno": 2
    }
    );

prisustvo.crtaj();
sljedecaSedmica=prisustvo.sljedecaSedmica;
prethodnaSedmica=prisustvo.prethodnaSedmica;



