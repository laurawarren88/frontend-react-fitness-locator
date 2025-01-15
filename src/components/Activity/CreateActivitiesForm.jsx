import React from 'react';
import activityTypes from '../../utils/activityTypes';
import useForm from '../../hooks/useForm';
import SearchBox from '../Locator/Header/SearchBox';

const CreateActivitiesForm = ({ onSubmit, title, buttonText, footer, onChange }) => {
  const initialFormData = {
    name: '',
    vicinity: '',
    phone: '',
    city: '',
    email: '',
    postcode: '',
    website: '',
    opening_hours: '',
    type: '',
    description: '',
    logo: null,
    facilities_image: null,
    latitude: '',
    longitude: '',
  };

  const { formData, handleChange, handleAddressFieldChange, handleSubmit } = useForm(
      initialFormData, 
      onSubmit
  );

    // Function to update coordinates
    const setCoordinates = (coordinates, addressFields) => {
      console.log("Coordinates received:", coordinates);
      console.log("Address fields:", addressFields);
      
      handleChange({
        target: {
          name: 'latitude',
          value: coordinates.lat,
        },
      });
      handleChange({
        target: {
          name: 'longitude',
          value: coordinates.lng,
        },
      });
      handleChange({
        target: {
          name: 'vicinity',
          value: addressFields.vicinity || formData.vicinity,
        },
      });
      handleChange({
        target: {
          name: 'city',
          value: addressFields.city || formData.city,
        },
      });
      handleChange({
        target: {
          name: 'postcode',
          value: addressFields.postcode || formData.postcode,
        },
      });
    };

    return (
    <>
      <section className="bg-white py-12">
        <div className="flex flex-col items-center justify-center mx-auto">
          <div className="form-container w-full max-w-3xl">
            <div className="form-layout p-8 space-y-6">
              <h1 className="form-title text-3xl font-oswald font-bold text-darkGray text-center">
                {title}
              </h1>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                {/* Activity Name */}
                  <div className="col-span-2">
                    <label className="form-label" htmlFor="business_name">Activity/Organisation Name</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="form-input"
                      placeholder="Activity or Organisation Name"
                      value={formData.name || ""}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Address Search Box */}
                  <div className="col-span-2">
                    <label className="form-label" htmlFor="vicinity">Address</label>
                    <SearchBox setCoordinates={setCoordinates} />
                  </div>


                  {/* First Line of Address */}
                  <div className="col-span-1">
                    <label className="form-label" htmlFor="vicinity">Address</label>
                    <input
                      type="text"
                      name="vicinity"
                      id="vicinity"
                      className="form-input"
                      placeholder="First Line of Address"
                      value={formData.vicinity || ""}
                      onChange={handleAddressFieldChange}
                      required
                    />
                  </div>

                  <div className="col-span-1">
                    <label className="form-label" htmlFor="phone">Phone Number</label>
                    <input
                      type="text"
                      name="phone"
                      id="phone"
                      className="form-input"
                      placeholder="Phone Number"
                      value={formData.phone || ""}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-span-1">
                    <label className="form-label" htmlFor="city">City</label>
                    <input
                      type="text"
                      name="city"
                      id="city"
                      className="form-input"
                      placeholder="City"
                      value={formData.city || ""}
                      onChange={handleAddressFieldChange}
                      required
                    />
                  </div>

                  <div className="col-span-1">
                    <label className="form-label" htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="form-input"
                      placeholder="Email Address"
                      value={formData.email || ""}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-span-1">
                    <label className="form-label" htmlFor="postcode">Postcode</label>
                    <input
                      type="text"
                      name="postcode"
                      id="postcode"
                      className="form-input"
                      placeholder="Postcode"
                      value={formData.postcode || ""}
                      onChange={handleAddressFieldChange}
                      required
                    />
                  </div>

                  <div className="col-span-1">
                    <label className="form-label" htmlFor="website">Website</label>
                    <input
                      type="text"
                      name="website"
                      id="website"
                      className="form-input"
                      placeholder="Website"
                      value={formData.website || ""}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-span-1">
                    <label className="form-label" htmlFor="opening_hours">Opening Hours</label>
                    <input
                      type="text"
                      name="opening_hours"
                      id="opening_hours"
                      className="form-input"
                      placeholder="Opening Hours"
                      value={formData.opening_hours || ""}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-span-1">
                    <label className="form-label" htmlFor="activities">Activity Type</label>
                     <select
                      id="activity-type"
                      name="type"
                      className="form-input"
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a type</option>
                      {activityTypes.map((type, index) => (
                        <option key={index} value={type.key}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-span-2">
                    <label className="form-label" htmlFor="facilities">Description/Facilities List</label>
                    <input
                      type="text"
                      name="description"
                      id="description"
                      className="form-input"
                      placeholder="Description or Facilities"
                      value={formData.description || ""}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-span-1">
                    <label className="form-label" htmlFor="logo">Activity/Organisation Logo</label>
                    <input
                      type="file"
                      name="logo"
                      id="logo"
                      className="form-input"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-span-1">
                    <label className="form-label" htmlFor="facilities_image">Facilities Image</label>
                    <input
                      type="file"
                      name="facilities_image"
                      id="facilities_image"
                      className="form-input"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="col-span-1">
                  <label className="form-label" htmlFor="latitude">Latitude</label>
                  <input
                    type="text"
                    name="latitude"
                    id="latitude"
                    className="form-input"
                    value={formData.latitude || ""}
                    readOnly
                  />
                </div>

                <div className="col-span-1">
                  <label className="form-label" htmlFor="longitude">Longitude</label>
                  <input
                    type="text"
                    name="longitude"
                    id="longitude"
                    className="form-input"
                    value={formData.longitude || ""}
                    readOnly
                  />
                </div>

                <div className="flex flex-col gap-4 mt-4">
                  <button type="submit" className="btn-primary w-full">{buttonText}</button>
                  {footer && <div className="flex items-center justify-center">{footer}</div>}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CreateActivitiesForm;