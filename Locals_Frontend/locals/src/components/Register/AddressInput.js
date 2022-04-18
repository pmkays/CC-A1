import { useState } from 'react'
import { GeoapifyGeocoderAutocomplete, GeoapifyContext } from '@geoapify/react-geocoder-autocomplete'
import '@geoapify/geocoder-autocomplete/styles/minimal.css'
import Form from 'react-bootstrap/Form'

const AddressInput = (props) => {
  // const geoapifyAutocompleteInput= {
  //   display: 'block',
  //   width: '100%',
  //   padding: '.375rem .75rem',
  //   fontSize: '1rem',
  //   fontWeight: '400',
  //   lineHeight: '1.5',
  //   color: '#212529',
  //   backgroundColor: '#fff',
  //   backgroundClip: 'padding-box',
  //   border: '1px solid #ced4da',
  //   borderRadius: '.25rem',
  //   transition: 'border-color .15s ease-in-out,box-shadow .15s ease-in-out'
  // }

  const onPlaceSelect = (value) => {
    let address = value.properties.formatted;
    let suburb = value.properties.city;
    let postcode = value.properties.postcode;
    props.handleAddress(address, suburb, postcode);
  }
  
  //same as using this: var url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(currentValue)}&limit=5&apiKey=${apiKey}`;

  return <GeoapifyContext apiKey="ec72b3f43c054e9791e985a4cc10dac2">
      <GeoapifyGeocoderAutocomplete
        placeSelect={onPlaceSelect}
        skipDetails={true}
        // className={geoapifyAutocompleteInput}       
      />
    </GeoapifyContext>
}

export default AddressInput