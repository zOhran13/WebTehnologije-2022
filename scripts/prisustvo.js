
let div = document.getElementById("divSadrzaj");
//instanciranje

    
let prisustvo = TabelaPrisustvo(div, {
    "studenti": [{
    "ime": "Neko Nekic",
    "index": 12345
    },
    {
    "ime": "Drugi Neko",
    "index": 12346
    },
    {
        "ime": "Treci Neko",
        "index": 12347
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
        "predavanja": 0,
        "vjezbe": 2,
        "index": 12347
        },
    
    {
    "sedmica": 2,
    "predavanja": 0,
    "vjezbe": 2,
    "index": 12345
    },
    

   
    {
        "sedmica": 2,
        "predavanja": 1,
        "vjezbe": 0,
        "index": 12347
        },
    {
        "sedmica": 3,
        "predavanja": 1,
        "vjezbe": 2,
        "index": 12345
        },
        {
            "sedmica": 3,
            "predavanja": 1,
            "vjezbe": 0,
            "index": 12346
            }
        
       

    ],
    "predmet": "Razvoj mobilnih aplikacija",
    "brojPredavanjaSedmicno": 2,
    "brojVjezbiSedmicno": 2
    }
    );
//pozivanje metoda
//import {TabelaPrisustvo} from '../scripts/TabelaPrisustvo.js'
prisustvo.sljedecaSedmica();
prisustvo.prethodnaSedmica();
