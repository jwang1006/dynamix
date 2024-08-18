## Art in Motion

Art in Motion is a React web application that reimagines the online art viewing experience. It utilizes parallax scrolling and layered images to create a dynamic and interactive presentation of 2D artwork. 

## Installation

1. Clone the repository: `git clone <repository-url>`
2. Install dependencies: `npm install`
3. Start the development server: `npm run   
 start`
 
## Technologies Used

* **React:**  The core framework for building the user interface and managing the application's state. We leverage functional components, hooks like `useState` and `useEffect`, and JSX for a declarative and efficient development process.
* **Tailwind CSS:** A utility-first CSS framework used for styling the components and creating a responsive layout. It provides a vast collection of pre-built CSS classes that enable rapid UI development.
* **GSAP (GreenSock Animation Platform):** A powerful JavaScript animation library used to implement the smooth parallax scrolling effects. We specifically utilize the `gsap.to()` method and the `ScrollTrigger` plugin to create animations that are triggered and controlled by the user's scroll position.



## Code Examples

* **React component with state and image handling:**

```javascript
function Banner() {
  const [currentArtwork, setCurrentArtwork] = useState(artworks[0]);

  const handleLinkClick = (index) => {
    // ... logic to update currentArtwork
  };

  return (
    <div key={currentArtwork.title}>
      {/* ... image and description rendering ... */}
    </div>
  );
}

## Tailwind Styling
<div className="container mx-auto px-4 flex items-center">
  {/* ... */}
</div>

## GSAP

useEffect(() => {
  gsap.registerPlugin(ScrollTrigger);

  gsap.to(foregroundImageRef.current, {
    yPercent: 30, 
    scale: 1.15,
    ease: 'none', 
    scrollTrigger: {
      trigger: foregroundImageRef.current, 
      start: 'top bottom', 
      end: 'bottom top', 
      scrub: true, 
    }
  });

  // ... animations for other image layers
}, []);
