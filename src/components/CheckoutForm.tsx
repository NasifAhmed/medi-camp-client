// import { useAxios } from "@/hooks/useAxios";
import { useAxiosSecure } from "@/hooks/useAxiosSecure";
import { AuthContext } from "@/providers/AuthProvider";
import { RegisteredParticipant } from "@/types/types";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";

function CheckoutForm({
    registerData,
    modalControl,
}: {
    registerData: any;
    modalControl: any;
}) {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState("");
    const axios = useAxiosSecure();
    const queryClient = useQueryClient();

    const [clientSecret, setClientSecret] = useState("");

    const { user } = useContext(AuthContext);

    useEffect(() => {
        console.log(registerData);

        axios
            .post("/create-payment-intent", {
                price: registerData?.price,
            })
            .then((res) => {
                console.log(res.data.clientSecret);
                setClientSecret(res.data.clientSecret);
            });
    }, []);

    const paymentStatusMutation = useMutation({
        mutationFn: async (payload: RegisteredParticipant) => {
            await axios
                .post(`/register?_id=${registerData._id}`, payload)
                .then((res) => {
                    console.log(`Payment post response ${res}`);
                })
                .catch((e) => console.log(`Payment post error : ${e}`));
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ["registered camps"],
            });
        },
    });

    const submitHandler = async (e: any) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card,
        });

        if (error) {
            console.log("payment error", error);
            setError(error.message as string);
        } else {
            console.log("payment method", paymentMethod);
            setError("");
        }

        const { error: confirmError, paymentIntent } =
            await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || "anonymous",
                    },
                },
            });

        if (confirmError) {
            console.log("Confirm error", confirmError);
            setError(confirmError.message as string);
        } else {
            console.log("payment intent", paymentIntent);
            if (paymentIntent.status === "succeeded") {
                console.log("Transaxtion id");
                paymentStatusMutation.mutate({
                    ...registerData,
                    payment_status: true,
                });
                toast.success("Payment success !");
                modalControl(false);
            }
        }
    };

    return (
        <form className="space-y-4" onSubmit={submitHandler}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: "16px",
                            color: "#424770",
                            "::placeholder": {
                                color: "#aab7c4",
                            },
                        },
                        invalid: {
                            color: "#9e2146",
                        },
                    },
                }}
            />
            <p className="text-destructive">{error}</p>
            <Button type="submit" disabled={!stripe || !clientSecret}>
                PAY
            </Button>
        </form>
    );
}

export default CheckoutForm;
