require('dotenv').config(); // Load environment variables from .env file

const { Bot } = require("grammy");

// Get BOT_TOKEN from environment variable
const BOT_TOKEN = process.env.BOT_TOKEN;
const bot = new Bot(BOT_TOKEN);

// Define different plans with more details
const plans = [
  {
    id: "plan_1",
    title: "Basic Plan",
    description: "Access to basic features and content. Ideal for casual users.",
    price: 1, // Price in Stars
    emoji: "🟢"
  },
  {
    id: "plan_2",
    title: "Premium Plan",
    description: "Full access to premium features. Great for power users.",
    price: 5, // Price in Stars
    emoji: "🔵"
  },
  {
    id: "plan_3",
    title: "VIP Plan",
    description: "Exclusive features and VIP support. Perfect for those who want the best experience.",
    price: 10, // Price in Stars
    emoji: "⭐"
  },
];

// Start command to greet users with a friendly tone
bot.command("start", (ctx) => {
  const userFirstName = ctx.from.first_name || "Valued User";
  ctx.reply(`Hello, ${userFirstName}! 👋 Welcome to our service. To get started, use /pay to purchase a plan and unlock amazing features. 🛍️`, {
    reply_markup: {
      inline_keyboard: [
        [
          { text: "📊 View Plans", callback_data: "view_plans" },
          { text: "💬 Get Help", callback_data: "get_help" }
        ]
      ]
    }
  });
});

// Command to list available plans with descriptions and emojis
bot.command("pay", (ctx) => {
  const planButtons = plans.map((plan) => [
    { text: `${plan.emoji} ${plan.title} - ${plan.price} Stars`, callback_data: `pay_${plan.id}` }
  ]);

  ctx.reply("Please choose a plan to purchase by clicking one of the buttons below:", {
    reply_markup: {
      inline_keyboard: planButtons
    }
  });
});

// Handle user actions on inline buttons
bot.on("callback_query", (ctx) => {
  const callbackData = ctx.callbackQuery.data;

  if (callbackData === "view_plans") {
    ctx.reply("Here are the available plans you can purchase. Choose one to proceed.", {
      reply_markup: {
        inline_keyboard: plans.map((plan) => [
          { text: `${plan.emoji} ${plan.title} - ${plan.price} Stars`, callback_data: `pay_${plan.id}` }
        ])
      }
    });
  } else if (callbackData === "get_help") {
    ctx.reply("If you need any help, feel free to contact our support team at support@bot.com. We're here to assist you! 🙌");
  } else if (callbackData.startsWith("pay_")) {
    const selectedPlanId = callbackData.replace("pay_", "");
    const selectedPlan = plans.find((plan) => plan.id === selectedPlanId);

    if (selectedPlan) {
      ctx.replyWithInvoice(
        selectedPlan.title, // Product title
        selectedPlan.description, // Product description
        selectedPlan.id, // Product payload
        "XTR", // Stars Currency
        [{ amount: selectedPlan.price, label: `${selectedPlan.emoji} ${selectedPlan.title}` }] // Product price
      );
    } else {
      ctx.answerCallbackQuery("Sorry, there was an error selecting the plan. Please try again. 😓");
    }
  }
});

// Handle pre-checkout query to confirm payment details with professionalism
bot.on("pre_checkout_query", (ctx) => {
  const payload = ctx.preCheckoutQuery.invoice_payload;
  const selectedPlan = plans.find((plan) => plan.id === payload);

  if (selectedPlan) {
    console.log(`User is about to purchase the ${selectedPlan.title}`);
    ctx.answerPreCheckoutQuery(true);
  } else {
    console.log("Invalid plan selected during pre-checkout.");
    ctx.answerPreCheckoutQuery(false, "There was an error processing your request. Please try again. 😓");
  }
});

// Handle successful payments and send professional confirmation message
bot.on("message", (ctx) => {
  if (ctx.message.successful_payment) {
    const planId = ctx.message.successful_payment.invoice_payload;
    const purchasedPlan = plans.find((plan) => plan.id === planId);

    if (purchasedPlan) {
      console.log("Payment received:", ctx.message.successful_payment);
      ctx.reply(
        `🎉 Thank you for your purchase of the ${purchasedPlan.title}! 🎉\n\nYou now have access to all the benefits of this plan. 🚀\nIf you have any questions or need further assistance, feel free to reach out! 💬`
      );
    } else {
      console.log("Unexpected error with payment details.");
      ctx.reply("We encountered an issue processing your payment. Please contact support for assistance. ❌");
    }
  } else if (ctx.message.payment_failed) {
    console.log("Payment failed:", ctx.message.payment_failed);
    ctx.reply("Oops! There was an issue with your payment. Please try again or contact support. 😞");
  }
});

// Start the bot
bot.start();
