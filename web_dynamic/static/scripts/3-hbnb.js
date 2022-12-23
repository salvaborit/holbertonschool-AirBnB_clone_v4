window.addEventListener('DOMContentLoaded', () => {

  // amenities popover checkbox select/deselect event
  const checkbox = document.querySelectorAll('input[type=checkbox]');
  let amenities = {};
  checkbox.forEach(element => {
    element.addEventListener('change', e => {
      if (e.target.checked) {
        amenities[element.dataset.name] = element.dataset.id;
      } else {
        delete amenities[element.dataset.name];
      }

      let amenity_names = Object.keys(amenities).join(', ');
      const h4 = document.querySelector('.amenities h4');
      h4.innerHTML = amenity_names ? amenity_names : '&nbsp;';
    });
  });

  // api status verification
  fetch('http://0.0.0.0:5001/api/v1/status/')
    .then(resp => resp.json())
    .then(data => {
      const api_status = document.querySelector('div#api_status');
      data.status === 'OK' ? api_status.classList.add('available') : api_status.classList.remove('available');
    }).catch(err => console.log(err));
});
