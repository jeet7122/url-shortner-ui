import React from "react";

const ContactUs = () => {
    return (
        <>
            <title>Contact Us - Get in Touch with url-shrink-it</title>


            <meta name="description"
                  content="Have questions or need support? Contact the urlShrinkit team for assistance with your account, links, or technical issues."/>


            <link rel="canonical" href="https://urlshrinkit.store/contact"/>
            <div className="bg-[#0d0d10] min-h-screen pt-24 pb-12 px-6 sm:px-12 text-gray-300">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-3xl font-extrabold text-white mb-6">
                        Contact Us
                    </h1>

                    <p className="text-gray-400 mb-8">
                        Have questions or feedback? We’d love to hear from you.
                    </p>

                    <div className="space-y-6 glass p-6 rounded-xl border border-gray-800">
                        <div>
                            <h3 className="text-lg font-bold text-white">
                                Email
                            </h3>
                            <a href="mailto:urlshrinkit@gmail.com" className="text-neon">urlshrinkit@gmail.com</a>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-white">
                                Support Hours
                            </h3>
                            <p>Monday – Friday, 9:00 AM – 6:00 PM</p>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-white">
                                Location
                            </h3>
                            <p>Online Service • Global</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ContactUs;
