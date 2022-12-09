function showModal(idModal){ 
    //idModal é usado para avisar que há um parâmetro lá no html, o texto pode ser qualquer coisa para avisar que o parâmetro será um texto.
    const modal = document.querySelector(idModal)
    modal.style.display = "flex"
}

function hideModal(idModal, event) {
    if(event.target.className === 'modal'){
        const modal = document.querySelector(idModal)
        modal.style.display = 'none'
    }
}
//forçar o fechamento após receber a mensagem de alerta
function closeAllModal() {
    const modais = document.querySelectorAll('.modal')
    modais.forEach(modal => {
        modal.style.display = 'none'
    })
}

//toda a resposta através do servidor:
async function insert(event) {
    event.preventDefault() //tira a forma padrão.
    const formData = new FormData(event.target)
    const response = await fetch('backend-artistas/insert-artistas.php', {
        method: 'POST',
        body: formData
    })
    const result = await response.json()
    if (result?.success) {
        closeAllModal() 
        alert('Sua musica '+result.data.artista+' foi cadastrado com sucesso!');
        loadMusicas();
    }
}

async function loadMusicas() {
    const response = await fetch('backend-artistas/list-artistas.php')
    const result = await response.json()
    if (result?.success) {
        const musiclist = document.querySelector('#productions')
        musiclist.innerHTML = ''
        const musicas = result.data
        musicas.map((film) => {
            musiclist.innerHTML += `
            <div class="card-movie">
                <a href="musica">
                    <img src="${film.capa}" alt="${film.artista}">
                </a>
                    <div>
                        <a href="musica">
                            <h2>${film.artista}</h2>
                        </a>
                        <div>
                            <p>${film.musicas}</p>
                            <img src="assets/img/trash-icon.svg" alta="Apagar" onclick="deleteMusicas(${film.id})" />
                            <img src="assets/img/edit-icon.svg" alta="Editar" onclick="loadMusicasData(${film.id})" />
                        </div>                     
                    </div>
                </div><!--card movie-->`
            })

        }else{
            alert('Erro ao cadastrar a função')
        }       
    }


    async function deleteMusicas(id) {
        const response = await fetch('backend-artistas/delete-artistas.php?id='+id)
        const result = await response.json()               
        if (result?.success) {
            alert('Sua musica foi deletado com sucesso!');
            loadMusicas();
        }
    }

    async function loadMusicasData(id) {
        const response = await fetch('backend-artistas/get-production-by-id-artistas.php?id='+id)
        const result = await response.json()               
        if (result?.success) {
            showModal('#modal-editar')
            const artista = document.querySelector('#modal-editar input[name=artista]')
            artista.value = result.data.artista
            const musicas = document.querySelector('#modal-editar input[name=musicas]')
            musicas.value = result.data.musicas
            const singles = document.querySelector('#modal-editar input[name=singles]')
            singles.value = result.data.singles
            const capa = document.querySelector('#modal-editar input[name=capa]')
            capa.value = result.data.capa
            const feats = document.querySelector('#modal-editar input[name=feats]')
            feats.value = result.data.feats
            const id = document.querySelector('#modal-editar input[name=id]')
            id.value = result.data.id
        }
    }

    async function edit(event){
        event.preventDefault()
        const formData = new FormData(event.target)
        const response = await fetch('backend-artistas/edit-artistas.php?',{
        method: 'POST',
         body: formData
    })
        const result = await response.json()
        if(result?.success){
        closeAllModal()
        alert('Sua musica '+result.data.artista+ 'foi editado com sucesso!');
        loadMusicas()
        }
    }
        function clearForm(idModal){
        const artista = document.querySelector (`${idModal} input[name=artista]`)
        artista.value = ''
        const musicas = document.querySelector(`${idModal} input[name=musicas]`)
        musicas.value = ''
        const singles = document.querySelector(`${idModal} input[name=singles]`) 
        singles.value = ''
        const capa = document.querySelector (`${idModal} input[name=capa]`)
        capa.value = ''
        const feats = document.querySelector (`${idModal} input [name=feats]`)
        feats.value = ''
        }