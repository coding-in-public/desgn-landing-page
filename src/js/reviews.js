const reviewsSlider = document.querySelector('.reviews');
const reviewBtns = document.querySelectorAll('.review-btn');
const reviews = [...document.querySelectorAll('.review')];
const indicators = [...document.querySelectorAll('.indicator')];
let isMoving;
let currentIndex = 1;

function showActiveIndicator(){
  indicators.forEach(ind => ind.classList.remove('active'));
  let activeIndicator;
  if(currentIndex === 0 || currentIndex === reviews.length - 2){
    activeIndicator = indicators.length - 1;
  } else if (currentIndex === reviews.length - 1 || currentIndex === 1){
    activeIndicator = 0;
  } else {
    activeIndicator = currentIndex - 1;
  }
  indicators[activeIndicator].classList.add('active');
}

function moveSlider(){
  reviewsSlider.style.transform = `translateX(-${currentIndex * 100}%)`;
  showActiveIndicator();
};

function handleReviewBtnClick(e){
  if(isMoving){ return };
  isMoving = true;
  e.currentTarget.id === 'next'
    ? currentIndex++
    : currentIndex--;
  moveSlider();
}

function handleIndicatorClick(e){
  if(isMoving){ return };
  isMoving = true;
  currentIndex = indicators.indexOf(e.target) + 1;
  moveSlider();
}

// Event Listeners
reviewBtns.forEach(btn => {
  btn.addEventListener('click', handleReviewBtnClick);
})

indicators.forEach(ind => {
  ind.addEventListener('click', handleIndicatorClick);
})

reviewsSlider.addEventListener('transitionend', () => {
  isMoving = false;
  if(currentIndex === 0){
    currentIndex = reviews.length - 2;
    reviewsSlider.style.transitionDuration = '1ms';
    return moveSlider();
  }
  if(currentIndex === reviews.length - 1){
    currentIndex = 1;
    reviewsSlider.style.transitionDuration = '1ms';
    return moveSlider();
  }
  reviewsSlider.style.transitionDuration = '300ms';
})
