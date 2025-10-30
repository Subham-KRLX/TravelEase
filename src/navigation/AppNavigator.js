import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import HomeScreen from '../screens/HomeScreen';
import SearchResultsScreen from '../screens/SearchResultsScreen';
import FlightDetailsScreen from '../screens/FlightDetailsScreen';
import HotelDetailsScreen from '../screens/HotelDetailsScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import DashboardScreen from '../screens/DashboardScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';

const Stack = createNativeStackNavigator();

function CustomHeaderRight({ navigation }) {
  const { isDarkMode, toggleTheme, theme } = useTheme();
  const { user } = useAuth();
  const { getTotalItems } = useCart();

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginRight: 8 }}>
      <TouchableOpacity onPress={toggleTheme} style={{ padding: 4 }}>
        <Ionicons 
          name={isDarkMode ? 'sunny' : 'moon'} 
          size={24} 
          color={theme.headerText} 
        />
      </TouchableOpacity>

      <TouchableOpacity 
        onPress={() => navigation.navigate('Checkout')}
        style={{ position: 'relative', padding: 4 }}
      >
        <Ionicons name="cart" size={24} color={theme.headerText} />
        {getTotalItems() > 0 && (
          <View style={{
            position: 'absolute',
            top: 0,
            right: 0,
            backgroundColor: '#ef4444',
            borderRadius: 10,
            width: 18,
            height: 18,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Text style={{ color: '#fff', fontSize: 10, fontWeight: 'bold' }}>
              {getTotalItems()}
            </Text>
          </View>
        )}
      </TouchableOpacity>

      <TouchableOpacity 
        onPress={() => navigation.navigate(user ? 'Dashboard' : 'Login')}
        style={{ padding: 4 }}
      >
        <Ionicons name="person" size={24} color={theme.headerText} />
      </TouchableOpacity>
    </View>
  );
}

export default function AppNavigator() {
  const { theme } = useTheme();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={({ navigation }) => ({
          headerStyle: {
            backgroundColor: theme.headerBackground,
          },
          headerTintColor: theme.headerText,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerRight: () => <CustomHeaderRight navigation={navigation} />,
        })}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ title: 'TravelEase' }}
        />
        <Stack.Screen 
          name="SearchResults" 
          component={SearchResultsScreen}
          options={{ title: 'Search Results' }}
        />
        <Stack.Screen 
          name="FlightDetails" 
          component={FlightDetailsScreen}
          options={{ title: 'Flight Details' }}
        />
        <Stack.Screen 
          name="HotelDetails" 
          component={HotelDetailsScreen}
          options={{ title: 'Hotel Details' }}
        />
        <Stack.Screen 
          name="Checkout" 
          component={CheckoutScreen}
          options={{ title: 'Checkout' }}
        />
        <Stack.Screen 
          name="Dashboard" 
          component={DashboardScreen}
          options={{ title: 'My Dashboard' }}
        />
        <Stack.Screen 
          name="Login" 
          component={LoginScreen}
          options={{ title: 'Login' }}
        />
        <Stack.Screen 
          name="SignUp" 
          component={SignUpScreen}
          options={{ title: 'Sign Up' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
