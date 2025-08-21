
import { Sparkles, ArrowRight } from 'lucide-react'; // Adding new icons for visual appeal

export default function AboutPage() {
  return (
    <div className="bg-gray-950 text-white min-h-screen mt-16 font-sans">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Hamari Kahaani
        </h1>
        
        {/* Main Content Section with Two Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Mission Statement Column */}
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-4 text-white">
              Aapki Digital Suraksha, Hamara Lakshya
            </h2>
            <p className="text-lg text-gray-300 space-y-6">
              PassVault ki shuruaat ek simple vichar se hui thi: digital security ko har kisi ke liye aasan aur accessible banaya ja sake. Aaj ke digital yug mein, kai online accounts hote hain aur un sab ke liye alag-alag aur majboot passwords yaad rakhna ek badi chunauti hai.
            </p>
            <p className="text-lg text-gray-300 mt-4">
              Hamara lakshya ek aisa surakshit aur aasan platform pradan karna hai jahan aap bina kisi chinta ke apne sabhi passwords store aur manage kar saken. Hamara maan-na hai ki aapki privacy aur security sabse mahatvapurn hai, aur ham iske liye hamesha committed rahenge.
            </p>
          </div>

          {/* Highlighted Quote/Value Column */}
          <div className="bg-gray-800 rounded-xl p-8 shadow-lg transition-transform transform hover:scale-105 duration-300">
            <div className="flex items-center mb-4 text-purple-400">
              <Sparkles size={32} className="mr-3" />
              <h3 className="text-2xl font-bold">Hamare Mool Siddhant</h3>
            </div>
            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
              "Suraksha, Saralta aur Shanti. Yeh hamare kaam ke teen mool stambh hain. Har ek product aur feature inhi siddhanton par adharit hai."
            </p>
            <button className="flex items-center justify-center w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 group">
              <span className="mr-2">Hamari Team se Milen</span>
              <ArrowRight size={20} className="transform group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
