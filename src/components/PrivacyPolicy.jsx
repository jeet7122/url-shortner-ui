import React from "react";

const PrivacyPolicy = () => {
    return (
        <>
            <title>Privacy Policy - url-shrink-it</title>


            <meta name="description"
                  content="Read our detailed Privacy Policy regarding data collection, usage, and protection when you use the urlShrinkit service."/>


            <link rel="canonical" href="https://urlshrinkit.store/privacy"/>
            <div className="bg-[#0d0d10] min-h-screen pt-24 pb-12 px-6 sm:px-12 text-gray-300">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-extrabold text-white mb-6">
                        Privacy Policy
                    </h1>

                    <p className="mb-4 text-gray-400">
                        Last updated: {new Date().toLocaleDateString()}
                    </p>

                    <section className="space-y-4">
                        <p>
                            At <span className="text-white font-semibold">Shrink-it</span>,
                            we respect your privacy and are committed to protecting your personal information.
                        </p>

                        <h2 className="text-xl font-bold text-white mt-6">
                            Information We Collect
                        </h2>
                        <p>
                            We collect information you provide directly to us, such as
                            username, email address, and password during registration.
                        </p>

                        <h2 className="text-xl font-bold text-white mt-6">
                            How We Use Your Information
                        </h2>
                        <ul className="list-disc list-inside space-y-2">
                            <li>To provide and maintain our services</li>
                            <li>To authenticate users</li>
                            <li>To improve application performance</li>
                            <li>To communicate important updates</li>
                        </ul>

                        <h2 className="text-xl font-bold text-white mt-6">
                            Data Security
                        </h2>
                        <p>
                            We use industry-standard security measures to protect your data.
                            Passwords are encrypted and never stored in plain text.
                        </p>

                        <h2 className="text-xl font-bold text-white mt-6">
                            Contact Us
                        </h2>
                        <p>
                            If you have questions about this Privacy Policy, contact us at:
                            <br/>
                            <span className="text-neon">urlshrinkit@gmail.com</span>
                        </p>
                    </section>
                </div>
            </div>
        </>
    );
};

export default PrivacyPolicy;
