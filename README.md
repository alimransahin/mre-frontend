# MRA- Tech Tips & Tricks Hub

Tech Tips & Tricks Hub is a full-stack web application designed to help tech enthusiasts share, discover, and discuss technology tips and tricks. The platform offers expert advice, user-generated content, and personalized experiences through authentication, premium subscriptions, and interaction features like upvoting and commenting.

## Features

- **User Authentication:** Secure login, registration, and password recovery.
- **User Roles:** Users can have roles like admin and user, with permissions to perform different actions.
- **Post Creation:** Users can create, edit, and delete tech tips and tutorials using a rich text editor.
- **Voting & Comments:** Upvote/downvote posts and comment on content.
- **Premium Content:** Access premium posts by subscribing via payment gateways.
- **Search & Filter:** Search for tips using keywords and filter by categories.
- **PDF Generation:** Generate PDFs of posts for offline access.
- **News Feed:** An infinite scrolling feed of the latest tech tips.
- **Profile Management:** Users can update their profile, including personal details and profile pictures.
- **Admin Dashboard:** Manage users, posts, and payments.
- **Following System:** Follow other users to see their posts and updates.

## Tech Stack

- **Frontend:** Next.js, TypeScript, Tailwind CSS
- **Backend:** Node.js, Express, Mongoose
- **Database:** MongoDB
- **Deployment:** Vercel
- **Payment Integration:** Aamarpay/Stripe

## Project Objectives

- Build a responsive web application for sharing and discovering tech tips.
- Implement JWT-based user authentication.
- Allow users to subscribe for premium content via payment gateways.
- Provide advanced search, filtering, and content sorting functionalities.
- Enable social interactions with upvoting, comments, and followers.

## Local Installation

Follow the steps below to set up the project locally:

### Prerequisites

- **Node.js** (v14 or above)
- **MongoDB** (installed locally or using MongoDB Atlas)
- **Vercel CLI** (optional, if you want to deploy via Vercel)
  
### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/alimransahin/mre-frontend.git
   cd mre-frontend

2. Install dependencies:

   ```bash
    npm install

3. Set up environment variables </br>
Create a .env.local file in the root of your project with the following content:
    ```bash
    NEXT_PUBLIC_BASE_API=https://mra-backent.vercel.app/api
    NEXT_PUBLIC_IMGBB_API=2bf1c09014fd148ecbd27325fd6f8ada
4. Start the development server </br>
Run the following command to start the development server:

  ```bash
  npm run dev
