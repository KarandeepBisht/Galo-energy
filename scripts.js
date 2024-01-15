document.getElementById('feedback-submit').addEventListener('click', function () {
    var feedbackText = document.getElementById('feedback-text').value;
    var rating = document.querySelector('input[name="rating"]:checked');

    if (feedbackText && rating) {
        alert('Feedback submitted successfully!');
        document.getElementById('feedback-text').value = "";
    } else {
        alert('Please provide feedback and rating.');
    }
});

document.getElementById('subscribe-button').addEventListener('click', function () {
    var emailInput = document.getElementById('subscribe-email').value;
    var errorElement = document.getElementById('subscribe-error');
    
    if (!emailInput || !isValidEmail(emailInput)) {
        errorElement.textContent = "Please enter a valid email address.";
        return;
    }
    errorElement.textContent = "";
    alert("Thank you for subscribing with email: " + emailInput);
    document.getElementById('subscribe-email').value = "";
});

function isValidEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
document.addEventListener('DOMContentLoaded', function () {
    var ratingLabels = document.querySelectorAll('.rating-label');
    ratingLabels.forEach(function (label) {
        label.addEventListener('click', function () {
            var ratingValue = label.getAttribute('data-rating');
            console.log('Selected Rating:', ratingValue);
        });
    });
});

function updateVideosSectionVisibility() {
    var videoList = document.getElementById("video-list");
    var videosSection = document.getElementById("videos");
    
    if (videoList && videoList.children.length > 0) {
        videosSection.style.display = "block"; 
    } else {
        videosSection.style.display = "none"; 
    }
}

function postVideo() {
    var title = document.getElementById("video-title").value.trim();
    var url = document.getElementById("video-url").value.trim();
    var content = document.getElementById("content-text").value.trim();

    if (title === "" || url === "" || content == "") {
        alert("Please enter video title, URL and content.");
        return;
    }

    if (isYouTubeUrl(url)) {
        var videoId = getYouTubeVideoId(url);
        
        var videoElement = document.createElement("div");
        videoElement.innerHTML = `<div class="video-container">
                                     <iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
                                     <p>${title}</p>
                                   </div>`;
                                   
        var videoList = document.getElementById("video-list");
        videoList.appendChild(videoElement);
        
        updateVideosSectionVisibility();
        
        document.getElementById("video-title").value = "";
        document.getElementById("video-url").value = "";
        document.getElementById("content-text").value = "";
    } else {
        var videoElement = document.createElement("div");
        videoElement.innerHTML = `<div class="video-container">
                                     <h4>${title}</h4>
                                     <iframe width="560" height="315" src="${url}" frameborder="0" allowfullscreen></iframe>
                                     <p>${content}</p>
                                   </div>`;

        var videoList = document.getElementById("video-list");
        videoList.appendChild(videoElement);
        
        updateVideosSectionVisibility();
        
        document.getElementById("video-title").value = "";
        document.getElementById("video-url").value = "";
        document.getElementById("content-text").value = ""; 
    }
}

function isYouTubeUrl(url) {
    var regex = /^(https?:\/\/)?(www\.)?(youtube\.com\/|youtu\.be\/)/;
    return regex.test(url);
}

function getYouTubeVideoId(url) {
    var regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    var match = url.match(regex);
    return match ? match[1] : null;
}

window.onload = updateVideosSectionVisibility;