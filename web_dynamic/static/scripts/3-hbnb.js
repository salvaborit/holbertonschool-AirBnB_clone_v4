#!/usr/bin/node

document.addEventListener('DOMContentLoaded', () => {
  /// /////// task 2///////////////
  const listAmenities = document.querySelector('.amenities h4');

  let listToAppend = [];

  const buttons = document.querySelectorAll('.amenities li');
  buttons.forEach(function (checkbox) {
    checkbox.addEventListener('change', function (checkbox) {
      if (checkbox.target.checked) {
        listToAppend.push(' ' + checkbox.target.name);
      } else {
        let AuxiliarList = [];
        for (let index = 0; index < listToAppend.length; index++) {
          if (listToAppend[index] === ' ' + checkbox.target.name) {
            delete listToAppend[index];
            AuxiliarList = listToAppend.filter(Boolean); // for errase ','
          }
        }
        listToAppend = AuxiliarList;
      }
      listAmenities.textContent = listToAppend;
      if (!listAmenities.textContent) {
        const barra = document.createElement('br');
        listAmenities.appendChild(barra);
      }
      if (listAmenities.textContent.length >= 24) {
        listAmenities.textContent = listAmenities.textContent.substring(0, 24) + '...';
      }
    });
  });
  /// ////////////// task 3 //////////////////
  const apiSt = document.getElementById('api_status');

  fetch('http://localhost:5001/api/v1/status')
    .then(res => {
      if (res.statusText === 'OK') {
        apiSt.classList.add('available');
      }
    })
    .catch(err => {
      console.error(err);
      apiSt.classList.remove('available');
      apiSt.style.backgroundColor = '#cccccc';
    });
  /// ////////// task 4 /////////////
  const listPlaces = document.querySelector('.places');

  fetch('http://localhost:5001/api/v1/places_search/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({})
  })
    .then(res => res.json())
    .then(data => {
      for (let index = 0; index < data.length; index++) {
        const place = document.createElement('article');
        listPlaces.appendChild(place);
        /// title box ///
        const titleBox = document.createElement('div');
        titleBox.classList.add('title_box');
        const placeName = document.createElement('h2');
        placeName.textContent = data[index].name;
        titleBox.appendChild(placeName);
        const placePriceByNigth = document.createElement('div');
        placePriceByNigth.textContent = '$' + data[index].price_by_night;
        placePriceByNigth.classList.add('price_by_night');
        titleBox.appendChild(placePriceByNigth);

        place.appendChild(titleBox);
        // information //
        const Info = document.createElement('div');
        Info.classList.add('information');
        const MaxGuest = document.createElement('div');
        MaxGuest.classList.add('max_guest');
        MaxGuest.textContent = data[index].max_guest + ' Guest';
        if (data[index].max_guest !== 1) MaxGuest.textContent += 's';
        Info.appendChild(MaxGuest);

        const NumberRooms = document.createElement('div');
        NumberRooms.classList.add('number_rooms');
        NumberRooms.textContent = data[index].number_rooms + ' Bedroom';
        if (data[index].number_rooms !== 1) NumberRooms.textContent += 's';
        Info.appendChild(NumberRooms);

        const NumberBathrooms = document.createElement('div');
        NumberBathrooms.classList.add('number_bathrooms');
        NumberBathrooms.textContent = data[index].number_bathrooms + ' Bathroom';
        if (data[index].number_bathrooms !== 1) NumberBathrooms.textContent += 's';
        Info.appendChild(NumberBathrooms);

        place.appendChild(Info);
        // user //
        const User = document.createElement('div');
        User.classList.add('user');
        User.textContent = 'Owner: ';

        place.appendChild(User);
        // description //
        const Description = document.createElement('div');
        Description.classList.add('description');
        Description.textContent = data[index].description.split(/[<BR />]/).join('\n');
        place.appendChild(Description);
      }
    })
    .catch(err => {
      console.error(err);
    });
});
