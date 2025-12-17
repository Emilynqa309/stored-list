
let faveSongs = [];

const addSongButton = document.getElementById('add-song-button');
const list = document.getElementById('list');
const sortBtn = document.getElementById('sort');
const clearBtn = document.getElementById('clear');
let inputvalue = document.getElementById('text').value;


function updateList() {
    document.getElementById("list").innerHTML = ''
    for (let i = 0; i < faveSongs.length; i++) {
        const liElement = document.createElement('li');
        liElement.innerText = faveSongs[i].song;
        liElement.id = faveSongs[i]._id;
        if (faveSongs[i].listened) {
            liElement.classList.add('listened')
        }

        // Create delete button
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = 'x';
        deleteButton.addEventListener('click', function (e) {
            e.stopPropagation();
            deleteSong(faveSongs[i]._id);
        })

        // Add editing function 
        liElement.addEventListener('click', function () {
            if (!liElement.classList.contains('listened')) {
                updateSong(faveSongs[i]._id, {
                    listened: true
                });
            }
        });

        liElement.appendChild(deleteButton);
        list.appendChild(liElement);
    }
}

// 4. Handle adding a new item when the form is submitted
addSongButton.addEventListener('click', async function () {
    let inputvalue = document.getElementById('text').value;
    addSong(inputvalue);
});

// 5. Sort items alphabetically when sortBtn is clicked
sortBtn.addEventListener("click", () => {
    faveSongs.sort();
    updateList()
});

// 6. Clear all items when clearBtn is clicked
clearBtn.addEventListener("click", () => {
    faveSongs = [''];
    updateList();
});


async function getSongs() {
    const response = await fetch('/api/songs');
    const data = await response.json();
    console.log('songs', data);
    faveSongs = data;
    updateList();
}

getSongs();

async function addSong(value) {
    const postData = {
        song: value,
        listened: false
    }
    const response = await fetch('/api/songs', {
        method: 'POST', // Specify the HTTP method as POST
        headers: {
            'Content-Type': 'application/json' // Indicate that the body is JSON
        },
        body: JSON.stringify(postData) // Convert the data object to a JSON string
    });
    const data = await response.json();
    console.log('added song', data);
    getSongs();
}

async function updateSong(id, updatedValues) {
    const response = await fetch('/api/songs/' + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json' // Indicate that the body is JSON
        },
        body: JSON.stringify(updatedValues),
    })
    const data = await response.json();
    console.log('updated song', data);
    getSongs()
}

async function deleteSong(id) {
    const response = await fetch('/api/songs/' + id, {
        method: 'DELETE',
    });
    const data = await response.json();
    console.log('deleted song', data);
    getSongs();
}