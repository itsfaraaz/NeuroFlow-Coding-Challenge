import { mockFetchHelper } from './mock_api.js';

let fetchDataPromiseFromJSON = async (filePath) => {
    try {
        const resp = await fetch(filePath);
        const data = await resp.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

let reformatDate = (input) => {
    if (input !== null) {
        return new Date(input).toLocaleDateString("en-US")
    } else {
        return "--"
    }
}

let checkNull = (input) => {
    if (input !== null) {
        return input
    } else {
        return "--"
    }
}

fetchDataPromiseFromJSON('assets/data/albums.json').then(data => {
    mockFetchHelper(undefined, data).then((apiResponse) => {

        apiResponse.albums.sort((a,b)=> b.last_listened - a.last_listened);
    
        apiResponse.albums.forEach(album => {
            const releaseDate = reformatDate(album.release_date) + " 12:00am"
            const lastListenedDate = reformatDate(album.last_listened)
            var newRowCells = "<td>" + checkNull(album.band_name) + "</td><td>" + checkNull(album.album_title) + "</td><td>" + checkNull(album.genres) + "</td><td>" + releaseDate + "</td><td>" + lastListenedDate + "</td>"
            document.getElementById('albums-table-body').insertRow().innerHTML = newRowCells;
            console.log(album)
        })

        document.getElementById("loading-header").style.display = 'none'
        document.getElementById("albums-body").style.display = 'block';
    })
})