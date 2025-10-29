<template>
  <div class="login-container">
    <div class="login-card">
      <h1 class="login-title">Login Page</h1>
      <p class="login-subtitle">
        This is where you can log into the secure area. Enter
        <strong>admin</strong> for the username and
        <strong>SuperSecretPassword!</strong> for the password.
      </p>
      
      <form @submit.prevent="handleLogin" class="login-form">
        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>
        
        <div class="form-group">
          <label for="username">Username</label>
          <input
            id="username"
            v-model="credentials.username"
            type="text"
            class="form-input"
            :class="{ 'error': hasError }"
            required
          />
        </div>
        
        <div class="form-group">
          <label for="password">Password</label>
          <input
            id="password"
            v-model="credentials.password"
            type="password"
            class="form-input"
            :class="{ 'error': hasError }"
            required
          />
        </div>
        
        <button type="submit" class="login-btn" :disabled="isLoading">
          {{ isLoading ? 'Logging in...' : 'Login' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      credentials: {
        username: '',
        password: ''
      },
      errorMessage: '',
      hasError: false,
      isLoading: false
    }
  },
  methods: {
    async handleLogin() {
      this.isLoading = true;
      this.errorMessage = '';
      this.hasError = false;
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (this.credentials.username === 'admin' && 
          this.credentials.password === 'SuperSecretPassword!') {
        
        this.$store.dispatch('login', {
          username: this.credentials.username,
          token: 'fake-jwt-token'
        });
        
        this.$router.push('/dashboard');
      } else {
        this.errorMessage = 'Your username is invalid!';
        this.hasError = true;
      }
      
      this.isLoading = false;
    }
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f8f9fa;
}

.login-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.login-title {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.login-subtitle {
  text-align: center;
  color: #7f8c8d;
  margin-bottom: 2rem;
  line-height: 1.5;
}

.login-form {
  margin-bottom: 1rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #2c3e50;
  font-weight: 500;
}

.form-input {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.form-input:focus {
  outline: none;
  border-color: #3498db;
}

.form-input.error {
  border-color: #e74c3c;
}

.error-message {
  background-color: #f8d7da;
  color: #721c24;
  padding: 0.75rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  border: 1px solid #f5c6cb;
}

.login-btn {
  width: 100%;
  background-color: #2c3e50;
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-btn:hover:not(:disabled) {
  background-color: #34495e;
}

.login-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.powered-by {
  text-align: center;
  margin-top: 1rem;
  color: #95a5a6;
  font-size: 0.9rem;
}
</style>