"use client";
import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Search, Play, Menu, X, Pause } from "lucide-react";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  const slides = [
    {
      title: "Get Ready for New Adidas Bands",
      description:
        "Adidas tracks all begin with a starting gate and end with a finish line, but everything in between varies from track to track. Because no two tracks are alike, this action sport keeps you on your toes wherever you are racing.",
      video: "/football.mp4",
      bgImage:
        "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200",
    },
    {
      title: "Train Like a Champion",
      description:
        "Experience world-class training facilities and cutting-edge technology. Our tracks are designed to help you achieve your personal best and push beyond your limits.",
      video: "/football2.mp4",
      bgImage:
        "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200",
    },
    {
      title: "Join the Adidas Community",
      description:
        "Connect with athletes from around the world. Share your journey, compete in events, and become part of something bigger than yourself.",
      video: "/football3.mp4",
      bgImage:
        "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=1200",
    },
  ];

  const videoRefs = useRef([]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (video) {
        if (i === currentSlide && isPlaying) {
          video.play().catch(err => console.log("Play error:", err));
        } else {
          video.pause();
          video.currentTime = 0;
        }
      }
    });
  }, [currentSlide, isPlaying]);

  const togglePlayPause = () => {
    const currentVideo = videoRefs.current[currentSlide];
    if (currentVideo) {
      if (isPlaying) {
        currentVideo.pause();
        setIsPlaying(false);
      } else {
        currentVideo.play().catch(err => console.log("Play error:", err));
        setIsPlaying(true);
      }
    }
  };

  return (
    <div className="min-h-screen">
      <div className="bg-gray-100 text-gray-700 text-center py-2 px-4 text-xs sm:text-sm">
        <span className="hidden sm:inline">LIVE RACE STREAM FROM GATOR NATIONALS IN SARASOTA, FL / </span>
        <span className="sm:hidden">LIVE STREAM / </span>
        <a href="#" className="text-emerald-600 font-semibold hover:underline">
          WATCH NOW
        </a>
      </div>

      <header className="bg-[#0e4a2f] text-white">
        <div className="max-w-7xl mx-auto flex justify-between items-center py-3 sm:py-4 px-4 sm:px-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-wider">adidas</h1>
         
          <div className="hidden md:flex gap-4">
            <button
              className="bg-[#2a8b4a] hover:bg-[#3aa05a] transition-colors py-2 px-6 lg:px-8 text-sm font-bold uppercase rounded"
              style={{
                clipPath: "polygon(6% 0%, 100% 0%, 96% 100%, 0% 100%)",
              }}
            >
              Membership
            </button>
            <button
              className="bg-[#1e5e3f] hover:bg-[#2a7a5a] transition-colors py-2 px-6 lg:px-8 text-sm font-bold uppercase rounded"
              style={{
                clipPath: "polygon(6% 0%, 100% 0%, 96% 100%, 0% 100%)",
              }}
            >
              Account
            </button>
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white p-2"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        <div className="hidden md:block border-t border-[#1a5c3a] bg-[#125735] h-15">
          <div className="max-w-7xl mx-auto flex justify-between items-center h-full px-6">
            <ul className="flex gap-1 lg:gap-3 text-white font-bold text-xs lg:text-sm uppercase h-full">
              {[
                "Our Tracks",
                "Find Events",
                "Track Map",
                "Shop",
                "About Us",
              ].map((item) => (
                <li
                  key={item}
                  className="relative overflow-hidden cursor-pointer group h-full"
                >
                  <span className="relative z-10 h-full flex items-center px-3 lg:px-6 transition-colors duration-300">
                    {item}
                  </span>
                  <span
                    className="absolute inset-0 bg-[#2e844a] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                    clipPath: "polygon(8% 0%, 100% 0%, 94% 100%, 0% 100%)",
                  }}
                  />
                </li>
              ))}
            </ul>
            <div className="relative">
              <input
                className="bg-[#0e4a2f] border border-gray-600 py-2 px-4 pr-10 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 w-48 lg:w-64 text-sm uppercase"
                type="text"
                placeholder="Search"
              />
              <Search
                size={22}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-[#125735] border-t border-[#1a5c3a]">
            <ul className="flex flex-col text-white font-bold text-sm uppercase">
              {[
                "Our Tracks",
                "Find Events",
                "Track Map",
                "Shop",
                "About Us",
              ].map((item) => (
                <li
                  key={item}
                  className="border-b border-[#1a5c3a] last:border-b-0"
                >
                  <a
                    href="#"
                    className="block py-4 px-6 hover:bg-[#2e844a] transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
            <div className="p-4 border-t border-[#1a5c3a]">
              <div className="relative">
                <input
                  className="w-full bg-[#0e4a2f] border border-gray-600 py-3 px-4 pr-10 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 text-sm uppercase"
                  type="text"
                  placeholder="Search"
                />
                <Search
                  size={20}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
              </div>
            </div>
            <div className="flex flex-col gap-3 p-4 border-t border-[#1a5c3a]">
              <button
                className="bg-[#2a8b4a] hover:bg-[#3aa05a] transition-colors py-3 px-6 text-sm font-bold uppercase rounded"
                style={{
                  clipPath: "polygon(3% 0%, 100% 0%, 98% 100%, 0% 100%)",
                }}
              >
                Membership
              </button>
              <button
                className="bg-[#1e5e3f] hover:bg-[#2a7a5a] transition-colors py-3 px-6 text-sm font-bold uppercase rounded"
                style={{
                  clipPath: "polygon(3% 0%, 100% 0%, 98% 100%, 0% 100%)",
                }}
              >
                Account
              </button>
            </div>
          </div>
        )}
      </header>

      <div className="relative bg-gradient-to-r from-[#0e9c44] to-[#0e7a38] overflow-hidden h-24 sm:h-32 md:h-25">
        <div className="absolute inset-0 flex items-center z-10">
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white uppercase tracking-wider">
              Home Page
            </h1>
          </div>
        </div>
        <div
          className="hidden sm:flex absolute inset-y-0 right-0 w-[50%] md:w-[40%] bg-white flex-col items-center justify-center"
          style={{
            clipPath: "polygon(17% 0%, 100% 0%, 100% 100%, 10% 100%)",
          }}
        >
          <p className="text-xs md:text-sm font-bold text-[#0e9c44] uppercase tracking-wider relative top-5">
            Partnership by
          </p>
          <div className="flex justify-center items-center">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black">Reebok</h1>
            <img src="/reebok.jpg" width={100} height={100} alt="Reebok" className="w-24 h-24 object-contain" />
          </div>
        </div>
      </div>

      <div className="relative h-[400px] sm:h-[500px] md:h-[600px] overflow-hidden">
        <div className="relative w-full h-full">
          <div
            className="flex h-full transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <div key={index} className="w-full h-full flex-shrink-0 relative">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('/shoes-graound.jpg')`,
                  }}
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex items-center">
                  <div className="w-full lg:w-1/2 text-white z-10">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 leading-tight uppercase">
                      {slide.title}
                    </h2>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed max-w-2xl opacity-90">
                      {slide.description}
                    </p>
                  </div>
                  <div className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 hidden xl:block">
                    <div className="relative group">
                      <video
                        ref={(el) => (videoRefs.current[index] = el)}
                        className="w-[400px] xl:w-[500px] h-[240px] xl:h-[300px] object-cover rounded-lg shadow-2xl"
                        muted
                        loop
                        playsInline
                      >
                        <source src={slide.video} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                      <button
                        onClick={togglePlayPause}
                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30 rounded-lg"
                      >
                        <div className="bg-white/90 p-4 rounded-full hover:bg-white transition-colors">
                          {isPlaying ? (
                            <Pause className="w-12 h-12 text-[#0e4a2f]" />
                          ) : (
                            <Play className="w-12 h-12 text-[#0e4a2f]" />
                          )}
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-4 md:left-8 top-1/2 -translate-y-1/2 hover:bg-white/40 backdrop-blur-sm p-2 sm:p-3 md:p-4 rounded-full transition-all z-20"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-4 md:right-8 top-1/2 -translate-y-1/2 hover:bg-white/40 backdrop-blur-sm p-2 sm:p-3 md:p-4 rounded-full transition-all z-20"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" />
        </button>

        <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${
                index === currentSlide
                  ? "bg-white w-6 sm:w-8"
                  : "bg-white/60 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>
     
      <div className="h-[40px] sm:h-[50px] md:h-[60px] bg-[#10372b]"></div>
    </div>
  );
}