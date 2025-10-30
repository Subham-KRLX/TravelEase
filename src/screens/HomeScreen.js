import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  Image, 
  TouchableOpacity,
  Dimensions 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import SearchBar from '../components/SearchBar';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const navigation = useNavigation();
  const { theme } = useTheme();

  const features = [
    {
      icon: 'time-outline',
      title: '24/7 Support',
      description: 'Round-the-clock customer service for all your travel needs'
    },
    {
      icon: 'shield-checkmark-outline',
      title: 'Secure Booking',
      description: 'Your payments and personal data are always protected'
    },
    {
      icon: 'trophy-outline',
      title: 'Best Prices',
      description: 'Compare prices and get the best deals on flights and hotels'
    }
  ];

  const destinations = [
    {
      id: 1,
      name: 'Goa, India',
      image: 'https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: 'From ₹8,999',
      description: 'Beautiful beaches and vibrant nightlife'
    },
    {
      id: 2,
      name: 'Kerala, India',
      image: 'https://images.pexels.com/photos/2476632/pexels-photo-2476632.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: 'From ₹12,999',
      description: "God's own country with backwaters"
    },
    {
      id: 3,
      name: 'Rajasthan, India',
      image: 'https://images.pexels.com/photos/3581368/pexels-photo-3581368.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: 'From ₹6,999',
      description: 'Royal palaces and desert landscapes'
    },
    {
      id: 4,
      name: 'Kashmir, India',
      image: 'https://images.pexels.com/photos/1670770/pexels-photo-1670770.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: 'From ₹15,999',
      description: 'Paradise on earth with stunning valleys'
    }
  ];

  const services = [
    {
      icon: 'airplane',
      title: 'Flights',
      description: 'Find the best flight deals worldwide',
      color: '#1e40af'
    },
    {
      icon: 'bed',
      title: 'Hotels',
      description: 'Book comfortable accommodations',
      color: '#f97316'
    },
    {
      icon: 'gift',
      title: 'Packages',
      description: 'Complete vacation packages',
      color: '#16a34a'
    }
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Hero Section */}
        <View style={styles.hero}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg?auto=compress&cs=tinysrgb&w=1600' }}
            style={styles.heroImage}
          />
          <View style={styles.heroOverlay} />
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>
              Your Journey Begins with{'\n'}
              <Text style={styles.heroHighlight}>TravelEase</Text>
            </Text>
            <Text style={styles.heroSubtitle}>
              Discover amazing destinations, book flights and hotels with ease
            </Text>
          </View>
        </View>

      {/* Search Bar */}
      <SearchBar />

      {/* Features Section */}
      <View style={styles.section}>
        <View style={styles.featuresGrid}>
          {features.map((feature, index) => (
            <View key={index} style={[styles.featureCard, { backgroundColor: theme.backgroundSecondary }]}>
              <View style={styles.featureIcon}>
                <Ionicons name={feature.icon} size={32} color={theme.primary} />
              </View>
              <Text style={[styles.featureTitle, { color: theme.text }]}>{feature.title}</Text>
              <Text style={[styles.featureDescription, { color: theme.textSecondary }]}>{feature.description}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Services Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>What We Offer</Text>
          <Text style={[styles.sectionSubtitle, { color: theme.textSecondary }]}>
            Everything you need for your perfect trip
          </Text>
        </View>
        
        <View style={styles.servicesGrid}>
          {services.map((service, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.serviceCard, { backgroundColor: theme.card, borderColor: theme.border }]}
              onPress={() => navigation.navigate('SearchResults', { type: service.title.toLowerCase() })}
            >
              <View style={[styles.serviceIcon, { backgroundColor: service.color }]}>
                <Ionicons name={service.icon} size={32} color="#fff" />
              </View>
              <Text style={[styles.serviceTitle, { color: theme.text }]}>{service.title}</Text>
              <Text style={[styles.serviceDescription, { color: theme.textSecondary }]}>{service.description}</Text>
              <Ionicons name="arrow-forward" size={20} color={theme.textSecondary} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Destinations Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular Destinations</Text>
          <Text style={styles.sectionSubtitle}>
            Explore the world's most amazing places
          </Text>
        </View>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.destinationsScroll}>
          {destinations.map(destination => (
            <TouchableOpacity
              key={destination.id}
              style={styles.destinationCard}
              onPress={() => navigation.navigate('SearchResults', { destination: destination.name })}
            >
              <Image
                source={{ uri: destination.image }}
                style={styles.destinationImage}
              />
              <View style={styles.destinationOverlay}>
                <View style={styles.destinationPrice}>
                  <Text style={styles.destinationPriceText}>{destination.price}</Text>
                </View>
              </View>
              <View style={styles.destinationContent}>
                <View style={styles.destinationNameContainer}>
                  <Ionicons name="location" size={16} color="#1e40af" />
                  <Text style={styles.destinationName}>{destination.name}</Text>
                </View>
                <Text style={styles.destinationDescription}>{destination.description}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* CTA Section */}
      <View style={styles.cta}>
        <Text style={styles.ctaTitle}>Ready to Start Your Adventure?</Text>
        <Text style={styles.ctaSubtitle}>
          Join millions of travelers who trust TravelEase for their journeys
        </Text>
        <View style={styles.ctaButtons}>
          <TouchableOpacity 
            style={styles.ctaButton}
            onPress={() => navigation.navigate('SearchResults')}
          >
            <Text style={styles.ctaButtonText}>Start Planning</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.ctaButtonSecondary}
            onPress={() => navigation.navigate('SignUp')}
          >
            <Text style={styles.ctaButtonSecondaryText}>Create Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  hero: {
    height: 300,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  heroContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 12,
  },
  heroHighlight: {
    color: '#60a5fa',
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    opacity: 0.9,
  },
  section: {
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#64748b',
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureCard: {
    width: '48%',
    backgroundColor: '#f8fafc',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  featureIcon: {
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
  },
  servicesGrid: {
    gap: 12,
  },
  serviceCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  serviceIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    flex: 1,
  },
  serviceDescription: {
    fontSize: 14,
    color: '#64748b',
    flex: 2,
  },
  destinationsScroll: {
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  destinationCard: {
    width: width * 0.7,
    marginRight: 16,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  destinationImage: {
    width: '100%',
    height: 200,
  },
  destinationOverlay: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  destinationPrice: {
    backgroundColor: '#1e40af',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  destinationPriceText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  destinationContent: {
    padding: 16,
  },
  destinationNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 6,
  },
  destinationName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
  },
  destinationDescription: {
    fontSize: 14,
    color: '#64748b',
  },
  cta: {
    backgroundColor: '#1e40af',
    marginHorizontal: 16,
    marginBottom: 24,
    padding: 32,
    borderRadius: 12,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 12,
  },
  ctaSubtitle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    opacity: 0.9,
    marginBottom: 24,
  },
  ctaButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  ctaButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  ctaButtonText: {
    color: '#1e40af',
    fontSize: 16,
    fontWeight: '600',
  },
  ctaButtonSecondary: {
    backgroundColor: 'transparent',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#fff',
  },
  ctaButtonSecondaryText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
