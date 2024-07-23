let toggleBox = document.querySelector('.toggle');
let form = document.querySelector('.form');
toggleBox.addEventListener('click', () => {
    form.classList.toggle('show');;

    if(form.classList.contains('show')){
        toggleBox.querySelector('i').className = 'fa-solid fa-xmark'
    }else{
        toggleBox.querySelector('i').className = 'fa-solid fa-bars'
    }
})


let searchBtn = document.querySelector('button');

searchBtn.addEventListener('click', closeToggle);



const displayMovieDetails = (finded) => {

    document.querySelector('.box').innerHTML = `<img src="${finded.Poster}" alt="">
            <div class="content">
                <div class="movieMame" style="display: flex;"><strong>Movie Name:</strong> <h3>"${finded.Title}"</h3></div>
                <div class="releasedDate"><strong>Released Date:</strong><span>${finded.Released}</span></div>
                <div class="director"><strong>Director:</strong><span>${finded.Director}</span></div>
                <div class="duration"><strong>Duration:</strong><span>${finded.Runtime}</span></div>
                <div class="genre"><strong>Genre:</strong><span>${finded.Genre}</span></div>
                <div class="actor"><strong>Actors:</strong><span>${finded.Actors}</span></div>
                <div class="year"><strong>Year:</strong><span>${finded.Year}</span></div>
                <div class="plot"><strong>Plot:</strong><span>${finded.Plot}</span></div>
            </div>`
}


const movieFinder = async () => {
    let inputBox = document.querySelector('input').value.trim();

    if(!inputBox){
        Swal.fire("Input's Value is Empty?"); 
    }else{
        let API_KEY = '7cecda3';
        let url = `https://www.omdbapi.com/?t=${encodeURIComponent(inputBox)}&apikey=${API_KEY}`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.Response === "True") {
                document.querySelector('.box').style.display = 'flex'
                displayMovieDetails(data);
                closeToggle();
            } else {
                document.getElementById('.box').innerHTML = `<p>Movie not found!</p>`;
            }
        } catch (error) {
            setTimeout(() => {
                // location.reload()
                console.clear()
            }, 600)
            console.error("Error fetching movie data:", error);
        }
    }
    document.querySelector('input').value = ''


}


searchBtn.addEventListener('click', movieFinder)

function closeToggle() {
    form.classList.remove('show');
    toggleBox.querySelector('i').className = 'fa-solid fa-bars'
}