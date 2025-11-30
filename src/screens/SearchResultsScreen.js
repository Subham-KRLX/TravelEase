import { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

export default function SearchResultsScreen() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const route = useRoute();
  const { addToCart } = useCart();
  const { theme } = useTheme();

  const searchType = route.params?.type || 'flights';

  useEffect(() => {
    setTimeout(() => {
      setResults(generateMockResults(searchType));
      setLoading(false);
    }, 1500);
  }, [searchType]);

  const generateMockResults = (type) => {
    if (type === 'flights') {
      return [
        {
          id: 1,
          type: 'flight',
          airline: 'IndiGo',
          from: 'Mumbai (BOM)',
          to: 'Delhi (DEL)',
          departTime: '14:30',
          arriveTime: '16:45',
          duration: '2h 15m',
          price: 8999,
          stops: 'Non-stop',
        },
        {
          id: 2,
          type: 'flight',
          airline: 'SpiceJet',
          from: 'Mumbai (BOM)',
          to: 'Delhi (DEL)',
          departTime: '09:15',
          arriveTime: '11:30',
          duration: '2h 15m',
          price: 7549,
          stops: 'Non-stop',
        },
        {
          id: 3,
          type: 'flight',
          airline: 'Air India',
          from: 'Bangalore (BLR)',
          to: 'Chennai (MAA)',
          departTime: '22:10',
          arriveTime: '23:25',
          duration: '1h 15m',
          price: 6849,
          stops: 'Non-stop',
        },
        {
          id: 4,
          type: 'flight',
          airline: 'Vistara',
          from: 'Delhi (DEL)',
          to: 'Goa (GOI)',
          departTime: '16:20',
          arriveTime: '19:10',
          duration: '2h 50m',
          price: 12999,
          stops: 'Non-stop',
        }
      ];
    } else if (type === 'hotels') {
      return [
        {
          id: 4,
          type: 'hotel',
          name: 'The Taj Mahal Palace',
          location: 'Mumbai, India',
          rating: 4.8,
          reviews: 1245,
          price: 15999,
          image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800',
          description: 'Luxury heritage hotel in the heart of Mumbai'
        },
        {
          id: 5,
          type: 'hotel',
          name: 'ITC Grand Central',
          location: 'Mumbai, India',
          rating: 4.2,
          reviews: 892,
          price: 8999,
          image: 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=800',
          description: 'Comfortable business hotel with excellent service'
        },
        {
          id: 6,
          type: 'hotel',
          name: 'The Oberoi Mumbai',
          location: 'Mumbai, India',
          rating: 4.6,
          reviews: 567,
          price: 24999,
          image: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800',
          description: 'Elegant luxury hotel with personalized service'
        }
      ];
    } else if (type === 'packages') {
      return [
        {
          id: 7,
          type: 'package',
          name: 'Goa Beach Paradise',
          destination: 'Goa, India',
          duration: '5 Days, 4 Nights',
          includes: ['Flight', 'Hotel', 'Breakfast', 'Beach Activities'],
          price: 24999,
          image: 'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=800',
          description: 'Complete beach vacation with water sports',
          rating: 4.7
        },
        {
          id: 8,
          type: 'package',
          name: 'Kerala Backwater Retreat',
          destination: 'Kerala, India',
          duration: '6 Days, 5 Nights',
          includes: ['Flight', 'Houseboat', 'All Meals', 'Sightseeing'],
          price: 32999,
          image: 'https://images.pexels.com/photos/2476632/pexels-photo-2476632.jpeg?auto=compress&cs=tinysrgb&w=800',
          description: 'Serene backwater experience with houseboats',
          rating: 4.9
        },
        {
          id: 9,
          type: 'package',
          name: 'Rajasthan Heritage Tour',
          destination: 'Rajasthan, India',
          duration: '7 Days, 6 Nights',
          includes: ['Flight', 'Hotel', 'Breakfast', 'Palace Tours', 'Desert Safari'],
          price: 38999,
          image: 'https://images.pexels.com/photos/3581368/pexels-photo-3581368.jpeg?auto=compress&cs=tinysrgb&w=800',
          description: 'Explore royal palaces and desert landscapes',
          rating: 4.8
        },
        {
          id: 10,
          type: 'package',
          name: 'Himalayan Adventure',
          destination: 'Himachal Pradesh, India',
          duration: '4 Days, 3 Nights',
          includes: ['Flight', 'Hotel', 'Meals', 'Trekking Guide'],
          price: 19999,
          image: 'https://images.pexels.com/photos/1670770/pexels-photo-1670770.jpeg?auto=compress&cs=tinysrgb&w=800',
          description: 'Mountain trekking and valley exploration',
          rating: 4.6
        }
      ];
    }
    return [];
  };

  const handleAddToCart = (item) => {
    addToCart(item);
  };

  const renderFlightCard = (flight) => (
    <TouchableOpacity
      key={flight.id}
      style={[styles.card, {
        backgroundColor: theme.card,
        shadowColor: theme.cardShadow,
        borderColor: theme.border,
        borderWidth: 1,
      }]}
      onPress={() => navigation.navigate('FlightDetails', { id: flight.id })}
    >
      <View style={styles.cardHeader}>
        <Text style={[styles.airline, { color: theme.text }]}>{flight.airline}</Text>
        <Text style={[styles.price, { color: theme.primary }]}>₹{flight.price.toLocaleString()}</Text>
      </View>

      <View style={styles.flightInfo}>
        <View style={styles.flightRoute}>
          <View>
            <Text style={[styles.time, { color: theme.text }]}>{flight.departTime}</Text>
            <Text style={[styles.location, { color: theme.textSecondary }]}>{flight.from}</Text>
          </View>

          <View style={styles.flightDuration}>
            <Text style={[styles.duration, { color: theme.textSecondary }]}>{flight.duration}</Text>
            <View style={styles.flightLine}>
              <View style={[styles.line, { backgroundColor: theme.border }]} />
              <Ionicons name="airplane" size={16} color={theme.textSecondary} />
              <View style={[styles.line, { backgroundColor: theme.border }]} />
            </View>
            <Text style={[styles.stops, { color: theme.success }]}>{flight.stops}</Text>
          </View>

          <View>
            <Text style={[styles.time, { color: theme.text }]}>{flight.arriveTime}</Text>
            <Text style={[styles.location, { color: theme.textSecondary }]}>{flight.to}</Text>
          </View>
        </View>
      </View>

      <View style={styles.cardActions}>
        <TouchableOpacity
          style={[styles.addButton, { borderColor: theme.primary }]}
          onPress={() => handleAddToCart(flight)}
        >
          <Ionicons name="add-circle" size={20} color={theme.primary} />
          <Text style={[styles.addButtonText, { color: theme.primary }]}>Add to Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.detailsButton, { backgroundColor: theme.primary }]}>
          <Text style={styles.detailsButtonText}>View Details</Text>
          <Ionicons name="arrow-forward" size={16} color="#fff" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderHotelCard = (hotel) => (
    <TouchableOpacity
      key={hotel.id}
      style={[styles.card, {
        backgroundColor: theme.card,
        shadowColor: theme.cardShadow,
        borderColor: theme.border,
        borderWidth: 1,
      }]}
      onPress={() => navigation.navigate('HotelDetails', { id: hotel.id })}
    >
      <Image source={{ uri: hotel.image }} style={styles.hotelImage} />

      <View style={styles.hotelContent}>
        <View style={styles.cardHeader}>
          <Text style={[styles.hotelName, { color: theme.text }]}>{hotel.name}</Text>
          <Text style={[styles.price, { color: theme.primary }]}>₹{hotel.price.toLocaleString()}</Text>
        </View>

        <View style={styles.hotelLocation}>
          <Ionicons name="location" size={14} color={theme.textSecondary} />
          <Text style={[styles.locationText, { color: theme.textSecondary }]}>{hotel.location}</Text>
        </View>

        <View style={styles.hotelRating}>
          <View style={styles.rating}>
            <Ionicons name="star" size={16} color={theme.gold} />
            <Text style={[styles.ratingText, { color: theme.text }]}>{hotel.rating}</Text>
          </View>
          <Text style={[styles.reviews, { color: theme.textSecondary }]}>({hotel.reviews} reviews)</Text>
        </View>

        <Text style={[styles.description, { color: theme.textSecondary }]}>{hotel.description}</Text>

        <View style={styles.cardActions}>
          <TouchableOpacity
            style={[styles.addButton, { borderColor: theme.primary }]}
            onPress={() => handleAddToCart(hotel)}
          >
            <Ionicons name="add-circle" size={20} color={theme.primary} />
            <Text style={[styles.addButtonText, { color: theme.primary }]}>Add to Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.detailsButton, { backgroundColor: theme.primary }]}>
            <Text style={styles.detailsButtonText}>View Details</Text>
            <Ionicons name="arrow-forward" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderPackageCard = (pkg) => (
    <TouchableOpacity
      key={pkg.id}
      style={[styles.card, {
        backgroundColor: theme.card,
        shadowColor: theme.cardShadow,
        borderColor: theme.border,
        borderWidth: 1,
      }]}
      onPress={() => navigation.navigate('Home')}
    >
      <Image source={{ uri: pkg.image }} style={styles.hotelImage} />

      <View style={styles.hotelContent}>
        <View style={styles.cardHeader}>
          <Text style={[styles.hotelName, { color: theme.text }]}>{pkg.name}</Text>
          <Text style={[styles.price, { color: theme.primary }]}>₹{pkg.price.toLocaleString()}</Text>
        </View>

        <View style={styles.hotelLocation}>
          <Ionicons name="location" size={14} color={theme.textSecondary} />
          <Text style={[styles.locationText, { color: theme.textSecondary }]}>{pkg.destination}</Text>
        </View>

        <View style={styles.packageDuration}>
          <Ionicons name="time-outline" size={14} color={theme.textSecondary} />
          <Text style={[styles.locationText, { color: theme.textSecondary, marginLeft: 4 }]}>{pkg.duration}</Text>
        </View>

        <View style={styles.includesContainer}>
          {pkg.includes.slice(0, 3).map((item, idx) => (
            <View key={idx} style={[styles.includeBadge, { backgroundColor: theme.backgroundSecondary }]}>
              <Text style={[styles.includeText, { color: theme.textSecondary }]}>{item}</Text>
            </View>
          ))}
          {pkg.includes.length > 3 && (
            <Text style={[styles.moreIncludes, { color: theme.textSecondary }]}>+{pkg.includes.length - 3} more</Text>
          )}
        </View>

        <View style={styles.hotelRating}>
          <View style={styles.rating}>
            <Ionicons name="star" size={16} color={theme.gold} />
            <Text style={[styles.ratingText, { color: theme.text }]}>{pkg.rating}</Text>
          </View>
        </View>

        <Text style={[styles.description, { color: theme.textSecondary }]}>{pkg.description}</Text>

        <View style={styles.cardActions}>
          <TouchableOpacity
            style={[styles.addButton, { borderColor: theme.primary }]}
            onPress={() => handleAddToCart(pkg)}
          >
            <Ionicons name="add-circle" size={20} color={theme.primary} />
            <Text style={[styles.addButtonText, { color: theme.primary }]}>Add to Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.detailsButton, { backgroundColor: theme.primary }]}>
            <Text style={styles.detailsButtonText}>View Details</Text>
            <Ionicons name="arrow-forward" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.primary} />
        <Text style={[styles.loadingText, { color: theme.textSecondary }]}>Searching for best deals...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { backgroundColor: theme.backgroundSecondary, borderBottomColor: theme.border }]}>
        <Text style={[styles.title, { color: theme.text }]}>
          {results.length} {searchType} found
        </Text>
      </View>

      <View style={styles.results}>
        {results.map(result => {
          if (result.type === 'flight') return renderFlightCard(result);
          if (result.type === 'hotel') return renderHotelCard(result);
          if (result.type === 'package') return renderPackageCard(result);
          return null;
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#64748b',
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  results: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  airline: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e40af',
  },
  flightInfo: {
    marginBottom: 16,
  },
  flightRoute: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  time: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
  },
  location: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 4,
  },
  flightDuration: {
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 16,
  },
  duration: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 8,
  },
  flightLine: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#e2e8f0',
  },
  stops: {
    fontSize: 12,
    color: '#16a34a',
    marginTop: 8,
  },
  cardActions: {
    flexDirection: 'row',
    gap: 12,
  },
  addButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#1e40af',
    gap: 6,
  },
  addButtonText: {
    color: '#1e40af',
    fontWeight: '600',
  },
  detailsButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#1e40af',
    gap: 6,
  },
  detailsButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  hotelImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  hotelContent: {
    gap: 8,
  },
  hotelName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    flex: 1,
  },
  hotelLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontSize: 14,
    color: '#64748b',
  },
  hotelRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
  },
  reviews: {
    fontSize: 12,
    color: '#64748b',
  },
  description: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
  packageDuration: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 8,
  },
  includesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginVertical: 8,
  },
  includeBadge: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  includeText: {
    fontSize: 11,
    color: '#64748b',
    fontWeight: '500',
  },
  moreIncludes: {
    fontSize: 11,
    color: '#64748b',
    fontStyle: 'italic',
    alignSelf: 'center',
  },
});
