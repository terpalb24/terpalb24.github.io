import type { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const ReminderSlider: FC = () => {
  return (
    <div className="text-center space-y-6">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        spaceBetween={30}
        slidesPerView={1}
        className="mySwiper"
      >
        <SwiperSlide>
        <h2 className="text-3xl md:text-4xl font-bold text-yellow-800 mb-5">📢 Reminder</h2>
          <div className="mx-auto max-w-3xl text-yellow-900 text-lg md:text-xl space-y-6">
            <p>
              Jangan lupa hari ini, <strong>Jumat, 9 Mei 2025</strong> ada ujian <strong>ATS PBD</strong> dan <strong>B.INA</strong>!
            </p>
            <a
              href="https://learning-if.polibatam.ac.id/mod/quiz/view.php?id=6503"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-3 px-6 rounded-full transition-colors duration-200 shadow-md"
            >
              🔗 Kerjakan ATS Bahasa Indonesia
            </a>
          </div>
        </SwiperSlide>

        <SwiperSlide>
        <h2 className="text-3xl md:text-4xl font-bold text-yellow-800 mb-5">📝 Kuesioner ATS</h2>
          <div className="mx-auto max-w-3xl text-yellow-900 text-lg md:text-xl space-y-6">
            <p>
              <strong>28 April 2025 - 16 Mei 2025 (pukul 23.59 WIB)</strong>
            </p>
            <a
              href="https://sim.polibatam.ac.id/index.php?page=login"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-3 px-6 rounded-full transition-colors duration-200 shadow-md"
            >
              🔗 ISI KUESIONER ATS
            </a>
          </div>
        </SwiperSlide>

        
      </Swiper>
    </div>
  );
};

export default ReminderSlider;
