import { useState } from "react";


const Contact = () => {


    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [submitted, setSubmitted] = useState(false);


    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        setSubmitted(true);

        setFormData({
            name: '',
            email: '',
            message: ''
        });

        setTimeout(() => setSubmitted(false), 5000);
    }





    return (
        <div className="container mt-4">
            <h1>Contact Us</h1>
            <p className="lead">Have questions or feedback? We'd love to hear from you!</p>

            {submitted && (
                <div className="alert alert-success mb-4">
                    Thank you for your message! We'll get back to you soon.
                </div>
            )}


            <form onSubmit={handleSubmit}>

                <div className="mb-3">
                    <label className="form-label" htmlFor="name">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label" htmlFor="email">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label" htmlFor="">Message</label>

                    <textarea
                        className="form-control"
                        id="message"
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        required
                    > </textarea>

                </div>

                <button type="submit" className="btn btn-success">Submit</button>

            </form>

        </div>
    )


}

export default Contact;