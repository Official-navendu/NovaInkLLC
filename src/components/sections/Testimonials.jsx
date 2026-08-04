import React from 'react'
import { testimonialsData } from '../../data/testimonials'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

export function Testimonials() {
  return (
    <section className="py-8 lg:py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-transparent">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <span className="text-xs font-extrabold text-[#0096D6] uppercase tracking-widest bg-blue-50 border border-blue-100 px-3.5 py-1.5 rounded-full inline-block mb-3">
          CUSTOMER REVIEWS
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight uppercase">
          WHAT OUR <span className="text-[#0096D6]">CUSTOMERS SAY</span>
        </h2>
      </div>

      {/* Swiper Slider Wrapper with Navigation Arrows */}
      <div className="relative group/slider">
        {/* Navigation Arrows */}
        <button
          id="testimonials-prev"
          aria-label="Previous testimonial"
          className="absolute -left-3 sm:-left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white border border-slate-200 shadow-md text-slate-700 flex items-center justify-center hover:bg-[#0096D6] hover:text-white hover:border-[#0096D6] transition-all cursor-pointer disabled:opacity-0"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <button
          id="testimonials-next"
          aria-label="Next testimonial"
          className="absolute -right-3 sm:-right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white border border-slate-200 shadow-md text-slate-700 flex items-center justify-center hover:bg-[#0096D6] hover:text-white hover:border-[#0096D6] transition-all cursor-pointer disabled:opacity-0"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        <Swiper
          modules={[Pagination, Navigation, Autoplay]}
          loop={true}
          autoplay={{ delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: true }}
          pagination={{ clickable: true }}
          navigation={{
            prevEl: '#testimonials-prev',
            nextEl: '#testimonials-next'
          }}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 24 }
          }}
          className="pb-12 pt-1"
        >
          {testimonialsData.map((review) => (
            <SwiperSlide key={review.id} className="h-auto">
              <div className="bg-white border border-slate-200 hover:border-[#0096D6] rounded-2xl p-6 flex flex-col justify-between h-full shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-[3px] group">
                <div>
                  {/* Star Rating */}
                  <div className="flex items-center gap-1 mb-3 text-amber-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  {/* Quote */}
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal italic mb-5">
                    "{review.quote}"
                  </p>
                </div>
                {/* Author Info */}
                <div className="pt-3 border-t border-slate-100">
                  <span className="font-extrabold text-slate-900 text-sm tracking-wide block">
                    {review.author}
                  </span>
                  <span className="text-xs text-slate-500 font-medium block mt-0.5">
                    {review.role} • {review.company}
                  </span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}
