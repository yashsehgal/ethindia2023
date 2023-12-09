import { PROJECTNAME } from "@/common/copy";
import { Button, CardContainer, Section, ViewContainer } from "@/components";
import Link from "next/link";

import { ConnectButton } from '@rainbow-me/rainbowkit';

const MainView: React.FunctionComponent = () => {
  return (
    <div className="main-view home-page">
      <Section>
        <ViewContainer className="flex flex-row items-center justify-between">
          <h1 className="leading-snug tracking-tight font-semibold text-5xl">
            {PROJECTNAME}
          </h1>
          <ConnectButton />
        </ViewContainer>
      </Section>
      <Section>
        <ViewContainer className="rounded-2xl bg-gray-100 p-6 flex flex-row items-center justify-start gap-6 max-lg:grid max-lg:grid-cols-2 max-md:grid-cols-1">
          <Link className="text-left" href={"/message"}>
            <CardContainer className="w-56 h-44 flex flex-col items-start justify-end hover:shadow-sm hover:scale-95 transition-all max-lg:w-full">
              <span className="text-2xl font-medium flex flex-col items-start gap-3">
                <span className="text-4xl">{"💬"}</span>
                <span>{"Send a message"}</span>
              </span>
            </CardContainer>
          </Link>
          <button className="text-left">
            <CardContainer className="w-56 h-44 flex flex-col items-start justify-end hover:shadow-sm hover:scale-95 transition-all max-lg:w-full">
              <span className="text-2xl font-medium flex flex-col items-start gap-3">
                <span className="text-4xl">{"💰"}</span>
                <span>{"Send real money"}</span>
              </span>
            </CardContainer>
          </button>
        </ViewContainer>
      </Section>
    </div>
  )
}

export default MainView;