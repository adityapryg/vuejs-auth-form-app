<template>
  <div class="dashboard" v-if="!isLoggingOut && isAuthenticated && currentUser">
    <div class="welcome-card">
      <h1>Welcome to the Secure Area!</h1>
      <p>Hello, <strong>{{ currentUser.username }}</strong>! You have successfully logged in.</p>
      <div class="dashboard-actions">
        <router-link to="/form" class="action-btn primary">
          📝 Fill Complete Form
        </router-link>
        <button @click="logout" class="action-btn secondary">
          🚪 Logout
        </button>
      </div>
    </div>
    
    <div class="features-grid">
      <div class="feature-card">
        <h3>🔐 Secure Authentication</h3>
        <p>Protected routes with authentication state management</p>
      </div>
      <div class="feature-card">
        <h3>📋 Complete Forms</h3>
        <p>Comprehensive form handling with validation</p>
      </div>
      <div class="feature-card">
        <h3>🎨 Modern UI</h3>
        <p>Clean and responsive user interface</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data() {
    return {
      isLoggingOut: false
    };
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
    currentUser() {
      return this.$store.getters.currentUser;
    }
  },
  methods: {
    logout() {
      this.isLoggingOut = true;
      // Clear auth state
      this.$store.dispatch('logout');
      // Small delay to ensure store state is updated before navigation
      setTimeout(() => {
        this.$router.push('/login');
      }, 10);
    }
  }
}
</script>

<style scoped>
.dashboard {
  max-width: 800px;
  margin: 0 auto;
}

.welcome-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  margin-bottom: 2rem;
}

.welcome-card h1 {
  color: #27ae60;
  margin-bottom: 1rem;
}

.welcome-card p {
  color: #7f8c8d;
  margin-bottom: 2rem;
}

.dashboard-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.action-btn {
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s;
  border: none;
  cursor: pointer;
  font-size: 1rem;
}

.action-btn.primary {
  background-color: #3498db;
  color: white;
}

.action-btn.primary:hover {
  background-color: #2980b9;
}

.action-btn.secondary {
  background-color: #95a5a6;
  color: white;
}

.action-btn.secondary:hover {
  background-color: #7f8c8d;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.feature-card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.feature-card h3 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.feature-card p {
  color: #7f8c8d;
}
</style>