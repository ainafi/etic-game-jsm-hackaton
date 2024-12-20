# Etic Store

Etic Store is a web platform designed to manage user orders for a wide selection of anime, movies, and games. The site offers a seamless shopping experience by integrating external APIs to provide a rich catalog of content for users to explore and purchase.

## Features

- **User Authentication**: Users can log in or create an account.
- **Browse and Order**: Users can choose from a wide variety of anime, games, and movies to add to their order list.
- **APIs Integration**: Integrated with TMDB, RAWG, and JUKAN APIs for anime, movie, and game data.
- **Easy Navigation**: Simple and intuitive interface to quickly find and order favorite items.

## Advantages

- **Paperless Catalog**: Store owners no longer need to design or print paper catalogs, saving time and resources.
- **Enhanced User Experience**: Clients can easily browse and find their favorite content in one place.

## Tech Stack

- **Frontend**: Next.js, TypeScript
- **State Management**: Zustand
- **Backend**: Appwrite

## Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/etic-store.git
    ```

2. Install dependencies using `pnpm`:
    ```bash
    cd etic-store
    pnpm install
    ```

3. Set up environment variables for Appwrite and API keys.

4. Run the development server:
    ```bash
    pnpm dev
    ```

The application will be running on `http://localhost:3000`.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
