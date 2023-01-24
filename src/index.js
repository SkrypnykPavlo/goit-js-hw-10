import './css/styles.css';
import fetchCountries from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const ref = {
  input: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};
const DEBOUNCE_DELAY = 300;

ref.input.addEventListener('input', debounce(searchCountry, DEBOUNCE_DELAY));

function searchCountry(event) {
  reset();
  let { value } = event.target;
  value = value.trim();
  if (!value) {
    return;
  }
  fetchCountries(value).then(renderCountryData).catch(searchError);
}

function renderCountryData(countryData) {
  if (countryData.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
    return;
  }

  if (countryData.length > 1) {
    ref.countryList.innerHTML = createList(countryData);
  } else {
    ref.countryInfo.innerHTML = createInfo(countryData[0]);
  }
}
