// This is the main js that will hold D3 code
// starting with geospatial viz

d3.json('/data/states-asthma-all.json')
    .then(data => {
        states = data.features
        console.log(states);

        let states_data = d3.group(states, d => {
            return d.properties.STATEFP
        })

        countExtent = d3.extent(states, d => {
            return +d.properties.count
        });
        // color scale
        let colorScale = d3.scaleLog()
            .domain(countExtent)
            .range(['#E6FAFA', "#00939C"])
            .interpolate(d3.interpolateCubehelix.gamma(1));

        // getting the color using the state id
        function Color(code) {
            count_temp = states_data.get(code)[0].properties.count
            if (count_temp != 'N/A') {
                return colorScale(parseFloat(states_data.get(code)[0].properties.count));
            } else {
                return 'white'
            }
        }

        const {
            DeckGL,
            GeoJsonLayer
        } = deck;

        const geoJsonLayer = new GeoJsonLayer({
            data: states,
            stroked: true,
            filled: true,
            lineWidthMinPixels: 0.5,
            getLineColor: [0, 0, 0],
            getFillColor: d => {
                try {
                    c = d3.rgb(Color(d.properties.STATEFP));
                    return [c['r'], c['g'], c['b']];
                } catch (error) {
                    console.log('not found')
                }
            },
            opacity: 0.4,
            pickable: true,
        })

        new DeckGL({
            container: "container",
            mapStyle: "mapbox://styles/pc365/ckvdkaag532lo14pb5rdf06ok",
            mapboxApiAccessToken: token,
            initialViewState: {
                longitude: -105.334961,
                latitude: 40.239551,
                zoom: 3.2,
                maxZoom: 16
            },
            controller: true,
            layers: [geoJsonLayer],
            // defining the basic level tooltip
            getTooltip: ({
                object
            }) => object && {
                html: `<div>${object.properties.NAME}</div><div>${((object.properties.count)*100).toFixed(2)}%</div>`,
                style: {
                    backgroundColor: 'azure'
                }
            }
        })
    })