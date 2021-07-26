let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

// On the index.html page, there is a div with the id "toy-collection."
// When the page loads, make a 'GET' request to fetch all the toy objects. 
// With the response data, make a <div class="card"> for each toy and 
// add it to the toy-collection div.

let toyCollection = document.getElementById("toy-collection");
fetchToys();

function fetchToys() {
  fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(json => {
    json.forEach(toy => {
      renderToy(toy)
    })
  })
};

// When a user submits the toy form, a POST request is sent to http://localhost:3000/toys and 
// the new toy is added to Andy's Toy Collection.
// The toy should conditionally render to the page.
// In order to send a POST request via Fetch, 
// give the Fetch a second argument of an object. 
// This object should specify the method as POST 

function createToy(formData){
fetch('http://localhost:3000/toys',{
  method: "POST",
  headers:{
    "Content-Type": "application/json",
    "Accept":"application/json"
  },
  body: JSON.stringify({
    'name': formData.name.value,
    'image': formData.image.value,
    'like': 0
  })
  })
}

function renderToy(toy) {
  console.log(toy);
  let h2 = document.createElement('h2');
  h2.innerText = `${toy.id}. ${toy.name}`;

  let img = document.createElement('img');
  img.src = toy.image;
  img.className = "toy-avatar";

  let p = document.createElement('p');
  p.innerText = `${toy.likes}`;

  let btn = document.createElement('button');
  btn.className = 'like-btn';
  btn.id = toy.id;
  btn.innerText = 'Like <3'
  btn.addEventListener('click', addLike);

  let toyCard = document.createElement('div');
  toyCard.className = 'card'
  // ParentNode.append() can append several nodes and strings
  // whereas Node.appendChild() can only append one node.
  toyCard.append(h2, img, p, btn);
  console.log(toyCard);
  toyCollection.append(toyCard);
};

function addLike(e){
  e.preventDefault();
  let likes = parseInt(e.target.previousElementSibling.innerText++)

  // send patch request to the server
  // updating the number of likes of specific toy
  fetch(`http://localhost:3000/toys/${e.target.id}`, {
    method: 'PATCH', 
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },

    body: JSON.stringify({
      "likes": likes
    })
  });
};
});