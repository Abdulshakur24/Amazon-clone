const express = require("express");
const app = express();
app.use(express.json());
const { KEY } = require("./src/Config");

const stripe = require("stripe")(KEY.secretKey);

app.post("/payment/confirm/:id", async (req, res) => {
  const id = req.params.id;
  if (id) {
    const paymentIntent = await stripe.paymentIntents.confirm(`${id}`, {
      payment_method: "pm_card_visa",
    });
    res.send(paymentIntent);
  } else {
    res.send("Error occured!");
  }
});

app.post("/payment/create/:total/:email", async (req, res) => {
  const email = req.params.email;
  const total = req.params.total;
  if (total >= 50 && email && total) {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total, // subunits of the currency
      currency: "usd",
      payment_method_types: ["card"],
    });
    const customer = await stripe.customers.create({
      email: email,
    });

    // OK - Created
    res.status(201).send({
      paymentIntent,
      customer,
    });
  } else {
    res.send(`Total amount shouldn't be less than 50, your amount: ${total}`);
  }
});

app.get("/payment/confirm/:id", async (req, res) => {
  const id = req.params.id;
  if (id) {
    try {
      const confirm = await stripe.paymentIntent.confirm(id);
      res.status(201).send("Confirmed!", confirm);
    } catch (error) {
      res.send(error);
    }
  } else {
    res.send("Invalid id");
  }
});

const PORT = process.env.port || 5000;
app.listen(PORT, () => console.log(`Running on port ${PORT}`));
//http://localhost:5000/payment/create/50
