# Ecocycle

Ecocycle is a revolutionary platform designed to track and facilitate the recycling process, connecting users and businesses with recycling centers and fostering a more sustainable future. By providing a streamlined experience for managing recyclable materials, Ecocycle empowers users to participate actively in the circular economy.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- User Registration & Authentication
- Manage and Track Recyclable Materials
- Marketplace for Recycled Materials
- Real-time Material Status Updates (Fe)
- Scheduling and Notifications for Pickup/Drop-off
- Community Forums for Networking and Advice(Fe)
- Educational Resources on Recycling Best Practices(Fe)
- Incentive and Reward System (Fe)

## Technologies Used

### Frontend

- **React & Next.js**: For building a responsive and modern user interface.
- **Axios**: For making HTTP requests to the backend API.
- **React Hook Form & Zod**: For form validation and handling user inputs.
- **Tailwind CSS**: For styling components and creating a consistent design.
- **Typescript**: For static typing and improved code quality.

### Backend

- **Django & Django REST Framework**: For developing robust RESTful APIs.
- **PostgreSQL**: For managing and querying relational data.
- **Gunicorn**: As a WSGI HTTP server to deploy the backend app.

### Deployment

- **Docker**: Containerization of the application for easier deployment and scaling.

## Installation

To set up the Ecocycle platform locally, follow these steps.

### Prerequisites

- [Node.js & npm](https://nodejs.org/)
- [Python & pip](https://www.python.org/)
- [Docker](https://www.docker.com/)
- [PostgreSQL](https://www.postgresql.org/)

### Backend Setup

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/ecocycle.git
   cd ecocycle/backend
   ```

2. **Set Up the Virtual Environment:**

   ```bash
   python -m venv env
   source env/bin/activate  # On Windows use `env\Scripts\activate`
   ```

3. **Install Dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

4. **Run Migrations:**

   ```bash
   python manage.py migrate
   ```

5. **Start the Server:**

   ```bash
   python manage.py runserver
   ```

### Frontend Setup

1. **Navigate to the Frontend Directory:**

   ```bash
   cd ../frontend
   ```

2. **Install Node.js Dependencies:**

   ```bash
   npm install
   ```

3. **Start the Development Server:**

   ```bash
   npm run dev
   ```

### Running with Docker

1. **Build and Run Containers:**

   Ensure you are in the root of the project directory and use Docker:

   ```bash
   docker-compose up --build
   ```

## Usage

After setting up the project, you can access the application at `http://localhost:3000` for the frontend interface. The backend API will run on `http://127.0.0.1:8000`.

## Contributing

We welcome contributions! Please follow these guidelines:

1. Fork the repository.
2. Create a new branch.
3. Make your changes and commit them.
4. Submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.