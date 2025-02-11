<script setup>
import { useMemberAuthStore } from '~/stores/Auth/Member/member';
import { useAdminAuthStore } from '~/stores/Auth/Admin/admin';
import { onMounted, ref } from 'vue';
import anime from 'animejs';
import { usePostStore } from '~/stores/MemberContent/post';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';

const memberAuth = useMemberAuthStore();
const adminAuth = useAdminAuthStore();
const postStore = usePostStore();
const router = useRouter();
const route = useRoute();

onMounted(async () => { 
 await postStore.getPost();
  postStore.posts
  if (route.query.keyword) {
    postStore.keyword = route.query.keyword;  
    await postStore.getPost();
  } else {
    router.push('/');
  } 
});

const onKeywordChange = async () => { 
  router.push({ 
    path: '/member/post', 
    query: { keyword: postStore.keyword } 
  }); 
  await postStore.getPost();
};



onMounted(() => {

  const quickAnimation = () => {
    anime({
      targets: '.quick-icon',
      translateX: [
        { value: -100, duration: 1000, easing: 'easeInOutSine' },
        { value: 50, duration: 2000 },
        { value: 75, duration: 750 },
        { value: 100, duration: 750 },
        { value: 0, duration: 1000, easing: 'easeInOutSine' }
      ],
      rotate: {
        duration: 50,
        easing: 'easeInOutSine'
      },
      delay: (el, i) => (i * 100) + 1000
    });
  };

  anime({
    complete: quickAnimation 
  });

  const quickIcon = document.querySelector('.quick-icon');
  if (quickIcon) {
    quickIcon.addEventListener('mouseover', () => {
      anime({
        targets: '.quick-icon',
        translateX: [
          { value: 0, duration: 500, easing: 'easeInOutSine' },
          { value: 20, duration: 500, easing: 'easeInOutSine' },
          { value: -20, duration: 500, easing: 'easeInOutSine' }
        ],
        rotate: {
          value: '+=5',
          duration: 200,
          easing: 'easeInOutSine'
        },
        direction: 'alternate'
      });
    });

    quickIcon.addEventListener('mouseout', () => {
      anime.pause('.quick-icon');
    });
  }

  const turnOnScreen = () => {
    anime({
      targets: '.secure-icon path', 
      fill: {
        value: '#4169e1',
        duration: 500,
        easing: 'easeInOutQuad'
      }
    });
  };

  const turnOffScreen = () => {
    anime({
      targets: '.secure-icon path', 
      fill: {
        value: '#FFFFFF',
        duration: 500,
        easing: 'easeInOutQuad'
      }
    });
  };

  anime({
    targets: '.secure-icon',
    rotate: {
      value: 360,
      duration: 1000,
      easing: 'easeInOutQuad'
    },
    complete: () => {
      turnOnScreen();
      setTimeout(turnOffScreen, 3000);
    }

    
  });

  const secureIcon = document.querySelector('.secure-icon');
  if (secureIcon) {
    secureIcon.addEventListener('mouseover', turnOnScreen);
    secureIcon.addEventListener('mouseout', turnOffScreen);
  }

  anime({
    targets: '.document-icon',
    scale: [1, 1.2, 1],
    direction: 'alternate',
    loop: 5,
    easing: 'easeInOutQuad',
    duration: 500
  });

  
  
});

</script>

<template>
    <div class="hero container d-flex">
        <div class="hero-title">
            <div>
                <h1>
                    Build your 
                    <br> Digital Legacy 
                    <br> With Us 
                </h1>
            </div>
            <div>
                <p>
                    Your academic work deserves more than a dusty shelf! 
                    Our platform lets you securely store and showcase
                    everything from your thesis to project reports in one sleek,
                    accessible space. Share your work, inspire others, and make your mark. 
                    It's time to turn your hard-earned knowledge into a lasting digital legacy!
                </p>
            </div>
            <div class="hero-btn" v-if="memberAuth.userProfile?.role === 'member'">
              <UIRoundedButton>
                  <NuxtLink to="/member/home"><h6>Start Archive Now !</h6></NuxtLink>
              </UIRoundedButton>
            </div>
            <div v-if="adminAuth.adminProfile.role === 'super_admin' || adminAuth.adminProfile.role === 'admin'">
              
            </div>
            <div class="hero-btn" v-if="!memberAuth.isLogin && !adminAuth.isLogin">
                <UIRoundedButton data-bs-toggle="modal" data-bs-target="#loginAccountModal">
                  <h6>Start Archive Now !</h6>
                </UIRoundedButton>
            </div>
        </div>
        <div class="ms-auto">
            <img src="/assets/images/hero.png" alt="">
        </div>
    </div>
    <div class="why-us mb-5">
        <div class="">
            <div class="text-center">
                <h1>Why Choose Our Platform?</h1>
            </div>
        </div>
        <div class="container d-flex align-items-center justify-content-center content">
            <div class="text-center col-4">
                <h2>Quick And Easy Access</h2>
                <div class="quick-icon my-5">
                    <svg width="68" height="53" viewBox="0 0 68 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g filter="url(#filter0_d_69_48)">
                        <path d="M18.1743 17.4835H5.19543C4.53672 17.4835 4 17.9909 4 18.6136C4 19.2364 4.53672 19.7438 5.19543 19.7438H18.1743C18.833 19.7438 19.3698 19.2364 19.3698 18.6136C19.3698 17.9909 18.833 17.4835 18.1743 17.4835Z" fill="white"/>
                        <path d="M18.1745 24.1492H12.1974C11.5387 24.1492 11.002 24.6567 11.002 25.2794C11.002 25.9022 11.5387 26.4096 12.1974 26.4096H18.1745C18.8332 26.4096 19.3699 25.9022 19.3699 25.2794C19.3699 24.6567 18.8332 24.1492 18.1745 24.1492Z" fill="white"/>
                        <path d="M18.1744 30.8148H8.31823C7.65952 30.8148 7.1228 31.3223 7.1228 31.945C7.1228 32.5678 7.65952 33.0752 8.31823 33.0752H18.1744C18.8331 33.0752 19.3698 32.5678 19.3698 31.945C19.3698 31.3223 18.8331 30.8148 18.1744 30.8148Z" fill="white"/>
                        <path d="M62.0391 16.9298C61.0632 14.9692 59.7702 13.1932 58.1845 11.6479C58.0117 11.474 57.8338 11.3037 57.6516 11.137C56.6477 10.2181 56.4095 8.67612 57.2574 7.61148C57.6477 7.10405 57.5502 6.38903 57.0134 6.01999C56.4767 5.65095 55.7204 5.74321 55.3301 6.25064C54.3744 7.44653 52.6962 7.75143 51.2757 7.1807C50.9225 7.03878 50.5658 6.9058 50.2068 6.78114C49.1578 6.43516 48.0843 6.15838 46.9865 5.95079C46.8228 5.92411 46.6578 5.89866 46.4921 5.87473C45.5665 5.74109 44.8396 4.9698 44.8396 4.03469C44.8396 3.05476 45.634 2.26038 46.6139 2.26038H47.2549C47.9136 2.26038 48.4503 1.75295 48.4503 1.13019C48.4503 0.507432 47.9136 0 47.2549 0H40.0091C39.3504 0 38.8137 0.507432 38.8137 1.13019C38.8137 1.75295 39.3504 2.26038 40.0091 2.26038H40.7244C41.6633 2.26038 42.4244 3.02147 42.4244 3.96033C42.4244 4.87724 41.6959 5.62203 40.7843 5.72083C38.5651 5.96136 36.3863 6.53803 34.3491 7.42696C32.2754 8.34956 30.3969 9.54895 28.738 11.0482C26.4203 13.124 24.6393 15.7304 23.5415 18.5674C23.1512 19.5592 22.8584 20.6202 22.6388 21.6812C22.4193 22.7422 22.3217 23.8032 22.2729 24.8642C22.1997 27.9088 22.8828 30.9534 24.2734 33.7212C25.2493 35.6586 26.5179 37.4116 28.1036 38.9569C30.3237 41.1481 33.0805 42.8319 36.0813 43.8467C37.1303 44.1927 38.2038 44.4695 39.3016 44.6771C40.3995 44.8616 41.4973 44.9769 42.6195 45C42.7903 45 42.9855 45 43.1563 45C46.1814 45 49.2066 44.3772 51.939 43.1548C53.9883 42.2553 55.8668 41.0559 57.5014 39.5797C59.8434 37.4808 61.6488 34.8744 62.7466 32.0144C63.1369 31.0226 63.4297 29.9616 63.6249 28.9236C63.8444 27.8626 63.9664 26.7786 63.9908 25.7176C64.0884 22.6961 63.4053 19.6515 62.0391 16.9298ZM61.2828 28.4854C61.0876 29.4311 60.8437 30.3306 60.5021 31.2301C59.5263 33.7442 57.9405 36.0738 55.8668 37.919C54.4274 39.2107 52.7684 40.2947 50.9387 41.0789C48.3771 42.2091 45.4983 42.7858 42.7171 42.6935C41.7413 42.6704 40.7654 42.5782 39.7895 42.3936C38.8137 42.2322 37.8622 41.9785 36.9352 41.6786C34.2759 40.7791 31.8363 39.2799 29.8846 37.3424C28.494 35.9815 27.3474 34.4131 26.4935 32.7063C25.2737 30.2845 24.6637 27.5628 24.7369 24.8872C24.7613 23.9416 24.8589 22.9959 25.0541 22.0733C25.2493 21.1276 25.5176 20.205 25.8348 19.3286C26.7862 16.8145 28.372 14.531 30.4213 12.6858C31.8851 11.3711 33.5441 10.287 35.3982 9.47975C37.8134 8.41876 40.497 7.8652 43.1563 7.8652C43.3026 7.8652 43.4734 7.8652 43.6198 7.8652C44.5956 7.88826 45.5715 7.98052 46.5474 8.16504C47.5232 8.3265 48.4747 8.58021 49.4017 8.90313C52.061 9.80266 54.5006 11.2788 56.4523 13.2163C57.8429 14.6002 58.9895 16.1686 59.8678 17.8985C61.0632 20.3203 61.6732 22.9959 61.6 25.6715C61.5756 26.5941 61.478 27.5628 61.2828 28.4854Z" fill="white"/>
                        <path d="M50.6216 17.3911L46.1718 21.1993C45.7551 21.5559 45.1548 21.6055 44.6444 21.4045C44.4249 21.3353 44.2053 21.2661 43.9857 21.243C43.7418 21.1969 43.5222 21.1738 43.3026 21.1738C42.6439 21.1507 41.9608 21.2891 41.3509 21.5659C40.9118 21.7504 40.5214 22.0042 40.1799 22.3271C39.6919 22.7653 39.326 23.2958 39.1064 23.8955C39.0332 24.1031 38.9601 24.3107 38.9113 24.5413C38.8625 24.772 38.8381 24.9796 38.8381 25.2102C38.8137 25.856 38.9601 26.4788 39.2528 27.0554C39.448 27.4706 39.7163 27.8166 40.0579 28.1395C40.5214 28.6008 41.1069 28.9467 41.7169 29.1543C41.9364 29.2235 42.156 29.2927 42.3756 29.3158C42.5951 29.3619 42.8391 29.385 43.0587 29.385C43.1075 29.385 43.1318 29.385 43.1806 29.385C43.8149 29.385 44.4493 29.2466 45.0104 28.9929C45.4251 28.8084 45.8398 28.5546 46.1814 28.2548C46.6693 27.8166 47.0353 27.263 47.2792 26.6864C47.3524 26.4788 47.4256 26.2712 47.4744 26.0405C47.5232 25.8099 47.5476 25.6023 47.5476 25.3717C47.5718 24.7548 47.4284 24.1154 47.1412 23.5429C47.1357 23.5321 47.1342 23.5182 47.1263 23.5091C47.1115 23.492 47.1184 23.4719 47.1356 23.4572L52.2805 19.0749C52.7684 18.6597 52.8172 17.9216 52.3781 17.4603C51.8902 17.0221 51.1339 16.976 50.6216 17.3911ZM45.092 25.4839C45.0857 25.5838 45.0707 25.6744 45.0478 25.7719C45.0353 25.8249 45.0228 25.8781 45.0104 25.9252C44.9128 26.1789 44.742 26.4327 44.5224 26.6172C44.3761 26.7556 44.2053 26.8709 44.0101 26.9401C43.7418 27.0554 43.449 27.1015 43.1562 27.1015C43.1506 27.1015 43.1448 27.1015 43.1389 27.1013C42.9391 27.0963 42.7408 27.0553 42.5463 27.0093C42.278 26.917 42.0096 26.7556 41.8144 26.548C41.6681 26.4096 41.5461 26.2481 41.4485 26.0636C41.3265 25.8099 41.2533 25.5331 41.2533 25.2563C41.2533 25.0565 41.2985 24.8574 41.349 24.664C41.3496 24.6616 41.3503 24.6591 41.3509 24.6566C41.4485 24.4029 41.6193 24.1492 41.8388 23.9647C41.9852 23.8263 42.156 23.711 42.3512 23.6187C42.6195 23.5034 42.8879 23.4573 43.1562 23.4573C43.1806 23.4573 43.1806 23.4573 43.205 23.4573C43.2108 23.4573 43.2166 23.4573 43.2224 23.4575C43.4222 23.4627 43.6204 23.5035 43.8149 23.5495C44.1077 23.6418 44.3517 23.8032 44.5468 24.0108C44.6932 24.1492 44.8152 24.3337 44.9128 24.4952C45.0093 24.696 45.0753 24.9112 45.0865 25.1294C45.0924 25.2441 45.0993 25.3693 45.092 25.4839Z" fill="white"/>
                        </g>
                        <defs>
                        <filter id="filter0_d_69_48" x="0" y="0" width="68" height="53" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                        <feOffset dy="4"/>
                        <feGaussianBlur stdDeviation="2"/>
                        <feComposite in2="hardAlpha" operator="out"/>
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_69_48"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_69_48" result="shape"/>
                        </filter>
                        </defs>
                    </svg>
                </div>
                <p>
                    Easily access academic <br> documents anytime, <br> anywhere
                </p>
            </div>
            <div class="text-center col-4">
                <h2>Organize And Secure</h2>
                <div class="secure-icon my-5"> 
                    <svg width="60" height="45" viewBox="0 0 60 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M59.7841 39.1777C56.3185 34.6178 54.4421 29.0481 54.4421 23.3207V2.58955C54.4421 1.15966 53.3339 0 51.9673 0H8.03273C6.66609 0 5.55879 1.15966 5.55879 2.58955V23.3198C5.55879 29.0477 3.68204 34.6178 0.215742 39.1777C0.0760547 39.361 0 39.5878 0 39.8231V42.9341C0 44.0758 0.884531 45 1.97461 45H58.0254C59.1155 45 60 44.0758 60 42.9341V39.8231C60 39.5878 59.9239 39.361 59.7841 39.1777ZM9.04992 16.0746C9.04992 9.21478 14.6109 3.65381 21.4707 3.65381H38.5292C45.389 3.65381 50.95 9.21478 50.95 16.0746C50.95 22.9344 45.389 28.4953 38.5292 28.4953H21.4707C14.6109 28.4953 9.04992 22.9344 9.04992 16.0746ZM35.6393 40.9812C35.6393 41.8438 34.94 42.5431 34.0774 42.5431H25.9226C25.06 42.5431 24.3607 41.8438 24.3607 40.9812C24.3607 40.1185 25.06 39.4192 25.9226 39.4192H34.0774C34.94 39.4192 35.6393 40.1185 35.6393 40.9812Z" fill="white" style="transition: fill 0.5s ease-in-out;"/>
                    </svg>
                </div>
                <p>
                    Your data is securely stored <br> and accessible only to <br> authorized users
                </p>
            </div>
            <div class="text-center col-4">
                <h2>Support Multiple Document</h2>
                <div class="my-5">
                    <img class="document-icon" src="/assets/images/Document.svg" alt="">
                </div>
                <p>
                    Store and manage theses, <br> proposals, papers, lab reports, <br> and more
                </p>
            </div>
        </div>
    </div>
    <div class="main container mb-5 mt-5">
      <div class="d-flex justify-content-center">
                <span>
                  <svg width="30px" height="30px" viewBox="0 0 1024 1024" class="main-icon flex justify-center mt-2" version="1.1"
                      xmlns="http://www.w3.org/2000/svg" >
                      <path
                          d="M448 768A320 320 0 1 0 448 128a320 320 0 0 0 0 640z m297.344-76.992l214.592 214.592-54.336 54.336-214.592-214.592a384 384 0 1 1 54.336-54.336z"
                          fill="#000000" />
                  </svg>
                  <input type="text" class="form-control main-search" 
                  placeholder="Search For Documents..."
                  aria-label="Search" 
                  v-model="postStore.keyword" 
                  @keyup.enter="onKeywordChange"
                  >
                </span>
        </div>
      <div class="d-flex justify-items-center justify-content-center mb-5">
            <h2 class="main-category">
              Looking for something specific? Start searching now!
            </h2>
        </div>
       
        
        <!-- <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mt-4">
            <div class="col main-colunm d-flex justify-content-center">
              <div class="category-card d-flex align-items-center"> 
                <a href="">
                    <img src="/assets/images/fill.svg" alt="">
                </a>
                <a href="">
                    <p class="category-name ms-2 mt-4">Technology</p>
                </a>
              </div>
            </div>
            <div class="col main-colunm d-flex justify-content-center">
              <div class="category-card d-flex align-items-center"> 
                <a href="">
                    <img src="/assets/images/fill.svg" alt="">
                </a>
                <a href="">
                    <p class="category-name ms-2 mt-4">Business</p>
                </a>
              </div>
            </div>
            <div class="col main-colunm d-flex justify-content-center">
              <div class="category-card d-flex align-items-center"> 
                <a href="">
                    <img src="/assets/images/fill.svg" alt="">
                </a>
                <a href="">
                    <p class="category-name ms-2 mt-4">Law</p>
                </a>
              </div>
            </div>
            <div class="col main-colunm d-flex justify-content-center">
              <div class="category-card d-flex align-items-center"> 
                <a href="">
                    <img src="/assets/images/fill.svg" alt="" class="ms-2">
                </a>
                <a href="">
                    <p class="category-name ms-2 mt-4">Sains & Math</p>
                </a>
              </div>
            </div>
            <div class="col main-colunm d-flex justify-content-center">
              <div class="category-card d-flex align-items-center"> 
                <a href="">
                    <img src="/assets/images/fill.svg" alt="">
                </a>
                <a href="">
                    <p class="category-name ms-2 mt-4">Tourism</p>
                </a>
              </div>
            </div>
            <div class="col main-colunm d-flex justify-content-center">
              <div class="category-card d-flex align-items-center"> 
                <a href="">
                    <img src="/assets/images/fill.svg" alt="" class="ms-3">
                </a>
                <a href="">
                    <p class="category-name ms-1 mt-4">Social</p>
                </a>
              </div>
            </div>
        </div>
        <div class="d-flex justify-content-center mt-5">
         <button class="btn btn-dark see-more-btn"><h6>See more</h6></button>
        </div> -->
    </div>
</template>

<style lang="scss" scoped>
    .hero {
    margin-top: 50px;

    &-title {
        h1 {
            font-size: 48px;
            letter-spacing: 5px;
            font-weight: 900;
        }
        p {
            margin-top: 50px;
            width: 66%;
        }
    }

    &-btn {
        button {
            h6 {
                letter-spacing: 2px;
                margin-top: 7px;
                font-size: 16px;
                font-weight: 700;
                color: #ffffff;
            }
        }
    }
    @media (max-width: 768px) {
        margin-top: 30px;

        &-title {
            h1 {
                font-size: 36px;
                letter-spacing: 3px;
            }
            p {
                margin-top: 30px;
                width: 100%;
            }
        }

        &-btn {
            button h6 {
                font-size: 14px;
                letter-spacing: 1.5px;
            }
        }
        img{
          display: none;
        }
    }

    @media (max-width: 480px) {
        &-title h1 {
            font-size: 28px;
        }

        &-title p {
            font-size: 14px;
        }

        &-btn button h6 {
            font-size: 12px;
        }

        img {
            display: none;
        }
    }
}


.why-us {
    background-color: #1E1E1E;
    width: 100%;
    height: 500px;
    margin-bottom: 20px;

    h1{
      font-size: 36px;
      padding-top: 32px;
      color: #FFFFFF;
    }
    h2{
      color: #ffffff;
      font-size: 26px;
    }
    p{
      color: #ffffff;
      font-size: 18px;
    }

    svg {
        width: 100%; 
        height: auto;
        max-width: 60px;
    }

    img{
      width: 100%;
      height: auto;
      max-width: 55px;
    }

    @media(max-width: 1024px){
      width: 100%;
      height: 500px;
      margin-bottom: 20px;
      h1{
        font-size: 36px;
        margin-top: 32px;
        color: #FFFFFF;
      }
      h2{
        color: #ffffff;
        font-size: 22px;
      }
      p{
        color: #ffffff;
        font-size: 18px;
      }
      svg {
          width: 100%; 
          height: auto;
          max-width: 50px;
      }

      img{
        width: 100%;
        height: auto;
        max-width: 45px;
      }
    }

    @media (max-width: 768px) {
      width: auto;

      height: auto;
        svg {
            max-width: 50px;
        }
        h2 {
          font-size: 16px;
        }
        p{
          font-size: 12px;
        }

        img{
          max-width: 50px;
          height: 43px;
        }
    }

    @media (max-width: 480px) {
      width: auto;
      height: auto;
        h1{
          font-size: 16px;
          padding-top: 32px;
          max-width: 100%;
        }
        h2{
          font-size: 12px;
          max-width: 100%;
        }
        p{
          font-size: 8px;
          max-width: 100%;
        }
        svg {
            max-width: 25px;
        }
        img{
          max-width: 25px;
          height: 26px;
        }
    }
}

.content {
    margin-top: 120px;
}

.hero-btn {
    button:hover {
        h6 {
            color: #000000;
        }
    }
}

.main {
  margin-bottom: 200px;

  &-search {
    width: 450px;
    height: 50px;
    border-radius: 50px;
    background-color: transparent;
    border-color: #000000;
    position: relative;
    padding-left: 50px;

    &:focus {
      background-color: transparent;
    }

    @media (max-width: 768px) {
      width: 300px;
      height: 40px;
      padding-left: 40px;
    }

    @media (max-width: 480px) {
      width: 100%;
      height: 40px;
      padding-left: 40px;
    }
  }

  &-icon {
    position: absolute;
    margin: 5px 0 0 13px;
    pointer-events: none;

    @media (max-width: 768px) {
      margin: 4px 0 0 10px;
    }
  }

  &-category {
    margin-top: 100px;

    @media (max-width: 768px) {
      margin-top: 50px;
    }

    @media (max-width: 480px) {
      margin-top: 30px;
    }
  }
}

.category-card {
  display: flex;
  align-items: center;
  margin: 20px 10px 20px 30px;

  a {
    color: #000000;
    text-decoration: none;
  }

  @media (max-width: 768px) {
    margin: 15px 5px 15px 20px;
    flex-direction: column;
    text-align: center;
  }

  @media (max-width: 480px) {
    margin: 10px 0;
    flex-direction: column;
    text-align: center;
  }
}

.category-card img {
  width: 70px;
  height: 70px;

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
  }

  @media (max-width: 480px) {
    width: 50px;
    height: 50px;
  }
}

.see-more-btn {
  width: 237px;
  height: 36px;
  border-radius: 30px;

  h6 {
    color: #ffffff;
    font-weight: 500;
    font-size: 20px;

    @media (max-width: 768px) {
      font-size: 18px;
    }

    @media (max-width: 480px) {
      font-size: 16px;
    }
  }

  &:hover {
    h6 {
      color: black;
    }
    background-color: transparent;
    cursor: pointer;
    transition-duration: 250ms;
  }

  @media (max-width: 768px) {
    width: 200px;
    height: 32px;
  }

  @media (max-width: 480px) {
    width: 180px;
    height: 30px;
  }
}

.btn-close{
    width: 50px;
}

//modal
.modal-content{
  background-color:#D9D9D9;
  h1{
    margin-left: 20px;
    font-size: 288px;
    height: 45px;
  }
  a{
    text-decoration: none;
  }
}
</style>