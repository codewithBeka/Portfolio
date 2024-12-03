// import React from "react";
// import {
//   motion,
// } from "framer-motion";
// interface MarqueeItemProps {
//   images: string[]; // Array of image URLs
//   from: string; // Starting position (e.g., '100%', '-100%')
//   to: string; // Ending position (e.g., '-100%', '100%')
// }

// const MarqueeItem: React.FC<MarqueeItemProps> = ({ images, from, to }) => {
//   return (
//     <div className="flex MyGradient">
//       <motion.div
//         initial={{ x: from }}
//         animate={{ x: to }}
//         transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
//         className="flex flex-shrink-0"
//       >
//         {images.map((image, index) => (
//           <img className="h-40 w-56 pr-20" src={image} alt={`Marquee image ${index}`} key={index} />
//         ))}
//       </motion.div>

//       <motion.div
//         initial={{ x: from }}
//         animate={{ x: to }}
//         transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
//         className="flex flex-shrink-0"
//       >
//         {images.map((image, index) => (
//           <img className="h-40 w-56 pr-20" src={image} alt={`Marquee image ${index}`} key={index} />
//         ))}
//       </motion.div>
//     </div>
//   );
// };

// export default MarqueeItem;