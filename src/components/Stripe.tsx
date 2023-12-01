import CheckoutForm from "@/components/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PK);

export default function Stripe({
    registerData,
    modalControl,
}: {
    registerData: any;
    modalControl: any;
}) {
    return (
        <div>
            <Elements stripe={stripePromise}>
                <CheckoutForm
                    registerData={registerData}
                    modalControl={modalControl}
                />
            </Elements>
        </div>
    );
}
