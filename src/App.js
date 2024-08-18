import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; 

// Import image assets
import foreground1 from './images/image1/foreground.png';
import closebg1 from './images/image1/closebg.png';
import midground1 from './images/image1/midground.png';
import farbg1 from './images/image1/farbg.png';

import foreground2 from './images/image2/foreground.png';
import closebg2 from "./images/image2/closebg.png";
import midground2 from './images/image2/midground.png';
import farbg2 from './images/image2/farbg.png';

// Artwork data
const artworks = [
  {
    foreground: foreground1,
    midground: midground1,
    midOffset: '10%',
    backgroundClose: closebg1, 
    bgCloseOffset: '8%',
    backgroundFar: farbg1,
    bgFarOffset: '0%',
    title: 'Valorant Deathmatch',
    artist: 'by Valorant',
    description: 'In a world overflowing with visual content, showcasing 2D art online often falls flat, reducing masterpieces to static images that fail to capture their depth and emotional impact. Our app aims to change that by reimagining how we present 2D art in the digital space. Through dynamic layering and parallax effects, we transform passive viewing into an interactive exploration, inviting viewers to connect with the artwork on a deeper level. This innovative approach not only benefits art enthusiasts but also empowers artists and educators, ensuring that in a world of fleeting images, true art endures.',
    bgcolor: 'ebe6e0',
    color: 'c54340',
  },
  {
    foreground: foreground2,
    midground: midground2,
    midOffset: '0%',
    backgroundClose: closebg2, 
    bgCloseOffset: '8%',
    backgroundFar: farbg2,
    bgFarOffset: '0%',
    title: 'Studio Ghibli Art',
    artist: 'by Studio Ghibli',
    description: 'In a world overflowing with visual content, showcasing 2D art online often falls flat, reducing masterpieces to static images that fail to capture their depth and emotional impact. Our app aims to change that by reimagining how we present 2D art in the digital space. Through dynamic layering and parallax effects, we transform passive viewing into an interactive exploration, inviting viewers to connect with the artwork on a deeper level. This innovative approach not only benefits art enthusiasts but also empowers artists and educators, ensuring that in a world of fleeting images, true art endures.',
    bgcolor: 'f2dcce',
    color: '8ea4ba',
  },
  // Add more artwork objects as needed
];

// NavLink component
function NavLink({ href, children, isActive, onClick }) {
  return (
    <a
      href={href}
      className={`text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-gray-700 text-white' : ''}`}
      onClick={onClick}
    >
      {children}
    </a>
  );
}

// Dropdown component
function Dropdown({ isOpen, links }) {
  return (
    <div className={`absolute mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 ${isOpen ? '' : 'hidden'}`}>
      <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            role="menuitem"
            onClick={link.onClick}
          >
            {link.text}
          </a>
        ))}
      </div>
    </div>
  );
}

// Main Banner component
function Banner() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentArtwork, setCurrentArtwork] = useState(artworks[0]);

  // Refs for image elements to animate with GSAP
  const foregroundImageRef = useRef(null);
  const midgroundImageRef = useRef(null);
  const farbgImageRef = useRef(null);
  const closebgImageRef = useRef(null);
  const leftImageRef = useRef(null);
  const rightImageRef = useRef(null);

  // Handle link clicks in the navigation
  const handleLinkClick = (index) => {
    if (Number.isInteger(index)) {
      setIsDropdownOpen(false);
      setCurrentArtwork(artworks[index]);
      window.scrollTo({ 
        top: 0, 
        behavior: 'smooth' 
      });
    
    } else {
      // Handle other link clicks (e.g., 'about') later if needed
    }
  };

  // Toggle the dropdown menu
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };


  // useEffect hook for GSAP animations
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Function to create parallax scrolling animations
    const createAnimation = (ref, yPercent, scale) => {
      gsap.to(ref.current, {
        yPercent, // Vertical movement percentage
        scale,    // Scaling factor
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top bottom', 
          end: 'bottom 10%',  
          scrub: true,         // Smooth scrubbing effect during scroll
        }
      });
    };

    

    // Create animations for each image layer
    createAnimation(foregroundImageRef, 30, 1.40);
    createAnimation(midgroundImageRef, 25, 1.30);
    createAnimation(closebgImageRef, 10, 1.15);
    createAnimation(farbgImageRef, 7, 1.05);

  }, [currentArtwork]); // Re-run effect when currentArtwork changes

  // JSX for the Banner component
  return (
    <>      
      <header className="bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">   
              <span className="text-white font-bold text-xl">Art in Motion</span>
            </div>
            <nav> 
              <div className="flex items-center"> 
                <div className="relative ml-4"> 
                  <NavLink 
                    href="#gallery" 
                    onClick={toggleDropdown} 
                  >
                    Gallery
                  </NavLink>
                  <Dropdown 
                    isOpen={isDropdownOpen} 
                    links={artworks.map((artwork, index) => ({
                      href: `#image${index + 1}`, 
                      text: artwork.title, 
                      onClick: () => handleLinkClick(index)
                    }))}
                  />
                </div>
                {/* ... other links ... */}
              </div>
            </nav>
          </div>
        </div>
      </header>
      <body       >
        
        <div key={currentArtwork.title}> 
          <div className='image-container'> 
            <img 
                src={currentArtwork.backgroundFar} 
                className="image-layer"
                ref={farbgImageRef}
                style={{
                  top: currentArtwork.bgFarOffset,
                }}
            />
            <img 
                src={currentArtwork.backgroundClose} 
                className="image-layer"
                ref={closebgImageRef}
                style={{
                  top: currentArtwork.bgCloseOffset,
                }}
            />
            <img 
                src={currentArtwork.midground} 
                className="image-layer" 
                ref={midgroundImageRef}
                style={{
                  top: currentArtwork.midOffset,
                }}
              />
            
            <img 
                src={currentArtwork.foreground} 
                className="image-layer" 
                ref={foregroundImageRef}
            />

            <img 
                src={currentArtwork.right} 
                className="image-layer right" 
                ref={rightImageRef}
              />
            <img 
                src={currentArtwork.left} 
                className="image-layer left" 
                ref={leftImageRef}
            />
            
          </div>
          <div 
              className="painting-description" 
              style={{
                backgroundColor: `#${currentArtwork.bgcolor}`, 
                color: `#${currentArtwork.color}`, 
              }}
          >  
            <h2 class="painting-title">{currentArtwork.title}</h2> 
            <p class="artist">{currentArtwork.artist}</p>
            <p class="description">{currentArtwork.description}</p>
          </div>
        </div>
      </body>
    </>
  );
}

export default Banner;