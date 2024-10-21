import React, { useRef, useState } from 'react';
import defaultImg from './assets/img.jpg';
import './ImgGenerator.css'; 
function ImgGenerator() {
    const [image_url, setImage_url] = useState("/");
    const inputRef = useRef(null);

    const imageGenerator = async () => {
        if (inputRef.current.value === "") {
            return;
        } 

        const response = await fetch(
            "https://api.openai.com/v1/images/generations",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
                    "User-Agent": "Chrome"
                },
                body: JSON.stringify({
                    prompt: inputRef.current.value,
                    n: 1,
                    size: "512x512",
                }),
            }
        );

        const data = await response.json();
        if (data.data && data.data.length > 0) {
            setImage_url(data.data[0].url); 
        } else {
            console.error("Error generating image:", data);
        }
    }

    return (
        <div className='ai-image-generator'>
            <div className='header'>AI Image <span>Generator</span></div>
            <div className='img-loading'>
                <div className="img">
                    <img src={image_url === '/' ? defaultImg : image_url} alt='default Img' />
                </div>
            </div>
            <div className='search-box'>
                <input type='text' ref={inputRef} className='search-input' placeholder='Describe What You Want to See' />
                <div className="generate-btn" onClick={imageGenerator}>Generate</div>
            </div>
        </div>
    );
}

export default ImgGenerator;
