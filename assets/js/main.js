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
    const response = await fetch('backend/insert.php', {
        method: 'POST',
        body: formData
    })
    const result = await response.json()
    if (result?.success) {
        closeAllModal() 
        alert('Sua musica '+result.data.title+' foi cadastrado com sucesso!');
        loadMusicas();
    }
}

async function loadMusicas() {
    const response = await fetch('backend/list.php')
    const result = await response.json()
    if (result?.success) {
        const musiclist = document.querySelector('#productions')
        musiclist.innerHTML = ''
        const musicas = result.data
        musicas.map((film) => {
            musiclist.innerHTML += `
            <div class="card-movie">
                <a href="musica">
                    <img src="${film.capa}" alt="${film.titulo}">
                </a>
                    <div>
                        <a href="musica">
                            <h2>${film.titulo}</h2>
                        </a>
                        <div>
                            <p>${film.cantor}</p>
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
        const response = await fetch('backend/delete.php?id='+id)
        const result = await response.json()               
        if (result?.success) {
            alert('Sua musica foi deletado com sucesso!');
            loadMusicas();
        }
    }

    async function loadMusicasData(id) {
        const response = await fetch('backend/get-production-by-id.php?id='+id)
        const result = await response.json()               
        if (result?.success) {
            showModal('#modal-editar')
            const title = document.querySelector('#modal-editar input[name=title]')
            title.value = result.data.titulo
            const cantor = document.querySelector('#modal-editar input[name=cantor]')
            cantor.value = result.data.cantor
            const compositor = document.querySelector('#modal-editar input[name=compositor]')
            compositor.value = result.data.compositor
            const capa = document.querySelector('#modal-editar input[name=capa]')
            capa.value = result.data.capa
            const genero = document.querySelector('#modal-editar input[name=genero]')
            genero.value = result.data.genero
            const id = document.querySelector('#modal-editar input[name=id]')
            id.value = result.data.id
        }
    }

    async function edit(event){
        event.preventDefault()
        const formData = new FormData(event.target)
        const response = await fetch('backend/edit.php?',{
        method: 'POST',
         body: formData
    })
        const result = await response.json()
        if(result?.success){
        closeAllModal()
        alert('Sua musica '+result.data.title+ 'foi editado com sucesso!');
        loadMusicas()
        }
    }
        function clearForm(idModal){
        const title = document.querySelector (`${idModal} input[name=title]`)
        title.value = ''
        const cantor = document.querySelector(`${idModal} input[name=cantor]`)
        cantor.value = ''
        const compositor = document.querySelector(`${idModal} input[name=compositor]`) 
        compositor.value = ''
        const capa = document.querySelector (`${idModal} input[name=capa]`)
        capa.value = ''
        const genero = document.querySelector (`${idModal} input [name=genero]`)
        genero.value = ''
        }