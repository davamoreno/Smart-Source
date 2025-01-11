<template>
  <div class="col-auto">
    <div class="document-card">
      <a href="" style="text-decoration: none;">
        <div class="card-header text-center">
          <a class="btn" style="border: 1px solid black;
                                width: 52px;
                                height: 53px;
                                border-radius: 100%;
                                margin-left: 75%;
                                box-shadow: 0px 0px 4px 0px;
                                opacity: 70%;
                                position: relative;">
            <img src="/images/bookmark.svg" alt="Bookmark" class="icon-bookmark" />
          </a>
          <img src="/images/File_light.svg" alt="Document" class="document-img my-4" />
        </div>
        <div class="container-fluid">
        <p class="document-category">{{ category }}</p>
        <h1 class="document-title">{{ title }}</h1>
        <p class="document-publisher">Published by {{ publisher }}</p>
        </div>
      </a>
      <button class="btn">
        <img src="/images/heart.svg" alt="Love" class="icon-love" />
      </button>
    </div>
  </div>
</template>
  
  <script>
  export default {
    props: {
      title: {
        type: String,
        required: true,
      },
      category: {
        type: String,
        required: true,
      },
      publisher: {
        type: String,
        required: true,
      },
    },
  };
  </script>
  
  <style lang="scss">
  /* Styling Document Card */
  .document-card {
    background-color: #ffffff;
    width: 265px;
    height: 100%;
    border: 1px solid #ddd;
    border-radius: 10px;
    padding: 15px;
    text-align: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    }
  }
  
  .document-img {
    max-width: 100%; /* Sesuaikan dengan ukuran container */
    height: auto;
    border-radius: 5px;
  }
  
  .document-category {
    font-size: 16px;
    color: #000;
    margin-bottom: 5px;
  }
  
  .document-title {
    font-size: 24px;
    font-weight: 600;
    color: #333;
    margin-bottom: 8px;
  }
  
  .document-publisher {
    font-size: 16px;
    color: #000000;
  }

  .document-card {
  position: relative;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 15px;
  text-align: start;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(18, 16, 16, 0.15);
  }

  .card-header {
    position: relative;
  }

  .icon-bookmark {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 30px;
    cursor: pointer;
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 0.7;
    }
  }

  .card-footer {
    display: flex;
    align-items: center; // Sejajarkan ikon dan teks
    justify-content: flex-start; // Pastikan konten ada di sebelah kiri
    margin-top: 10px;

    .icon-love {
      width: 20px;
      cursor: pointer;
      transition: opacity 0.3s ease;

      &:hover {
        opacity: 0.7;
      }
    }
  }
}

  </style>
  