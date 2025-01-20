import React, { useState, useEffect } from 'react';
import activityTypes from '../../utils/activityTypes';
import useActivityForm from '../../hooks/useActivityForm';
import SearchBox from '../Shared/SearchBox';

const ActivitiesForm = ({ formData: initialData, onSubmit, title, buttonText, footer }) => {

  const initialFormData = {
    name: initialData?.name || '',
    vicinity: initialData?.vicinity || '',
    phone: initialData?.phone || '',
    city: initialData?.city || '',
    email: initialData?.email || '',
    postcode: initialData?.postcode || '',
    website: initialData?.website || '',
    opening_hours: initialData?.opening_hours || '',
    type: initialData?.type || '',
    description: initialData?.description || '',
    latitude: initialData?.latitude || '',
    longitude: initialData?.longitude || '',
    logo: initialData?.logo || null,
    facilities_image: initialData?.facilities_image || null,
  };

  const { formData, setFormData, handleChange, handleAddressFieldChange, handleSubmit, handleImageChange, logoPreview, setLogoPreview, facilitiesImagePreview, setFacilitiesImagePreview } = useActivityForm(
    initialFormData,
    onSubmit
  );

   
  const setCoordinates = (coordinates, addressFields) => {
    // console.log("Coordinates received:", coordinates);
    // console.log("Address fields:", addressFields);
    
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

  // ** come back here for edit
  useEffect(() => {
    if (initialData?.logo) {
        setLogoPreview(`/images/logos/${initialData.logo.split('/').pop()}`);
    }
    if (initialData?.facilities_image) {
        setFacilitiesImagePreview(`/images/facilities/${initialData.facilities_image.split('/').pop()}`);
    }
 }, [initialData]);


  useEffect(() => {
    console.log("Initial form data:", initialData);
  }, [initialData]);

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
                    <label className="form-label" htmlFor="name">Activity/Organisation Name</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="form-input"
                      placeholder="Activity or Organisation Name"
                      value={formData.name || ""}
                      onChange={handleChange}
                      required
                      autoComplete="organisation"
                    />
                  </div>

                  {/* Address Search Box */}
                  <div className="col-span-2">
                    <label className="form-label" htmlFor="vicinity">Find your Address</label>
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
                      autoComplete="street-address"
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
                      autoComplete="tel"
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
                      autoComplete="off"
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
                      autoComplete="off"
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
                      autoComplete="postal-code"
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
                      autoComplete="off"
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
                      autoComplete="opening_hours"
                    />
                  </div>

                  <div className="col-span-1">
                    <label className="form-label" htmlFor="type">Activity Type</label>
                     <select
                      id="type"
                      name="type"
                      className="form-input"
                      onChange={handleChange}
                      value={formData.type || ""}
                      required
                    >
                      <option value="">Select a type</option>
                      {activityTypes.map((type, index) => (
                        <option key={index} value={type.label}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-span-2">
                    <label className="form-label" htmlFor="description">Description/Facilities List</label>
                    <input
                      type="text"
                      name="description"
                      id="description"
                      className="form-input"
                      placeholder="Description or Facilities"
                      value={formData.description || ""}
                      onChange={handleChange}
                      required
                      autoComplete="description"
                    />
                  </div>

                  <div className="col-span-1">
                    <label className="form-label" htmlFor="logo">Activity/Organisation Logo</label>
                    <input
                      type="file"
                      name="logo"
                      id="logo"
                      accept="image/*"
                      className="form-input"
                      onChange={handleImageChange}
                    />
                    {logoPreview && (
                    <div>
                      <img
                        src={logoPreview}
                        width={400}
                        height={400}
                        alt="Selected Logo Preview" 
                        className="max-h-[400px] object-contain"
                      />
                      <button onClick={() => {
                          setLogoPreview(null);
                          setFormData((prev) => ({ ...prev, logo: null }));
                      }}>
                        Remove
                      </button>
                    </div>
                      )
                    }
                  </div>

                  <div className="col-span-1">
                    <label className="form-label" htmlFor="facilities_image">Facilities Image</label>
                    <input
                      type="file"
                      name="facilities_image"
                      id="facilities_image"
                      accept="image/*"
                      className="form-input"
                      onChange={handleImageChange}
                    />
                    {facilitiesImagePreview && (
                    <div>
                      <img
                        src={facilitiesImagePreview}
                        width={400}
                        height={400}
                        alt="Selected Facilities Preview"
                        className="max-h-[400px] object-contain"
                      />
                      <button onClick={() => {
                          setLogoPreview(null);
                          setFormData((prev) => ({ ...prev, logo: null }));
                      }}>
                        Remove
                      </button>
                    </div>
                      )
                    }
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
                    onChange={handleChange}
                    required
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
                    onChange={handleChange}
                    required
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

export default ActivitiesForm;