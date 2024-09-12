import { StripeProvider } from '@stripe/stripe-react-native';
import { StyleSheet, View } from 'react-native';
import PaymentComponent from '../screens/Payments';
import { useRoute } from '@react-navigation/native';

export default function PaymentPage() {
  const route = useRoute();
  const { totalAmount, clientSecret, formData } = route.params; // Retrieve all params

  return (
    <View style={styles.container}>
      <StripeProvider publishableKey="pk_test_51Pn1XbP0kMQbQN9Vx6C4x38T2MPc2KNYO0S2idCi1pDwvRm3g0OceIz39E9jmhFqPUsvNUzjOWT3n1V2R2PQFhnq00yBXsNvbl">
        <PaymentComponent 
          totalAmount={totalAmount} 
          clientSecret={clientSecret} 
          formData={formData} // Pass formData to the PaymentComponent
        />
      </StripeProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
