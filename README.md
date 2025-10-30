# TravelEase React Native App

This is the React Native version of TravelEase, a travel booking application for flights and hotels.

## Features

- 🛫 Flight Search & Booking
- 🏨 Hotel Search & Booking
- 🛒 Shopping Cart
- 👤 User Authentication
- 📱 Fully Responsive Mobile UI
- 💾 Persistent Data with AsyncStorage

## Prerequisites

Before running this app, make sure you have:

- Node.js (v16 or higher)
- npm or yarn
- Expo Go app installed on your phone (download from App Store or Google Play)
- Expo CLI (will be installed automatically)

## Installation

1. Navigate to the TravelEaseNative directory:
   ```bash
   cd TravelEaseNative
   ```

2. Install dependencies (if not already installed):
   ```bash
   npm install
   ```

## Running the App

### Using Expo Go (Recommended)

1. Start the development server:
   ```bash
   npx expo start
   ```

2. This will open the Expo Developer Tools in your browser and show a QR code

3. On your phone:
   - **iOS**: Open Camera app and scan the QR code
   - **Android**: Open Expo Go app and scan the QR code

4. The app will load on your device!

### Alternative Methods

- **iOS Simulator** (Mac only):
  ```bash
  npx expo start --ios
  ```

- **Android Emulator**:
  ```bash
  npx expo start --android
  ```

- **Web Browser** (for testing):
  ```bash
  npx expo start --web
  ```

## Project Structure

```
TravelEaseNative/
├── App.js                      # Main app component
├── src/
│   ├── components/            # Reusable components
│   │   ├── Header.js
│   │   └── SearchBar.js
│   ├── context/              # Context providers
│   │   ├── AuthContext.js
│   │   └── CartContext.js
│   ├── navigation/           # Navigation setup
│   │   └── AppNavigator.js
│   └── screens/             # Screen components
│       ├── HomeScreen.js
│       ├── SearchResultsScreen.js
│       ├── FlightDetailsScreen.js
│       ├── HotelDetailsScreen.js
│       ├── CheckoutScreen.js
│       ├── DashboardScreen.js
│       ├── LoginScreen.js
│       └── SignUpScreen.js
```

## Key Dependencies

- **React Navigation**: For app navigation
- **AsyncStorage**: For local data persistence
- **Expo Vector Icons**: For icons throughout the app
- **React Native Safe Area Context**: For safe area handling

## Features Breakdown

### Home Screen
- Hero section with search functionality
- Feature cards
- Service offerings (Flights, Hotels, Packages)
- Popular destinations carousel
- Call-to-action section

### Search Results
- Dynamic results based on search type (flights/hotels)
- Add to cart functionality
- Filter and sort options

### Flight/Hotel Details
- Detailed information about selected item
- Amenities list
- Booking information
- Add to cart with confirmation

### Shopping Cart (Checkout)
- View all cart items
- Update quantities
- Remove items
- Proceed to payment

### Dashboard
- User profile information
- Booking history
- Quick actions
- Logout functionality

### Authentication
- Login screen
- Sign up screen
- Persistent authentication state

## Mock Data

Currently, the app uses mock data for:
- Flight listings
- Hotel listings
- User authentication
- Bookings

In a production app, these would be replaced with actual API calls to your backend server.

## Customization

### Colors
The app uses a consistent color scheme defined throughout the stylesheets:
- Primary Blue: `#1e40af`
- Success Green: `#16a34a`
- Warning Orange: `#f97316`
- Danger Red: `#ef4444`

You can modify these colors in each component's StyleSheet.

### Adding Real API Integration

To connect to a real backend:

1. Create an API service file (e.g., `src/services/api.js`)
2. Replace mock data in context files with API calls
3. Add loading states and error handling
4. Update AsyncStorage usage for token management

## Troubleshooting

### Common Issues

1. **Metro bundler errors**: Clear cache and restart
   ```bash
   npx expo start -c
   ```

2. **Module not found**: Reinstall dependencies
   ```bash
   rm -rf node_modules
   npm install
   ```

3. **Expo Go connection issues**: Make sure your phone and computer are on the same WiFi network

4. **Icon not showing**: Ensure `@expo/vector-icons` is properly installed

## Next Steps

- Add payment gateway integration
- Implement real-time booking updates
- Add push notifications
- Implement social authentication (Google, Facebook)
- Add map integration for location selection
- Add reviews and ratings system

## Support

For issues or questions, please refer to:
- [Expo Documentation](https://docs.expo.dev/)
- [React Navigation Documentation](https://reactnavigation.org/)
- [React Native Documentation](https://reactnative.dev/)

## License

This project is for educational purposes.
