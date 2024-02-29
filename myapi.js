/* uso de fetch. */
function getClassFetch(done) {
    const results = fetch("https://www.dnd5eapi.co/api/classes");

    results.then(response => response.json())
        .then(data => {
            done(data);
        });
}

/* uso de request. */
function getClassRequest(done) {
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                done(data);
            } else {
                console.error('Error al realizar la solicitud:', xhr.status);
            }
        }
    };

    xhr.open('GET', 'https://www.dnd5eapi.co/api/classes');
    xhr.send();
}

/* continuacion del uso de CDN. */
function getClassJQuery(done) {
    $.ajax({
        url: "https://www.dnd5eapi.co/api/classes",
        method: "GET",
        dataType: "json",
        success: function(data) {
            done(data);
        },
        error: function(xhr, status, error) {
            console.error("Error al realizar la solicitud:", error);
        }
    });
}

/* filto de uso local (si los datos o la info esta en almacenamiento local) o uso de un fetch (en caso de que no lo este, lo pide y lo almacena). */
function getClassJQueryLocal(done){
	$.ajax({
		url: "https://www.dnd5eapi.co/api/classes",
		method: "GET",
		dataType: "json",
		success: function(data) {
			done(data);
		},
		error: function(xhr, status, error) {
			console.error("Error al realizar la solicitud:", error);
		}
	});
}

/* funcion de filtro y front (creo que lo podria optimizar mejor de otra forma. NOTA: investigar que tan posible es mejorar esta funcion). */
function getClass(jquery, tipoGet){
	const main = document.querySelector("main");
	main.innerHTML = ''; /* uso de front. (tal vez esto no este bien o no sea a lo que se refiere implementar un front al consumir un api. investigar que pex con eso). */

	switch(tipoGet){
		case 1:
			getClassFetch(data => {
				data.results.forEach(clase => {
					const article = document.createRange().createContextualFragment(`
					<article>
						<div class="image-container"> <img src="https://th.bing.com/th/id/OIP.p6l6jmdmcdCoGzySFPaKkgHaEN?pid=ImgDet&w=194&h=109.91966173361521&c=7" alt="clase"> </div>
						<h2>${clase.name}</h2>
					</article>
						`);
					main.append(article);
				});
			});
			break;

		case 2:
			getClassRequest(data => {
                                data.results.forEach(clase => {
                                        const article = document.createRange().createContextualFragment(`
			                <article>
                                        	<div class="image-container"> <img src="https://th.bing.com/th/id/OIP.p6l6jmdmcdCoGzySFPaKkgHaEN?pid=ImgDet&w=194&h=109.91966173361521&c=7" alt="clase"> </div>
                                        	<h2>${clase.name}</h2>
                                        </article>
                                                `);
                                        main.append(article);
                                });
                        });

			break;
		case 3:
			getClassJQuery(data => {
				data.results.forEach(clase => {
					const article = document.createRange().createContextualFragment(`
					<article>
						<div class="image-container"> <img src="https://th.bing.com/th/id/OIP.p6l6jmdmcdCoGzySFPaKkgHaEN?pid=ImgDet&w=194&h=109.91966173361521&c=7" alt="clase"> </div>
						<h2>${clase.name}</h2>
					</article>
						`);
					main.append(article);
				});
			});
			break;
		case 4:
			getClassJQueryLocal(data => {
				data.results.forEach(clase => {
                                        const article = document.createRange().createContextualFragment(`
                                        <article>
                                                <div class="image-container"> <img src="https://th.bing.com/th/id/OIP.p6l6jmdmcdCoGzySFPaKkgHaEN?pid=ImgDet&w=194&h=109.91966173361521&c=7" alt="clase"> </div>
                                                <h2>${clase.name}</h2>
                                        </article>
                                                `);
                                        main.append(article);
                                });
                        });
	}
}
