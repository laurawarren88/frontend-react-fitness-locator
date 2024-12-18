import React from 'react';

const Form = ({ fields, onSubmit, title, buttonText, footer }) => {
    return (
        <section className="bg-white py-36">
            <div className="flex flex-col items-center justify-center mx-auto md:h-screen lg:py-0">
                <div className="form-container">
                    <div className="form-layout">
                        <h1 className="form-title">{title}</h1>
                        <form onSubmit={onSubmit} className="space-y-6">
                            {fields.map(({ label, name, type, placeholder }) => (
                                <div key={name}>
                                    <label className="form-label" htmlFor={name}>{label}</label>
                                    <input
                                        type={type}
                                        name={name}
                                        id={name}
                                        className="form-input"
                                        placeholder={placeholder}
                                        required
                                    />
                                </div>
                            ))}
                            <button type="submit" className="btn-primary w-full">{buttonText}</button>
                            {footer && <div className="flex items-center justify-between">{footer}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Form;