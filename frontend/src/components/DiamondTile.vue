<template>
    <!-- Created with Inkscape (http://www.inkscape.org/) -->
    <svg :width="this.width" :height="this.height" version="1.1" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
    <metadata>
    <rdf:RDF>
    <cc:Work rdf:about="">
        <dc:format>image/svg+xml</dc:format>
        <dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage"/>
        <dc:title/>
    </cc:Work>
    </rdf:RDF>
    </metadata>
    <g transform="translate(0 -922.52)">
    <rect y="922.52" width="200" height="200" rx="10" ry="10"/>
    <rect transform="rotate(-45)" x="-708.89" y="737.17" width="113.14" height="113.14" :fill="this.fillColor"/>
    </g>
    </svg>
</template>

<script>
export default {
    name: "DiamondTile",
    props: {
        fillColor: {
            type: String,
            default: "#fff"
        },
        height: {
            type: Number,
            default: 200
        },
        width: {
            type: Number,
            default: 200
        }
    }
}
</script>
