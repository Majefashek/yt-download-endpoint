fetch("https://yt-download-endpoint.onrender.com/app/download", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    youtube_url: "https://youtu.be/6N9SS6L0TDU?si=pwEkjFzQtPXSLFC2",
  }),
})
  .then((response) => {
    console.log(response)
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.blob();
  })
  .then((blob) => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "video.mp4";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  })
  .catch((error) => console.error("Error:", error));
