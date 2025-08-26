import type { ScheduleWithRelation } from "@/types/schedule";
import ImagePlaceholder from "./image-placeholder";

interface Props {
  item: ScheduleWithRelation["items"][0];
}
export default function ScheduleItem({ item }: Props) {
  return (
    <div className="grid group grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
      <div className="md:text-right">
        <div className="font-bold mt-2">{item.room}</div>
        <div
          className={`text-2xl font-bold group-odd:text-primary group-even:text-secondary`}
        >
          {item.startAt} - {item.endAt}
        </div>
        <div className="text-3xl leading-normal lg:leading-normal lg:text-4xl font-bold mt-2">
          {item.subject.title}
        </div>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <ImagePlaceholder
          src={item.lecturer.photo}
          alt={item.lecturer.name}
          className="w-12 object-cover object-center h-12 rounded-full"
          width={50}
        />
        <div className="flex flex-col gap-1">
          <div className="text-lg font-bold">{item.lecturer.name}</div>
          <div className="text-sm">{item.subject.code}</div>
        </div>
      </div>
    </div>
  );
}
