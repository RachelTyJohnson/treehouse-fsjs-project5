//MODAL STUFF
var modal = document.getElementById('theModal');
var container = document.querySelector('.container');
var span = document.querySelector('.close');

let employees = [];

//CITY SHORTENER
function stateShort(state){
switch(state) {
  case 'new south wales':
    return 'NSW'
    break;
    case 'tasmania':
    return 'TAS'
    break;
  case 'queensland':
    return 'QLD'
    break;
  case 'south australia':
    return 'SA'
    break;
  case 'western australia':
    return 'WA'
    break;
  case 'northern territories':
    return 'NT'
    break;
  case 'victoria':
  return 'VIC'
    break;
  default:
    return 'ACT'
  }
}

container.addEventListener('click', function(e){
  if (e.target.closest(".card")){
    modal.style.display = "block";
    let modalIndex = e.target.parentNode.dataset.index;
    changeModalContent(modalIndex);
  }
});

function nextSlide(e){
  let currentIndex = parseInt(e.target.parentNode.dataset.index);
  nextIndex = currentIndex+1;
  if(currentIndex!==14){
    changeModalContent(nextIndex);
  } else {
    changeModalContent(0);
  }
}

function previousSlide(e){
  let currentIndex = parseInt(e.target.parentNode.dataset.index);
  previousIndex = currentIndex-1;
  if(currentIndex!==0){
    changeModalContent(previousIndex);
  } else {
    changeModalContent(14);
  }
}

theModal.addEventListener('click',function(e){
  if (e.target.className=="m-next"){
    nextSlide(e);
  }
  if (e.target.className=="m-previous"){
    previousSlide(e);
  }
});

function changeModalContent(modalIndex){
  $('.modal-box').attr('data-index', modalIndex);
  $('.m-photo').attr('src', employees[modalIndex].photo);
  $('.m-name').text(employees[modalIndex].name);
  $('.m-email').html(`<a href="mailto:${employees[modalIndex].email}">${employees[modalIndex].email}</a>`);
  $('.m-city').text(employees[modalIndex].location.city);
  $('.m-number').text(employees[modalIndex].number);
  $('.m-address').text(employees[modalIndex].location.street
    + ", " + employees[modalIndex].location.city + " "
    + stateShort(employees[modalIndex].location.state)
    + " " + employees[modalIndex].location.postcode);
  let birthday = employees[modalIndex].dob.date;
  let bDate = birthday.substring(8,10);
  let bMonth = birthday.substring(5,7);
  let bYear = birthday.substring(2,4);;
  $('.m-dob').text(`Birthday: ${bDate}/${bMonth}/${bYear}`);
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

//API STUFF

function createCard(i,person){
  let personObject = {
    name: person.name.first + " " + person.name.last,
    email: person.email,
    photo: person.picture.large,
    number: person.cell,
    location: person.location,
    dob: person.dob
  }
  let newCard = `
  <div class="card" data-index="${i}">
    <img src="${personObject.photo}" />
    <div class="details">
      <h2>${personObject.name}</h2>
      <p class="email">${personObject.email}</p>
      <p class="city">${personObject.location.city}</p>
    </div>
    <div class="cardOverlay"></div>
  </div>
  `;
  $('.container').append(newCard);
  employees.push(personObject);
}

fetch('https://randomuser.me/api/?nat=au&results=15')
  .then(function(people) {
    return people.json();
  })
  .then(function(people) {
    $.each(people.results, createCard);
  })

//search box
$("#searchbar").on("keyup", function() {
  let value = $(this).val().toLowerCase();
  $(".card").filter(function() {
    if ( $(this).html().toLowerCase().indexOf(value) > -1 ){
      $(this).show();
    } else {
      $(this).hide();
    }
  });
});
