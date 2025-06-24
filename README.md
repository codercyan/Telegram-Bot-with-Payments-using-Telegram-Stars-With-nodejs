# Telegram Bot with Payments using Telegram Stars (Node.js)

A Telegram bot built with [grammY](https://grammy.dev/) that allows users to purchase subscription plans using Telegram Stars. The bot offers multiple plans, handles payments, and provides a friendly onboarding experience.

## Features
- Three subscription plans: Basic, Premium, and VIP
- Payment integration using Telegram Stars
- Friendly onboarding and help commands
- Professional payment confirmation and error handling

## Plans
| Plan    | Description                                      | Price (Stars) | Emoji |
|---------|--------------------------------------------------|---------------|-------|
| Basic   | Access to basic features and content.            | 1             | 🟢    |
| Premium | Full access to premium features.                 | 5             | 🔵    |
| VIP     | Exclusive features and VIP support.              | 10            | ⭐    |

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- A Telegram bot token ([How to get one?](https://core.telegram.org/bots#6-botfather))

### Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/Telegram-Bot-with-Payments-using-Telegram-Stars-With-nodejs.git
   cd Telegram-Bot-with-Payments-using-Telegram-Stars-With-nodejs
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Configure environment variables:**
   - Copy the `.env` file and set your bot token:
     ```env
     BOT_TOKEN=YOUR_TELEGRAM_BOT_TOKEN_HERE
     ```

### Running the Bot
```bash
node bot.js
```

The bot will start and listen for messages. You can interact with it on Telegram using the `/start` and `/pay` commands.

## Usage
- **/start**: Greets the user and provides options to view plans or get help.
- **/pay**: Lists available subscription plans for purchase.
- **Inline Buttons**: Users can view plans, get help, or select a plan to pay using Telegram Stars.

## Environment Variables
- `BOT_TOKEN`: Your Telegram bot token from BotFather.

## Dependencies
- [grammY](https://grammy.dev/) - Telegram Bot API framework
- [dotenv](https://www.npmjs.com/package/dotenv) - Loads environment variables

## Security Note
**Never share your real bot token publicly.**

## License
This project is licensed under the MIT License. See [LICENSE](LICENSE) for details. 


https://www.youtube.com/@codercyan
https://t.me/elioncodercyan
https://t.me/codercyan