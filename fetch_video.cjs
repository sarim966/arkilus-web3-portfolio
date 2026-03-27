const fs = require('fs');

async function downloadVideo() {
  try {
    const res = await fetch('https://streamable.com/pwww71');
    const html = await res.text();
    const match = html.match(/<meta property="og:video:url" content="(.*?)"/);
    if (match && match[1]) {
      const videoUrl = match[1].replace(/&amp;/g, '&');
      console.log('Found video URL:', videoUrl);
      
      const videoRes = await fetch(videoUrl);
      const buffer = await videoRes.arrayBuffer();
      
      fs.writeFileSync('./public/background.mp4', Buffer.from(buffer));
      console.log('Successfully saved to ./public/background.mp4');
    } else {
      console.log('Video URL not found in HTML');
    }
  } catch (err) {
    console.error('Error:', err);
  }
}

downloadVideo();
