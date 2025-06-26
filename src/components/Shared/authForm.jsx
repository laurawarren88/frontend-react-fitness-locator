import PropTypes from 'prop-types';

const AuthForm = ({ fields, onSubmit, title, buttonText, footer }) => {
    return (
        <section className="bg-softWhite">
            <div className="flex flex-col items-center justify-center mx-auto md:h-screen lg:py-0">
                <div className="form-container">
                    <div className="form-layout">
                        <h1 className="form-title">{title}</h1>
                        <form onSubmit={onSubmit} className="space-y-4 md:space-y-6">
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
                            {footer && <div className="flex items-center justify-between">{footer}</div>}
                            <button type="submit" className="btn-primary w-full">{buttonText}</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AuthForm;

AuthForm.propTypes = {
    fields: PropTypes.arrayOf(
        PropTypes.shape({   
            label: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
            placeholder: PropTypes.string.isRequired,
        })
    ).isRequired,
    title: PropTypes.string.isRequired,
    buttonText: PropTypes.string.isRequired,
    footer: PropTypes.node,
    onSubmit: PropTypes.func.isRequired,
    };
