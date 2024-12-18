import React from 'react';

const CreateActivitiesForm = ({ onSubmit, title, buttonText, footer, onChange, formData }) => {
    return (
    <>
        <section className="bg-white py-12">
        <div className="flex flex-col items-center justify-center mx-auto">
          <div className="form-container w-full max-w-3xl">
            <div className="form-layout p-8 space-y-6">
              <h1 className="form-title text-3xl font-oswald font-bold text-darkGray text-center">
                {title}
              </h1>
              <form onSubmit={onSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="col-span-1">
                    <label className="form-label" htmlFor="business_name">Business Name</label>
                    <input
                      type="text"
                      name="business_name"
                      id="business_name"
                      className="form-input"
                      placeholder="Business Name"
                      value={formData.business_name || ""}
                      onChange={onChange}
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
                      onChange={onChange}
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
                      onChange={onChange}
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
                      onChange={onChange}
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="form-label" htmlFor="address">Address</label>
                    <input
                      type="text"
                      name="address"
                      id="address"
                      className="form-input"
                      placeholder="Address"
                      value={formData.address || ""}
                      onChange={onChange}
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
                      onChange={onChange}
                      required
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
                      onChange={onChange}
                      required
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
                      onChange={onChange}
                    />
                  </div>

                  <div className="col-span-1">
                    <label className="form-label" htmlFor="activities">Activities</label>
                    <input
                      type="text"
                      name="activities"
                      id="activities"
                      className="form-input"
                      placeholder="Activities"
                      value={formData.activities || ""}
                      onChange={onChange}
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="form-label" htmlFor="facilities">Facilities</label>
                    <input
                      type="text"
                      name="facilities"
                      id="facilities"
                      className="form-input"
                      placeholder="Facilities"
                      value={formData.facilities || ""}
                      onChange={onChange}
                    />
                  </div>

                  <div className="col-span-1">
                    <label className="form-label" htmlFor="logo">Activity Logo</label>
                    <input
                      type="file"
                      name="logo"
                      id="logo"
                      className="form-input"
                      onChange={onChange}
                    />
                  </div>

                  <div className="col-span-1">
                    <label className="form-label" htmlFor="facilities_image">Facilities Image</label>
                    <input
                      type="file"
                      name="facilities_image"
                      id="facilities_image"
                      className="form-input"
                      onChange={onChange}
                    />
                  </div>
                </div>

                <div className="flex justify-between">
                  <button type="submit" className="btn-primary w-1/2">{buttonText}</button>
                  {footer && <div className="flex items-center justify-between">{footer}</div>}
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