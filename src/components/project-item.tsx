import { ExternalLinkIcon } from "lucide-react";
import type { ProjectWithRelation } from "@/types/project";
import ImageHoverable from "./image-hoverable";
import ImagePlaceholder from "./image-placeholder";

interface Props {
  project: ProjectWithRelation;
}
export default function ProjectItem({
  project: { manpro, teams, ...project },
}: Props) {
  return (
    <div>
      <ImageHoverable
        src={project.cover}
        alt={project.title}
        className="aspect-video"
        hideOverlay
        loading="lazy"
      >
        <div className="flex absolute top-6 left-6 flex-wrap gap-2">
          <span className="bg-secondary text-bg uppercase font-bold text-sm px-2 py-1 rounded-full">
            {project.code}
          </span>
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="bg-primary text-bg uppercase font-bold text-sm px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </ImageHoverable>
      <div className="mt-6">
        <h3 className="font-black text-4xl text-primary">{project.name}</h3>
        <h2 className="text-lg mt-4">{project.title}</h2>
        <div className="mt-4 flex gap-2 flex-wrap">
          <ImagePlaceholder
            src={manpro.photo}
            alt={manpro.name}
            title={manpro.name}
            className="w-14 h-14 object-cover object-center rounded-full"
          />
          {teams.map((member) => (
            <ImagePlaceholder
              key={member.nim}
              src={member.photo}
              alt={member.name}
              title={member.name}
              className="w-14 h-14 object-cover object-center rounded-full"
            />
          ))}
        </div>
        {project.link && (
          <div className="mt-4">
            <a
              href={project.link}
              className="inline-flex font-bold gap-2 items-center text-primary"
              target="_blank"
            >
              <ExternalLinkIcon />
              <span>Read More</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
