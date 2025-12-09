document.addEventListener("DOMContentLoaded", function () {
    const checkoutButton = document.getElementById("checkout-button");
    if (!checkoutButton) return;

    checkoutButton.addEventListener("click", function (event) {
        event.preventDefault();

        const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;

        fetch("/create-checkout-session/", {
            method: "POST",
            headers: { "X-CSRFToken": csrftoken },
        })
        .then(r => r.json())
        .then(data => {
            if (data.error) {
                alert("Error: " + data.error);
                return;
            }

            const stripe = Stripe(window.stripePublicKey);
            stripe.redirectToCheckout({ sessionId: data.id });
        })
        .catch(err => {
            console.error("Checkout error:", err);
        });
    });
});
