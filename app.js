const TMDB_ENDPOINT_BASE = 'https://api.themoviedb.org/3';
const API_KEY = 'c886ee4b91c582c6febb99b18f7c920f';
var vetGeneros;
var vetIdAtores = [1813, 1397778, 287, 109513, 1253360, 976, 58369, 1292329, 1734, 25246, 1245, 2888, 500, 18918, 31, 6384, 10859, 2524, 73968, 1520843];

// Função que cria objetos Genero
function CriaGenero(idGenero, nomeGenero) {
    return {
        id: idGenero,
        genero: nomeGenero
    };
}

// Função que cria os cards dos filmes
function mostraFilmesEmCartaz() {
    //Executar requisição AJAX

    $.ajax({
            // Passar a URL ENDPOINT BASE + /movie/upcoming
            url: TMDB_ENDPOINT_BASE + '/movie/upcoming',
            data: {
                api_key: API_KEY,
                language: 'pt-BR'
            }
        })
        // Receber o JSON
        .done(function(data) {

            let codigo_htmlEmCartaz = '';

            //O primeiro inner de um carrossel tem html diferente com a classe active
            let titulo0 = data.results[0].title;
            let imagem0 = data.results[0].backdrop_path != null ? 'https://image.tmdb.org/t/p/w500' + data.results[0].backdrop_path : './img/logo.png';
            let descricao0 = data.results[0].overview;
            let avaliacao0 = data.results[0].vote_average;
            let estreia0 = data.results[0].release_date;
            let id = data.results[0].id;
            codigo_htmlEmCartaz += ` <div class="carousel-item active">
            <div class="card text-white bg-dark mb-3 texto_carrossel" style="max-width: 1200px;">
                <div class="row no-gutters">
                    <div class="col-12 col-sm-12 col-md-6 col-lg-6">
                        <a href="#" onclick="filmeDetalhes(${id})"><img src="${imagem0}" style="max-width: 100%;" alt="${titulo0}"></a>
                    </div>
                    <div class="col-12 col-sm-12 col-md-6 col-lg-6">
                        <div class="card-body">
                            <h5 class="card-title">${titulo0}</h5>
                            <p class="card-text"><strong>Sinopse:&nbsp</strong> ${descricao0}</p>
                            <p><span><strong>Estreia:&nbsp</strong> ${estreia0}</span></p>
                            <p><span><strong>Avaliação:&nbsp</strong></span>${avaliacao0}</p>
                        </div>
                    </div>
                </div>
            </div></div>`
                // Montar HTML dos demais itens do carrossel
            for (i = 1; i < data.results.length; i++) {
                id = data.results[i].id;
                // Concatenar o código do Card com os dados do JSON
                titulo = data.results[i].title;
                imagem = data.results[i].backdrop_path != null ? 'https://image.tmdb.org/t/p/w500' + data.results[i].backdrop_path : './img/logo.png';
                descricao = data.results[i].overview;
                avaliacao = data.results[i].vote_average;
                estreia = data.results[i].release_date;
                if (imagem != './img/logo.png') {
                    codigo_htmlEmCartaz += ` <div class="carousel-item">
                <div class="card text-white bg-dark mb-3" style="max-width: 1200px;">
                    <div class="row no-gutters">
                        <div class="col-12 col-sm-12 col-md-6 col-lg-6">
                            <a href="#" onclick="filmeDetalhes(${id})"><img src="${imagem}" style="max-width: 100%;" alt="${titulo}"></a>
                        </div>
                        <div class="col-12 col-sm-12 col-md-6 col-lg-6">
                            <div class="card-body">
                                <h4 class="card-title">${titulo}</h4>
                                <p class="card-text"><strong>Sinopse:&nbsp</strong> ${descricao}</p>
                                <p><span><strong>Estreia:&nbsp</strong> ${estreia}</span></p>
                                <p><span><strong>Avaliação:&nbsp</strong></span>${avaliacao}</p>
                            </div>
                        </div>
                    </div>
                </div></div>`;
                }
            }

            // Repassar os cards para a página
            $('#lista_emCartaz').html(codigo_htmlEmCartaz);

        });

}

// Função que cria os cards dos filmes melhor rankeados
function mostraMelhoresFilmes() {
    //Executar requisição AJAX
    $.ajax({
            // Passar a URL ENDPOINT BASE + /movie/top_rated
            url: TMDB_ENDPOINT_BASE + '/movie/top_rated',
            data: {
                api_key: 'c886ee4b91c582c6febb99b18f7c920f',
                language: 'pt-BR'
            }
        })
        // Receber o JSON
        .done(function(data) {

            let codigo_html1 = '';
            let codigo_html2 = '';
            vetMelhoresFilmes = [];

            // Montar os cards
            for (i = 0; i < data.results.length; i++) {

                // Concatenar o código do Card com os dados do JSON
                if (data.results[i].poster_path != null && data.results[i].poster_path != undefined) {
                    let imagem = 'https://image.tmdb.org/t/p/w500' + data.results[i].poster_path;
                    let id = data.results[i].id;
                    let titulo = data.results[i].title;

                    //Mostra inicialmente apenas os 4 primeiros filmes na pagina principal
                    if (i < 4) {
                        codigo_html1 += `<div class="col-12 col-sm-6 col-md-6 col-lg-3">
                    <div class="card">
                    <a href="#" onclick="filmeDetalhes(${id})"><img src="${imagem}" class="card-img-top" alt="${titulo}"></a>
                    </div></div>`;
                    }

                    //Montar conteudo HTML para exibir todos os destaques na pagina destaques
                    if (i % 4 == 0) {
                        codigo_html2 += `<div class="row">`;
                    }
                    codigo_html2 += `<div class="col-12 col-sm-6 col-md-6 col-lg-3">
                    <div class="card">
                    <a href="#" onclick="filmeDetalhes(${id})><img src="${imagem}" class="card-img-top" alt="${titulo}"></a>
                    </div></div> `;
                    if (i % 4 == 0) {
                        codigo_html2 += `</div>`;
                    }
                }
            }
            // Repassar os cards para a página
            $('#lista_emDestaque').html(codigo_html1);
            $('#lista_MaisEmDestaque').html(codigo_html2);
        });
}

// Função que cria os cards da área Novidades na Homepage
function insereNovidades() {

    //Executar requisição AJAX
    $.ajax({
            // Passar a URL ENDPOINT BASE + /person/{person_id}
            url: TMDB_ENDPOINT_BASE + '/person/' + vetIdAtores[0],
            data: {
                api_key: 'c886ee4b91c582c6febb99b18f7c920f',
                language: 'pt-BR'
            }
        })
        // Receber o JSON
        .done(function(ator) {
            let novoCodigo = '';
            // Concatenar o código do Card com os dados do JSON
            let imagem = 'https://image.tmdb.org/t/p/w500' + ator.profile_path;
            let nome = ator.name;
            let popularidade = ator.popularity;
            let biografia = ator.biography;
            let aniversario = ator.birthday;
            let naturalidade = ator.place_of_birth;

            novoCodigo = `  <div class="col-12 col-sm-12 col-md-3 col-lg-3 img_novidades">
                                <img src="${imagem}" style="max-width: 100% !important" alt="Imagem notícia1">
                            </div>
                            <div class="col-12 col-sm-12 col-md-9 col-lg-9" style="max-width: 100%; max-height: 100%;">
                                <div class="card-body meu_card" style="max-width: 100%; max-height: 100%;">
                                    <h5 class="card-title">${nome}</h5>
                                    <p class="card-text">${biografia}</p>
                                    <p><button type="button" class="btn btn-dark btn_noticias">${popularidade}</button>
                                        <button type="button" class="btn btn-dark btn_noticias">${aniversario}</button>
                                        <button type="button" class="btn btn-dark btn_noticias">${naturalidade}</button>
                                    </p>
                                </div>
                            </div>`;

            $('#cardAtor1').html(novoCodigo);

        }).fail(function() {
            console.log('Ocorreu um erro ao carregar dados do ator');
        });

    //Executar requisição AJAX
    $.ajax({
            // Passar a URL ENDPOINT BASE + /person/{person_id}
            url: TMDB_ENDPOINT_BASE + '/person/' + vetIdAtores[1],
            data: {
                api_key: 'c886ee4b91c582c6febb99b18f7c920f',
                language: 'pt-BR'
            }
        })
        // Receber o JSON
        .done(function(ator) {
            let outroCodigo = '';
            // Concatenar o código do Card com os dados do JSON
            let imagem = 'https://image.tmdb.org/t/p/w500' + ator.profile_path;
            let nome = ator.name;
            let popularidade = ator.popularity;
            let biografia = ator.biography;
            let aniversario = ator.birthday;
            let naturalidade = ator.place_of_birth;

            outroCodigo = `  <div class="col-12 col-sm-12 col-md-3 col-lg-3 img_novidades">
                                <img src="${imagem}" style="max-width: 100% !important" alt="Imagem notícia1">
                            </div>
                            <div class="col-12 col-sm-12 col-md-9 col-lg-9" style="max-width: 100%; max-height: 100%;">
                                <div class="card-body meu_card" style="max-width: 100%; max-height: 100%;">
                                    <h5 class="card-title">${nome}</h5>
                                    <p class="card-text">${biografia}</p>
                                    <p><button type="button" class="btn btn-dark btn_noticias">${popularidade}</button>
                                        <button type="button" class="btn btn-dark btn_noticias">${aniversario}</button>
                                        <button type="button" class="btn btn-dark btn_noticias">${naturalidade}</button>
                                    </p>
                                </div>
                            </div>`;

            $('#cardAtor2').html(outroCodigo);

        }).fail(function() {
            console.log('Ocorreu um erro ao carregar dados do ator');
        });
    //Executar requisição AJAX
    $.ajax({
            // Passar a URL ENDPOINT BASE + /person/{person_id}
            url: TMDB_ENDPOINT_BASE + '/person/' + vetIdAtores[2],
            data: {
                api_key: 'c886ee4b91c582c6febb99b18f7c920f',
                language: 'pt-BR'
            }
        })
        // Receber o JSON
        .done(function(ator) {
            let outroCodigo = '';
            // Concatenar o código do Card com os dados do JSON
            let imagem = 'https://image.tmdb.org/t/p/w500' + ator.profile_path;
            let nome = ator.name;
            let popularidade = ator.popularity;
            let biografia = ator.biography;
            let aniversario = ator.birthday;
            let naturalidade = ator.place_of_birth;

            outroCodigo = `  <div class="col-12 col-sm-12 col-md-3 col-lg-3 img_novidades">
                            <img src="${imagem}" style="max-width: 100% !important" alt="Imagem notícia1">
                        </div>
                        <div class="col-12 col-sm-12 col-md-9 col-lg-9" style="max-width: 100%; max-height: 100%;">
                            <div class="card-body meu_card" style="max-width: 100%; max-height: 100%;">
                                <h5 class="card-title">${nome}</h5>
                                <p class="card-text">${biografia}</p>
                                <p><button type="button" class="btn btn-dark btn_noticias">${popularidade}</button>
                                    <button type="button" class="btn btn-dark btn_noticias">${aniversario}</button>
                                    <button type="button" class="btn btn-dark btn_noticias">${naturalidade}</button>
                                </p>
                            </div>
                        </div>`;

            $('#cardAtor3').html(outroCodigo);

        }).fail(function() {
            console.log('Ocorreu um erro ao carregar dados do ator');
        });
}

// Função para direcionar o filme selecionado 
// para a página de detalhes
function filmeDetalhes(id) {
    localStorage.removeItem('filmeID');
    localStorage.setItem('filmeID', id);
    window.location = 'detalhes.html';
    return false; //parar a funcao depois que abrirmos a pagina detalhes
}

function pesquisaFilmes() {
    $.ajax({
            // Passar a URL ENDPOINT BASE + /search/movie
            url: TMDB_ENDPOINT_BASE + '/search/movie',
            data: {
                api_key: 'c886ee4b91c582c6febb99b18f7c920f',
                query: $('#search').val()
            }
        })
        // Receber o JSON
        .done(function(data) {

            let codigo_html = '';

            // Montar os cards
            for (i = 0; i < data.results.length; i++) {

                // Concatenar o código do Card com os dados do JSON
                titulo = data.results[i].title;
                imagem = 'https://image.tmdb.org/t/p/w500' + data.results[i].poster_path;
                descricao = data.results[i].overview;
                id = data.results[i].id;

                codigo_html += `<div class="col-2"><div class="card" style="width: 18rem;">
                    <img src="${imagem}" class="card-img-top"
                        alt="${titulo}">
                    <div class="card-body">
                        <h5 class="card-title">${titulo}</h5>
                        <span class="card-text">${descricao}</span><br>
                        <a href="#" onclick="filmeDetalhes(${id})" class="btn btn-primary">+</a>
                    </div>
                </div></div>`;
            }

            // Repassar os cards para a página
            $('#lista_filmes').html(codigo_html)
        });
}

// Função para pegar os ids e nomes das categorias, salvando-as em um vetor
function setarCategorias() {
    vetGeneros = [];
    //Executar requisição AJAX
    $.ajax({
            // Passar a URL ENDPOINT_BASE + /genre/movie/list
            url: TMDB_ENDPOINT_BASE + '/genre/movie/list',
            data: {
                api_key: 'c886ee4b91c582c6febb99b18f7c920f',
                language: 'pt-BR'
            }
        })
        // Receber o JSON
        .done(function(data) {

            let codigo = '';

            // Criar os objetos Genero e salvar no vetorGeneros
            for (i = 0; i < data.genres.length; i++) {
                let id = data.genres[i].id;
                let genero = data.genres[i].name;
                vetGeneros.push(CriaGenero(id, genero));
            }
        });
}

function obterCodCategoria(categoria) {
    let result;
    vetGeneros.forEach(function(el, i) {
        if (el.genero == categoria) {
            result = el.id;
        }
    });
    return result;
}

function selecionaCategoria(categ) {

    let idCategoria = obterCodCategoria(categ);

    $.ajax({
            // Passar a URL ENDPOINT BASE + /movie/popular
            url: TMDB_ENDPOINT_BASE + '/movie/popular',
            data: {
                api_key: 'c886ee4b91c582c6febb99b18f7c920f',
                language: 'pt-BR'
            }
        })
        // Receber o JSON
        .done(function(data) {

            let codigo = '';
            let codigo_html2;

            // Montar os cards
            for (i = 0; i < data.results.length; i++) {

                // Concatenar o código do Card com os dados do JSON se ele for da categoria desejada
                if (data.results[i].poster_path != null && data.results[i].poster_path != undefined &&
                    data.results[i].genre_ids.includes(idCategoria)) {
                    let imagem = 'https://image.tmdb.org/t/p/w500' + data.results[i].poster_path;
                    let id = data.results[i].id;
                    let titulo = data.results[i].title;

                    //Mostra os filmes encontrados na categoria selecionada
                    codigo += `<div class="col-12 col-sm-6 col-md-6 col-lg-3">
                        <div class="card">
                        <a href="#" onclick="filmeDetalhes(${id})"><img src="${imagem}" class="card-img-top" alt="${titulo}"></a>
                        </div></div>`;
                }
            }
            // Repassar os cards para a página
            $('#lista_emDestaque').html(codigo);

        });
}



$(document).ready(function() {

    mostraFilmesEmCartaz();
    mostraMelhoresFilmes();
    setarCategorias();
    insereNovidades();

    $('#btn_Pesquisar').click(pesquisaFilmes);
    $('.buscarPagina').click(function() {
        //Retirando o conteudo da propriedade href "o link destino"
        //e colocando em uma variavel
        var link = $(this).attr('href');
        $.ajax({
            dataType: 'html',
            url: link, //link da pagina que o ajax buscara
            success: function(data) {
                //inserindo o retorno da pagina AJAx
                $('#conteudo').html(data).fadeIn(340);
            },
            error: function(data) {
                //em caso de erro exibe essa mensagem
                $('#conteudo').html('<p>ERRO AO CARREGAR OUTRA PAGINA</p>').fadeIn(300);
            }
        });
    });
    $('.dropdown-item').click(function() {
        let categoria = $(this).attr('href');
        selecionaCategoria(categoria);
    });

});