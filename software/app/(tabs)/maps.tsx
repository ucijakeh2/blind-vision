import 'react-native-get-random-values';
import { StyleSheet, View, Dimensions, TouchableOpacity, Text, Platform } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
import React, { useEffect, useRef, useState } from 'react';
import { AccessibilityInfo } from 'react-native';
import * as Location from 'expo-location';
import * as Speech from 'expo-speech';

type RegionType = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

type LocationCoords = {
  latitude: number;
  longitude: number;
  altitude: number | null;
  accuracy: number | null;
  altitudeAccuracy: number | null;
  heading: number | null;
  speed: number | null;
};

export default function Maps() {
  const [region, setRegion] = useState<RegionType | null>(null);
  const [location, setLocation] = useState<LocationCoords | null>(null);
  const [destination, setDestination] = useState<{ latitude: number; longitude: number } | null>(null);
  const [overviewCoordinates, setOverviewCoordinates] = useState<{ latitude: number; longitude: number }[]>([]);
  const mapRef = useRef<MapView>(null);

  const checkAccessibility = (speechCallback: () => void) => {
    AccessibilityInfo.isScreenReaderEnabled().then((enabled) => { 
      if(enabled) { speechCallback(); } 
    });
  }

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }
      const loc = await Location.getCurrentPositionAsync({});
      const newRegion = {
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      setLocation(loc.coords);
      setRegion(newRegion);
      checkAccessibility(() => Speech.speak("Location updated."));
    })();
  }, []);

  
  const recenterMap = () => {
    if (mapRef.current && region) {
      mapRef.current.animateToRegion(region, 1000);
      checkAccessibility(() => Speech.speak("Recentered on your current location."));
    }
  };

  
  function decodePolyline(str: string, precision: number = 5): { latitude: number; longitude: number }[] {
    let index = 0, lat = 0, lng = 0;
    const coordinates: { latitude: number; longitude: number }[] = [];
    const factor = Math.pow(10, precision);

    while (index < str.length) {
      let b, shift = 0, result = 0;
      do {
        b = str.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const deltaLat = (result & 1) ? ~(result >> 1) : (result >> 1);
      lat += deltaLat;

      shift = 0;
      result = 0;
      do {
        b = str.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const deltaLng = (result & 1) ? ~(result >> 1) : (result >> 1);
      lng += deltaLng;

      coordinates.push({ latitude: lat / factor, longitude: lng / factor });
    }
    return coordinates;
  }

  
  const fetchDirections = async (
    origin: { latitude: number; longitude: number },
    dest: { latitude: number; longitude: number }
  ) => {
    const apiKey = 'AIzaSyAnPlxOPLt5E2JYZVcT83gD3IQ7yuJGaOM'; 
    const url = 'https://routes.googleapis.com/directions/v2:computeRoutes';
    
    const requestBody = {
      origin: {
        location: { latLng: { latitude: origin.latitude, longitude: origin.longitude } },
      },
      destination: {
        location: { latLng: { latitude: dest.latitude, longitude: dest.longitude } },
      },
      travelMode: 'DRIVE'
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': apiKey,
          'X-Goog-FieldMask': 'routes.distanceMeters,routes.duration,routes.polyline.encodedPolyline'
        },
        body: JSON.stringify(requestBody),
      });
      const data = await response.json();
      console.log("Routes API full response:", JSON.stringify(data, null, 2));
      
      if (data.routes && data.routes.length > 0) {
        const route = data.routes[0];
        if (route.polyline && route.polyline.encodedPolyline) {
          const decoded = decodePolyline(route.polyline.encodedPolyline);
          setOverviewCoordinates(decoded);
          checkAccessibility(() => Speech.speak("Destination set. Start moving to receive instructions for navigation."));
        } else {
          checkAccessibility(() => Speech.speak("No route polyline found."));
        }
      } else {
        checkAccessibility(() => Speech.speak("No route found."));
      }
    } catch (error) {
      console.error("Error fetching directions:", error);
      checkAccessibility(() => Speech.speak("Error fetching directions."));
    }
  };

  const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const toRad = (x: number) => (x * Math.PI) / 180;
    const R = 6378137;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  useEffect(() => {
    let subscription: Location.LocationSubscription;
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;
      subscription = await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, timeInterval: 5000, distanceInterval: 5 },
        (loc) => {
          const newRegion = {
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          };
          setLocation(loc.coords);
          setRegion(newRegion);
        }
      );
    })();
    return () => {
      if (subscription) subscription.remove();
    };
  }, []);


  if (!region) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading current location...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Destination Search Bar */}
      <GooglePlacesAutocomplete
        placeholder="Search for a destination"
        onPress={(data, details = null) => {
          console.log("Selected:", data, details);
          if (details?.geometry?.location) {
            const dest = {
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
            };
            setDestination(dest);
            if (location) {
              fetchDirections(location, dest);
            }
          }
        }}
        onFail={(error) => console.log("Places error:", error)}
        query={{
          key: 'AIzaSyAnPlxOPLt5E2JYZVcT83gD3IQ7yuJGaOM',
          language: 'en',
        }}
        fetchDetails={true}
        minLength={2}
        debounce={400}
        enablePoweredByContainer={false}
        styles={autoCompleteStyles}
      />

      {/* Map Display */}
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
        region={region}
        showsUserLocation
      >
        {location && (
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="Your Location"
          />
        )}
        {destination && (
          <Marker
            coordinate={destination}
            title="Destination"
            pinColor="green"
          />
        )}
        {overviewCoordinates.length > 0 && (
          <Polyline
            coordinates={overviewCoordinates}
            strokeColor="#0059FF"
            strokeWidth={4}
          />
        )}
      </MapView>

      {/* Recenter Button */}
      <TouchableOpacity style={styles.recenterButton} onPress={recenterMap}>
        <Text style={styles.recenterButtonText}>Recenter</Text>
      </TouchableOpacity>
    </View>
  );
}

const autoCompleteStyles = {
  container: {
    position: 'absolute',
    top: 50,
    left: 10,
    right: 10,
    zIndex: 1000,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 8,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  textInputContainer: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  textInput: {
    height: 44,
    color: '#5d5d5d',
    fontSize: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  listView: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginTop: 5,
  },
  row: {
    backgroundColor: '#fff',
    padding: 13,
    flexDirection: 'row',
  },
  separator: {
    height: 0.5,
    backgroundColor: '#c8c7cc',
  },
  description: {
    fontSize: 14,
    color: '#444',
  },
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  recenterButton: {
    position: 'absolute',
    bottom: 40,
    right: 20,
    backgroundColor: '#0059FF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  recenterButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
