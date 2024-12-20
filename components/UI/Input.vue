<script setup>
defineProps({ 
  id: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ''
  },
  modelValue: {
    type: String,
    default: ''
  }
})

defineEmits(['update:modelValue'])
</script>

<template>
  <div class="form">
    <label :for="id" class="form-label">{{ label }}</label>
    <input 
      :type="type" 
      class="form-control" 
      :id="id" 
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    >
  </div>
</template>

<style scoped>
  label {
    width: 100%;
    height: 24px;
  }

  input {
    border: 1px solid;
    background-color: #D9D9D9;
    width: 420px;
    height: 60px;
    padding: 10px;
    box-sizing: border-box;
  }

  @media (max-width: 768px) {
    input {
      width: 300px;
      height: 50px;
    }
  }

  @media (max-width: 480px) {
    input {
      width: 200px;
      height: 45px;
      font-size: 14px;
    }
  }
</style>
