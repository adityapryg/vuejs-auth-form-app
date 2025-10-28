<template>
  <div class="form-container">
    <div class="form-card">
      <h1 class="form-title">Complete Web Form</h1>
      
      <form @submit.prevent="handleSubmit" class="web-form">
        <div class="form-row">
          <div class="form-group half">
            <label for="firstName">First name</label>
            <input
              id="firstName"
              v-model="formData.firstName"
              type="text"
              class="form-input"
              required
            />
          </div>
          <div class="form-group half">
            <label for="lastName">Last name</label>
            <input
              id="lastName"
              v-model="formData.lastName"
              type="text"
              class="form-input"
              required
            />
          </div>
        </div>
        
        <div class="form-group">
          <label for="jobTitle">Job title</label>
          <input
            id="jobTitle"
            v-model="formData.jobTitle"
            type="text"
            class="form-input"
            required
          />
        </div>
        
        <div class="form-group">
          <label>Highest level of education</label>
          <div class="radio-group">
            <label class="radio-label">
              <input
                type="radio"
                v-model="formData.education"
                value="High School"
                class="radio-input"
              />
              <span class="radio-text">High School</span>
            </label>
            <label class="radio-label">
              <input
                type="radio"
                v-model="formData.education"
                value="College"
                class="radio-input"
              />
              <span class="radio-text">College</span>
            </label>
            <label class="radio-label">
              <input
                type="radio"
                v-model="formData.education"
                value="Grad School"
                class="radio-input"
              />
              <span class="radio-text">Grad School</span>
            </label>
          </div>
        </div>
        
        <div class="form-group">
          <label>Sex</label>
          <div class="radio-group">
            <label class="radio-label">
              <input
                type="radio"
                v-model="formData.sex"
                value="Male"
                class="radio-input"
              />
              <span class="radio-text">Male</span>
            </label>
            <label class="radio-label">
              <input
                type="radio"
                v-model="formData.sex"
                value="Female"
                class="radio-input"
              />
              <span class="radio-text">Female</span>
            </label>
            <label class="radio-label">
              <input
                type="radio"
                v-model="formData.sex"
                value="Prefer not to say"
                class="radio-input"
              />
              <span class="radio-text">Prefer not to say</span>
            </label>
          </div>
        </div>
        
        <div class="form-group">
          <label for="experience">Years of experience</label>
          <select
            id="experience"
            v-model="formData.experience"
            class="form-select"
            required
          >
            <option value="">Select an option</option>
            <option value="0-1">0-1</option>
            <option value="2-4">2-4</option>
            <option value="5-9">5-9</option>
            <option value="10+">10+</option>
          </select>
        </div>
        
        <div class="form-group">
          <label for="date">Date</label>
          <input
            id="date"
            v-model="formData.date"
            type="date"
            class="form-input"
            required
          />
        </div>
        
        <div class="form-actions">
          <button type="submit" class="submit-btn" :disabled="!isFormValid || isSubmitting">
            {{ isSubmitting ? 'Submitting...' : 'Submit' }}
          </button>
          <button type="button" @click="resetForm" class="reset-btn">
            Reset Form
          </button>
        </div>
      </form>
      
      <div v-if="submissionResult" class="submission-result">
        <h3>Form Submitted Successfully!</h3>
        <div class="result-data">
          <h4>Submitted Data:</h4>
          <pre>{{ JSON.stringify(submissionResult, null, 2) }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CompleteForm',
  data() {
    return {
      formData: {
        firstName: '',
        lastName: '',
        jobTitle: '',
        education: '',
        sex: '',
        experience: '',
        date: ''
      },
      isSubmitting: false,
      submissionResult: null
    }
  },
  computed: {
    isFormValid() {
      return (
        this.formData.firstName &&
        this.formData.lastName &&
        this.formData.jobTitle &&
        this.formData.education &&
        this.formData.sex &&
        this.formData.experience &&
        this.formData.date
      );
    }
  },
  methods: {
    async handleSubmit() {
      if (!this.isFormValid) return;
      
      this.isSubmitting = true;
      
      // Simulate API submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      this.submissionResult = {
        ...this.formData,
        submittedAt: new Date().toISOString(),
        submittedBy: this.$store.state.user.username
      };
      
      this.isSubmitting = false;
      
      // Scroll to result
      this.$nextTick(() => {
        document.querySelector('.submission-result')?.scrollIntoView({
          behavior: 'smooth'
        });
      });
    },
    
    resetForm() {
      this.formData = {
        firstName: '',
        lastName: '',
        jobTitle: '',
        education: '',
        sex: '',
        experience: '',
        date: ''
      };
      this.submissionResult = null;
    }
  }
}
</script>

<style scoped>
.form-container {
  max-width: 600px;
  margin: 0 auto;
}

.form-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.form-title {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 2rem;
}

.web-form {
  margin-bottom: 2rem;
}

.form-row {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group.half {
  flex: 1;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #2c3e50;
  font-weight: 500;
}

.form-input,
.form-select {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.form-input:focus,
.form-select:focus {
  outline: none;
  border-color: #3498db;
}

.radio-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.radio-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-weight: normal !important;
}

.radio-input {
  margin-right: 0.5rem;
  width: auto;
}

.radio-text {
  color: #2c3e50;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
}

.submit-btn,
.reset-btn {
  padding: 0.75rem 2rem;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  border: none;
}

.submit-btn {
  background-color: #27ae60;
  color: white;
}

.submit-btn:hover:not(:disabled) {
  background-color: #219a52;
}

.submit-btn:disabled {
  background-color: #95a5a6;
  cursor: not-allowed;
}

.reset-btn {
  background-color: #95a5a6;
  color: white;
}

.reset-btn:hover {
  background-color: #7f8c8d;
}

.submission-result {
  margin-top: 2rem;
  padding: 1.5rem;
  background-color: #d4edda;
  border: 1px solid #c3e6cb;
  border-radius: 4px;
}

.submission-result h3 {
  color: #155724;
  margin-bottom: 1rem;
}

.result-data h4 {
  color: #155724;
  margin-bottom: 0.5rem;
}

.result-data pre {
  background-color: #f8f9fa;
  padding: 1rem;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  overflow-x: auto;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .form-row {
    flex-direction: column;
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  .submit-btn,
  .reset-btn {
    width: 100%;
  }
}
</style>