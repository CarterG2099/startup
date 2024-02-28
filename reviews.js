    class Reviews {
        constructor(mealTitle, userName, review, rating, votes, reviewsLink) {
            this.mealTitle = mealTitle;
            this.userName = userName
            this.review = review;
            this.rating = rating;
            this.votes = votes;
            this.reviewsLink = reviewsLink;
        }

    }
    class ReviewPage {
        constructor() {
            const userNameEl = document.querySelector('.user-name');
            if (window.location.pathname.includes("reviews.html")) {
                userNameEl.textContent = this.getUserName() + userNameEl.textContent;
                console.log('reviews.js loaded');
                // Your code specific to the reviews page
                this.generateReviewCards();
            } else {
                console.log('reviews.js not applicable to this page');
            }
        }

        getUserName() {
            return localStorage.getItem('userName') ?? 'UserName';
        }

        generateReviewCards() {
            const reviewList = JSON.parse(localStorage.getItem('reviewList'));
            console.log(reviewList);
            console.log(reviewList.length);
            const cardGroup = document.getElementById('card-group');
            console.log(cardGroup);
            const reviewListLength = reviewList?.length ?? 0;
        
            if(reviewListLength === 0) {
                console.log(cardGroup)
                const noReview = document.createElement('div');
                noReview.textContent = 'No reviews yet';
                cardGroup.appendChild(noReview);
                return;
            }
            for(let i = 0; i < reviewListLength; i++) {
                const card = document.createElement('div');
                card.className = 'card';

                const cardBody = document.createElement('div');
                cardBody.className = 'card-body';

                const cardTitle = document.createElement('h5');
                cardTitle.className = 'card-title';
                cardTitle.textContent = reviewList[i].userName;
                cardBody.appendChild(cardTitle);

                const cardReview = document.createElement('p');
                cardReview.className = 'card-text';
                cardReview.textContent = reviewList[i].review;

                const cardRatingParagraph = document.createElement('p')
                const cardRating = document.createElement('small');
                cardRating.className = 'text-muted';
                cardRating.textContent = `Rating: ${reviewList[i].rating}/5`;

                cardRatingParagraph.appendChild(cardRating)
                cardReview.appendChild(cardRatingParagraph);
                cardBody.appendChild(cardTitle)
                cardBody.appendChild(cardReview);
                card.appendChild(cardBody);
                cardGroup.appendChild(card);
            }
        
        }


        tempReviewList1 = [
            new Reviews('meal', 'John', 'This is a great recipe', 5, 10, 'reviews.html'),
            new Reviews('meal', 'Jane', 'This is a great recipe', 5, 10, 'reviews.html'),
            new Reviews('meal', 'Jill', 'This is a great recipe', 5, 10, 'reviews.html'),
            new Reviews('meal', 'Jack', 'This is a great recipe', 5, 10, 'reviews.html')
        ]
        
        tempReviewList2 = [
            new Reviews('meal', 'Sam', 'This is a great recipe', 5, 10, 'reviews.html'),
            new Reviews('meal', 'Tony', 'This is a great recipe', 5, 10, 'reviews.html'),
            new Reviews('meal', 'Abby', 'This is a great recipe', 5, 10, 'reviews.html'),
            new Reviews('meal', 'Tina', 'This is a great recipe', 5, 10, 'reviews.html')
        ]
    }

    document.addEventListener('DOMContentLoaded', function () {
        const reviewPage = new ReviewPage();
    });
    

