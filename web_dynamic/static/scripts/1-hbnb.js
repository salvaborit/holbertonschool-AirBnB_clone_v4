window.addEventListener('DOMContentLoaded', (e) => {
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
});
