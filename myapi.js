function getClass(done) {
    const results = fetch("https://www.dnd5eapi.co/api/classes");

    results.then(response => response.json())
        .then(data => {
            done(data);
        });
}

getClass(data => {
    data.results.forEach(clase => {
        const article = document.createRange().createContextualFragment(`
            <article>
                <div class="image-container"> <img src="https://th.bing.com/th/id/OIP.p6l6jmdmcdCoGzySFPaKkgHaEN?pid=ImgDet&w=194&h=109.91966173361521&c=7" alt="clase"> </div>
                <h2>${clase.name}</h2>
            </article>
        `);

        const main = document.querySelector("main");
        main.append(article);
    });
});

