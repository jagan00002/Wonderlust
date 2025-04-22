// og
    //     mapboxgl.accessToken = mapToken;
    //     const map = new mapboxgl.Map({
    //         container: 'map', // container ID
    //         center: [76.921440, 15.139393], // starting position [lng, lat]. Note that lat must be set between -90 and 90
    //         zoom: 9 // starting zoom
    //     });
    

    //     console.log(coordinates)

    //     // Create a default Marker and add it to the map.
    // const marker = new mapboxgl.Marker()
    // .setLngLat([coordinates]) // starting position [lng, lat] from Listing.geometry.coordinates
    // .addTo(map);


    mapboxgl.accessToken = mapToken;
    const map = new mapboxgl.Map({
    container: 'map',
    center: listing.geometry.coordinates, // Optional: you can center on the marker
    zoom: 9
});

console.log("Coordinates:", listing.geometry.coordinates);

const marker = new mapboxgl.Marker({color:"red",rotation: 0})
    .setLngLat(listing.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 }) // add popups
            .setHTML(
                // `<h4>${listing.title}</h4><p>${listing.location}</p><p>Exact location is provided after booking</p>` // Optional: you can add more details to the popup
                `<h4>${listing.title},</h4><h5>${listing.location}</h5><p>Exact location is provided after booking</p>` // Optional: you can add more details to the popup
            )
    )
    .addTo(map);



    // mapboxgl.accessToken = mapToken;

    // const map = new mapboxgl.Map({
    //     container: 'map',
    //     center: listing.geometry.coordinates,
    //     zoom: 9
    // });

    // console.log("Coordinates:", listing.geometry.coordinates);

    // new mapboxgl.Marker({ color: "red", rotation: 0 })
    //     .setLngLat(listing.geometry.coordinates)
    //     .setPopup(
    //         new mapboxgl.Popup({ offset: 25 }).setHTML(
    //             `<h4>${listing.location}</h4><p>Exact location is provided after booking</p>`
    //         )
    //     )
    //     .addTo(map);


