import type { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

type Reminder = {
  title: string;
  description: string;
  date: string;
  link: string;
  buttonText: string;
  emoji: string;
};

interface Props {
  reminders: Reminder[];
}

const ReminderSlider: FC<Props> = ({ reminders }) => {
  return (
    <section className="w-full bg-yellow-50 py-10 md:py-12 border-y border-yellow-300">
      <div className="container px-4 md:px-6 text-center space-y-8">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          autoplay={{
            delay: 2000, // Sesuaikan dengan waktu delay yang lebih ideal
            disableOnInteraction: false,
          }}
          loop={true}
          spaceBetween={30}
          slidesPerView={1}
          navigation={false}
          className="w-full"
        >
          {reminders.map((reminder, idx) => (
            <SwiperSlide key={idx}>
              <div className="max-w-3xl mx-auto space-y-6">
                <h3 className="text-5xl md:text-4xl font-bold text-yellow-800">
                  {reminder.emoji} {reminder.title}
                </h3>
                <p className="text-yellow-900 text-lg md:text-xl">{reminder.description}</p>
                <p className="text-yellow-800 font-semibold text-2xl">{reminder.date}</p>
                <a
                  href={reminder.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-3 px-6 rounded-full transition duration-200 shadow-md"
                >
                  🔗 {reminder.buttonText}
                </a>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ReminderSlider;
