# Vue.js Authentication & Complete Web Form App

A Vue.js application featuring authentication system and comprehensive form handling, inspired by test automation practice sites.

## Features

### 🔐 Authentication System
- Login page modeled after [the-internet.herokuapp.com/login](https://the-internet.herokuapp.com/login)
- Credentials: `tomsmith` / `SuperSecretPassword!`
- Protected routes with Vue Router guards
- Persistent authentication state with Vuex
- Automatic token management with localStorage

### 📋 Complete Web Form
- Comprehensive form based on [formy-project.herokuapp.com/form](https://formy-project.herokuapp.com/form)
- Form validation and submission handling
- Multiple input types: text, radio buttons, select dropdown, date picker
- Form reset functionality
- Submission result display with formatted JSON

### 🎨 Modern UI/UX
- Responsive design for all screen sizes
- Clean and intuitive interface
- Visual feedback for user interactions
- Error handling and loading states
- Accessible form elements

## Project Structure

```
src/
├── App.vue                 # Main application component
├── main.js                # Application entry point
├── router/
│   └── index.js           # Vue Router configuration
├── store/
│   └── index.js           # Vuex store for state management
└── views/
    ├── Login.vue          # Login page component
    ├── Dashboard.vue      # Protected dashboard
    └── CompleteForm.vue   # Complete web form
```

## Installation & Setup

1. **Clone Repository**
   ```bash
   git clone https://github.com/adityapryg/vuejs-auth-form-app.git
   cd vuejs-auth-form-app
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Development Server**
   ```bash
   npm run serve
   ```

4. **Build for Production**
   ```bash
   npm run build
   ```

## Usage

1. **Login**
   - Navigate to the login page
   - Use credentials: `tomsmith` / `SuperSecretPassword!`
   - Access protected areas after authentication

2. **Complete Form**
   - Fill out all required fields
   - Submit to see formatted result
   - Reset form to clear all data

## Technical Stack

- **Vue.js 3** - Progressive JavaScript framework
- **Vue Router 4** - Official router for Vue.js
- **Vuex 4** - State management pattern + library
- **Modern ES6+** - Latest JavaScript features
- **Responsive CSS** - Mobile-first design approach

## Authentication Flow

1. User enters credentials on login page
2. Credentials are validated against hardcoded values
3. On success, user data and token are stored in Vuex store
4. Authentication state persists across browser sessions
5. Protected routes automatically redirect unauthenticated users

## Form Validation

- All form fields are required for submission
- Real-time validation feedback
- Form submission disabled until all fields are valid
- Success state with submitted data display

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6+ support required
- Responsive design for mobile devices

## Development Notes

This project demonstrates:
- Vue.js 3 Composition API patterns
- Route protection and navigation guards  
- Form handling and validation
- State management with Vuex
- Local storage integration
- Component-based architecture
- Responsive CSS design patterns

Perfect for learning Vue.js authentication flows and form handling techniques used in web test automation scenarios.

## Live Demo

Visit the repository: [https://github.com/adityapryg/vuejs-auth-form-app](https://github.com/adityapryg/vuejs-auth-form-app)

## Contributing

Feel free to fork this project and submit pull requests for improvements.

## License

This project is open source and available under the [MIT License](LICENSE).