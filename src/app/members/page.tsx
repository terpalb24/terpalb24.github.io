import { allMembers } from "content-collections";
import type { Metadata } from "next";
import { Fragment } from "react";
import HeaderSection from "@/components/header-section";
import MemberItem from "@/components/member-item";
import { getTitle } from "@/lib/title";

export const metadata: Metadata = {
  title: getTitle("Our Class Members"),
  description: "Meet the talented students of TERPAL B 24",
};
export default function Members() {
  const members = allMembers;
  members.sort((a, b) => a.nim.toString().localeCompare(b.nim.toString()));
  members.sort((a, b) => (a.isLeader === b.isLeader ? 0 : a.isLeader ? -1 : 1));

  return (
    <Fragment>
      <HeaderSection
        title="Our Class Members"
        subtitle="Meet the talented students of TERPAL B 24"
      />
      <main className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-6">
          {members.map((data) => (
            <MemberItem key={data._meta.directory} member={data} />
          ))}
        </div>
      </main>
    </Fragment>
  );
}
