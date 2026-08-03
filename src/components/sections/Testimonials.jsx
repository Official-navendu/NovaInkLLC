import React from 'react'
import { testimonialsData } from '../../data/testimonials'
import { Star } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

export function Testimonials() {
  return (
    <section className="py-8 lg:py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-[#130E26] rounded-3xl p-8 sm:p-10 lg:p-12 text-white shadow-2xl">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-center text-white tracking-tight uppercase mb-8">
          WHAT OUR <span className="text-[#3897F0]">CUSTOMERS SAY</span>
        </h2>

        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnManropeaction: false }}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }}
          className="pb-10"
        >
          {testimonialsData.map((review) => (
            <SwiperSlide key={review.id} className="h-auto">
              <div className="bg-[#1C1635] border border-[#261E45] rounded-2xl p-6 flex flex-col justify-between h-full shadow-lg hover:border-blue-500/30 transition-all duration-300">
                <div>
                  {/* Star Rating */}
                  <div className="flex items-center gap-1 mb-3 text-amber-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  {/* Quote */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal italic mb-5">
                    "{review.quote}"
                  </p>
                </div>
                {/* Author */}
                <div>
                  <span className="font-bold text-white text-xs sm:text-sm tracking-wide">
                    {review.author}
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
