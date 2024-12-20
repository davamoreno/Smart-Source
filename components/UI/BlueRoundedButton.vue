<template>
    <button class="btn">
      <slot />
    </button>
  </template>
  
  <style scoped>
    button {
      width: 100%;
      height: 48px;
      background-color: #0000FF;
      color: #FFFFFF;
      border: none;
      font-size: 16px;
      font-weight: bold;
      text-align: center;
      cursor: pointer;
      margin-top: 20px;
    }
  
    @media (max-width: 768px) {
      button {
        height: 40px;
        font-size: 14px;
      }
    }
  
    @media (max-width: 480px) {
      button {
        height: 36px;
        font-size: 12px;
      }
    }
  </style>
  