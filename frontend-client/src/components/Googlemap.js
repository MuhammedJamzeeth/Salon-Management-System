import React from 'react';

const GoogleMap = () => {
    return (
        <div className="map-container">
            <h2 style={{ textAlign: 'center' }}>Find us on the map:</h2>
            <iframe
                title="Google Maps"
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d495.0839827900033!2d79.87030035234005!3d6.929768107792064!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNsKwNTUnNDcuMiJOIDc5wrA1MicxNC4yIkU!5e0!3m2!1sen!2slk!4v1720526920805!5m2!1sen!2slk"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <style>{`
                .map-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    max-width: 100%;
                    margin: 5px auto;
                }
            `}</style>
        </div>
    );
}

export default GoogleMap;
