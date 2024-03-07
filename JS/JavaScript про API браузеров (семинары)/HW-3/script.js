// app.js

const accessKey = "";
const apiUrl = "https://api.unsplash.com/photos/random";
const likeKey = "likedPhotos";
const viewedKey = "viewedPhotos";

const photoContainer = document.getElementById("photo-container");
const photoElement = document.getElementById("photo");
const photographerInfo = document.getElementById("photographer-info");
const likeButton = document.getElementById("like-button");
const prevButton = document.getElementById("prev-button");
const likesCountElement = document.getElementById("likes");

let likedPhotos = JSON.parse(localStorage.getItem(likeKey)) || [];
let viewedPhotos = JSON.parse(localStorage.getItem(viewedKey)) || [];

async function fetchRandomPhoto() {
  try {
    const response = await fetch(`${apiUrl}?client_id=${accessKey}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching random photo:", error);
  }
}

function displayPhoto(photo) {
  const imageUrl =
    photo.urls?.regular || photo.urls?.full || photo.urls?.small || "";
  photoElement.src = imageUrl;
  photographerInfo.innerHTML = `Photo by ${photo.user?.name || "Unknown"}`;
}

function likePhoto() {
  const currentPhoto = viewedPhotos[viewedPhotos.length - 1];

  if (currentPhoto && !currentPhoto.liked) {
    currentPhoto.liked = true;
    likedPhotos.push(currentPhoto.id);
    localStorage.setItem(likeKey, JSON.stringify(likedPhotos));
  } else if (currentPhoto) {
    currentPhoto.liked = false;
    const index = likedPhotos.indexOf(currentPhoto.id);
    if (index !== -1) {
      likedPhotos.splice(index, 1);
      localStorage.setItem(likeKey, JSON.stringify(likedPhotos));
    }
  }

  updateLikeButton();
  updateLikesCount();
}

function updateLikeButton() {
  const currentPhoto = viewedPhotos[viewedPhotos.length - 1];
  //likeButton.disabled = currentPhoto?.liked;
}

function updateLikesCount() {
  const currentPhoto = viewedPhotos[viewedPhotos.length - 1];
  const likesCount = likedPhotos.filter((id) => id === currentPhoto.id).length;
  likesCountElement.innerText = likesCount;
}

function showPreviousPhoto() {
  const previousPhoto = viewedPhotos[viewedPhotos.length - 2];
  if (previousPhoto) {
    viewedPhotos.pop();
    localStorage.setItem(viewedKey, JSON.stringify(viewedPhotos));
    displayPhoto(previousPhoto);
    updateLikeButton();
    updateLikesCount();
  } else {
    alert("No previous photo available.");
  }
}

async function loadRandomPhoto() {
  const photo = await fetchRandomPhoto();
  if (photo) {
    viewedPhotos.push({ id: photo.id, liked: likedPhotos.includes(photo.id) });
    localStorage.setItem(viewedKey, JSON.stringify(viewedPhotos));
    displayPhoto(photo);
    updateLikeButton();
    updateLikesCount();
  }
}

loadRandomPhoto();
