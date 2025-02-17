# Drip Check

Drip Check is a fashion social platform for fashion enthusiasts built using the MERN stack (MongoDB, Express, React, Node.js). It allows users to post outfits for sale, rate outfits, and view items posted by other users. The platform is designed to make it easy for users to share their fashion choices, discover new outfits, and purchase or trade them.

## Features

- **Post Outfits**: Users can post their outfits with a title, caption, price in KSH, image, and rating.
- **Rate Outfits**: Users can rate outfits using a star rating system.
- **View All Outfits**: Users can view outfits posted by others in the marketplace.
- **Image Upload**: Users can upload images of their outfits directly from their devices.
- **Responsive Design**: The app is fully responsive, optimized for desktop and mobile devices.

---

## Frontend Setup

1. **Create the React app** using Vite (React template):
    ```bash
    npx create-vite@latest dripcheckclient --template react
    ```
2. **Navigate into the project directory**:
    ```bash
    cd dripcheckclient
    ```
3. **Install the required dependencies**:
    ```bash
    npm install
    ```
4. **Run the development server**:
    ```bash
    npm run dev
    ```
    This will start the development server at `http://localhost:5173/`.

---

## Backend Setup

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/drip-check-backend.git
    cd drip-check-backend
    ```
2. **Install the required dependencies**:
    ```bash
    npm install
    ```
3. **Set up MongoDB**:
    - Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create a cluster.
    - Create a new database and a collection for the outfits.
    - Get the MongoDB URI and set it in the `.env` file (e.g., `MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/dripcheck`).

4. **Run the backend server**:
    ```bash
    npm run start
    ```
    This will start the server at `http://localhost:5000/`.

---

## Running the Application

1. **Frontend**: The frontend React app is hosted locally on port `5173` by default:
    ```bash
    http://localhost:5173/
    ```
   
2. **Backend**: The backend Express server is hosted locally on port `5000` by default:
    ```bash
    http://localhost:5000/
    ```

3. You can access the full application by running both the frontend and backend servers simultaneously.

---

## Acknowledgements

- **React**: A JavaScript library for building user interfaces.
- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express**: Fast, unopinionated, minimalist web framework for Node.js.
- **MongoDB**: NoSQL database for storing the outfits and user data.
- **Vite**: Next-generation, fast build tool for modern web projects.

Special thanks to the open-source community and everyone who contributed to the development of this project!

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
