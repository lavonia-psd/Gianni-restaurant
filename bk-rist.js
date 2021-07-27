const bk = {} ;


bk.persone = document.getElementById ('persone');
bk.numeroPersone = document.getElementById ('numero_persone');
bk.tavoli = document.getElementById ('tavoli');
bk.tavoloSel = document.getElementById ('tavolo_sel');
bk.MStatus = document.getElementById ('message-status');

console.log(bk);
(async function costruisciSala() {
    bk.sala = {
        "numero-tavoli": 8,
        "tavoli": [{
                "posti": 4,
                "occupato": false
            },
            {
                "posti": 2,
                "occupato": false
            },
            {
                "posti": 4,
                "occupato": false
            },
            {
                "posti": 8,
                "occupato": false
            },
            {
                "posti": 6,
                "occupato": false
            },
            {
                "posti": 4,
                "occupato": false
            },
            {
                "posti": 3,
                "occupato": false
            },

            {
                "posti": 6
            }
        ]
    };
    bk.tavoli = bk.sala.tavoli;
    disponiTavoli (bk.tavoli);
}) ();

function disponiTavoli(tavoli){
    bk.tavoli.foreach (( tavolo , i ) => {
        let classiTavolo = 'tavolo', tavoloDOM = document.createElement ('div');
        tavoloDOM.appendChild(document.createTextNod(i+1));
        classiTavolo += tavolo.libero ? ' Libero ' :
        classiTavolo += tavolo.posti  == 6 ? ' x6 ' : ' x4 '  ;
        classiTavolo += tavolo.posti == 2 ? ' x8 ' : ' x3 '
        
        tavoloDOM.setAttribute('class' , classiTavolo);
        bk.tavoli.appendChild(tavoloDOM);
    });
}

bk.numeroPersone.addEventListener('click' , (e) => { e.preventDefault() ;
    let numeroPersone = +bk. numeroPersone.textContent;
    console.log(numeroPersone);
    if (e.target.id === 'add') {
        bk.numeroPersone.textContent = numeroPersone + 1;
} else if (e.target.id === 'sub' && numeroPersone > 1) {
        bk.numeroPersone.textContent = numeroPersone - 1
    }
}) ;

bk.tavoli.addEventListener('click' , (e) => { let selezionato = +e.target.textContent;
    if(bk.tavoli[selezionato-1].occupato) {
        bk.MStatus.textContent = 'il tavolo $(selezionato) è occupato'
    } else {
        bk.tavoloSel.textContent = selezionato;
    }

})

document.forms[0].addEventListener('submit' , (e) => { e.preventDefault();
    if (bk.tavoloSel.textContent == '-') {
        bk.MStatus.textContent = 'è necessario selezionare un tavolo';
        return;
    }
sendbk();
})

function sendbk(){
    let bkform = new FormData();
    bkform.append('numeroPersone' , + bk.numeroPersone.textContent);
    bkform.append('tavolo' , + bk.tavoloSel.textContent);
    bkform.append('nome' , document.forms[0].nome.value);
    bkform.append('email' , document.forms[0].email.value);
    fetch('bkscript' ,{
        body: bkform,
        method: 'post'
    });

}