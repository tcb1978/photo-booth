const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');
const takePicture = document.querySelector('#takePicture');

function getVideo() {
    navigator.mediaDevices.getUserMedia({video: true, audio: false})
    .then(localMediaStream => {
        // console.log(localMediaStream);
        video.src = window.URL.createObjectURL(localMediaStream);
        video.play();
    })
    .catch(err => {
        console.error('OH NO!!', err);
    })
}

function paintToCanvas() {
    const width = video.videoWidth;
    const height = video.videoHeight;
    canvas.width = width;
    canvas.height = height;

    // take image from webcam and add to canvas
    return setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);
        // take pixels our
        let pixels = ctx.getImageData(0, 0, width, height);
        // add pixels back
        ctx.putImageData(pixels, 0, 0);
    }, 16);
}

function takePhoto() {
    // play sound effect
    snap.currentTime = 0;
    snap.play();
    // take data from canvas
    const data = canvas.toDataURL('image/jpeg');
    // create a link for image
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download', 'webcam_photo_booth');
    link.innerHTML = `<img src="${data}" alt="webcam photo booth" />`
    // insert into strip element
    strip.insertBefore(link, strip.firstChild);
}

getVideo();

video.addEventListener('canplay', paintToCanvas);
takePicture.addEventListener('click', takePhoto);