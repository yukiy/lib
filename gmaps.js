var london_latlng = new google.maps.LatLng(51.500152,-0.126236);

function setTestMap(){
	mainMap = createMap(london_latlng, 16);
	var mainMarker = createMarker(mainMap, london_latlng, "London", iconImg);
	var infoStr = '<iframe width="280" height="172" src="http://www.youtube.com/embed/i7mgO4arDWU" frameborder="0" allowfullscreen></iframe>';
	createInfoWindow(mainMap, mainMarker, infoStr);
}


//map/////////////////////////////////////////////////////////////////////////////
function createMap(latlng, zoom, type) {
	if(type == "ROAD") var mapType = google.maps.MapTypeId.ROADMAP;
	else if (type == "SATELLITE") var mapType = google.maps.MapTypeId.SATELLITE;
	else var mapType = google.maps.MapTypeId.ROADMAP;
	
	var myOptions = {
		zoom: zoom,
		center: latlng,
		mapTypeId: mapType
	};
	
	map = new google.maps.Map(document.getElementById("map_canvas"),myOptions);
	return map;
}

function moveMapCenter(lat, lng){
	var centreLatlng = new google.maps.LatLng(lat, lng);
	mainMap.panTo(centreLatlng);
}



//marker and info window/////////////////////////////////////////////////////////////////////////////
function createMarker(map, latlng, title, iconImg){
	var marker = new google.maps.Marker({
		position: latlng,
		map: map,
		title: title,
		icon: iconImg
	});
	return marker;
}


function createInfoWindow(map, marker, content){
	var infowindow = new google.maps.InfoWindow({
		content: content,
		maxWidth: 400,
	});
	google.maps.event.addListener(marker, 'click', function() {
		infowindow.open(map,marker);
	});
	return infowindow;
}

function openInfoWindow(map,marker){
	marker.infoWindow.open(map,marker);
}

function closeInfoWindow(map,marker){
	marker.infoWindow.close(map,marker);
}




//geo locations/////////////////////////////////////////////////////////////////////////////
function getGeocodeObjects(address) {
	geocoder.geocode( { 'address': address}, function(results, status) {
	  if (status == google.maps.GeocoderStatus.OK) {
		return results;
	  } else {
		alert("Geocode was not successful for the following reason: " + status);
	  }
	});
}

function getLatLngFromAddress(address) {
	geocoder.geocode( { 'address': address}, function(results, status) {
	  if (status == google.maps.GeocoderStatus.OK) {
		var latlng = results[0].geometry.location;
		return latlng;
	  } else {
		alert("Geocode was not successful for the following reason: " + status);
	  }
	});
}


function getGeoDistance(lat1, lng1, lat2, lng2, precision) {
    // precision は小数点以下の桁数（距離の精度）
    var distance = 0;
    if ((Math.abs(lat1 - lat2) < 0.00001) && (Math.abs(lng1 - lng2) < 0.00001)) {
        distance = 0;
    } else {
        lat1 = lat1 * Math.PI / 180;
        lng1 = lng1 * Math.PI / 180;
        lat2 = lat2 * Math.PI / 180;
        lng2 = lng2 * Math.PI / 180;
        
        var A = 6378140; //　earth equatorial raduis
        var B = 6356755; //　earth pole raduis
        var F = (A - B) / A;
        
        var P1 = Math.atan((B / A) * Math.tan(lat1));
        var P2 = Math.atan((B / A) * Math.tan(lat2));
        
        var X = Math.acos(Math.sin(P1) * Math.sin(P2) + Math.cos(P1) * Math.cos(P2) * Math.cos(lng1 - lng2));
        var L = (F / 8) * ((Math.sin(X) - X) * Math.pow((Math.sin(P1) + Math.sin(P2)), 2) / Math.pow(Math.cos(X / 2), 2) - (Math.sin(X) - X) * Math.pow(Math.sin(P1) - Math.sin(P2), 2) / Math.pow(Math.sin(X), 2));
        
        distance = A * (X + L);
        var decimal_no = Math.pow(10, precision);
        distance = Math.round(decimal_no * distance / 1) / decimal_no; //unit: metre
    }
    return distance;
}


