import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe(
  'pk_test_51MmeSOSArUqUDE27MNx1LeacEYxhURAaBDOO0KmUhXkTF9oIz6p2p2vK32rgC0snsbqfiphr2DFOpXUI3gvERyBs00yrrBg8zN'
);

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from API
    const session = await axios(
      `http://127.0.0.1:8000/api/v1/bookings/checkout-session/${tourId}`
    );

    // 2) Create checkout form + chanre credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
