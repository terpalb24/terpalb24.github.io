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
    <section className="w-full bg-yellow-50 py-4 md:py-5 border-y border-yellow-300 mt-4">
    <div className="container px-4 md:px-6 text-center">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{
          delay: 2000,
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
            <div className="max-w-3xl mx-auto h-full flex flex-col items-center justify-center space-y-5 py-5">
              <h3 className="text-3xl md:text-4xl font-bold text-yellow-800">
                {reminder.emoji} {reminder.title}
              </h3>
              <p className="text-yellow-900 text-lg md:text-xl">{reminder.description}</p>
              <p className="text-yellow-800 font-semibold text-2xl">{reminder.date}</p>

              {reminder.buttonText && reminder.link && (
                <a
                  href={reminder.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-3 px-6 rounded-full transition duration-200 shadow-md"
                >
                  {reminder.buttonText}
                </a>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
    </section>
  );
};

export default ReminderSlider;
