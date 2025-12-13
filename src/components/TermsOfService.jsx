import React from "react";

const TermsOfService = () => {
    return (
        <>
            <title>Terms of Service - url-shrink-it</title>


            <meta name="description"
                  content="Our official Terms of Service. By using urlShrinkit, you agree to these terms."/>


            <link rel="canonical" href="https://urlshrinkit.store/terms"/>
            <div className="bg-[#0d0d10] min-h-screen pt-24 pb-12 px-6 sm:px-12 text-gray-300">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-extrabold text-white mb-6">
                        Terms of Service
                    </h1>

                    <p className="mb-4 text-gray-400">
                        Last updated: {new Date().toLocaleDateString()}
                    </p>

                    <section className="space-y-4">
                        <p>
                            By accessing or using <span className="text-white font-semibold">Shrink-it</span>,
                            you agree to be bound by these Terms of Service.
                        </p>

                        <h2 className="text-xl font-bold text-white mt-6">
                            Use of Service
                        </h2>
                        <p>
                            You agree not to misuse the service or attempt to access it
                            using unauthorized methods.
                        </p>

                        <h2 className="text-xl font-bold text-white mt-6">
                            Accounts
                        </h2>
                        <p>
                            You are responsible for maintaining the confidentiality
                            of your account and password.
                        </p>

                        <h2 className="text-xl font-bold text-white mt-6">
                            Termination
                        </h2>
                        <p>
                            We reserve the right to suspend or terminate accounts
                            that violate our policies.
                        </p>

                        <h2 className="text-xl font-bold text-white mt-6">
                            Limitation of Liability
                        </h2>
                        <p>
                            Shrink-it is provided “as is” without warranties of any kind.
                            We are not liable for damages arising from use of the service.
                        </p>
                    </section>
                </div>
            </div>
        </>
    );
};

export default TermsOfService;
