<template>
    <div class="upload-zone-container">
      <div
        class="upload-zone"
        @dragover.prevent="handleDragOver"
        @dragleave="handleDragLeave"
        @drop.prevent="handleDrop"
        :class="{ 'is-dragging': isDragging }"
        @click="openFileDialog"
      >
        <div class="icon-container">
            <svg width="50" height="50" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_1181_253)">
                <path d="M33.4418 3.12061H14.1744V11.1106H37.5569V7.23402C37.5569 4.96567 35.7108 3.12061 33.4418 3.12061Z" fill="#CED9F9"/>
                <path d="M22.5352 12.3403H0V4.92636C0 2.20972 2.21068 0 4.92828 0H12.1336C12.8497 0 13.5396 0.150925 14.1664 0.434509C15.0418 0.828964 15.7939 1.47913 16.3213 2.3286L22.5352 12.3403Z" fill="#1640C1"/>
                <path d="M42 14.0001V37.8815C42 40.1527 40.1511 42 37.8789 42H4.12111C1.84891 42 0 40.1527 0 37.8815V9.88062H37.8789C40.1511 9.88062 42 11.7286 42 14.0001Z" fill="#2354E6"/>
                <path d="M42 14.0001V37.8815C42 40.1527 40.1511 42 37.8789 42H21V9.88062H37.8789C40.1511 9.88062 42 11.7286 42 14.0001Z" fill="#1849D6"/>
                <path d="M32.0479 25.9398C32.0479 32.0322 27.0918 36.9887 21 36.9887C14.9082 36.9887 9.95203 32.0322 9.95203 25.9398C9.95203 19.8483 14.9082 14.8918 21 14.8918C27.0918 14.8918 32.0479 19.8483 32.0479 25.9398Z" fill="#E7ECFC"/>
                <path d="M32.0479 25.9398C32.0479 32.0322 27.0918 36.9887 21 36.9887V14.8918C27.0918 14.8918 32.0479 19.8483 32.0479 25.9398Z" fill="#CED9F9"/>
                <path d="M24.561 26.0753C24.3306 26.2704 24.0483 26.3656 23.7685 26.3656C23.4183 26.3656 23.0703 26.2173 22.8268 25.9282L22.2304 25.2213V29.8494C22.2304 30.5287 21.6793 31.0799 21 31.0799C20.3207 31.0799 19.7695 30.5287 19.7695 29.8494V25.2213L19.1732 25.9282C18.7342 26.4476 17.9584 26.514 17.439 26.0753C16.9199 25.6373 16.8532 24.8612 17.2913 24.3418L19.7269 21.4543C20.0444 21.0788 20.5078 20.8628 21 20.8628C21.4922 20.8628 21.9555 21.0788 22.2731 21.4543L24.7087 24.3418C25.1467 24.8612 25.0801 25.6373 24.561 26.0753Z" fill="#6C8DEF"/>
                <path d="M24.561 26.0753C24.3306 26.2704 24.0483 26.3656 23.7686 26.3656C23.4183 26.3656 23.0703 26.2173 22.8268 25.9282L22.2305 25.2213V29.8494C22.2305 30.5287 21.6793 31.0799 21 31.0799V20.8628C21.4922 20.8628 21.9555 21.0788 22.2731 21.4543L24.7087 24.3418C25.1467 24.8612 25.0801 25.6373 24.561 26.0753Z" fill="#3B67E9"/>
              </g>
              <defs>
                <clipPath id="clip0_1181_253">
                  <rect width="42" height="42" fill="white"/>
                </clipPath>
              </defs>
            </svg>
        </div>

        <p v-if="!files.length">Drag your file to start uploading</p>
        <p v-else>Uploaded files:</p>
        <ul v-if="files.length" class="file-list">
          <li v-for="(file, index) in files" :key="index">
            {{ file.name }} ({{ (file.size / 1024).toFixed(2) }} KB)
            <button @click.stop="removeFile(index)" class="remove-btn">Remove</button>
          </li>
        </ul>
        <div class="or-container" v-if="!files.length">
          <span>OR</span>
        </div>
        <button 
          v-if="!files.length" 
          class="browse-button" 
          @click.stop="openFileDialog" 
          type="button"
        >
          Browse files
        </button>

        <input
          type="file"
          ref="fileInput"
          multiple
          @change="handleFileInput"
          hidden
        />
      </div>
      <p class="file-support-info">Only support .pdf files</p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';

  const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  const files = ref([]);
  const isDragging = ref(false);
  const fileInput = ref(null);
  
  const handleDragOver = () => {
    isDragging.value = true;
  };
  
  const handleDragLeave = () => {
    isDragging.value = false;
  };
  
  const handleDrop = (event) => {
    isDragging.value = false;
    const droppedFiles = Array.from(event.dataTransfer.files);
    const validFiles = droppedFiles.filter(file => allowedTypes.includes(file.type));

    if (validFiles.length !== droppedFiles.length) {
        alert('Some files were rejected because they are not in the allowed formats (.pdf)');
    }

    files.value.push(...validFiles);
};

  
  const handleFileInput = () => {
    const selectedFiles = Array.from(fileInput.value.files);
    const validFiles = selectedFiles.filter(file => {
        return allowedTypes.includes(file.type) && !files.value.some(f => f.name === file.name);
    });

    if (validFiles.length !== selectedFiles.length) {
        alert('Some files were rejected because they are duplicates or not in the allowed formats (.pdf, .docx, .doc)');
    }

    files.value.push(...validFiles);
};

  
  const openFileDialog = () => {
    fileInput.value.click();
  };
  const removeFile = (index) => {
  files.value.splice(index, 1);
};

const clearAllFiles = () => {
    files.value = [];
};

  </script>
  
  <style scoped>
  .upload-zone-container {
    max-width: 600px;
    margin: auto;
    text-align: center;
    font-family: Arial, sans-serif;
  }
  
  .upload-zone {
    border: 2px dashed #007bff;
    border-radius: 10px;
    padding: 30px;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .upload-zone.is-dragging {
    background-color: #e9f5ff;
  }
  
  .icon-container {
    margin-bottom: 15px;
  }
  
  .upload-icon {
    width: 48px;
    height: 48px;
  }
  
  .file-list {
    list-style: none;
    padding: 0;
    margin: 10px 0;
    font-size: 0.9rem;
    color: #333333;
  }
  
  .file-list li {
    margin: 5px 0;
  }
  
  .or-container {
    margin: 15px 0;
    font-size: 1rem;
    color: #666666;
  }
  
  .browse-button {
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
  }
  
  .browse-button:hover {
    background-color: #0056b3;
  }
  
  .file-support-info {
    margin-top: 10px;
    font-size: 0.9rem;
    color: #666666;
  }
  .remove-btn {
  background-color: #ff4d4f;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.remove-btn:hover {
  background-color: #d9363e;
}
  </style>
  