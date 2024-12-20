<template>
    <button class="btn btn-primary">
      <slot />
    </button>
  </template>
  
  <style lang="scss" scoped>
  button {
    width: 245px;
    height: 50px;
    border-radius: 90px;
    margin: 50px 0 100px 0;
    transition: background-color 0.3s ease, color 0.3s ease;
  }
  
  button:hover {
    background-color: transparent;
  }
  
  button h6 {
    color: #ffffff;
  }
  
  button:hover h6 {
    color: black;
  }
  
  @media (max-width: 768px) {
    button {
      width: 200px;
      height: 45px;
      margin: 40px 0 80px 0;
    }
  }
  
  @media (max-width: 480px) {
    button {
      width: 180px;
      height: 40px;
      margin: 30px 0 60px 0;
      font-size: 14px;
    }
  }
  </style>
  