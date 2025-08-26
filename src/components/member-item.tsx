import type { Member } from "content-collections";
import { Fragment } from "react";
import ImageHoverable from "./image-hoverable";
import SocialLink from "./social-link";

interface Props {
  member: Member;
}
export default function MemberItem({ member }: Props) {
  return (
    <div>
      <ImageHoverable
        src={member.photo}
        alt={member.name}
        className="aspect-square"
        loading="lazy"
      >
        <div className="flex absolute bottom-6 left-6 right-6 justify-center flex-wrap gap-4">
          {member.isLeader && (
            <span className="bg-secondary text-bg uppercase font-bold text-sm px-2 py-1 rounded-full">
              Ketua Kelas
            </span>
          )}

          <span className="bg-primary text-bg uppercase font-bold text-sm px-2 py-1 rounded-full">
            {member.nim}
          </span>
        </div>
      </ImageHoverable>
      <div className="space-y-2 mt-6 text-center">
        <div
          className="text-3xl text-primary font-extrabold truncate"
          title={member.name}
        >
          {member.name}
        </div>
        <p className="text-lg">{member.quote}</p>
        <div className="inline-flex flex-wrap items-center gap-2">
          {member.socials.facebook ? (
            <SocialLink href={member.socials.facebook} type="facebook" />
          ) : (
            <Fragment />
          )}
          {member.socials.instagram ? (
            <SocialLink href={member.socials.instagram} type="instagram" />
          ) : (
            <Fragment />
          )}
          {member.socials.github ? (
            <SocialLink href={member.socials.github} type="github" />
          ) : (
            <Fragment />
          )}
          {member.socials.linkedin ? (
            <SocialLink href={member.socials.linkedin} type="linkedin" />
          ) : (
            <Fragment />
          )}
          {member.socials.website ? (
            <SocialLink href={member.socials.website} type="website" />
          ) : (
            <Fragment />
          )}
        </div>
      </div>
    </div>
  );
}
