function getClassFetch(done) {
    const results = fetch('https://spapi.dev/api/episodes');

    results.then(response => response.json())
        .then(data => {
            done(data);
        });
}

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

    xhr.open('GET', 'https://spapi.dev/api/characters/');
    xhr.send();
}

function getClassJQuery(done) {
    $.ajax({
        url:'https://spapi.dev/api/families',
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

function getClassJQueryLocal(done){
	$.ajax({
		url: 'https://spapi.dev/api/locations',
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

function getClass(jquery, tipoGet){
	const main = document.querySelector("main");
	main.innerHTML = '';

	switch(tipoGet){
		case 1:
			getClassFetch(data => {
				data.data.forEach(episodes => {
				const article = document.createRange().createContextualFragment(`
				<article>
					<div class="image-container">
						<img src="${episodes.thumbnail_url}" alt="episodes">
					</div>
					<h2>${episodes.name}</h2>
					<h3>Temporada: ${episodes.season}</h3>
					<h4>Episodio: ${episodes.episode}</h4>
				</article>
					`);
					main.append(article);
				});
			});
			break;

		case 2:
			getClassRequest(data => {
                                data.data.forEach(characters => {
                                const article = document.createRange().createContextualFragment(`
                                <article>
                                        <div class="image-container">
                                                <img src="https://www.ecured.cu/images/1/17/South.jpg" alt="episodes">
                                        </div>
                                        <h2>nombre: ${characters.name}</h2>
                                        <h3>sexo: ${characters.sex}</h3>
                                        <h4>color de cabello: ${characters.hair_color}</h4>
					<h5>ocupacion: ${characters.occupation}</h5>
					<h6>religion: ${characters.religion}</h6>
                                </article>
                                        `);
                                        main.append(article);
                                });
                        });

			break;
		case 3:
			getClassJQuery(data => {
				data.data.forEach(families => {
                                const article = document.createRange().createContextualFragment(`
                                <article>
                                        <div class="imagxde-container">
                                                <img src= "https://th.bing.com/th/id/OIP.0OYFPOj6ePF3wuEU9suDAAHaEt?pid=ImgDet&w=194&h=112.14345991561181&c=7" alt="families">
                                        </div>
                                        <h2>${families.name}</h2>
                                </article>
                                        `);
                                        main.append(article);
                                });
			});

			break;
		case 4:
			getClassJQueryLocal(data => {
				data.data.forEach(locations => {
                                const article = document.createRange().createContextualFragment(`
                                <article>
                                        <div class="image-container">
                                                <img src="https://th.bing.com/th/id/R.3312dd66badb840b32b07e6e1a384b89?rik=IRGmWqRKFo091Q&riu=http%3a%2f%2f4.bp.blogspot.com%2f_cTvmFDZs-Rs%2fSa1_V6CpsyI%2fAAAAAAAACGQ%2fDKdTTdE5BEc%2fs400%2fMASA.JPG&ehk=KHjw6sDSB1K44jorSSilESfnoHNq9XqV6kXpbK7FsHc%3d&risl=&pid=ImgRaw&r=0" alt="episodes">
                                        </div>
                                        <h2>${locations.name}</h2>
                                </article>
                                        `);
                                        main.append(article);
                                });
                        });

			break;
	}
}
