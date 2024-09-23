const Maps = () => {
    return (

        <div className="mapaCont">
            <div><p>NUESTRA UBICACIÓN</p></div>
            <iframe
                src="https://maps.google.com/maps?q=FWD%20cos&amp;t=&amp;z=16&amp;ie=UTF8&amp;iwloc=&amp;output=embed" 
                width="150"
                height="100"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"

            ></iframe>
        </div>
    )
}
export default Maps