import { useState } from 'react';
import test1 from './images/image1/test1.jpg';
import test2 from './images/image2/test2.jpg';


const artworks = [
  {
    src: test1, // Assuming you've imported your images
    title: 'Serenity',
    artist: 'John Doe',
    description: 'A captivating landscape painting...',
    bgcolor: 'f5f5f5',
    color: 333,
  },
  {
    src: test2,
    title: 'Vibrant Cityscape',
    artist: 'Jane Smith',
    description: 'A dynamic cityscape bursting with color...',
    bgcolor: 'f5f5f5',
    color: 333,
  },
  // Add more artwork objects as needed
];


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

function Banner() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentArtwork, setCurrentArtwork] = useState(artworks[0]); // Make currentArtwork a state variable

  const handleLinkClick = (index) => {
    console.log(index)
    if (Number.isInteger(index)){
      setIsDropdownOpen(false); 
      setCurrentArtwork(artworks[index]);
      console.log("changed!")
    }
    else {
      // later
    }
    
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  }

  return (
    <>
      <header className="bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">   
              <span className="text-white font-bold text-xl">My Art Portfolio</span>
            </div>
            <nav> 
              <div className="flex items-center"> {/* Add items-center to vertically align */}
                <NavLink href="#about" onClick={() => handleLinkClick('about')}>
                  About
                </NavLink>
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
      <body>
        <div key={currentArtwork.src}>
          <div> 
            <img 
              src={currentArtwork.src} 
              alt="Description of the image" 
              className="w-full h-screen object-cover" 
            />
          </div>
          <div 
              className="painting-description" 
              style={{
                color: `#${currentArtwork.color}`, 
                backgroundColor: `#${currentArtwork.bgcolor}`
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